import type { FieldName, VisaAssessmentValues } from "./schema"

/**
 * Keep only the answers that belong to the path the customer actually took.
 * Answers left behind in hidden branches (e.g. after changing the case type) are dropped,
 * so the stored case contains only relevant information.
 */
export function pruneAnswers(v: VisaAssessmentValues): Partial<VisaAssessmentValues> {
  const keep = new Set<FieldName>([
    "caseType", "destination", "visaType",
    "travelDate", "travelDateUnknown", "stayLength", "travellers", "passportStatus", "nationality",
    "residenceCountry", "residenceStatus", "employmentStatus", "fundingSource", "travelledRecently",
    "fullName", "email", "phone", "phoneIsWhatsapp", "preferredContact", "heardFrom", "additionalNotes",
  ])

  if (v.destination === "schengen") keep.add("europeCountry")
  if (v.destination === "other") keep.add("otherCountry")
  if (v.visaType === "other") keep.add("visaTypeOther")
  if (v.visaType === "work_job_offer") {
    keep.add("hasJobOffer")
    if (v.hasJobOffer === "yes") ["employerName", "employerCountry", "employerAuthorisation"].forEach((f) => keep.add(f as FieldName))
  }

  switch (v.caseType) {
    case "new_application":
      keep.add("applicationStage")
      keep.add("purposeDetails")
      if (v.applicationStage === "appointment_booked") keep.add("appointmentDate")
      if (v.visaType === "study") keep.add("studyAcceptance")
      if (v.visaType === "business") keep.add("businessInvitation")
      break
    case "refusal":
    case "reapplication":
      ;["refusalCountry", "refusalVisaType", "refusalDate", "refusalReason", "hasRefusalLetter"].forEach((f) => keep.add(f as FieldName))
      if (v.caseType === "refusal") {
        ;["reappliedBefore", "appealLodged", "whatHappened"].forEach((f) => keep.add(f as FieldName))
        if (v.reappliedBefore === "yes") keep.add("reapplyOutcome")
      } else {
        ;["changesSince", "employmentChanged", "financialChanged", "purposeChanged", "newSupportingDocs"].forEach((f) =>
          keep.add(f as FieldName)
        )
      }
      break
    case "additional_documents":
    case "verification":
      ;["requestedBy", "whatRequested", "dateReceived", "responseDeadline", "problemExplanation"].forEach((f) => keep.add(f as FieldName))
      if (v.caseType === "verification") keep.add("verificationSubject")
      break
    case "appointment_problem":
      ;["applicationCentre", "centreLocation", "appointmentProblem", "currentAppointmentDate", "problemDescription"].forEach((f) =>
        keep.add(f as FieldName)
      )
      break
    case "complex_case":
      keep.add("complexityFlags")
      keep.add("complexDescription")
      break
    case "general_assessment":
      keep.add("generalDescription")
      break
  }

  if (v.travellers === "me_and_family") keep.add("travellerCount")
  if (v.passportStatus === "none") keep.add("passportExpected")
  if (v.travelledRecently === "yes") keep.add("travelledRegions")
  if (v.caseType !== "refusal" && v.caseType !== "reapplication") {
    keep.add("previousRefusal")
    if (v.previousRefusal === "yes") keep.add("previousRefusalCountry")
  }
  if (v.heardFrom === "friend_family") keep.add("referrerName")

  const out: Partial<VisaAssessmentValues> = {}
  for (const key of keep) {
    const value = v[key]
    if (value === "" || (Array.isArray(value) && value.length === 0)) continue
    ;(out as Record<string, unknown>)[key] = value
  }
  return out
}
