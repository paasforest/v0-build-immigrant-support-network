"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import emailjs from "@emailjs/browser"
import { AlertCircle, FileText, Loader2 } from "lucide-react"

const YOUR_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID"
const YOUR_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID"
const YOUR_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY"

interface ApplicationFormProps {
  onSuccess: (payload: { fullName: string }) => void
}

const destinations = [
  { value: "", label: "Select destination country" },
  { value: "Poland", label: "Poland" },
  { value: "Romania", label: "Romania" },
  { value: "Germany", label: "Germany" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Canada", label: "Canada" },
]

const jobTypes = [
  { value: "", label: "Select job type" },
  { value: "Agriculture", label: "Agriculture / Farm Work" },
  { value: "Warehouse", label: "Warehouse / Logistics" },
  { value: "Food Production", label: "Food Production" },
  { value: "Construction", label: "Construction" },
  { value: "Manufacturing", label: "Manufacturing / Factory" },
  { value: "Hospitality", label: "Hospitality / Hotels" },
  { value: "Healthcare", label: "Healthcare / Care Work" },
  { value: "Transport", label: "Transport / Driving" },
  { value: "Other", label: "Other" },
]

export default function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const searchParams = useSearchParams()
  const [wasReferred, setWasReferred] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    residenceCountry: "",
    phone: "",
    email: "",
    hasPassport: "",
    destinationCountry: "",
    jobType: "",
    specificPosition: "",
    workExperience: "",
    hasCV: "",
    needsCVHelp: "",
    workedAbroad: "",
    referrerName: "",
    referrerPhone: "",
  })

  useEffect(() => {
    const country = searchParams.get("country")
    const job = searchParams.get("job")
    const position = searchParams.get("position")

    if (country || job || position) {
      setFormData((prev) => ({
        ...prev,
        destinationCountry: country || prev.destinationCountry,
        jobType: job || prev.jobType,
        specificPosition: position || prev.specificPosition,
      }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSendError(null)
    setSending(true)

    const messageBody = [
      "NEW JOB APPLICATION",
      "",
      `Name: ${formData.fullName}`,
      `Country: ${formData.residenceCountry}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Has Passport: ${formData.hasPassport}`,
      `Destination: ${formData.destinationCountry}`,
      `Job Type: ${formData.jobType}`,
      formData.specificPosition ? `Position: ${formData.specificPosition}` : "",
      `Worked Abroad Before: ${formData.workedAbroad}`,
      "",
      "Experience:",
      formData.workExperience || "Not provided",
      "",
      `Has CV: ${formData.hasCV}`,
      formData.needsCVHelp === "yes" ? "Needs CV Help: Yes" : "",
      wasReferred ? `Referrer: ${formData.referrerName} / ${formData.referrerPhone}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    const templateParams: Record<string, string> = {
      title: "New Job Application",
      name: formData.fullName,
      email: formData.email,
      time: new Date().toLocaleString(),
      message: messageBody,
      full_name: formData.fullName,
      residence_country: formData.residenceCountry,
      phone: formData.phone,
      has_passport: formData.hasPassport,
      destination_country: formData.destinationCountry,
      job_type: formData.jobType,
      specific_position: formData.specificPosition || "—",
      work_experience: formData.workExperience || "Not provided",
      worked_abroad: formData.workedAbroad,
      has_cv: formData.hasCV,
      needs_cv_help: formData.needsCVHelp || "—",
      was_referred: wasReferred ? "yes" : "no",
      referrer_name: formData.referrerName || "—",
      referrer_phone: formData.referrerPhone || "—",
    }

    try {
      await emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, {
        publicKey: YOUR_PUBLIC_KEY,
      })
      onSuccess({ fullName: formData.fullName })
    } catch (err) {
      console.error("EmailJS error:", err)
      setSendError(
        "We could not send your application right now. Please check your connection and try again, or contact us on WhatsApp."
      )
    } finally {
      setSending(false)
    }
  }

  const showCVUpsell = formData.hasCV === "no" || formData.needsCVHelp === "yes"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-xl">
      {formData.specificPosition && (
        <div className="mb-6 bg-gold/10 border border-gold/30 rounded-lg p-4">
          <p className="text-[#0a0a0a] text-sm">
            <strong>Applying for:</strong> {formData.specificPosition} in {formData.destinationCountry}
          </p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0a0a0a] mb-6 pb-2 border-b border-gray-200">
          Personal Details
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="residenceCountry" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Country of Residence <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="residenceCountry"
              name="residenceCountry"
              required
              value={formData.residenceCountry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              placeholder="e.g., South Africa, Kenya, Nigeria"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              placeholder="+27 XX XXX XXXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0a0a0a] mb-2">
              Do you have a valid passport? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPassport"
                  value="yes"
                  required
                  checked={formData.hasPassport === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPassport"
                  value="no"
                  checked={formData.hasPassport === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0a0a0a] mb-6 pb-2 border-b border-gray-200">
          Job Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="destinationCountry" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Preferred Destination Country <span className="text-red-500">*</span>
            </label>
            <select
              id="destinationCountry"
              name="destinationCountry"
              required
              value={formData.destinationCountry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white"
            >
              {destinations.map((dest) => (
                <option key={dest.value} value={dest.value}>
                  {dest.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              <Link href="/jobs" className="text-gold hover:underline">
                View available jobs by country
              </Link>
            </p>
          </div>

          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              name="jobType"
              required
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white"
            >
              {jobTypes.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </select>
          </div>

          {formData.specificPosition && (
            <div>
              <label htmlFor="specificPosition" className="block text-sm font-medium text-[#0a0a0a] mb-1">
                Specific Position
              </label>
              <input
                type="text"
                id="specificPosition"
                name="specificPosition"
                value={formData.specificPosition}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] bg-gray-50"
                readOnly
              />
            </div>
          )}

          <div>
            <label htmlFor="workExperience" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Work Experience
            </label>
            <textarea
              id="workExperience"
              name="workExperience"
              rows={4}
              value={formData.workExperience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Briefly describe your relevant work experience..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0a0a0a] mb-2">
              Have you worked abroad before? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="workedAbroad"
                  value="yes"
                  required
                  checked={formData.workedAbroad === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="workedAbroad"
                  value="no"
                  checked={formData.workedAbroad === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0a0a0a] mb-6 pb-2 border-b border-gray-200">
          CV / Resume
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0a0a0a] mb-2">
              Do you have a CV? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasCV"
                  value="yes"
                  required
                  checked={formData.hasCV === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasCV"
                  value="no"
                  checked={formData.hasCV === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">No</span>
              </label>
            </div>
          </div>

          {formData.hasCV === "yes" && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-[#0a0a0a] mb-2">
                Would you like help making your CV European-standard?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="needsCVHelp"
                    value="yes"
                    checked={formData.needsCVHelp === "yes"}
                    onChange={handleChange}
                    className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                  />
                  <span className="text-[#0a0a0a]">Yes, I&apos;d like professional help</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="needsCVHelp"
                    value="no"
                    checked={formData.needsCVHelp === "no"}
                    onChange={handleChange}
                    className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                  />
                  <span className="text-[#0a0a0a]">No, my CV is ready</span>
                </label>
              </div>
            </div>
          )}

          {showCVUpsell && (
            <div className="mt-4 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-5 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#0a0a0a] mb-1">
                    {formData.hasCV === "no"
                      ? "Need a Professional CV?"
                      : "Upgrade Your CV to European Standard"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    European employers expect CVs in a specific format. Our professional CV writing service
                    creates a polished, European-standard CV that increases your chances of getting hired.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-gold/20 text-[#0a0a0a] px-2 py-1 rounded">From R250</span>
                    <span className="text-xs bg-gold/20 text-[#0a0a0a] px-2 py-1 rounded">Fast Delivery</span>
                    <span className="text-xs bg-gold/20 text-[#0a0a0a] px-2 py-1 rounded">ATS-Optimized</span>
                  </div>
                  <Link
                    href="/cv-services"
                    className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:underline"
                  >
                    View CV Services
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> A well-formatted European CV significantly increases your chances
              of being selected. Many applications are rejected due to incorrect CV format.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0a0a0a] mb-6 pb-2 border-b border-gray-200">
          Referral Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0a0a0a] mb-2">
              Were you referred by someone?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wasReferred"
                  value="yes"
                  checked={wasReferred === true}
                  onChange={() => setWasReferred(true)}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wasReferred"
                  value="no"
                  checked={wasReferred === false}
                  onChange={() => setWasReferred(false)}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300"
                />
                <span className="text-[#0a0a0a]">No</span>
              </label>
            </div>
          </div>

          {wasReferred && (
            <div className="space-y-4 pt-2 animate-in slide-in-from-top-2 duration-300">
              <div>
                <label htmlFor="referrerName" className="block text-sm font-medium text-[#0a0a0a] mb-1">
                  Referrer Name
                </label>
                <input
                  type="text"
                  id="referrerName"
                  name="referrerName"
                  value={formData.referrerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter referrer's name"
                />
              </div>
              <div>
                <label htmlFor="referrerPhone" className="block text-sm font-medium text-[#0a0a0a] mb-1">
                  Referrer Phone
                </label>
                <input
                  type="tel"
                  id="referrerPhone"
                  name="referrerPhone"
                  value={formData.referrerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter referrer's phone number"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 bg-gradient-to-r from-gold/10 to-gold/5 border-2 border-gold rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Application Registration Fee</h3>
          <div className="text-3xl font-bold text-gold mb-2">R300</div>
          <p className="text-sm text-gray-600 mb-3">
            This fee covers profile processing, job matching, and placement assistance.
          </p>
          <p className="text-xs text-gray-500">Payment details will be provided after form submission.</p>
        </div>
      </div>

      {sendError && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {sendError}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-gold text-[#0a0a0a] py-4 rounded-lg font-semibold text-lg hover:bg-gold-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Submit Application"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting this form, you agree to be contacted by our team regarding job opportunities.
      </p>
    </form>
  )
}
