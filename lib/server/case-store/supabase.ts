import "server-only"
import { randomUUID } from "node:crypto"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { destinationLabel } from "@/lib/visa-assessment/summary"
import {
  StoreError,
  isCaseReference,
  isUuid,
  sanitiseSearch,
  type CaseDetail,
  type CaseDocument,
  type CaseEvent,
  type CaseEventType,
  type CaseListQuery,
  type CaseStatus,
  type CaseStore,
  type CaseSummary,
  type DocumentAccess,
  type NewContactEnquiry,
  type NewVisaCase,
  type NotifyChannel,
  type NotifyResult,
  type StaffMember,
  type StoredContactEnquiry,
  type StoredVisaCase,
} from "./types"

/**
 * Production store: Postgres tables + a PRIVATE storage bucket in Supabase.
 * Uses the service-role key, which must only ever exist on the server
 * (SUPABASE_SERVICE_ROLE_KEY, never NEXT_PUBLIC_*). Tables have row-level security
 * enabled with no public policies, and the bucket is private, so nothing is
 * readable from the browser. See supabase/migrations for the schema.
 */
export function createSupabaseCaseStore(url: string, serviceRoleKey: string, bucket: string): SupabaseCaseStore {
  const client = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  return new SupabaseCaseStore(client, bucket)
}

const SUMMARY_COLUMNS = "id, reference, created_at, status, case_type, destination_country, visa_type, full_name, email, staff_notify_status"

type CaseRow = {
  id: string
  reference: string
  created_at: string
  status: CaseStatus
  case_type: string
  destination_country: string | null
  visa_type: string
  full_name: string
  email: string
  staff_notify_status: CaseSummary["staffNotifyStatus"] | null
}

const toSummary = (r: CaseRow): CaseSummary => ({
  id: r.id,
  reference: r.reference,
  createdAt: r.created_at,
  status: r.status,
  caseType: r.case_type,
  destination: r.destination_country ?? "",
  visaType: r.visa_type,
  fullName: r.full_name,
  email: r.email,
  staffNotifyStatus: r.staff_notify_status ?? "pending",
})

type DocumentRow = {
  id: string
  slot: string
  original_name: string | null
  content_type: string
  size_bytes: number
  created_at: string
  storage_path?: string
}
const toDocument = (r: DocumentRow): CaseDocument => ({
  id: r.id,
  slot: r.slot,
  originalName: r.original_name,
  contentType: r.content_type,
  sizeBytes: r.size_bytes,
  createdAt: r.created_at,
})

type EventRow = { id: string; created_at: string; actor: string; type: CaseEvent["type"]; data: Record<string, unknown> | null }

export class SupabaseCaseStore implements CaseStore {
  readonly kind = "supabase" as const

  constructor(
    private readonly db: SupabaseClient,
    private readonly bucket: string
  ) {}

  // ---------- intake ----------

  private async existingSubmission(submissionId: string): Promise<StoredVisaCase | null> {
    const { data, error } = await this.db.from("visa_cases").select("id, reference, created_at").eq("submission_id", submissionId).maybeSingle()
    if (error) throw new StoreError(`Could not check for a duplicate submission: ${error.message}`)
    if (!data) return null
    const { count } = await this.db.from("visa_case_documents").select("id", { count: "exact", head: true }).eq("case_id", data.id)
    return { id: data.id, reference: data.reference, createdAt: data.created_at, documentCount: count ?? 0, duplicate: true }
  }

