import "server-only"
import { promises as fs } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import { destinationLabel } from "@/lib/visa-assessment/summary"
import {
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
  type ConsentRecord,
  type DocumentAccess,
  type NewContactEnquiry,
  type NewVisaCase,
  type NotifyChannel,
  type NotifyResult,
  type NotifyStatus,
  type StaffMember,
  type StoredContactEnquiry,
  type StoredVisaCase,
} from "./types"

type LocalDocument = CaseDocument & { storagePath: string }

type LocalCase = {
  id: string
  reference: string
  submissionId: string | null
  createdAt: string
  updatedAt: string
  status: CaseStatus
  answers: NewVisaCase["answers"]
  consent: ConsentRecord
  documents: LocalDocument[]
  events: CaseEvent[]
  staffNotifyStatus: NotifyStatus
  staffNotifiedAt: string | null
  staffNotifyError: string | null
  applicantNotifyStatus: NotifyStatus
  applicantNotifiedAt: string | null
  applicantNotifyError: string | null
}

type LocalToken = { email: string; expiresAt: string; usedAt: string | null }
type LocalSession = { email: string; expiresAt: string; revokedAt: string | null }
type LocalStaff = { email: string; name: string; active: boolean }

/**
 * File-system store for local development and automated tests only.
 * Data lives outside the public web directory (default ./.data, git-ignored).
 * Never selected in production unless CASE_STORE=local is set explicitly.
 *
 * Staff for local sign-in are listed in <root>/staff/users.json:
 *   [{ "email": "you@example.org", "name": "You", "active": true }]
 */
export class LocalCaseStore implements CaseStore {
  readonly kind = "local" as const
  private queue: Promise<unknown> = Promise.resolve()

  constructor(private readonly root: string) {}

