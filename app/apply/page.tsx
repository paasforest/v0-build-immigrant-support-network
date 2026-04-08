"use client"

import { useState, Suspense } from "react"
import ApplicationForm from "@/components/ApplicationForm"

function ApplicationFormWrapper({
  onSuccess,
}: {
  onSuccess: (payload: { fullName: string }) => void
}) {
  return (
    <Suspense fallback={<div className="bg-white rounded-lg p-8 text-center text-gray-500">Loading form...</div>}>
      <ApplicationForm onSuccess={onSuccess} />
    </Suspense>
  )
}

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [applicantFullName, setApplicantFullName] = useState("")

  if (submitted) {
    const proofMessage = encodeURIComponent(
      `Hi, I just submitted my application and made payment. Here is my proof of payment. Reference: ${applicantFullName}`
    )
    const whatsappProofHref = `https://wa.me/27774388845?text=${proofMessage}`

    return (
      <section className="min-h-[80vh] flex items-center justify-center py-20 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] p-8 md:p-12 rounded-lg border-2 border-gold">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Application Submitted!
              </h2>
              <p className="text-white/70">
                Your application has been emailed to our team. To complete your registration, please pay the R300
                application fee using the details below.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-gold/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gold mb-4 text-center">Registration Fee: R300</h3>
              <div className="space-y-3 text-white/80 text-sm">
                <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span className="text-white/60">Bank:</span>
                  <span className="font-medium">[Bank Name]</span>
                </div>
                <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span className="text-white/60">Account Number:</span>
                  <span className="font-medium">[Account Number]</span>
                </div>
                <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span className="text-white/60">Branch Code:</span>
                  <span className="font-medium">[Branch Code]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Reference:</span>
                  <span className="font-medium text-gold">{applicantFullName || "Your Full Name"}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gold/10 rounded text-center">
                <p className="text-xs text-white/70">
                  After payment, send proof of payment via WhatsApp to +27 77 438 8845 to confirm your registration.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappProofHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded font-semibold hover:bg-[#20BD5A] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send Proof of Payment
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setApplicantFullName("")
                }}
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded font-semibold border border-[#2a2a2a] hover:border-gold/50 transition-all duration-300"
              >
                Submit Another Application
              </button>
            </div>

            <p className="text-xs text-white/50 text-center mt-6">
              Need help? Contact us on WhatsApp: +27 77 438 8845
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Apply <span className="text-gold">Now</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Complete the form below to start your journey towards working abroad. Our team will review your application
            and contact you shortly.
          </p>
        </div>
      </section>

      <section className="py-12 pb-20 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationFormWrapper
            onSuccess={({ fullName }) => {
              setApplicantFullName(fullName)
              setSubmitted(true)
            }}
          />
        </div>
      </section>
    </>
  )
}