  async createVisaCase(input: NewVisaCase): Promise<StoredVisaCase> {
    if (input.submissionId) {
      const existing = await this.existingSubmission(input.submissionId)
      if (existing) {
        await this.addEvent(existing.id, "system", "duplicate_submission", {})
        return existing
      }
    }

    const a = input.answers
    const { data: row, error } = await this.db
      .from("visa_cases")
      .insert({
        submission_id: input.submissionId ?? null,
        case_type: a.caseType,
        destination: a.destination,
        destination_country: destinationLabel(a),
        visa_type: a.visaType,
        full_name: a.fullName,
        email: a.email,
        phone: a.phone,
        phone_is_whatsapp: a.phoneIsWhatsapp ?? null,
        preferred_contact: a.preferredContact,
        nationality: a.nationality,
        residence_country: a.residenceCountry,
        answers: a,
        consent: input.consent,
      })
      .select("id, reference, created_at")
      .single()
    if (error || !row) {
      // Two identical submissions raced: the other one won, so return its case.
      if (error?.code === "23505" && input.submissionId) {
        const existing = await this.existingSubmission(input.submissionId)
        if (existing) return existing
      }
      throw new StoreError(`Could not create case: ${error?.message ?? "no row returned"}`)
    }

    const uploaded: string[] = []
    try {
      for (const doc of input.documents) {
        const storagePath = `${row.reference}/${doc.slot}-${randomUUID()}.${doc.extension}`
        const { error: uploadError } = await this.db.storage
          .from(this.bucket)
          .upload(storagePath, doc.bytes, { contentType: doc.contentType, upsert: false })
        if (uploadError) throw new StoreError(`Could not store document: ${uploadError.message}`)
        uploaded.push(storagePath)
        const { error: docError } = await this.db.from("visa_case_documents").insert({
          case_id: row.id,
          slot: doc.slot,
          storage_path: storagePath,
          original_name: doc.originalName,
          content_type: doc.contentType,
          size_bytes: doc.size,
        })
        if (docError) throw new StoreError(`Could not record document: ${docError.message}`)
      }
    } catch (err) {
      // Do not leave a half-saved case: remove any stored files and the case row, then report failure.
      const removed = uploaded.length ? await this.db.storage.from(this.bucket).remove(uploaded) : { error: null }
      const deleted = await this.db.from("visa_cases").delete().eq("id", row.id)
      if (removed.error || deleted.error) {
        // The applicant is told nothing was saved; staff must clean this up by reference.
        console.error(`[case-store] rollback incomplete for ${row.reference}`, { filesRemoved: !removed.error, caseRemoved: !deleted.error })
      }
      throw err
    }

    await this.addEvent(row.id, "system", "created", { documents: uploaded.length })
    return { id: row.id, reference: row.reference, createdAt: row.created_at, documentCount: uploaded.length, duplicate: false }
  }