  /** Serialise writes so reference numbers stay unique and updates do not interleave. */
  private exclusive<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn)
    this.queue = run.catch(() => undefined)
    return run
  }

  private file(...parts: string[]) {
    return path.join(this.root, ...parts)
  }

  private async readJson<T>(file: string): Promise<T | null> {
    try {
      return JSON.parse(await fs.readFile(file, "utf8")) as T
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return null
      throw err
    }
  }

  private async writeJson(file: string, value: unknown) {
    await fs.mkdir(path.dirname(file), { recursive: true })
    const tmp = `${file}.${randomUUID()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(value, null, 2))
    await fs.rename(tmp, file)
  }

  private async nextNumber(counterName: string, year: string): Promise<number> {
    const file = this.file("counters", `${counterName}-${year}.txt`)
    await fs.mkdir(path.dirname(file), { recursive: true })
    const current = Number(await fs.readFile(file, "utf8").catch(() => "0")) || 0
    const next = current + 1
    await fs.writeFile(file, String(next))
    return next
  }

  private event(actor: string, type: CaseEventType, data: Record<string, unknown> = {}): CaseEvent {
    return { id: randomUUID(), createdAt: new Date().toISOString(), actor, type, data }
  }

  private caseFile(reference: string) {
    return this.file("cases", `${reference}.json`)
  }

  private async loadCase(reference: string): Promise<LocalCase | null> {
    if (!isCaseReference(reference)) return null
    return this.readJson<LocalCase>(this.caseFile(reference))
  }

  private async allCases(): Promise<LocalCase[]> {
    const dir = this.file("cases")
    const names = await fs.readdir(dir).catch(() => [] as string[])
    const cases = await Promise.all(names.filter((n) => n.endsWith(".json")).map((n) => this.readJson<LocalCase>(path.join(dir, n))))
    return cases.filter((c): c is LocalCase => c !== null && typeof c.id === "string")
  }

  private async findById(caseId: string): Promise<LocalCase | null> {
    return (await this.allCases()).find((c) => c.id === caseId) ?? null
  }

  // ---------- intake ----------

  createVisaCase(input: NewVisaCase): Promise<StoredVisaCase> {
    return this.exclusive(async () => {
      if (input.submissionId) {
        const ref = await fs.readFile(this.file("submissions", `${input.submissionId}.txt`), "utf8").catch(() => null)
        const existing = ref ? await this.loadCase(ref) : null
        if (existing) {
          existing.events.push(this.event("system", "duplicate_submission"))
          await this.writeJson(this.caseFile(existing.reference), existing)
          return { id: existing.id, reference: existing.reference, createdAt: existing.createdAt, documentCount: existing.documents.length, duplicate: true }
        }
      }

      const now = new Date()
      const year = String(now.getFullYear())
      const reference = `ISN-${year}-${String(await this.nextNumber("case", year)).padStart(6, "0")}`
      const uploadDir = this.file("uploads", reference)
      const documents: LocalDocument[] = []
      for (const doc of input.documents) {
        await fs.mkdir(uploadDir, { recursive: true })
        const storagePath = path.join(uploadDir, `${doc.slot}-${randomUUID()}.${doc.extension}`)
        await fs.writeFile(storagePath, doc.bytes)
        documents.push({
          id: randomUUID(),
          slot: doc.slot,
          storagePath: path.relative(this.root, storagePath),
          originalName: doc.originalName,
          contentType: doc.contentType,
          sizeBytes: doc.size,
          createdAt: now.toISOString(),
        })
      }
      const record: LocalCase = {
        id: randomUUID(),
        reference,
        submissionId: input.submissionId ?? null,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        status: "new",
        answers: input.answers,
        consent: input.consent,
        documents,
        events: [this.event("system", "created", { documents: documents.length })],
        staffNotifyStatus: "pending",
        staffNotifiedAt: null,
        staffNotifyError: null,
        applicantNotifyStatus: "pending",
        applicantNotifiedAt: null,
        applicantNotifyError: null,
      }
      await this.writeJson(this.caseFile(reference), record)
      if (input.submissionId) {
        await fs.mkdir(this.file("submissions"), { recursive: true })
        await fs.writeFile(this.file("submissions", `${input.submissionId}.txt`), reference)
      }
      return { id: record.id, reference, createdAt: record.createdAt, documentCount: documents.length, duplicate: false }
    })
  }

  createContactEnquiry(input: NewContactEnquiry): Promise<StoredContactEnquiry> {
    return this.exclusive(async () => {
      const now = new Date()
      const year = String(now.getFullYear())
      const reference = `ISN-MSG-${year}-${String(await this.nextNumber("contact", year)).padStart(6, "0")}`
      await this.writeJson(this.file("contact", `${reference}.json`), { reference, createdAt: now.toISOString(), status: "new", ...input })
      return { reference, createdAt: now.toISOString() }
    })
  }

  // ---------- notifications ----------

  recordNotification(caseId: string, channel: NotifyChannel, result: NotifyResult, actor: string): Promise<void> {
    return this.exclusive(async () => {
      const c = await this.findById(caseId)
      if (!c) throw new Error(`Unknown case ${caseId}`)
      const now = new Date().toISOString()
      if (channel === "staff") {
        c.staffNotifyStatus = result.status
        c.staffNotifyError = result.status === "sent" ? null : (result.code ?? null)
        if (result.status === "sent") c.staffNotifiedAt = now
      } else {
        c.applicantNotifyStatus = result.status
        c.applicantNotifyError = result.status === "sent" ? null : (result.code ?? null)
        if (result.status === "sent") c.applicantNotifiedAt = now
      }
      c.updatedAt = now
      c.events.push(
        this.event(actor, channel === "staff" ? "staff_notification" : "applicant_confirmation", {
          status: result.status,
          ...(result.code ? { code: result.code } : {}),
        })
      )
      await this.writeJson(this.caseFile(c.reference), c)
    })
  }

  async countCasesForEmailSince(email: string, since: Date): Promise<number> {
    const target = email.trim().toLowerCase()
    return (await this.allCases()).filter((c) => (c.answers.email ?? "").toLowerCase() === target && new Date(c.createdAt) >= since).length
  }

  // ---------- staff dashboard ----------

  private summary(c: LocalCase): CaseSummary {
    return {
      id: c.id,
      reference: c.reference,
      createdAt: c.createdAt,
      status: c.status,
      caseType: c.answers.caseType ?? "",
      destination: destinationLabel(c.answers),
      visaType: c.answers.visaType ?? "",
      fullName: c.answers.fullName ?? "",
      email: c.answers.email ?? "",
      staffNotifyStatus: c.staffNotifyStatus ?? "pending",
    }
  }

  async listCases(query: CaseListQuery): Promise<{ items: CaseSummary[]; total: number }> {
    const search = sanitiseSearch(query.search).toLowerCase()
    const matches = (await this.allCases())
      .filter((c) => !query.status || c.status === query.status)
      .filter((c) => !query.notifyProblem || c.staffNotifyStatus !== "sent")
      .filter(
        (c) =>
          !search ||
          [c.reference, c.answers.fullName ?? "", c.answers.email ?? ""].some((field) => field.toLowerCase().includes(search))
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    const from = (query.page - 1) * query.pageSize
    return { items: matches.slice(from, from + query.pageSize).map((c) => this.summary(c)), total: matches.length }
  }

  async getCase(reference: string): Promise<CaseDetail | null> {
    const c = await this.loadCase(reference)
    if (!c) return null
    return {
      ...this.summary(c),
      phone: c.answers.phone ?? "",
      answers: c.answers,
      consent: c.consent,
      documents: c.documents.map(({ storagePath: _hidden, ...doc }) => doc),
      events: [...c.events].reverse(),
      staffNotifiedAt: c.staffNotifiedAt,
      staffNotifyError: c.staffNotifyError,
      applicantNotifyStatus: c.applicantNotifyStatus ?? "pending",
      applicantNotifiedAt: c.applicantNotifiedAt,
      applicantNotifyError: c.applicantNotifyError,
    }
  }

  updateStatus(reference: string, status: CaseStatus, actor: string): Promise<{ from: CaseStatus } | null> {
    return this.exclusive(async () => {
      const c = await this.loadCase(reference)
      if (!c) return null
      const from = c.status
      if (from !== status) {
        c.status = status
        c.updatedAt = new Date().toISOString()
        c.events.push(this.event(actor, "status_changed", { from, to: status }))
        await this.writeJson(this.caseFile(reference), c)
      }
      return { from }
    })
  }

  addNote(reference: string, note: string, actor: string): Promise<boolean> {
    return this.exclusive(async () => {
      const c = await this.loadCase(reference)
      if (!c) return false
      c.events.push(this.event(actor, "note_added", { note }))
      c.updatedAt = new Date().toISOString()
      await this.writeJson(this.caseFile(reference), c)
      return true
    })
  }

  getDocumentAccess(reference: string, documentId: string, _ttlSeconds: number, actor: string): Promise<DocumentAccess | null> {
    return this.exclusive(async () => {
      if (!isUuid(documentId)) return null
      const c = await this.loadCase(reference)
      const doc = c?.documents.find((d) => d.id === documentId)
      if (!c || !doc) return null
      const full = path.resolve(this.root, doc.storagePath)
      // Never follow a stored path outside the store directory.
      if (!full.startsWith(path.resolve(this.root) + path.sep)) return null
      const bytes = new Uint8Array(await fs.readFile(full))
      c.events.push(this.event(actor, "document_viewed", { documentId: doc.id, slot: doc.slot }))
      await this.writeJson(this.caseFile(reference), c)
      const { storagePath: _hidden, ...document } = doc
      return { kind: "bytes", bytes, document }
    })
  }

  // ---------- staff authentication ----------

  async findActiveStaff(email: string): Promise<StaffMember | null> {
    const staff = (await this.readJson<LocalStaff[]>(this.file("staff", "users.json"))) ?? []
    const wanted = email.trim().toLowerCase()
    const found = staff.find((s) => s.email.toLowerCase() === wanted && s.active !== false)
    return found ? { email: found.email.toLowerCase(), name: found.name } : null
  }

  async createLoginToken(tokenHash: string, email: string, expiresAt: Date): Promise<void> {
    await this.writeJson(this.file("staff", "tokens", `${tokenHash}.json`), { email, expiresAt: expiresAt.toISOString(), usedAt: null })
  }

  consumeLoginToken(tokenHash: string, now: Date): Promise<string | null> {
    return this.exclusive(async () => {
      if (!/^[0-9a-f]{64}$/.test(tokenHash)) return null
      const file = this.file("staff", "tokens", `${tokenHash}.json`)
      const token = await this.readJson<LocalToken>(file)
      if (!token || token.usedAt || new Date(token.expiresAt) <= now) return null
      await this.writeJson(file, { ...token, usedAt: now.toISOString() })
      return token.email
    })
  }

  async createSession(tokenHash: string, email: string, expiresAt: Date): Promise<void> {
    await this.writeJson(this.file("staff", "sessions", `${tokenHash}.json`), { email, expiresAt: expiresAt.toISOString(), revokedAt: null })
  }

  async getSessionStaff(tokenHash: string, now: Date): Promise<StaffMember | null> {
    if (!/^[0-9a-f]{64}$/.test(tokenHash)) return null
    const session = await this.readJson<LocalSession>(this.file("staff", "sessions", `${tokenHash}.json`))
    if (!session || session.revokedAt || new Date(session.expiresAt) <= now) return null
    return this.findActiveStaff(session.email)
  }

  async revokeSession(tokenHash: string): Promise<void> {
    if (!/^[0-9a-f]{64}$/.test(tokenHash)) return
    const file = this.file("staff", "sessions", `${tokenHash}.json`)
    const session = await this.readJson<LocalSession>(file)
    if (session) await this.writeJson(file, { ...session, revokedAt: new Date().toISOString() })
  }
}
