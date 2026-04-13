"use client"

import { useForm, type UseFormRegister } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import emailjs from "@emailjs/browser"
import { Upload, Loader2, ChevronLeft, ChevronRight, Check } from "lucide-react"
import {
  defaultApplyValues,
  validateApplyStep,
  type ApplyCandidateFormValues,
} from "@/lib/apply-candidate-schema"
import { buildApplyEmailMessage } from "@/lib/build-apply-email-message"

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_yyl4r2x"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_k6228dm"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "2M_IQHoiSJ7LUbLWJ"

const STEPS = [
  { n: 1, title: "Personal Details" },
  { n: 2, title: "Passport & Travel Readiness" },
  { n: 3, title: "Skills & Work Experience" },
  { n: 4, title: "Certifications & Licences" },
  { n: 5, title: "Your Documents" },
  { n: 6, title: "Financial Readiness" },
  { n: 7, title: "Destination Preference" },
  { n: 8, title: "Background Information" },
  { n: 9, title: "Commitment & Final Question" },
] as const

const DRIVER = "Truck / Delivery Driver"

const inputClass =
  "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
const labelClass = "block text-sm font-medium text-[#0a0a0a]"
const cardClass = "rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm md:p-8"
/** Native radios need explicit accent + card selection state — `text-gold` alone is often invisible on white. */
const radioNativeClass =
  "h-5 w-5 shrink-0 cursor-pointer border-2 border-neutral-500 accent-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:ring-offset-2"

const checkboxClass =
  "h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-neutral-500 accent-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:ring-offset-1"

