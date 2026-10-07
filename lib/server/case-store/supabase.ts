import "server-only"
import { randomUUID } from "node:crypto"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { destinationLabel } from "@/lib/visa-assessment/summary"
import { StoreError, type CaseStore, type NewContactEnquiry, type NewVisaCase, type StoredContactEnquiry, type StoredVisaCase } from "./types"

/**
 * Production store: Postgres tables + a PRIVATE storage bucket in Supabase.
 * Uses the service-role key, which must only ever exist on the server
 * (SUPABASE_SERVICE_ROLE_KEY, never NEXT_PUBLIC_*). Tables have row-level security
 * enabled with no public policies, and the bucket is private, so nothing is
 * readable from the browser. See supabase/migrations for the schema.
 */
export class SupabaseCaseStore implements CaseStore {
  readonly kind = "supabase" as const
  private readonly db: SupabaseClient

  constructor(url: string, serviceRoleKey: string, private readonly bucket: string) {
    this.db = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  async createVisaCase(input: NewVisaCase): Promise<StoredVisaCase> {
    const a = input.answers
    const { data: row, error } = await this.db
      .from("visa_cases")
      .insert({
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
    if (error || !row) throw new StoreError(`Could not create case: ${error?.message ?? "no row returned"}`)

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
      if (uploaded.length) await this.db.storage.from(this.bucket).remove(uploaded)
      await this.db.from("visa_cases").delete().eq("id", row.id)
      throw err
    }

    return { reference: row.reference, createdAt: row.created_at, documentCount: uploaded.length }
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
}
