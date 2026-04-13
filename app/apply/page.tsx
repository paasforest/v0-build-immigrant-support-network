"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import CandidateApplicationForm from "@/components/CandidateApplicationForm"
import { Check } from "lucide-react"

function FormFallback() {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-white p-8 text-center text-[#0a0a0a]/60">Loading form…</div>
  )
}

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [applicantFullName, setApplicantFullName] = useState("")
  const [applicantFirstName, setApplicantFirstName] = useState("")

  const waProofHref = `https://wa.me/27774388845?text=${encodeURIComponent(
    `Hi, I just applied and have made my R300 payment. My name is ${applicantFullName}.`
  )}`

  if (submitted) {
    return (
      <section className="min-h-[80vh] bg-[#0a0a0a] py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg md:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15">
                <Check className="h-10 w-10 text-gold" strokeWidth={2.5} aria-hidden />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0a0a0a] md:text-3xl">Application Submitted</h2>
              <p className="mt-4 text-left text-[15px] leading-relaxed text-[#0a0a0a]/80">
                Thank you, <span className="font-semibold text-[#0a0a0a]">{applicantFirstName}</span>. Your application has
                been received and added to our candidate database.
              </p>
              <p className="mt-3 text-left text-[15px] leading-relaxed text-[#0a0a0a]/80">
                Due to high demand, only candidates who complete their registration and submit all required documents are
                prioritised for employer matching.
              </p>
              <p className="mt-3 text-left text-[15px] leading-relaxed text-[#0a0a0a]/80">
                Our team reviews applications daily. Shortlisted candidates are contacted within 24–48 hours.
              </p>
            </div>

            <div className="rounded-xl border-2 border-gold/50 bg-gold/5 p-6">
              <h3 className="text-center font-serif text-lg font-semibold text-[#0a0a0a] md:text-xl">
                Secure Your Place — R300 Registration
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/85">
                To be included in our active matching pool, complete your <strong>R300</strong> registration payment via
                EFT:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#0a0a0a]">
                <li className="flex justify-between gap-4 border-b border-neutral-200 pb-2">
                  <span className="text-[#0a0a0a]/60">Bank</span>
                  <span className="font-medium">Absa</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-neutral-200 pb-2">
                  <span className="text-[#0a0a0a]/60">Account name</span>
                  <span className="max-w-[55%] text-right font-medium">Immigrant Support Network</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-neutral-200 pb-2">
                  <span className="text-[#0a0a0a]/60">Account number</span>
                  <span className="font-mono font-medium tabular-nums">4115223741</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-neutral-200 pb-2">
                  <span className="text-[#0a0a0a]/60">Branch code</span>
                  <span className="font-mono font-medium tabular-nums">632005</span>
                </li>
                <li className="flex justify-between gap-4 pt-1">
                  <span className="text-[#0a0a0a]/60">Reference</span>
                  <span className="text-right font-semibold text-gold">{applicantFullName || "Your Full Name"}</span>
                </li>
              </ul>
              <p className="mt-4 text-center text-sm text-[#0a0a0a]/70">
                After payment, send proof of payment via WhatsApp to confirm your registration:
              </p>
              <a
                href={waProofHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition hover:opacity-95"
              >
                Send Proof of Payment → +27774388845
              </a>
            </div>

            <div className="mt-10">
              <h3 className="text-center font-serif text-lg font-semibold text-[#0a0a0a]">While You Wait</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Link
                  href="/cv-services"
                  className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-4 text-center text-sm font-medium text-[#0a0a0a] hover:bg-gold/20"
                >
                  Get Your CV Written in European Format →
                </Link>
                <Link
                  href="/visa-services"
                  className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-4 text-center text-sm font-medium text-[#0a0a0a] hover:bg-gold/20"
                >
                  Learn About the Visa Process →
                </Link>
                <Link
                  href="/blog/how-to-apply-work-abroad-from-africa"
                  className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-4 text-center text-sm font-medium text-[#0a0a0a] hover:bg-gold/20"
                >
                  Read Our Work Abroad Guide →
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-[#0a0a0a]/65">
              Did you refer someone? Ask them to mention your name when they apply to qualify for priority processing.
            </p>

            <p className="mt-6 border-t border-neutral-200 pt-6 text-center text-xs text-[#0a0a0a]/55">
              We do not guarantee job placement or visa approval. We provide recruitment and application support services.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setApplicantFullName("")
                setApplicantFirstName("")
              }}
              className="mt-8 w-full rounded-lg border border-neutral-300 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-neutral-50"
            >
              Submit another application
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="border-b border-[#2a2a2a] bg-[#0a0a0a] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">Candidate Application</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
            Complete your profile below. Only shortlisted candidates will be contacted within 24–48 hours.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-gold/35 bg-gold/10 px-4 py-4 text-left text-sm text-white/90 md:px-6">
            <ul className="space-y-2">
              <li>✔ R300 registration fee</li>
              <li>✔ All African nationalities welcome</li>
              <li>✔ Pre-screened candidates get priority matching</li>
              <li>✔ Response within 24–48 hours</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-10 pb-20 md:py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<FormFallback />}>
            <CandidateApplicationForm
              onSuccess={({ fullName, firstName }) => {
                setApplicantFullName(fullName)
                setApplicantFirstName(firstName)
                setSubmitted(true)
              }}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}
