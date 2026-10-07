import { z } from "zod"
import { COUNTRIES, EUROPE_DESTINATION_COUNTRIES } from "@/lib/countries"
import {
  APPEAL_STATUS,
  APPLICATION_CENTRES,
  APPLICATION_STAGES,
  APPOINTMENT_PROBLEMS,
  CASE_TYPES,
  COMPLEXITY_FLAGS,
  CONTACT_METHODS,
  DESTINATIONS,
  EMPLOYMENT_STATUS,
  FUNDING_SOURCES,
  HEARD_FROM,
  PASSPORT_EXPECTED,
  PASSPORT_STATUS,
  REAPPLY_OUTCOMES,
  REQUESTED_BY,
  RESIDENCE_STATUS,
  STAY_LENGTHS,
  STUDY_ACCEPTANCE,
  TRAVELLERS,
  TRAVEL_REGIONS,
  VERIFICATION_SUBJECTS,
  VISA_TYPES,
  YES_NO,
  YES_NO_UNSURE,
  values,
  type Option,
} from "./options"

/**
 * Visa assessment schema, shared by the browser (step-by-step feedback) and the
 * API route (authoritative validation). Fields are flat so the multi-step form can
 * hold every answer; conditional rules live in superRefine.
 *
 * Deliberately NOT collected at this stage: passport/ID numbers, date of birth,
 * address, bank details, health or criminal-record details, or any portal password.
 */

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`)
const choice = <T extends readonly Option[]>(list: T) => z.union([z.enum(values(list)), z.literal("")])

export const visaAssessmentSchema = z
  .object({
    // Step 1 — what do you need help with?
    caseType: choice(CASE_TYPES),

    // Step 2 — destination & visa type
    destination: choice(DESTINATIONS),
    europeCountry: text(80),
    otherCountry: text(80),
    visaType: choice(VISA_TYPES),
    visaTypeOther: text(200),
    hasJobOffer: choice(YES_NO),
    employerName: text(150),
    employerCountry: text(80),
    employerAuthorisation: choice(YES_NO_UNSURE),

    // Step 3 — case details (conditional on caseType)
    applicationStage: choice(APPLICATION_STAGES),
    appointmentDate: text(10),
    studyAcceptance: choice(STUDY_ACCEPTANCE),
    businessInvitation: choice(YES_NO),
    purposeDetails: text(1000),

    refusalCountry: text(80),
    refusalVisaType: choice(VISA_TYPES),
    refusalDate: text(7),
    refusalReason: text(2000),
    hasRefusalLetter: choice(YES_NO),
    reappliedBefore: choice(YES_NO),
    reapplyOutcome: choice(REAPPLY_OUTCOMES),
    appealLodged: choice(APPEAL_STATUS),
    whatHappened: text(2000),

    changesSince: text(2000),
    employmentChanged: choice(YES_NO),
    financialChanged: choice(YES_NO),
    purposeChanged: choice(YES_NO),
    newSupportingDocs: choice(YES_NO_UNSURE),

    requestedBy: choice(REQUESTED_BY),
    verificationSubject: choice(VERIFICATION_SUBJECTS),
    whatRequested: text(2000),
    dateReceived: text(10),
    responseDeadline: text(10),
    problemExplanation: text(2000),

    applicationCentre: choice(APPLICATION_CENTRES),
    centreLocation: text(80),
    appointmentProblem: choice(APPOINTMENT_PROBLEMS),
    currentAppointmentDate: text(10),
    problemDescription: text(2000),

    complexityFlags: z.array(z.enum(values(COMPLEXITY_FLAGS))).max(COMPLEXITY_FLAGS.length),
    complexDescription: text(3000),

    generalDescription: text(2000),

    // Step 4 — trip & background
    travelDate: text(7),
    travelDateUnknown: z.boolean(),
    stayLength: choice(STAY_LENGTHS),
    travellers: choice(TRAVELLERS),
    travellerCount: text(2),
    passportStatus: choice(PASSPORT_STATUS),
    passportExpected: choice(PASSPORT_EXPECTED),
    nationality: text(80),
    residenceCountry: text(80),
    residenceStatus: choice(RESIDENCE_STATUS),
    employmentStatus: choice(EMPLOYMENT_STATUS),
    fundingSource: choice(FUNDING_SOURCES),
    travelledRecently: choice(YES_NO),
    travelledRegions: z.array(z.enum(values(TRAVEL_REGIONS))).max(TRAVEL_REGIONS.length),
    previousRefusal: choice(YES_NO),
    previousRefusalCountry: text(120),

    // Step 5 — contact & consent
    fullName: text(120),
    email: text(200),
    phone: text(30),
    phoneIsWhatsapp: z.boolean(),
    preferredContact: choice(CONTACT_METHODS),
    heardFrom: choice(HEARD_FROM),
    referrerName: text(120),
    additionalNotes: text(2000),
    consentAccuracy: z.boolean(),
    consentPrivacy: z.boolean(),
    consentNoGuarantee: z.boolean(),
    /** Honeypot: must stay empty (hidden from people, often filled by bots). */
    website: z.string().max(200),
  })
  .superRefine((v, ctx) => {
    const fail = (path: keyof typeof v, message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message })
    const required = (path: keyof typeof v, message: string) => {
      const value = v[path]
      if (value === "" || value === undefined || (Array.isArray(value) && value.length === 0)) fail(path, message)
    }
    const minText = (path: keyof typeof v, min: number, message: string) => {
      const value = v[path]
      if (typeof value === "string" && value.trim().length < min) fail(path, message)
    }

    // Step 1
    required("caseType", "Choose what you need help with")

    // Step 2
    required("destination", "Choose a destination")
    if (v.destination === "schengen") {
      if (!(EUROPE_DESTINATION_COUNTRIES as readonly string[]).includes(v.europeCountry)) {
        fail("europeCountry", "Choose the European country you're travelling to")
      }
    }
    if (v.destination === "other") minText("otherCountry", 2, "Enter the destination country")
    required("visaType", "Choose the purpose of your visa")
    if (v.visaType === "work_job_offer") {
      required("hasJobOffer", "Tell us whether you already have a job offer")
      if (v.hasJobOffer === "no") {
        fail(
          "hasJobOffer",
          "We can only assist with a work visa if you already have a genuine job offer. Choose a different purpose, or describe your situation under \"I'm not sure: assess my situation\"."
        )
      }
      if (v.hasJobOffer === "yes") {
        minText("employerName", 2, "Enter the employer's name")
        minText("employerCountry", 2, "Enter the country where the job is")
        required("employerAuthorisation", "Choose an option")
      }
    }

    // Step 3
    switch (v.caseType) {
      case "new_application":
        required("applicationStage", "Choose how far you are with the application")
        if (v.applicationStage === "appointment_booked" && v.appointmentDate && !isIsoDate(v.appointmentDate)) {
          fail("appointmentDate", "Enter a valid date")
        }
        if (v.visaType === "study") required("studyAcceptance", "Choose an option")
        if (v.visaType === "business") required("businessInvitation", "Choose an option")
        break
      case "refusal":
      case "reapplication":
        minText("refusalCountry", 2, "Enter the country that refused the visa")
        required("refusalVisaType", "Choose the type of visa that was refused")
        if (!isPastMonth(v.refusalDate)) fail("refusalDate", "Enter the month and year of the refusal")
        minText("refusalReason", 5, "Tell us the reason given (as written on the letter, if you have it)")
        required("hasRefusalLetter", "Tell us whether you have the refusal letter")
        if (v.caseType === "refusal") {
          required("reappliedBefore", "Choose an option")
          if (v.reappliedBefore === "yes") required("reapplyOutcome", "Choose the outcome")
          required("appealLodged", "Choose an option")
          minText("whatHappened", 10, "Briefly explain what happened (at least 10 characters)")
        } else {
          minText("changesSince", 10, "Tell us what has changed since the previous application")
          required("employmentChanged", "Choose an option")
          required("financialChanged", "Choose an option")
          required("purposeChanged", "Choose an option")
          required("newSupportingDocs", "Choose an option")
        }
        break
      case "additional_documents":
      case "verification":
        required("requestedBy", "Tell us who sent the request")
        if (v.caseType === "verification") required("verificationSubject", "Choose what is being verified")
        minText("whatRequested", 5, "Tell us what was requested")
        if (!isPastOrTodayDate(v.dateReceived)) fail("dateReceived", "Enter the date you received the request")
        if (v.responseDeadline && !isIsoDate(v.responseDeadline)) fail("responseDeadline", "Enter a valid date")
        minText("problemExplanation", 10, "Briefly explain the situation (at least 10 characters)")
        break
      case "appointment_problem":
        required("applicationCentre", "Choose the centre or authority")
        minText("centreLocation", 2, "Enter the city or location")
        required("appointmentProblem", "Choose the type of problem")
        if (v.currentAppointmentDate && !isIsoDate(v.currentAppointmentDate)) fail("currentAppointmentDate", "Enter a valid date")
        minText("problemDescription", 10, "Describe the problem (at least 10 characters)")
        break
      case "complex_case":
        required("complexityFlags", "Choose at least one option")
        minText("complexDescription", 20, "Briefly describe your situation (at least 20 characters)")
        break
      case "general_assessment":
        minText("generalDescription", 10, "Briefly describe your situation (at least 10 characters)")
        break
    }

    // Step 4
    if (!v.travelDateUnknown && !isMonth(v.travelDate)) fail("travelDate", "Enter your intended travel month, or tick \"Not sure yet\"")
    required("stayLength", "Choose the length of your stay")
    required("travellers", "Tell us who is travelling")
    if (v.travellers === "me_and_family") {
      const n = Number(v.travellerCount)
      if (!Number.isInteger(n) || n < 2 || n > 15) fail("travellerCount", "Enter the total number of travellers (2 to 15)")
    }
    required("passportStatus", "Choose your passport status")
    if (v.passportStatus === "none") required("passportExpected", "Choose when you expect your passport")
    if (!(COUNTRIES as readonly string[]).includes(v.nationality)) fail("nationality", "Choose your nationality")
    if (!(COUNTRIES as readonly string[]).includes(v.residenceCountry)) fail("residenceCountry", "Choose your country of residence")
    required("residenceStatus", "Choose your residence status")
    required("employmentStatus", "Choose your current status")
    required("fundingSource", "Tell us who is paying for the trip")
    required("travelledRecently", "Choose an option")
    if (v.travelledRecently === "yes") required("travelledRegions", "Choose where you travelled")
    if (v.caseType !== "refusal" && v.caseType !== "reapplication") {
      required("previousRefusal", "Choose an option")
      if (v.previousRefusal === "yes") minText("previousRefusalCountry", 2, "Which country or countries refused the visa?")
    }

    // Step 5
    minText("fullName", 2, "Enter your full name")
    if (!z.string().email().safeParse(v.email).success) fail("email", "Enter a valid email address")
    if (!/^\+?[0-9 ()-]{7,25}$/.test(v.phone) || v.phone.replace(/\D/g, "").length < 7) {
      fail("phone", "Enter a valid phone number, including the country code")
    }
    required("preferredContact", "Choose how you'd like us to contact you")
    if (!v.consentAccuracy) fail("consentAccuracy", "Please confirm this to submit")
    if (!v.consentPrivacy) fail("consentPrivacy", "Please give consent to submit")
    if (!v.consentNoGuarantee) fail("consentNoGuarantee", "Please confirm this to submit")
  })

export type VisaAssessmentValues = z.infer<typeof visaAssessmentSchema>

export const defaultVisaAssessmentValues: VisaAssessmentValues = {
  caseType: "",
  destination: "",
  europeCountry: "",
  otherCountry: "",
  visaType: "",
  visaTypeOther: "",
  hasJobOffer: "",
  employerName: "",
  employerCountry: "",
  employerAuthorisation: "",
  applicationStage: "",
  appointmentDate: "",
  studyAcceptance: "",
  businessInvitation: "",
  purposeDetails: "",
  refusalCountry: "",
  refusalVisaType: "",
  refusalDate: "",
  refusalReason: "",
  hasRefusalLetter: "",
  reappliedBefore: "",
  reapplyOutcome: "",
  appealLodged: "",
  whatHappened: "",
  changesSince: "",
  employmentChanged: "",
  financialChanged: "",
  purposeChanged: "",
  newSupportingDocs: "",
  requestedBy: "",
  verificationSubject: "",
  whatRequested: "",
  dateReceived: "",
  responseDeadline: "",
  problemExplanation: "",
  applicationCentre: "",
  centreLocation: "",
  appointmentProblem: "",
  currentAppointmentDate: "",
  problemDescription: "",
  complexityFlags: [],
  complexDescription: "",
  generalDescription: "",
  travelDate: "",
  travelDateUnknown: false,
  stayLength: "",
  travellers: "",
  travellerCount: "",
  passportStatus: "",
  passportExpected: "",
  nationality: "",
  residenceCountry: "",
  residenceStatus: "",
  employmentStatus: "",
  fundingSource: "",
  travelledRecently: "",
  travelledRegions: [],
  previousRefusal: "",
  previousRefusalCountry: "",
  fullName: "",
  email: "",
  phone: "",
  phoneIsWhatsapp: true,
  preferredContact: "",
  heardFrom: "",
  referrerName: "",
  additionalNotes: "",
  consentAccuracy: false,
  consentPrivacy: false,
  consentNoGuarantee: false,
  website: "",
}

export type FieldName = keyof VisaAssessmentValues

/** Fields owned by each wizard step, used to show only that step's errors. */
export const STEP_FIELDS: FieldName[][] = [
  ["caseType"],
  ["destination", "europeCountry", "otherCountry", "visaType", "visaTypeOther", "hasJobOffer", "employerName", "employerCountry", "employerAuthorisation"],
  [
    "applicationStage", "appointmentDate", "studyAcceptance", "businessInvitation", "purposeDetails",
    "refusalCountry", "refusalVisaType", "refusalDate", "refusalReason", "hasRefusalLetter", "reappliedBefore",
    "reapplyOutcome", "appealLodged", "whatHappened", "changesSince", "employmentChanged", "financialChanged",
    "purposeChanged", "newSupportingDocs", "requestedBy", "verificationSubject", "whatRequested", "dateReceived",
    "responseDeadline", "problemExplanation", "applicationCentre", "centreLocation", "appointmentProblem",
    "currentAppointmentDate", "problemDescription", "complexityFlags", "complexDescription", "generalDescription",
  ],
  [
    "travelDate", "travelDateUnknown", "stayLength", "travellers", "travellerCount", "passportStatus",
    "passportExpected", "nationality", "residenceCountry", "residenceStatus", "employmentStatus", "fundingSource",
    "travelledRecently", "travelledRegions", "previousRefusal", "previousRefusalCountry",
  ],
  [
    "fullName", "email", "phone", "phoneIsWhatsapp", "preferredContact", "heardFrom", "referrerName",
    "additionalNotes", "consentAccuracy", "consentPrivacy", "consentNoGuarantee", "website",
  ],
]

export const STEP_TITLES = [
  "What do you need help with?",
  "Destination and visa type",
  "About your case",
  "Your trip and background",
  "Contact details and consent",
] as const

/** Validate the whole form and return only the errors that belong to the given steps. */
export function validateSteps(values: VisaAssessmentValues, steps: number[]): Record<string, string> {
  const result = visaAssessmentSchema.safeParse(values)
  if (result.success) return {}
  const allowed = new Set(steps.flatMap((s) => STEP_FIELDS[s]))
  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "")
    if (allowed.has(key as FieldName) && !errors[key]) errors[key] = issue.message
  }
  return errors
}

// ---------- uploads ----------

export type UploadSlot = "caseDocument" | "jobOffer"

/** Which optional document uploads apply to the current answers, and how to label them. */
export function uploadSlotsFor(v: Pick<VisaAssessmentValues, "caseType" | "hasRefusalLetter" | "visaType" | "hasJobOffer">) {
  const slots: { slot: UploadSlot; label: string; help: string }[] = []
  if ((v.caseType === "refusal" || v.caseType === "reapplication") && v.hasRefusalLetter === "yes") {
    slots.push({ slot: "caseDocument", label: "Upload the refusal letter (optional, recommended)", help: "A clear PDF or photo of the refusal letter or form." })
  }
  if (v.caseType === "additional_documents" || v.caseType === "verification") {
    slots.push({ slot: "caseDocument", label: "Upload the request or letter you received (optional, recommended)", help: "The email, letter or portal message asking for documents or verification." })
  }
  if (v.caseType === "appointment_problem") {
    slots.push({ slot: "caseDocument", label: "Upload relevant correspondence or a screenshot (optional)", help: "For example a booking error, rejection notice or appointment confirmation." })
  }
  if (v.visaType === "work_job_offer" && v.hasJobOffer === "yes") {
    slots.push({ slot: "jobOffer", label: "Upload the job offer or contract (optional)", help: "The offer or contract from your employer." })
  }
  return slots
}

/** Vercel functions accept request bodies up to 4.5 MB, so keep uploads (combined) below that. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
export const ACCEPTED_UPLOAD_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const
export const ACCEPTED_UPLOAD_EXTENSIONS = ".pdf,.jpg,.jpeg,.png"

// ---------- date helpers ----------

function isIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const d = new Date(`${s}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s
}

function isMonth(s: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(s)
}

function isPastOrTodayDate(s: string): boolean {
  if (!isIsoDate(s)) return false
  const tomorrow = new Date()
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
  return new Date(`${s}T00:00:00Z`) <= tomorrow
}

function isPastMonth(s: string): boolean {
  if (!isMonth(s)) return false
  const now = new Date()
  const current = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`
  return s <= current && s >= "1990-01"
}
