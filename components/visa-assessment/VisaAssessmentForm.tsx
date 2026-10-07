"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import {
  APPEAL_STATUS, APPLICATION_CENTRES, APPLICATION_STAGES, APPOINTMENT_PROBLEMS, CASE_TYPES, COMPLEXITY_FLAGS,
  CONTACT_METHODS, DESTINATIONS, EMPLOYMENT_STATUS, FUNDING_SOURCES, HEARD_FROM, PASSPORT_EXPECTED, PASSPORT_STATUS,
  REAPPLY_OUTCOMES, REQUESTED_BY, RESIDENCE_STATUS, STAY_LENGTHS, STUDY_ACCEPTANCE, TRAVELLERS, TRAVEL_REGIONS,
  VERIFICATION_SUBJECTS, VISA_TYPES, YES_NO, YES_NO_UNSURE, labelFor,
} from "@/lib/visa-assessment/options"
import {
  MAX_UPLOAD_BYTES, STEP_FIELDS, STEP_TITLES, defaultVisaAssessmentValues, uploadSlotsFor, validateSteps,
  type UploadSlot, type VisaAssessmentValues,
} from "@/lib/visa-assessment/schema"
import { COUNTRIES, NON_SCHENGEN_EU_COUNTRIES, SCHENGEN_COUNTRIES } from "@/lib/countries"
import { whatsappLink } from "@/lib/site-config"
import {
  CheckboxCards, CheckboxField, FileField, MonthYearField, RadioCards, SelectField, TextAreaField, TextField, formatBytes,
} from "./fields"
import AssessmentConfirmation from "./AssessmentConfirmation"

const cardClass = "rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm md:p-8"
const THIS_YEAR = new Date().getFullYear()

const WORK_NOTICE =
  "Immigrant Support Network does not find or provide jobs. Work visa assistance is available only where you already have a genuine job offer and supporting employer documentation."

const DETAIL_TITLES: Record<string, string> = {
  new_application: "About your application",
  refusal: "About the refusal",
  reapplication: "Your previous refusal and what has changed",
  additional_documents: "About the document request",
  verification: "About the verification",
  appointment_problem: "About the appointment or application-centre problem",
  complex_case: "About your situation",
  general_assessment: "About your situation",
}

