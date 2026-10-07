import {
  APPEAL_STATUS, APPLICATION_CENTRES, APPLICATION_STAGES, APPOINTMENT_PROBLEMS, CASE_TYPES, COMPLEXITY_FLAGS,
  CONTACT_METHODS, DESTINATIONS, EMPLOYMENT_STATUS, FUNDING_SOURCES, HEARD_FROM, PASSPORT_EXPECTED, PASSPORT_STATUS,
  REAPPLY_OUTCOMES, REQUESTED_BY, RESIDENCE_STATUS, STAY_LENGTHS, STUDY_ACCEPTANCE, TRAVELLERS, TRAVEL_REGIONS,
  VERIFICATION_SUBJECTS, VISA_TYPES, YES_NO, YES_NO_UNSURE, labelFor, type Option,
} from "./options"
import type { VisaAssessmentValues } from "./schema"

type Row = [label: string, field: keyof VisaAssessmentValues, list?: readonly Option[]]

const ROWS: Row[] = [
  ["Case type", "caseType", CASE_TYPES],
  ["Destination", "destination", DESTINATIONS],
  ["European country", "europeCountry"],
  ["Destination country", "otherCountry"],
  ["Visa purpose", "visaType", VISA_TYPES],
  ["Visa purpose (details)", "visaTypeOther"],
  ["Has a genuine job offer", "hasJobOffer", YES_NO],
  ["Employer", "employerName"],
  ["Employer country", "employerCountry"],
  ["Employer authorisation obtained", "employerAuthorisation", YES_NO_UNSURE],
  ["Application stage", "applicationStage", APPLICATION_STAGES],
  ["Appointment date", "appointmentDate"],
  ["Study acceptance", "studyAcceptance", STUDY_ACCEPTANCE],
  ["Business invitation", "businessInvitation", YES_NO],
  ["Purpose details", "purposeDetails"],
  ["Refusing country", "refusalCountry"],
  ["Refused visa type", "refusalVisaType", VISA_TYPES],
  ["Refusal date (month)", "refusalDate"],
  ["Reason given", "refusalReason"],
  ["Has refusal letter", "hasRefusalLetter", YES_NO],
  ["Re-applied since", "reappliedBefore", YES_NO],
  ["Re-application outcome", "reapplyOutcome", REAPPLY_OUTCOMES],
  ["Appeal / review lodged", "appealLodged", APPEAL_STATUS],
  ["What happened", "whatHappened"],
  ["What has changed", "changesSince"],
  ["Employment changed", "employmentChanged", YES_NO],
  ["Financial circumstances changed", "financialChanged", YES_NO],
  ["Travel purpose changed", "purposeChanged", YES_NO],
  ["New supporting documents", "newSupportingDocs", YES_NO_UNSURE],
  ["Requested by", "requestedBy", REQUESTED_BY],
  ["Being verified", "verificationSubject", VERIFICATION_SUBJECTS],
  ["What was requested", "whatRequested"],
  ["Date received", "dateReceived"],
  ["Response deadline", "responseDeadline"],
  ["Explanation", "problemExplanation"],
  ["Application centre", "applicationCentre", APPLICATION_CENTRES],
  ["Centre location", "centreLocation"],
  ["Problem type", "appointmentProblem", APPOINTMENT_PROBLEMS],
  ["Current appointment date", "currentAppointmentDate"],
  ["Problem description", "problemDescription"],
  ["Complexity", "complexityFlags", COMPLEXITY_FLAGS],
  ["Situation", "complexDescription"],
  ["Situation", "generalDescription"],
  ["Intended travel (month)", "travelDate"],
  ["Length of stay", "stayLength", STAY_LENGTHS],
  ["Travellers", "travellers", TRAVELLERS],
  ["Number of travellers", "travellerCount"],
  ["Passport", "passportStatus", PASSPORT_STATUS],
  ["Passport expected", "passportExpected", PASSPORT_EXPECTED],
  ["Nationality", "nationality"],
  ["Country of residence", "residenceCountry"],
  ["Residence status", "residenceStatus", RESIDENCE_STATUS],
  ["Employment status", "employmentStatus", EMPLOYMENT_STATUS],
  ["Trip paid by", "fundingSource", FUNDING_SOURCES],
  ["Travelled to Schengen/UK/USA/Canada in last 10 years", "travelledRecently", YES_NO],
  ["Travelled to", "travelledRegions", TRAVEL_REGIONS],
  ["Previous refusal", "previousRefusal", YES_NO],
  ["Previous refusal country", "previousRefusalCountry"],
  ["Name", "fullName"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Phone is on WhatsApp", "phoneIsWhatsapp"],
  ["Preferred contact", "preferredContact", CONTACT_METHODS],
  ["Heard about us via", "heardFrom", HEARD_FROM],
  ["Referred by", "referrerName"],
  ["Additional notes", "additionalNotes"],
]

/** Human-readable label/value pairs for a (pruned) case, used in staff notifications. */
export function summariseCase(answers: Partial<VisaAssessmentValues>): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = []
  for (const [label, field, list] of ROWS) {
    const raw = answers[field]
    if (raw === undefined || raw === "" || (Array.isArray(raw) && raw.length === 0)) continue
    let value: string
    if (field === "travelDate" && answers.travelDateUnknown) value = "Not sure yet"
    else if (typeof raw === "boolean") value = raw ? "Yes" : "No"
    else if (Array.isArray(raw)) value = raw.map((r) => (list ? labelFor(list, r) : r)).join(", ")
    else value = list ? labelFor(list, raw) : raw
    out.push({ label, value })
  }
  if (answers.travelDateUnknown && !answers.travelDate) out.push({ label: "Intended travel (month)", value: "Not sure yet" })
  return out
}

export function destinationLabel(answers: Partial<VisaAssessmentValues>): string {
  if (answers.destination === "schengen") return answers.europeCountry || "Schengen / Europe"
  if (answers.destination === "other") return answers.otherCountry || "Other"
  return labelFor(DESTINATIONS, answers.destination)
}
