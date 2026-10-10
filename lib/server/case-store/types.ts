import type { VisaAssessmentValues } from "@/lib/visa-assessment/schema"
import type { ValidatedUpload } from "@/lib/server/uploads"

export type ConsentRecord = {
  /** Version of the consent wording shown, so we know exactly what was agreed to */
  version: string
  accuracy: boolean
  privacy: boolean
  noGuarantee: boolean
  acceptedAt: string
}

export type NewVisaCase = {
  answers: Partial<VisaAssessmentValues>
  consent: ConsentRecord
  documents: ValidatedUpload[]
  /** Generated once per form session in the browser; a retry returns the existing case. */
  submissionId?: string
}

export type StoredVisaCase = {
  id: string
  reference: string
  createdAt: string
  documentCount: number
  /** True when this submission was already stored: nothing new was created. */
  duplicate: boolean
}

export type NewContactEnquiry = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consent: { version: string; privacy: boolean; acceptedAt: string }
}

export type StoredContactEnquiry = {
  reference: string
  createdAt: string
}

// ---------- lead management ----------

export const CASE_STATUSES = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "client", label: "Client" },
  { value: "closed", label: "Closed" },
] as const
export type CaseStatus = (typeof CASE_STATUSES)[number]["value"]
export const isCaseStatus = (value: unknown): value is CaseStatus => CASE_STATUSES.some((s) => s.value === value)

export type NotifyStatus = "pending" | "sent" | "failed" | "skipped"
/** Outcome of one email attempt. `code` is a short machine code, never a message body. */
export type NotifyResult = { status: Exclude<NotifyStatus, "pending">; code?: string }
export type NotifyChannel = "staff" | "applicant"

export type CaseEventType =
  | "created"
  | "duplicate_submission"
  | "staff_notification"
  | "applicant_confirmation"
  | "status_changed"
  | "note_added"
  | "document_viewed"

export type CaseEvent = {
  id: string
  createdAt: string
  /** "system" or the staff member's email address */
  actor: string
  type: CaseEventType
  data: Record<string, unknown>
}

export type CaseSummary = {
  id: string
  reference: string
  createdAt: string
  status: CaseStatus
  caseType: string
  destination: string
  visaType: string
  fullName: string
  email: string
  staffNotifyStatus: NotifyStatus
}

export type CaseDocument = {
  id: string
  slot: string
  originalName: string | null
  contentType: string
  sizeBytes: number
  createdAt: string
}

export type CaseDetail = CaseSummary & {
  phone: string
  answers: Partial<VisaAssessmentValues>
  consent: ConsentRecord
  documents: CaseDocument[]
  events: CaseEvent[]
  staffNotifiedAt: string | null
  staffNotifyError: string | null
  applicantNotifyStatus: NotifyStatus
  applicantNotifiedAt: string | null
  applicantNotifyError: string | null
}

export type CaseListQuery = {
  /** Free-text search over reference, name and email (sanitised by the store). */
  search?: string
  status?: CaseStatus
  /** Only cases whose staff notification has not been delivered. */
  notifyProblem?: boolean
  page: number
  pageSize: number
}

export type DocumentAccess =
  /** A short-lived signed URL to private storage. */
  | { kind: "url"; url: string; document: CaseDocument }
  /** Local development only: the file bytes. */
  | { kind: "bytes"; bytes: Uint8Array; document: CaseDocument }

export type StaffMember = { email: string; name: string }

// ---------- store interface ----------

export interface CaseStore {
  readonly kind: "supabase" | "local"
  createVisaCase(input: NewVisaCase): Promise<StoredVisaCase>
  createContactEnquiry(input: NewContactEnquiry): Promise<StoredContactEnquiry>

  /** Record the outcome of a notification email on the case, plus a history entry. */
  recordNotification(caseId: string, channel: NotifyChannel, result: NotifyResult, actor: string): Promise<void>
  /** Cases created for this email address since the given time (abuse control for confirmations). */
  countCasesForEmailSince(email: string, since: Date): Promise<number>

  listCases(query: CaseListQuery): Promise<{ items: CaseSummary[]; total: number }>
  getCase(reference: string): Promise<CaseDetail | null>
  /** Returns the previous status, or null when the case does not exist. */
  updateStatus(reference: string, status: CaseStatus, actor: string): Promise<{ from: CaseStatus } | null>
  addNote(reference: string, note: string, actor: string): Promise<boolean>
  /** Access to one document of one case. The caller must already have authorised the staff member. */
  getDocumentAccess(reference: string, documentId: string, ttlSeconds: number, actor: string): Promise<DocumentAccess | null>

  // Staff authentication (tokens arrive already hashed)
  findActiveStaff(email: string): Promise<StaffMember | null>
  createLoginToken(tokenHash: string, email: string, expiresAt: Date): Promise<void>
  /** Marks the token used and returns its email, only if it is unused and unexpired. Single use. */
  consumeLoginToken(tokenHash: string, now: Date): Promise<string | null>
  createSession(tokenHash: string, email: string, expiresAt: Date): Promise<void>
  /** The staff member for a live, unrevoked session whose staff record is still active. */
  getSessionStaff(tokenHash: string, now: Date): Promise<StaffMember | null>
  revokeSession(tokenHash: string): Promise<void>
}

export class StoreError extends Error {}

/** Case references are ISN-YYYY-NNNNNN; anything else is rejected before reaching storage. */
export const isCaseReference = (value: string) => /^ISN-\d{4}-\d{6}$/.test(value)
export const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

/**
 * Reduce free-text search to characters that are safe inside a PostgREST filter and
 * meaningful for references, names and email addresses.
 */
export function sanitiseSearch(value: string | undefined): string {
  return (value ?? "")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}@.\-_' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100)
}