function Notice({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "red" }) {
  const cls = tone === "red" ? "border-red-300 bg-red-50 text-red-900" : "border-gold/40 bg-gold/10 text-[#0a0a0a]/90"
  return <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${cls}`}>{children}</div>
}

function isOneOf<T extends string>(list: readonly { value: T }[], value: string | null): value is T {
  return !!value && list.some((o) => o.value === value)
}

export default function VisaAssessmentForm() {
  const searchParams = useSearchParams()
  // Pre-select answers from links such as /visa-assessment?type=refusal&destination=uk
  const [v, setValues] = useState<VisaAssessmentValues>(() => {
    const type = searchParams.get("type")
    const destination = searchParams.get("destination")
    const visa = searchParams.get("visa")
    return {
      ...defaultVisaAssessmentValues,
      caseType: isOneOf(CASE_TYPES, type) ? type : "",
      destination: isOneOf(DESTINATIONS, destination) ? destination : "",
      visaType: isOneOf(VISA_TYPES, visa) ? visa : "",
    }
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<Partial<Record<UploadSlot, File>>>({})
  const [fileErrors, setFileErrors] = useState<Partial<Record<UploadSlot, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    headingRef.current?.focus({ preventScroll: true })
  }, [step])

  const set = <K extends keyof VisaAssessmentValues>(key: K, value: VisaAssessmentValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }
  const err = (key: keyof VisaAssessmentValues) => errors[key as string]

  const slots = uploadSlotsFor(v)
  const activeFiles = slots.map((s) => files[s.slot]).filter((f): f is File => !!f)
  const totalUpload = activeFiles.reduce((n, f) => n + f.size, 0)
  const isRefusalPath = v.caseType === "refusal" || v.caseType === "reapplication"

  const destinationName =
    v.destination === "schengen" ? v.europeCountry : v.destination === "other" ? v.otherCountry : labelFor(DESTINATIONS, v.destination)

  const goNext = () => {
    const stepErrors = validateSteps(v, [step])
    if (step === 2 && totalUpload > MAX_UPLOAD_BYTES) stepErrors._files = "Attached files are larger than 4 MB in total."
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    // Pre-fill the refusing country from the chosen destination.
    if (step === 1 && isRefusalPath && !v.refusalCountry && destinationName) set("refusalCountry", destinationName)
    setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1))
  }

  const goBack = () => {
    setErrors({})
    setSubmitError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < STEP_TITLES.length - 1) return goNext()
    const all = validateSteps(v, [0, 1, 2, 3, 4])
    if (Object.keys(all).length) {
      const firstStep = STEP_FIELDS.findIndex((fields) => fields.some((f) => all[f]))
      setErrors(all)
      if (firstStep >= 0 && firstStep !== step) setStep(firstStep)
      return
    }
    if (totalUpload > MAX_UPLOAD_BYTES) {
      setSubmitError("Attached files are larger than 4 MB in total. Remove or replace a file and try again.")
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const body = new FormData()
      body.append("payload", JSON.stringify(v))
      for (const s of slots) {
        const f = files[s.slot]
        if (f) body.append(`file:${s.slot}`, f, f.name)
      }
      const res = await fetch("/api/visa-assessment", { method: "POST", body })
      const data = (await res.json().catch(() => ({}))) as { reference?: string; error?: string; fieldErrors?: Record<string, string> }
      if (res.status === 201 && data.reference) {
        setReference(data.reference)
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
      if (data.fieldErrors && Object.keys(data.fieldErrors).length) {
        const firstStep = STEP_FIELDS.findIndex((fields) => fields.some((f) => data.fieldErrors?.[f]))
        setErrors(data.fieldErrors)
        if (firstStep >= 0) setStep(firstStep)
      }
      setSubmitError(data.error ?? "We could not submit your assessment. Nothing has been saved. Please try again.")
    } catch {
      setSubmitError("We could not reach our server. Check your internet connection and try again. Your answers are still here.")
    } finally {
      setSubmitting(false)
    }
  }

  if (reference) {
    return (
      <div ref={topRef}>
        <AssessmentConfirmation reference={reference} name={v.fullName} preferredContact={v.preferredContact} />
      </div>
    )
  }

  const progress = ((step + 1) / STEP_TITLES.length) * 100

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-2xl" aria-labelledby="assessment-step-heading">
      <div ref={topRef} className="scroll-mt-24" />
      <div className="mb-6">
        <p className="mb-2 text-sm text-white/80">
          Step {step + 1} of {STEP_TITLES.length}: <span className="font-semibold text-gold">{STEP_TITLES[step]}</span>
        </p>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-[#2a2a2a]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEP_TITLES.length}
          aria-valuenow={step + 1}
          aria-label="Assessment progress"
        >
          <div className="h-full rounded-full bg-gold transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={cardClass}>
        <h2
          id="assessment-step-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mb-6 font-serif text-xl font-semibold text-[#0a0a0a] outline-none md:text-2xl"
        >
          {step === 2 && v.caseType ? DETAIL_TITLES[v.caseType] : STEP_TITLES[step]}
        </h2>

        {/* STEP 1 — what do you need help with? */}
        {step === 0 && (
          <RadioCards
            name="caseType"
            label="Choose the option that best describes your situation"
            options={CASE_TYPES}
            value={v.caseType}
            onChange={(val) => set("caseType", val as VisaAssessmentValues["caseType"])}
            error={err("caseType")}
          />
        )}

        {/* STEP 2 — destination & visa type */}
        {step === 1 && (
          <div className="space-y-6">
            <RadioCards
              name="destination"
              label="Which country is the visa for?"
              options={DESTINATIONS}
              columns={2}
              value={v.destination}
              onChange={(val) => set("destination", val as VisaAssessmentValues["destination"])}
              error={err("destination")}
            />
            {v.destination === "schengen" && (
              <SelectField
                label="Which European country?"
                help="For a Schengen visa, choose the country of your main destination (where you'll spend the most time)."
                value={v.europeCountry}
                onChange={(val) => set("europeCountry", val)}
                options={[...SCHENGEN_COUNTRIES, ...NON_SCHENGEN_EU_COUNTRIES]}
                error={err("europeCountry")}
              />
            )}
            {v.destination === "other" && (
              <TextField label="Destination country" value={v.otherCountry} onChange={(val) => set("otherCountry", val)} error={err("otherCountry")} />
            )}
            <RadioCards
              name="visaType"
              label="What is the purpose of the visa?"
              options={VISA_TYPES}
              columns={2}
              value={v.visaType}
              onChange={(val) => set("visaType", val as VisaAssessmentValues["visaType"])}
              error={err("visaType")}
            />
            {v.visaType === "other" && (
              <TextField label="Describe the purpose" optional value={v.visaTypeOther} onChange={(val) => set("visaTypeOther", val)} error={err("visaTypeOther")} />
            )}
            {v.visaType === "work_job_offer" && (
              <div className="space-y-5 rounded-lg border border-neutral-200 p-4">
                <Notice>{WORK_NOTICE}</Notice>
                <RadioCards
                  name="hasJobOffer"
                  label="Do you already have a genuine, signed job offer or contract?"
                  options={YES_NO}
                  columns={2}
                  value={v.hasJobOffer}
                  onChange={(val) => set("hasJobOffer", val as VisaAssessmentValues["hasJobOffer"])}
                  error={err("hasJobOffer")}
                />
                {v.hasJobOffer === "yes" && (
                  <>
                    <TextField label="Employer name" value={v.employerName} onChange={(val) => set("employerName", val)} error={err("employerName")} />
                    <TextField label="Country where the job is" value={v.employerCountry} onChange={(val) => set("employerCountry", val)} error={err("employerCountry")} />
                    <RadioCards
                      name="employerAuthorisation"
                      label="Has the employer obtained the authorisation the destination requires (for example a Certificate of Sponsorship, LMIA or work permit approval)?"
                      options={YES_NO_UNSURE}
                      columns={2}
                      value={v.employerAuthorisation}
                      onChange={(val) => set("employerAuthorisation", val as VisaAssessmentValues["employerAuthorisation"])}
                      error={err("employerAuthorisation")}
                    />
                  </>
                )}
                {slots
                  .filter((s) => s.slot === "jobOffer")
                  .map((s) => (
                    <FileField
                      key={s.slot}
                      label={s.label}
                      help={s.help}
                      file={files.jobOffer ?? null}
                      error={fileErrors.jobOffer}
                      onChange={(f, problem) => {
                        setFiles((prev) => ({ ...prev, jobOffer: f ?? undefined }))
                        setFileErrors((prev) => ({ ...prev, jobOffer: problem ?? undefined }))
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3 — case details */}
        {step === 2 && (
          <div className="space-y-6">
            {v.caseType === "new_application" && (
              <>
                <RadioCards
                  name="applicationStage"
                  label="How far are you with the application?"
                  options={APPLICATION_STAGES}
                  value={v.applicationStage}
                  onChange={(val) => set("applicationStage", val as VisaAssessmentValues["applicationStage"])}
                  error={err("applicationStage")}
                />
                {v.applicationStage === "appointment_booked" && (
                  <TextField type="date" label="Appointment date" optional value={v.appointmentDate} onChange={(val) => set("appointmentDate", val)} error={err("appointmentDate")} />
                )}
                {v.visaType === "study" && (
                  <RadioCards
                    name="studyAcceptance"
                    label="Do you have an acceptance or offer letter from a school or university?"
                    options={STUDY_ACCEPTANCE}
                    value={v.studyAcceptance}
                    onChange={(val) => set("studyAcceptance", val as VisaAssessmentValues["studyAcceptance"])}
                    error={err("studyAcceptance")}
                  />
                )}
                {v.visaType === "business" && (
                  <RadioCards
                    name="businessInvitation"
                    label="Do you have an invitation from the company or organisation you're visiting?"
                    options={YES_NO}
                    columns={2}
                    value={v.businessInvitation}
                    onChange={(val) => set("businessInvitation", val as VisaAssessmentValues["businessInvitation"])}
                    error={err("businessInvitation")}
                  />
                )}
                <TextAreaField
                  label="Anything else about the purpose of your trip?"
                  optional
                  rows={3}
                  placeholder="For example: visiting my sister in Lyon for her wedding, or attending a trade fair in Frankfurt."
                  value={v.purposeDetails}
                  onChange={(val) => set("purposeDetails", val)}
                  error={err("purposeDetails")}
                  maxLength={1000}
                />
              </>
            )}

            {isRefusalPath && (
              <>
                <TextField label="Which country refused the visa?" value={v.refusalCountry} onChange={(val) => set("refusalCountry", val)} error={err("refusalCountry")} />
                <SelectField
                  label="Type of visa that was refused"
                  value={v.refusalVisaType}
                  onChange={(val) => set("refusalVisaType", val as VisaAssessmentValues["refusalVisaType"])}
                  options={VISA_TYPES}
                  error={err("refusalVisaType")}
                />
                <MonthYearField
                  label="When was it refused?"
                  value={v.refusalDate}
                  onChange={(val) => set("refusalDate", val)}
                  yearFrom={THIS_YEAR}
                  yearTo={THIS_YEAR - 10}
                  error={err("refusalDate")}
                />
                <TextAreaField
                  label="What reason was given for the refusal?"
                  help="Copy the wording from the refusal letter if you have it. For a Schengen refusal form, tell us which numbered reasons were ticked."
                  rows={3}
                  value={v.refusalReason}
                  onChange={(val) => set("refusalReason", val)}
                  error={err("refusalReason")}
                />
                <RadioCards
                  name="hasRefusalLetter"
                  label="Do you have the refusal letter or form?"
                  options={YES_NO}
                  columns={2}
                  value={v.hasRefusalLetter}
                  onChange={(val) => set("hasRefusalLetter", val as VisaAssessmentValues["hasRefusalLetter"])}
                  error={err("hasRefusalLetter")}
                />
              </>
            )}

            {v.caseType === "refusal" && (
              <>
                <RadioCards
                  name="reappliedBefore"
                  label="Have you re-applied since this refusal?"
                  options={YES_NO}
                  columns={2}
                  value={v.reappliedBefore}
                  onChange={(val) => set("reappliedBefore", val as VisaAssessmentValues["reappliedBefore"])}
                  error={err("reappliedBefore")}
                />
                {v.reappliedBefore === "yes" && (
                  <SelectField
                    label="What was the outcome?"
                    value={v.reapplyOutcome}
                    onChange={(val) => set("reapplyOutcome", val as VisaAssessmentValues["reapplyOutcome"])}
                    options={REAPPLY_OUTCOMES}
                    error={err("reapplyOutcome")}
                  />
                )}
                <RadioCards
                  name="appealLodged"
                  label="Have you lodged an appeal or review against the refusal?"
                  options={APPEAL_STATUS}
                  value={v.appealLodged}
                  onChange={(val) => set("appealLodged", val as VisaAssessmentValues["appealLodged"])}
                  error={err("appealLodged")}
                />
                <TextAreaField
                  label="Briefly, what happened?"
                  rows={4}
                  placeholder="Your circumstances when you applied, what you submitted, and anything you think went wrong."
                  value={v.whatHappened}
                  onChange={(val) => set("whatHappened", val)}
                  error={err("whatHappened")}
                />
              </>
            )}

            {v.caseType === "reapplication" && (
              <>
                <TextAreaField
                  label="What has changed since the previous application?"
                  rows={4}
                  value={v.changesSince}
                  onChange={(val) => set("changesSince", val)}
                  error={err("changesSince")}
                />
                <RadioCards name="employmentChanged" label="Has your employment changed?" options={YES_NO} columns={2} value={v.employmentChanged} onChange={(val) => set("employmentChanged", val as VisaAssessmentValues["employmentChanged"])} error={err("employmentChanged")} />
                <RadioCards name="financialChanged" label="Have your financial circumstances changed?" options={YES_NO} columns={2} value={v.financialChanged} onChange={(val) => set("financialChanged", val as VisaAssessmentValues["financialChanged"])} error={err("financialChanged")} />
                <RadioCards name="purposeChanged" label="Has the purpose of your trip changed?" options={YES_NO} columns={2} value={v.purposeChanged} onChange={(val) => set("purposeChanged", val as VisaAssessmentValues["purposeChanged"])} error={err("purposeChanged")} />
                <RadioCards
                  name="newSupportingDocs"
                  label="Do you have new or stronger supporting documents?"
                  options={YES_NO_UNSURE}
                  columns={2}
                  value={v.newSupportingDocs}
                  onChange={(val) => set("newSupportingDocs", val as VisaAssessmentValues["newSupportingDocs"])}
                  error={err("newSupportingDocs")}
                />
                <Notice>A new application is assessed on its own merits. We can help you address the previous reasons, but no one can promise approval.</Notice>
              </>
            )}

            {(v.caseType === "additional_documents" || v.caseType === "verification") && (
              <>
                <SelectField label="Who sent the request?" value={v.requestedBy} onChange={(val) => set("requestedBy", val as VisaAssessmentValues["requestedBy"])} options={REQUESTED_BY} error={err("requestedBy")} />
                {v.caseType === "verification" && (
                  <SelectField label="What is being verified?" value={v.verificationSubject} onChange={(val) => set("verificationSubject", val as VisaAssessmentValues["verificationSubject"])} options={VERIFICATION_SUBJECTS} error={err("verificationSubject")} />
                )}
                <TextAreaField label="What was requested?" rows={3} value={v.whatRequested} onChange={(val) => set("whatRequested", val)} error={err("whatRequested")} />
                <TextField type="date" label="Date you received the request" value={v.dateReceived} onChange={(val) => set("dateReceived", val)} error={err("dateReceived")} />
                <TextField
                  type="date"
                  label="Deadline to respond"
                  optional
                  help="Leave blank if no deadline was given. Deadlines matter: tell us as early as possible."
                  value={v.responseDeadline}
                  onChange={(val) => set("responseDeadline", val)}
                  error={err("responseDeadline")}
                />
                <TextAreaField label="Briefly explain the situation" rows={4} value={v.problemExplanation} onChange={(val) => set("problemExplanation", val)} error={err("problemExplanation")} />
              </>
            )}

            {v.caseType === "appointment_problem" && (
              <>
                <SelectField label="Which application centre or authority?" value={v.applicationCentre} onChange={(val) => set("applicationCentre", val as VisaAssessmentValues["applicationCentre"])} options={APPLICATION_CENTRES} error={err("applicationCentre")} />
                <TextField label="City or location of the centre" value={v.centreLocation} onChange={(val) => set("centreLocation", val)} error={err("centreLocation")} />
                <SelectField label="What kind of problem is it?" value={v.appointmentProblem} onChange={(val) => set("appointmentProblem", val as VisaAssessmentValues["appointmentProblem"])} options={APPOINTMENT_PROBLEMS} error={err("appointmentProblem")} />
                <TextField type="date" label="Current appointment date" optional value={v.currentAppointmentDate} onChange={(val) => set("currentAppointmentDate", val)} error={err("currentAppointmentDate")} />
                <TextAreaField label="Describe the problem" rows={4} value={v.problemDescription} onChange={(val) => set("problemDescription", val)} error={err("problemDescription")} />
                <Notice>We cannot guarantee appointment dates. Availability is controlled by the application centres and authorities.</Notice>
              </>
            )}

            {v.caseType === "complex_case" && (
              <>
                <CheckboxCards
                  label="What makes your situation complex? (choose all that apply)"
                  options={COMPLEXITY_FLAGS}
                  values={v.complexityFlags}
                  onChange={(val) => set("complexityFlags", val as VisaAssessmentValues["complexityFlags"])}
                  error={err("complexityFlags")}
                />
                <TextAreaField
                  label="Briefly describe your situation"
                  help="A short summary is enough. We will discuss sensitive details privately if we take on your case."
                  rows={5}
                  maxLength={3000}
                  value={v.complexDescription}
                  onChange={(val) => set("complexDescription", val)}
                  error={err("complexDescription")}
                />
              </>
            )}

            {v.caseType === "general_assessment" && (
              <TextAreaField
                label="Briefly describe your situation and what you'd like help with"
                rows={5}
                value={v.generalDescription}
                onChange={(val) => set("generalDescription", val)}
                error={err("generalDescription")}
              />
            )}

            {slots
              .filter((s) => s.slot === "caseDocument")
              .map((s) => (
                <FileField
                  key={s.slot}
                  label={s.label}
                  help={s.help}
                  file={files.caseDocument ?? null}
                  error={fileErrors.caseDocument ?? errors._files}
                  onChange={(f, problem) => {
                    setFiles((prev) => ({ ...prev, caseDocument: f ?? undefined }))
                    setFileErrors((prev) => ({ ...prev, caseDocument: problem ?? undefined }))
                  }}
                />
              ))}
            {activeFiles.length > 1 ? (
              <p className="text-xs text-neutral-500">Attached in total: {formatBytes(totalUpload)} of 4 MB.</p>
            ) : null}
          </div>
        )}

        {/* STEP 4 — trip & background */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <MonthYearField
                label="When do you plan to travel?"
                value={v.travelDate}
                onChange={(val) => set("travelDate", val)}
                yearFrom={THIS_YEAR}
                yearTo={THIS_YEAR + 2}
                disabled={v.travelDateUnknown}
                error={err("travelDate")}
              />
              <label className="flex items-center gap-2 text-sm text-[#0a0a0a]">
                <input
                  type="checkbox"
                  checked={v.travelDateUnknown}
                  onChange={(e) => {
                    set("travelDateUnknown", e.target.checked)
                    if (e.target.checked) set("travelDate", "")
                  }}
                  className="h-4 w-4 accent-[#C9A84C]"
                />
                Not sure yet
              </label>
            </div>
            <SelectField label="How long do you plan to stay?" value={v.stayLength} onChange={(val) => set("stayLength", val as VisaAssessmentValues["stayLength"])} options={STAY_LENGTHS} error={err("stayLength")} />
            <RadioCards name="travellers" label="Who is travelling?" options={TRAVELLERS} value={v.travellers} onChange={(val) => set("travellers", val as VisaAssessmentValues["travellers"])} error={err("travellers")} />
            {v.travellers === "me_and_family" && (
              <TextField type="number" inputMode="numeric" label="How many people in total, including you?" value={v.travellerCount} onChange={(val) => set("travellerCount", val)} error={err("travellerCount")} />
            )}
            <RadioCards name="passportStatus" label="Passport" options={PASSPORT_STATUS} value={v.passportStatus} onChange={(val) => set("passportStatus", val as VisaAssessmentValues["passportStatus"])} error={err("passportStatus")} />
            {v.passportStatus === "none" && (
              <SelectField label="When do you expect to have your passport?" value={v.passportExpected} onChange={(val) => set("passportExpected", val as VisaAssessmentValues["passportExpected"])} options={PASSPORT_EXPECTED} error={err("passportExpected")} />
            )}
            <SelectField label="Nationality" help="If you have more than one, choose the passport you will travel on." value={v.nationality} onChange={(val) => set("nationality", val)} options={COUNTRIES} error={err("nationality")} />
            <SelectField label="Country where you live" value={v.residenceCountry} onChange={(val) => set("residenceCountry", val)} options={COUNTRIES} error={err("residenceCountry")} />
            <SelectField
              label="Your status in that country"
              help="This matters because some embassies only accept applications from citizens or legal residents of the country you apply from."
              value={v.residenceStatus}
              onChange={(val) => set("residenceStatus", val as VisaAssessmentValues["residenceStatus"])}
              options={RESIDENCE_STATUS}
              error={err("residenceStatus")}
            />
            <SelectField label="Your current situation" value={v.employmentStatus} onChange={(val) => set("employmentStatus", val as VisaAssessmentValues["employmentStatus"])} options={EMPLOYMENT_STATUS} error={err("employmentStatus")} />
            <SelectField label="Who is paying for the trip?" value={v.fundingSource} onChange={(val) => set("fundingSource", val as VisaAssessmentValues["fundingSource"])} options={FUNDING_SOURCES} error={err("fundingSource")} />
            <RadioCards name="travelledRecently" label="Have you travelled to the Schengen area, the UK, the USA or Canada in the last 10 years?" options={YES_NO} columns={2} value={v.travelledRecently} onChange={(val) => set("travelledRecently", val as VisaAssessmentValues["travelledRecently"])} error={err("travelledRecently")} />
            {v.travelledRecently === "yes" && (
              <CheckboxCards label="Where did you travel?" options={TRAVEL_REGIONS} values={v.travelledRegions} onChange={(val) => set("travelledRegions", val as VisaAssessmentValues["travelledRegions"])} error={err("travelledRegions")} />
            )}
            {!isRefusalPath && (
              <>
                <RadioCards name="previousRefusal" label="Have you ever been refused a visa for any country?" options={YES_NO} columns={2} value={v.previousRefusal} onChange={(val) => set("previousRefusal", val as VisaAssessmentValues["previousRefusal"])} error={err("previousRefusal")} />
                {v.previousRefusal === "yes" && (
                  <TextField label="Which country or countries?" value={v.previousRefusalCountry} onChange={(val) => set("previousRefusalCountry", val)} error={err("previousRefusalCountry")} />
                )}
              </>
            )}
          </div>
        )}

        {/* STEP 5 — contact & consent */}
        {step === 4 && (
          <div className="space-y-6">
            <TextField label="Full name" autoComplete="name" value={v.fullName} onChange={(val) => set("fullName", val)} error={err("fullName")} />
            <TextField type="email" label="Email" autoComplete="email" inputMode="email" value={v.email} onChange={(val) => set("email", val)} error={err("email")} />
            <TextField
              type="tel"
              label="Mobile number"
              help="Include the country code, for example +27 82 123 4567."
              autoComplete="tel"
              inputMode="tel"
              value={v.phone}
              onChange={(val) => set("phone", val)}
              error={err("phone")}
            />
            <label className="flex items-center gap-2 text-sm text-[#0a0a0a]">
              <input type="checkbox" checked={v.phoneIsWhatsapp} onChange={(e) => set("phoneIsWhatsapp", e.target.checked)} className="h-4 w-4 accent-[#C9A84C]" />
              This number is on WhatsApp
            </label>
            <RadioCards name="preferredContact" label="How should we contact you?" options={CONTACT_METHODS} columns={2} value={v.preferredContact} onChange={(val) => set("preferredContact", val as VisaAssessmentValues["preferredContact"])} error={err("preferredContact")} />
            <SelectField label="How did you hear about us?" optional value={v.heardFrom} onChange={(val) => set("heardFrom", val as VisaAssessmentValues["heardFrom"])} options={HEARD_FROM} error={err("heardFrom")} />
            {v.heardFrom === "friend_family" && (
              <TextField label="Who referred you?" optional value={v.referrerName} onChange={(val) => set("referrerName", val)} error={err("referrerName")} />
            )}
            <TextAreaField label="Anything else we should know?" optional rows={3} value={v.additionalNotes} onChange={(val) => set("additionalNotes", val)} error={err("additionalNotes")} />

            {/* Honeypot for bots: hidden from people and assistive technology */}
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="assessment-website">Leave this field empty</label>
              <input id="assessment-website" type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
            </div>

            <div className="space-y-3 border-t border-neutral-200 pt-6">
              <CheckboxField
                checked={v.consentAccuracy}
                onChange={(val) => set("consentAccuracy", val)}
                error={err("consentAccuracy")}
                label="The information I have provided is true and complete to the best of my knowledge."
              />
              <CheckboxField
                checked={v.consentPrivacy}
                onChange={(val) => set("consentPrivacy", val)}
                error={err("consentPrivacy")}
                label={
                  <>
                    I consent to Immigrant Support Network processing my information and any document I upload to assess my
                    enquiry and contact me, as described in the{" "}
                    <Link href="/privacy-policy" target="_blank" className="text-gold-dark underline">
                      Privacy Policy
                    </Link>
                    .
                  </>
                }
              />
              <CheckboxField
                checked={v.consentNoGuarantee}
                onChange={(val) => set("consentNoGuarantee", val)}
                error={err("consentNoGuarantee")}
                label="I understand that Immigrant Support Network is a private service, not a government office, embassy or visa centre; that visa decisions are made by the relevant authority and cannot be guaranteed; and that government and visa-centre fees are separate from any service fee."
              />
            </div>

            <Notice>
              Never share passwords for government or visa-centre portals with anyone, including us. Submitting this
              assessment does not commit you to anything, and no payment is requested at this stage.
            </Notice>
          </div>
        )}
      </div>

      {submitError ? (
        <div className="mt-4" role="alert">
          <Notice tone="red">
            {submitError}{" "}
            <a
              href={whatsappLink("Hi ISN, I tried to submit a visa assessment on your website but it didn't go through.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Contact us on WhatsApp
            </a>
          </Notice>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="order-2 flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-gold hover:text-gold disabled:opacity-50 sm:order-1"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden /> Back
          </button>
        ) : (
          <span className="order-2 sm:order-1" />
        )}
        {step < STEP_TITLES.length - 1 ? (
          // Distinct keys stop React reusing this element as the submit button mid-click,
          // which would submit the form as soon as the last step appears.
          <button
            key="continue"
            type="button"
            onClick={goNext}
            className="order-1 flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-gold-light sm:order-2 sm:ml-auto"
          >
            Continue <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={submitting}
            className="order-1 flex items-center justify-center gap-2 rounded-lg bg-gold px-10 py-3.5 text-base font-semibold text-[#0a0a0a] hover:bg-gold-light disabled:opacity-60 sm:order-2 sm:ml-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Submitting…
              </>
            ) : (
              "Submit my assessment"
            )}
          </button>
        )}
      </div>
    </form>
  )
}