  async createContactEnquiry(input: NewContactEnquiry): Promise<StoredContactEnquiry> {
    const { data: row, error } = await this.db
      .from("contact_enquiries")
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        subject: input.subject,
        message: input.message,
        consent: input.consent,
      })
      .select("reference, created_at")
      .single()
    if (error || !row) throw new StoreError(`Could not save enquiry: ${error?.message ?? "no row returned"}`)
    return { reference: row.reference, createdAt: row.created_at }
  }

  // ---------- notifications ----------

  async recordNotification(caseId: string, channel: NotifyChannel, result: NotifyResult, actor: string): Promise<void> {
    const now = new Date().toISOString()
    const update: Record<string, unknown> = {
      [`${channel}_notify_status`]: result.status,
      [`${channel}_notify_error`]: result.status === "sent" ? null : (result.code ?? null),
      updated_at: now,
    }
    if (result.status === "sent") update[`${channel}_notified_at`] = now
    const { error } = await this.db.from("visa_cases").update(update).eq("id", caseId)
    if (error) throw new StoreError(`Could not record notification: ${error.message}`)
    await this.addEvent(caseId, actor, channel === "staff" ? "staff_notification" : "applicant_confirmation", {
      status: result.status,
      ...(result.code ? { code: result.code } : {}),
    })
  }

  async countCasesForEmailSince(email: string, since: Date): Promise<number> {
    const { count, error } = await this.db
      .from("visa_cases")
      .select("id", { count: "exact", head: true })
      .ilike("email", email.trim().replace(/[\\%_]/g, (c) => `\\${c}`))
      .gte("created_at", since.toISOString())
    if (error) throw new StoreError(`Could not count cases: ${error.message}`)
    return count ?? 0
  }

  private async addEvent(caseId: string, actor: string, type: CaseEventType, data: Record<string, unknown>): Promise<void> {
    const { error } = await this.db.from("visa_case_events").insert({ case_id: caseId, actor, type, data })
    // History must never block intake or staff work; a failure is logged for follow-up.
    if (error) console.error(`[case-store] could not record ${type} event`, { caseId, error: error.code ?? "unknown" })
  }

  // ---------- staff dashboard ----------

  async listCases(query: CaseListQuery): Promise<{ items: CaseSummary[]; total: number }> {
    const from = (query.page - 1) * query.pageSize
    let q = this.db
      .from("visa_cases")
      .select(SUMMARY_COLUMNS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, from + query.pageSize - 1)
    if (query.status) q = q.eq("status", query.status)
    if (query.notifyProblem) q = q.in("staff_notify_status", ["failed", "skipped", "pending"])
    const search = sanitiseSearch(query.search)
    if (search) {
      // sanitiseSearch leaves no quotes, commas or parentheses, so the value cannot alter the filter.
      const pattern = `"%${search}%"`
      q = q.or(`reference.ilike.${pattern},full_name.ilike.${pattern},email.ilike.${pattern}`)
    }
    const { data, count, error } = await q
    if (error) throw new StoreError(`Could not list cases: ${error.message}`)
    return { items: ((data ?? []) as CaseRow[]).map(toSummary), total: count ?? 0 }
  }

  private async findCase(reference: string): Promise<{ id: string; status: CaseStatus } | null> {
    if (!isCaseReference(reference)) return null
    const { data, error } = await this.db.from("visa_cases").select("id, status").eq("reference", reference).maybeSingle()
    if (error) throw new StoreError(`Could not load case: ${error.message}`)
    return data ?? null
  }

  async getCase(reference: string): Promise<CaseDetail | null> {
    if (!isCaseReference(reference)) return null
    const { data: row, error } = await this.db
      .from("visa_cases")
      .select(
        `${SUMMARY_COLUMNS}, phone, answers, consent, staff_notified_at, staff_notify_error, applicant_notify_status, applicant_notified_at, applicant_notify_error`
      )
      .eq("reference", reference)
      .maybeSingle()
    if (error) throw new StoreError(`Could not load case: ${error.message}`)
    if (!row) return null

    const [docs, events] = await Promise.all([
      this.db
        .from("visa_case_documents")
        .select("id, slot, original_name, content_type, size_bytes, created_at")
        .eq("case_id", row.id)
        .order("created_at", { ascending: true }),
      this.db.from("visa_case_events").select("id, created_at, actor, type, data").eq("case_id", row.id).order("created_at", { ascending: false }),
    ])
    if (docs.error) throw new StoreError(`Could not load documents: ${docs.error.message}`)
    if (events.error) throw new StoreError(`Could not load case history: ${events.error.message}`)

    return {
      ...toSummary(row as CaseRow),
      phone: row.phone,
      answers: row.answers ?? {},
      consent: row.consent,
      documents: ((docs.data ?? []) as DocumentRow[]).map(toDocument),
      events: ((events.data ?? []) as EventRow[]).map((e) => ({ id: e.id, createdAt: e.created_at, actor: e.actor, type: e.type, data: e.data ?? {} })),
      staffNotifiedAt: row.staff_notified_at,
      staffNotifyError: row.staff_notify_error,
      applicantNotifyStatus: row.applicant_notify_status ?? "pending",
      applicantNotifiedAt: row.applicant_notified_at,
      applicantNotifyError: row.applicant_notify_error,
    }
  }

  async updateStatus(reference: string, status: CaseStatus, actor: string): Promise<{ from: CaseStatus } | null> {
    const found = await this.findCase(reference)
    if (!found) return null
    if (found.status === status) return { from: found.status }
    const { error } = await this.db.from("visa_cases").update({ status, updated_at: new Date().toISOString() }).eq("id", found.id)
    if (error) throw new StoreError(`Could not update status: ${error.message}`)
    await this.addEvent(found.id, actor, "status_changed", { from: found.status, to: status })
    return { from: found.status }
  }

  async addNote(reference: string, note: string, actor: string): Promise<boolean> {
    const found = await this.findCase(reference)
    if (!found) return false
    // Notes are history entries, so they are never overwritten or lost.
    const { error } = await this.db.from("visa_case_events").insert({ case_id: found.id, actor, type: "note_added", data: { note } })
    if (error) throw new StoreError(`Could not save note: ${error.message}`)
    await this.db.from("visa_cases").update({ updated_at: new Date().toISOString() }).eq("id", found.id)
    return true
  }

  async getDocumentAccess(reference: string, documentId: string, ttlSeconds: number, actor: string): Promise<DocumentAccess | null> {
    if (!isUuid(documentId)) return null
    const found = await this.findCase(reference)
    if (!found) return null
    // The document must belong to this case: an id from another case is "not found".
    const { data: doc, error } = await this.db
      .from("visa_case_documents")
      .select("id, slot, original_name, content_type, size_bytes, created_at, storage_path")
      .eq("id", documentId)
      .eq("case_id", found.id)
      .maybeSingle()
    if (error) throw new StoreError(`Could not load document: ${error.message}`)
    if (!doc) return null
    const { data: signed, error: signError } = await this.db.storage.from(this.bucket).createSignedUrl(doc.storage_path, ttlSeconds)
    if (signError || !signed?.signedUrl) throw new StoreError(`Could not create a document link: ${signError?.message ?? "no URL"}`)
    await this.addEvent(found.id, actor, "document_viewed", { documentId: doc.id, slot: doc.slot })
    return { kind: "url", url: signed.signedUrl, document: toDocument(doc as DocumentRow) }
  }

  // ---------- staff authentication ----------

  async findActiveStaff(email: string): Promise<StaffMember | null> {
    const { data, error } = await this.db
      .from("staff_users")
      .select("email, name")
      .eq("email", email.trim().toLowerCase())
      .eq("active", true)
      .maybeSingle()
    if (error) throw new StoreError(`Could not check staff access: ${error.message}`)
    return data ?? null
  }

  async createLoginToken(tokenHash: string, email: string, expiresAt: Date): Promise<void> {
    const { error } = await this.db.from("staff_login_tokens").insert({ token_hash: tokenHash, email, expires_at: expiresAt.toISOString() })
    if (error) throw new StoreError(`Could not create sign-in link: ${error.message}`)
  }

  async consumeLoginToken(tokenHash: string, now: Date): Promise<string | null> {
    // One conditional UPDATE: only an unused, unexpired token matches, so a link works once.
    const { data, error } = await this.db
      .from("staff_login_tokens")
      .update({ used_at: now.toISOString() })
      .eq("token_hash", tokenHash)
      .is("used_at", null)
      .gt("expires_at", now.toISOString())
      .select("email")
      .maybeSingle()
    if (error) throw new StoreError(`Could not use sign-in link: ${error.message}`)
    return data?.email ?? null
  }

  async createSession(tokenHash: string, email: string, expiresAt: Date): Promise<void> {
    const { error } = await this.db.from("staff_sessions").insert({ token_hash: tokenHash, email, expires_at: expiresAt.toISOString() })
    if (error) throw new StoreError(`Could not create session: ${error.message}`)
  }

  async getSessionStaff(tokenHash: string, now: Date): Promise<StaffMember | null> {
    const { data, error } = await this.db
      .from("staff_sessions")
      .select("email")
      .eq("token_hash", tokenHash)
      .is("revoked_at", null)
      .gt("expires_at", now.toISOString())
      .maybeSingle()
    if (error) throw new StoreError(`Could not check session: ${error.message}`)
    if (!data) return null
    // Deactivating a staff member ends their existing sessions immediately.
    return this.findActiveStaff(data.email)
  }

  async revokeSession(tokenHash: string): Promise<void> {
    const { error } = await this.db.from("staff_sessions").update({ revoked_at: new Date().toISOString() }).eq("token_hash", tokenHash)
    if (error) throw new StoreError(`Could not sign out: ${error.message}`)
  }
}
