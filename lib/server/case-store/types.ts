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
}

export type StoredVisaCase = {
  reference: string
  createdAt: string
  documentCount: number
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

export interface CaseStore {
  readonly kind: "supabase" | "local"
  createVisaCase(input: NewVisaCase): Promise<StoredVisaCase>
  createContactEnquiry(input: NewContactEnquiry): Promise<StoredContactEnquiry>
}

export class StoreError extends Error {}
