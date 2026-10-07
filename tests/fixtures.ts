import { defaultVisaAssessmentValues, type VisaAssessmentValues } from "@/lib/visa-assessment/schema"

/** A complete, valid refusal case. Override fields per test. */
export function refusalCase(overrides: Partial<VisaAssessmentValues> = {}): VisaAssessmentValues {
  return {
    ...defaultVisaAssessmentValues,
    caseType: "refusal",
    destination: "schengen",
    europeCountry: "France",
    visaType: "visitor",
    refusalCountry: "France",
    refusalVisaType: "visitor",
    refusalDate: "2026-03",
    refusalReason: "Purpose of stay not justified",
    hasRefusalLetter: "yes",
    reappliedBefore: "no",
    appealLodged: "no",
    whatHappened: "Applied in February for a family visit and was refused.",
    travelDate: "2027-01",
    stayLength: "under_2_weeks",
    travellers: "just_me",
    passportStatus: "valid",
    nationality: "South Africa",
    residenceCountry: "South Africa",
    residenceStatus: "citizen",
    employmentStatus: "employed",
    fundingSource: "self",
    travelledRecently: "no",
    fullName: "Test Applicant",
    email: "test@example.com",
    phone: "+27 82 000 0000",
    preferredContact: "email",
    consentAccuracy: true,
    consentPrivacy: true,
    consentNoGuarantee: true,
    ...overrides,
  }
}

export const PDF_BYTES = new TextEncoder().encode("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF")
export const PNG_BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0])
