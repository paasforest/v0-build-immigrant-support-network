/**
 * Option lists for the visa assessment. Values are stored in the case record;
 * labels are shown to the customer and used in staff notifications.
 */

export type Option<V extends string = string> = { value: V; label: string; hint?: string }

function opts<const T extends readonly Option[]>(list: T) {
  return list
}

export const CASE_TYPES = opts([
  { value: "new_application", label: "New visa application", hint: "I'm preparing to apply for a visa" },
  { value: "refusal", label: "My visa was refused", hint: "I want to understand the refusal and my options" },
  { value: "reapplication", label: "I need to re-apply after a refusal", hint: "I want a stronger application next time" },
  { value: "additional_documents", label: "I was asked for additional documents", hint: "The embassy, centre or authority wants more" },
  { value: "verification", label: "I have a verification issue", hint: "My documents or details are being verified" },
  { value: "appointment_problem", label: "I have an appointment / application-centre problem", hint: "Booking, submission or passport-return problems" },
  { value: "complex_case", label: "I have a complex visa situation", hint: "Previous refusals, urgency, family or unusual circumstances" },
  { value: "general_assessment", label: "I'm not sure: assess my situation", hint: "Tell us what's going on and we'll advise on next steps" },
] as const)

export const DESTINATIONS = opts([
  { value: "schengen", label: "Schengen / Europe" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "other", label: "Other country" },
] as const)

export const VISA_TYPES = opts([
  { value: "visitor", label: "Visitor / tourist" },
  { value: "business", label: "Business" },
  { value: "family_visit", label: "Family / friends visit" },
  { value: "study", label: "Study" },
  { value: "work_job_offer", label: "Work: I already have a genuine job offer" },
  { value: "other", label: "Other / not sure" },
] as const)

export const YES_NO = opts([
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const)

export const YES_NO_UNSURE = opts([
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const)

export const APPLICATION_STAGES = opts([
  { value: "not_started", label: "Not started yet" },
  { value: "form_started", label: "I've started the application form" },
  { value: "appointment_booked", label: "I have an appointment booked" },
  { value: "submitted", label: "I've already submitted it" },
] as const)

export const STUDY_ACCEPTANCE = opts([
  { value: "yes", label: "Yes, I have an acceptance / offer letter" },
  { value: "pending", label: "My application to the school is pending" },
  { value: "no", label: "No" },
] as const)

export const REAPPLY_OUTCOMES = opts([
  { value: "approved", label: "Approved" },
  { value: "refused", label: "Refused again" },
  { value: "pending", label: "Still waiting for a decision" },
] as const)

export const APPEAL_STATUS = opts([
  { value: "yes", label: "Yes, an appeal / review was lodged" },
  { value: "no", label: "No" },
  { value: "not_applicable", label: "No appeal or review was available" },
  { value: "unsure", label: "Not sure" },
] as const)

export const REQUESTED_BY = opts([
  { value: "embassy_consulate", label: "Embassy or consulate" },
  { value: "visa_centre", label: "Visa application centre (e.g. VFS, TLScontact, BLS)" },
  { value: "immigration_authority", label: "Immigration authority / online portal" },
  { value: "other", label: "Other / not sure" },
] as const)

export const VERIFICATION_SUBJECTS = opts([
  { value: "financial", label: "Bank or financial documents" },
  { value: "employment", label: "Employment documents" },
  { value: "invitation_sponsor", label: "Invitation, host or sponsor" },
  { value: "identity_biometrics", label: "Identity or biometrics" },
  { value: "travel_history", label: "Travel history" },
  { value: "other_unsure", label: "Other / not sure" },
] as const)

export const APPLICATION_CENTRES = opts([
  { value: "vfs", label: "VFS Global" },
  { value: "tls", label: "TLScontact" },
  { value: "bls", label: "BLS International" },
  { value: "us_appointment_system", label: "US visa appointment system" },
  { value: "canada_vac", label: "Canada visa application centre" },
  { value: "embassy_consulate", label: "Embassy or consulate directly" },
  { value: "other", label: "Other / not sure" },
] as const)

export const APPOINTMENT_PROBLEMS = opts([
  { value: "no_appointments", label: "No appointments available" },
  { value: "booking_payment_error", label: "Booking or payment error" },
  { value: "reschedule", label: "I need to reschedule" },
  { value: "documents_rejected", label: "Documents rejected at the centre" },
  { value: "passport_delay", label: "Passport not returned / delayed" },
  { value: "other", label: "Something else" },
] as const)

export const COMPLEXITY_FLAGS = opts([
  { value: "previous_refusals", label: "Previous visa refusals" },
  { value: "immigration_history", label: "A previous immigration problem (e.g. overstay)" },
  { value: "family_group", label: "Several family members applying together" },
  { value: "urgent_travel", label: "Urgent travel date" },
  { value: "document_inconsistencies", label: "Name, date or document inconsistencies" },
  { value: "other", label: "Something else" },
] as const)

export const STAY_LENGTHS = opts([
  { value: "under_2_weeks", label: "Less than 2 weeks" },
  { value: "2_4_weeks", label: "2 to 4 weeks" },
  { value: "1_3_months", label: "1 to 3 months" },
  { value: "over_3_months", label: "More than 3 months" },
  { value: "unsure", label: "Not sure yet" },
] as const)

export const TRAVELLERS = opts([
  { value: "just_me", label: "Just me" },
  { value: "me_and_family", label: "Me and family members" },
  { value: "someone_else", label: "Someone else (e.g. my child or parent)" },
] as const)

export const PASSPORT_STATUS = opts([
  { value: "valid", label: "Valid for at least 6 months after my planned return" },
  { value: "expiring", label: "Expires sooner than that" },
  { value: "none", label: "I don't have a passport yet" },
] as const)

export const PASSPORT_EXPECTED = opts([
  { value: "within_1_month", label: "Within 1 month" },
  { value: "1_3_months", label: "1 to 3 months" },
  { value: "3_6_months", label: "3 to 6 months" },
  { value: "not_sure", label: "Not sure" },
] as const)

export const RESIDENCE_STATUS = opts([
  { value: "citizen", label: "Citizen" },
  { value: "permanent_resident", label: "Permanent resident" },
  { value: "temporary_permit", label: "Temporary visa / permit holder" },
  { value: "other", label: "Other / not sure" },
] as const)

export const EMPLOYMENT_STATUS = opts([
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-employed / business owner" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
  { value: "unemployed", label: "Not currently working" },
  { value: "other", label: "Other" },
] as const)

export const FUNDING_SOURCES = opts([
  { value: "self", label: "Myself" },
  { value: "family_sponsor", label: "A family member or sponsor" },
  { value: "employer", label: "My employer" },
  { value: "school_scholarship", label: "School or scholarship" },
  { value: "host", label: "The person or organisation I'm visiting" },
  { value: "other", label: "Other / not sure" },
] as const)

export const TRAVEL_REGIONS = opts([
  { value: "schengen", label: "Schengen / Europe" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
] as const)

export const CONTACT_METHODS = opts([
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
  { value: "email", label: "Email" },
] as const)

export const HEARD_FROM = opts([
  { value: "google", label: "Google / search" },
  { value: "social_media", label: "Facebook / social media" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "friend_family", label: "Friend or family" },
  { value: "other", label: "Other" },
] as const)

export function values<T extends readonly Option[]>(list: T) {
  return list.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]]
}

export function labelFor(list: readonly Option[], value: string | undefined | null): string {
  if (!value) return ""
  return list.find((o) => o.value === value)?.label ?? value
}