function RadioOptionCards({
  name,
  value,
  register,
  options,
  direction = "row",
}: {
  name: keyof ApplyCandidateFormValues
  value: string
  register: UseFormRegister<ApplyCandidateFormValues>
  options: { value: string; label: string }[]
  direction?: "row" | "column"
}) {
  const wrap =
    direction === "column"
      ? "flex flex-col gap-2"
      : "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3"
  const alignItems = direction === "column" ? "items-start" : "items-center"
  return (
    <div className={wrap} role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            className={`flex min-h-[48px] cursor-pointer gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${alignItems} ${
              selected
                ? "border-[#C9A84C] bg-[#C9A84C]/12 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.15)] ring-1 ring-[#C9A84C]/35"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/90"
            } ${direction === "row" ? "sm:min-w-[132px] sm:flex-1" : "w-full"}`}
          >
            <input type="radio" value={opt.value} {...register(name)} className={`${radioNativeClass} ${direction === "column" ? "mt-0.5" : ""}`} />
            <span
              className={`text-sm leading-snug ${
                selected ? "font-semibold text-[#0a0a0a]" : "font-medium text-[#0a0a0a]/85"
              }`}
            >
              {opt.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

/** Multi-select checkboxes with the same visible card treatment as radios (plain checkboxes were hard to see on white). */
function CheckboxOptionCards({
  options,
  selectedIds,
  onToggle,
  className = "",
}: {
  options: { id: string; label: string }[]
  selectedIds: string[]
  onToggle: (id: string, checked: boolean) => void
  /** e.g. grid-cols-1 for full-width stacks */
  className?: string
}) {
  return (
    <div className={`grid gap-2 sm:grid-cols-2 ${className}`} role="group">
      {options.map(({ id, label }) => {
        const checked = selectedIds.includes(id)
        return (
          <label
            key={id}
            className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
              checked
                ? "border-[#C9A84C] bg-[#C9A84C]/12 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.15)] ring-1 ring-[#C9A84C]/35"
                : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onToggle(id, e.target.checked)}
              className={checkboxClass}
            />
            <span
              className={`text-sm leading-snug text-[#0a0a0a] ${
                checked ? "font-semibold" : "font-medium"
              }`}
            >
              {label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function FieldErr({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-sm text-red-600">{msg}</p> : null
}

function GoldInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-[#0a0a0a]/90">
      {children}
    </div>
  )
}

type Props = {
  onSuccess: (payload: { fullName: string; firstName: string }) => void
}

export default function CandidateApplicationForm({ onSuccess }: Props) {
  const { register, watch, setValue, getValues, handleSubmit } = useForm<ApplyCandidateFormValues>({
    defaultValues: defaultApplyValues,
    mode: "onChange",
  })

  const [step, setStep] = useState(0)
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitErr, setSubmitErr] = useState<string | null>(null)

  const hasPassport = watch("hasPassport")
  const workedAbroad = watch("workedAbroad")
  const jobCategory = watch("jobCategory")
  const hasCertifications = watch("hasCertifications")
  const visaDenied = watch("visaDenied")
  const referred = watch("referred")
  const internationalDriving = watch("internationalDriving")
  const longDistance = watch("longDistance")

  const goNext = () => {
    const values = getValues()
    const res = validateApplyStep(step, values)
    if (!res.ok) {
      setStepErrors(res.fieldErrors)
      return
    }
    setStepErrors({})
    setStep((s) => Math.min(s + 1, 8))
  }

  const goBack = () => {
    setStepErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }

  const onFinalSubmit = handleSubmit(async (data) => {
    const res = validateApplyStep(8, data)
    if (!res.ok) {
      setStepErrors(res.fieldErrors)
      setStep(8)
      return
    }
    setSubmitting(true)
    setSubmitErr(null)
    const message = buildApplyEmailMessage(data)
    const first =
      data.fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean)[0] || "Candidate"
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: "New Candidate Application — ISN",
          name: data.fullName,
          email: data.email,
          time: new Date().toLocaleString("en-ZA"),
          message,
        },
        EMAILJS_PUBLIC_KEY
      )
      onSuccess({ fullName: data.fullName, firstName: first })
    } catch {
      setSubmitErr("Something went wrong sending your application. Please try again or contact us on WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  })

  const err = (name: keyof ApplyCandidateFormValues | string) => stepErrors[name as string]

  const toggleInArray = (field: "shiftPreferences" | "preferredCountries", value: string, checked: boolean) => {
    const cur = getValues(field) as string[]
    const next = checked ? [...cur, value] : cur.filter((x) => x !== value)
    setValue(field, next as never, { shouldValidate: true })
  }

  return (
    <form onSubmit={onFinalSubmit} className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm text-white/80">
          <span>
            Step {step + 1} of 9 —{" "}
            <span className="font-semibold text-gold">{STEPS[step].title}</span>
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 9) * 100}%` }}
          />
        </div>
      </div>

      <div key={step} className={`${cardClass} transition-all duration-300 ease-out`}>
        {/* STEP 0 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Personal Details</h2>
            <div>
              <label className={labelClass}>Full Name</label>
              <input {...register("fullName")} className={inputClass} placeholder="As on your passport" />
              <FieldErr msg={err("fullName")} />
            </div>
            <div>
              <label className={labelClass}>Country of Residence</label>
              <input {...register("country")} className={inputClass} />
              <FieldErr msg={err("country")} />
            </div>
            <div>
              <label className={labelClass}>Nationality</label>
              <input {...register("nationality")} className={inputClass} />
              <FieldErr msg={err("nationality")} />
            </div>
            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input {...register("phone")} type="tel" className={inputClass} />
              <FieldErr msg={err("phone")} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input {...register("email")} type="email" className={inputClass} />
              <FieldErr msg={err("email")} />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input {...register("age")} type="number" min={18} max={60} className={inputClass} />
              <FieldErr msg={err("age")} />
            </div>
          </div>
        )}

        {/* STEP 1 Passport */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Passport & Travel Readiness</h2>
            <p className="text-sm text-[#0a0a0a]/70">This section is critical for your application.</p>

            <div>
              <span className={labelClass}>Do you have a valid passport?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="hasPassport"
                  value={hasPassport}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("hasPassport")} />
            </div>

            {hasPassport === "yes" && (
              <div>
                <label className={labelClass}>Upload passport photo page (optional but speeds up matching)</label>
                <input
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  className={inputClass}
                  onChange={(e) => setValue("passportPhotoName", e.target.files?.[0]?.name ?? "", { shouldValidate: true })}
                />
                {watch("passportPhotoName") ? (
                  <p className="mt-1 text-xs text-[#0a0a0a]/60">Selected: {watch("passportPhotoName")}</p>
                ) : null}
              </div>
            )}

            {hasPassport === "no" && (
              <div>
                <label className={labelClass}>When do you expect to get your passport?</label>
                <select {...register("passportTimeline")} className={inputClass}>
                  <option value="">Select</option>
                  <option value="within_1_month">Within 1 month</option>
                  <option value="1_3_months">1–3 months</option>
                  <option value="3_6_months">3–6 months</option>
                  <option value="not_sure">Not sure</option>
                </select>
                <FieldErr msg={err("passportTimeline")} />
              </div>
            )}

            <div>
              <span className={labelClass}>Earliest availability to travel</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="travelAvailability"
                  value={watch("travelAvailability")}
                  register={register}
                  direction="column"
                  options={[
                    { value: "immediately", label: "Immediately" },
                    { value: "1_3_months", label: "1–3 months" },
                    { value: "3_6_months", label: "3–6 months" },
                  ]}
                />
              </div>
              <FieldErr msg={err("travelAvailability")} />
            </div>

            <div>
              <span className={labelClass}>Are you willing to work: (select all that apply)</span>
              <div className="mt-2">
                <CheckboxOptionCards
                  options={[
                    { id: "night", label: "Night shifts" },
                    { id: "overtime", label: "Overtime" },
                    { id: "weekends", label: "Weekends" },
                    { id: "rotating", label: "Rotating shifts" },
                  ]}
                  selectedIds={watch("shiftPreferences")}
                  onToggle={(id, checked) => toggleInArray("shiftPreferences", id, checked)}
                />
              </div>
              <FieldErr msg={err("shiftPreferences")} />
            </div>
            <GoldInfo>
              💡 Candidates flexible with shifts are matched significantly faster with European employers.
            </GoldInfo>

            <div>
              <span className={labelClass}>Have you worked outside your country before?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="workedAbroad"
                  value={workedAbroad}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("workedAbroad")} />
            </div>

            {workedAbroad === "yes" && (
              <div>
                <label className={labelClass}>Which country and what type of work?</label>
                <textarea {...register("previousWorkDetails")} rows={3} className={inputClass} />
                <FieldErr msg={err("previousWorkDetails")} />
              </div>
            )}
          </div>
        )}

        {/* STEP 2 Skills */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Skills & Work Experience</h2>
            <div>
              <label className={labelClass}>Primary Job Category</label>
              <select {...register("jobCategory")} className={inputClass}>
                <option value="">Select</option>
                <option>Warehouse Worker</option>
                <option>Agriculture / Farm Work</option>
                <option>Cleaning & Maintenance</option>
                <option>Construction / General Labour</option>
                <option>{DRIVER}</option>
                <option>Caregiver</option>
                <option>Food Production</option>
                <option>Hospitality</option>
                <option>Other</option>
              </select>
              <FieldErr msg={err("jobCategory")} />
            </div>
            <div>
              <label className={labelClass}>Years of experience in this field</label>
              <select {...register("yearsExperience")} className={inputClass}>
                <option value="">Select</option>
                <option value="less_1">Less than 1 year</option>
                <option value="1_2">1–2 years</option>
                <option value="3_5">3–5 years</option>
                <option value="5plus">5+ years</option>
              </select>
              <FieldErr msg={err("yearsExperience")} />
            </div>
            <div>
              <span className={labelClass}>Have you worked in a structured environment before?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="structuredEnvironment"
                  value={watch("structuredEnvironment")}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("structuredEnvironment")} />
            </div>
            <GoldInfo>
              💡 Experience in structured work environments such as factories, warehouses or companies is highly valued by
              European employers.
            </GoldInfo>
            <div>
              <label className={labelClass}>Describe your work experience (min. 80 characters)</label>
              <textarea
                {...register("experienceDescription")}
                rows={6}
                placeholder="Tell us about your work history. What tasks have you done? What equipment or machinery have you used? Be specific — this is what employers review first."
                className={inputClass}
              />
              <p className="mt-0.5 text-xs text-neutral-500">{watch("experienceDescription")?.length ?? 0} / 80+ characters</p>
              <FieldErr msg={err("experienceDescription")} />
            </div>
          </div>
        )}

        {/* STEP 3 Certifications */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Certifications & Licences</h2>
            <p className="text-sm text-[#0a0a0a]/70">
              Candidates with certifications get matched faster and qualify for higher-paying roles.
            </p>

            <div>
              <span className={labelClass}>Do you have any certifications or licences?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="hasCertifications"
                  value={hasCertifications}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("hasCertifications")} />
            </div>

            {hasCertifications === "yes" && (
              <>
                <div>
                  <label className={labelClass}>Certification / licence description</label>
                  <input
                    {...register("certificationDescription")}
                    className={inputClass}
                    placeholder="e.g. Forklift licence, Code 14, Food hygiene certificate, First Aid"
                  />
                  <FieldErr msg={err("certificationDescription")} />
                </div>
                <div>
                  <label className={labelClass}>Upload certificate (optional but recommended)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf,application/pdf"
                    className={inputClass}
                    onChange={(e) => setValue("certificateFileName", e.target.files?.[0]?.name ?? "", { shouldValidate: true })}
                  />
                </div>
              </>
            )}

            {jobCategory === DRIVER && (
              <div className="space-y-4 border-t border-neutral-200 pt-4">
                <p className="text-sm font-semibold text-[#0a0a0a]">Driver details</p>
                <div>
                  <label className={labelClass}>Licence code</label>
                  <select {...register("licenceCode")} className={inputClass}>
                    <option value="">Select</option>
                    <option value="code8">Code 8 (light motor vehicle)</option>
                    <option value="code10">Code 10 (heavy motor vehicle)</option>
                    <option value="code14">Code 14 (extra heavy vehicle)</option>
                    <option value="other">Other</option>
                  </select>
                  <FieldErr msg={err("licenceCode")} />
                </div>
                <div>
                  <label className={labelClass}>Years of professional driving experience</label>
                  <select {...register("drivingYears")} className={inputClass}>
                    <option value="">Select</option>
                    <option value="1_2">1–2 years</option>
                    <option value="3_5">3–5 years</option>
                    <option value="5_10">5–10 years</option>
                    <option value="10plus">10+ years</option>
                  </select>
                  <FieldErr msg={err("drivingYears")} />
                </div>
                <div>
                  <span className={labelClass}>Do you have a PDP (Professional Driving Permit)?</span>
                  <div className="mt-2">
                    <RadioOptionCards
                      name="hasPdp"
                      value={watch("hasPdp")}
                      register={register}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                        { value: "in_progress", label: "In progress" },
                      ]}
                    />
                  </div>
                  <FieldErr msg={err("hasPdp")} />
                </div>
                <div>
                  <span className={labelClass}>Do you have international driving experience?</span>
                  <div className="mt-2">
                    <RadioOptionCards
                      name="internationalDriving"
                      value={internationalDriving}
                      register={register}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                  </div>
                  <FieldErr msg={err("internationalDriving")} />
                </div>
                {internationalDriving === "yes" && (
                  <div>
                    <label className={labelClass}>Which countries have you driven in?</label>
                    <input {...register("internationalDrivingCountries")} className={inputClass} />
                    <FieldErr msg={err("internationalDrivingCountries")} />
                  </div>
                )}
                <div>
                  <span className={labelClass}>Have you driven long-distance routes?</span>
                  <div className="mt-2">
                    <RadioOptionCards
                      name="longDistance"
                      value={longDistance}
                      register={register}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                  </div>
                  <FieldErr msg={err("longDistance")} />
                </div>
                {longDistance === "yes" && (
                  <div>
                    <label className={labelClass}>Describe your long-distance experience</label>
                    <textarea {...register("longDistanceDetails")} rows={3} className={inputClass} />
                    <FieldErr msg={err("longDistanceDetails")} />
                  </div>
                )}
                <GoldInfo>
                  💡 International driving experience and long-distance routes are specifically requested by employers in
                  Ireland, Canada and the UK.
                </GoldInfo>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 Documents */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Your Documents</h2>
            <p className="text-sm text-[#0a0a0a]/70">Uploading your CV now significantly speeds up matching with employers.</p>

            <div>
              <label className={labelClass}>Upload your CV — required (PDF or Word)</label>
              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gold/60 bg-gold/5 px-4 py-10 transition hover:bg-gold/10">
                <Upload className="mb-2 h-10 w-10 text-gold" />
                <span className="text-center text-sm font-medium text-[#0a0a0a]">Click to upload CV</span>
                <span className="text-xs text-neutral-500">.pdf, .doc, .docx</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword"
                  className="sr-only"
                  onChange={(e) => setValue("cvFileName", e.target.files?.[0]?.name ?? "", { shouldValidate: true })}
                />
              </label>
              {watch("cvFileName") ? (
                <p className="mt-2 text-sm text-[#0a0a0a]">
                  <Check className="mr-1 inline h-4 w-4 text-green-600" />
                  {watch("cvFileName")}
                </p>
              ) : null}
              <FieldErr msg={err("cvFileName")} />
              {!watch("cvFileName") ? (
                <p className="mt-2 text-sm">
                  <Link href="/cv-services" className="font-medium text-gold hover:underline">
                    Don&apos;t have a CV in European format? Get yours written →
                  </Link>
                </p>
              ) : null}
            </div>

            <div>
              <span className={labelClass}>Do you have a police clearance certificate?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="policeClearance"
                  value={watch("policeClearance")}
                  register={register}
                  direction="column"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "in_progress", label: "In progress" },
                  ]}
                />
              </div>
              <FieldErr msg={err("policeClearance")} />
            </div>

            <div>
              <span className={labelClass}>Do you have a medical clearance certificate?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="medicalClearance"
                  value={watch("medicalClearance")}
                  register={register}
                  direction="column"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "not_sure", label: "Not sure if required" },
                  ]}
                />
              </div>
              <FieldErr msg={err("medicalClearance")} />
            </div>
          </div>
        )}

        {/* STEP 5 Financial */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Financial Readiness</h2>
            <p className="text-sm text-[#0a0a0a]/70">
              This helps us match you with the right opportunities and support you correctly.
            </p>
            <div>
              <span className={labelClass}>
                Are you able to cover initial costs such as passport fees, visa fees, and travel if required?
              </span>
              <div className="mt-3">
                <RadioOptionCards
                  name="financialReady"
                  value={watch("financialReady")}
                  register={register}
                  direction="column"
                  options={[
                    { value: "yes_ready", label: "Yes — I am financially ready" },
                    { value: "need_guidance", label: "No — I need guidance on costs" },
                    { value: "more_info", label: "I need more information first" },
                  ]}
                />
              </div>
              <FieldErr msg={err("financialReady")} />
            </div>
            <GoldInfo>
              💡 Typical total costs range from <strong>R2,000 to R8,000</strong> depending on your destination. This includes:
              R300 ISN registration fee, CV writing if needed (from R250), visa application fees, and flights. Our team
              provides a full cost breakdown for your specific destination after your application is reviewed.
            </GoldInfo>
          </div>
        )}

        {/* STEP 6 Destination */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Where Do You Want to Work?</h2>
            <div>
              <span className={labelClass}>Preferred country (select all that apply)</span>
              <div className="mt-2">
                <CheckboxOptionCards
                  options={[
                    { id: "poland", label: "🇵🇱 Poland" },
                    { id: "romania", label: "🇷🇴 Romania" },
                    { id: "hungary", label: "🇭🇺 Hungary" },
                    { id: "ireland", label: "🇮🇪 Ireland" },
                    { id: "canada", label: "🇨🇦 Canada" },
                    { id: "open", label: "🌍 Open to any destination" },
                  ]}
                  selectedIds={watch("preferredCountries")}
                  onToggle={(id, checked) => toggleInArray("preferredCountries", id, checked)}
                />
              </div>
              <FieldErr msg={err("preferredCountries")} />
            </div>
            <div>
              <label className={labelClass}>When do you want to start working?</label>
              <select {...register("startTimeline")} className={inputClass}>
                <option value="">Select</option>
                <option value="asap">As soon as possible</option>
                <option value="within_3m">Within 3 months</option>
                <option value="within_6m">Within 6 months</option>
                <option value="exploring">Just exploring options</option>
              </select>
              <FieldErr msg={err("startTimeline")} />
            </div>
          </div>
        )}

        {/* STEP 7 Background */}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Background Information</h2>
            <p className="text-sm text-[#0a0a0a]/70">
              Answering honestly ensures we match you correctly and avoids delays later in the process.
            </p>

            <div>
              <span className={labelClass}>Have you ever been denied a visa before?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="visaDenied"
                  value={visaDenied}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("visaDenied")} />
            </div>

            {visaDenied === "yes" && (
              <div>
                <label className={labelClass}>Please explain which country, when, and the reason given</label>
                <textarea {...register("visaDenialDetails")} rows={4} className={inputClass} />
                <FieldErr msg={err("visaDenialDetails")} />
              </div>
            )}

            <GoldInfo>
              💡 A previous visa denial does not automatically disqualify you. Being honest here allows our team to advise
              you on the best route forward.
            </GoldInfo>

            <div>
              <span className={labelClass}>Were you referred to ISN?</span>
              <div className="mt-2">
                <RadioOptionCards
                  name="referred"
                  value={referred}
                  register={register}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
              <FieldErr msg={err("referred")} />
            </div>

            {referred === "yes" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Referrer full name</label>
                  <input {...register("referrerName")} className={inputClass} />
                  <FieldErr msg={err("referrerName")} />
                </div>
                <div>
                  <label className={labelClass}>Referrer phone number</label>
                  <input {...register("referrerPhone")} type="tel" className={inputClass} />
                  <FieldErr msg={err("referrerPhone")} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 8 Commitment */}
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#0a0a0a] md:text-2xl">Commitment & Final Question</h2>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4">
              <input type="checkbox" {...register("commitmentAccepted")} className={`mt-1 ${checkboxClass}`} />
              <span className="text-sm text-[#0a0a0a]">
                I confirm that I am serious about working abroad and ready to follow the full legal process including visa
                applications, document preparation, employer interviews, and relocation.
              </span>
            </label>
            <FieldErr msg={err("commitmentAccepted")} />

            <GoldInfo>
              💡 This is your opportunity to stand out. Candidates who write a genuine, detailed answer describing their
              situation and goals are prioritised in our matching process. Write from the heart.
            </GoldInfo>

            <div>
              <label className={labelClass}>Why do you want to work abroad? (min. 80 characters)</label>
              <textarea
                {...register("whyAbroad")}
                rows={8}
                placeholder="Tell us honestly. What is your situation? What are you hoping to achieve? What does working abroad mean for you and your family? Why now?"
                className={inputClass}
              />
              <p className="mt-0.5 text-xs text-neutral-500">{watch("whyAbroad")?.length ?? 0} / 80+ characters</p>
              <FieldErr msg={err("whyAbroad")} />
            </div>
          </div>
        )}
      </div>

      {submitErr ? <p className="mt-4 text-center text-sm text-red-400">{submitErr}</p> : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="order-2 flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-gold hover:text-gold sm:order-1"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span className="order-2 sm:order-1" />
        )}

        {step < 8 ? (
          <button
            type="button"
            onClick={goNext}
            className="order-1 flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-gold-light sm:order-2 sm:ml-auto"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="order-1 flex items-center justify-center gap-2 rounded-lg bg-gold px-10 py-3.5 text-base font-semibold text-[#0a0a0a] hover:bg-gold-light disabled:opacity-60 sm:order-2 sm:ml-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
              </>
            ) : (
              "Submit My Application"
            )}
          </button>
        )}
      </div>
    </form>
  )
}
