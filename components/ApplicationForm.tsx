"use client"

import { useState } from "react"

interface ApplicationFormProps {
  onSubmit: () => void
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [wasReferred, setWasReferred] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    phone: "",
    email: "",
    hasPassport: "",
    jobInterest: "",
    workExperience: "",
    hasCV: "",
    workedAbroad: "",
    referrerName: "",
    referrerPhone: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - no backend call
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-xl">
      {/* Personal Details */}
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
            <label htmlFor="country" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Country of Residence <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              placeholder="e.g., South Africa"
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

      {/* Job Preferences */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0a0a0a] mb-6 pb-2 border-b border-gray-200">
          Job Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="jobInterest" className="block text-sm font-medium text-[#0a0a0a] mb-1">
              Job Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="jobInterest"
              name="jobInterest"
              required
              value={formData.jobInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Select a job type</option>
              <option value="warehouse">Warehouse Worker</option>
              <option value="food-production">Food Production</option>
              <option value="agriculture">Agriculture</option>
              <option value="general-labour">General Labour</option>
              <option value="driver">Driver</option>
              <option value="other">Other</option>
            </select>
          </div>

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

      {/* Referral Section */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gold text-[#0a0a0a] py-4 rounded-lg font-semibold text-lg hover:bg-gold-light transition-all duration-300"
      >
        Submit Application
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting this form, you agree to be contacted by our team regarding job opportunities.
      </p>
    </form>
  )
}
