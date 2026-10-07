import type { Metadata } from "next"
import { Suspense } from "react"
import VisaAssessmentForm from "@/components/visa-assessment/VisaAssessmentForm"

export const metadata: Metadata = {
  title: "Get a Visa Assessment",
  description:
    "Tell us about your visa application or visa problem — refusal, re-application, additional documents, verification or appointment issues — and our team will review your situation.",
  alternates: { canonical: "/visa-assessment" },
  openGraph: {
    title: "Get a Visa Assessment | Immigrant Support Network",
    description:
      "Start your visa assessment: new applications, refusals, re-applications, document requests, verification and appointment problems.",
  },
}

export default function VisaAssessmentPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 pt-28 md:pt-32">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visa assessment</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-4xl">Get a Visa Assessment</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Tell us about your application or visa problem. It takes a few minutes. We only ask for basic information
            now — we never ask for passport numbers, bank statements or portal passwords at this stage.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/55">
            Submitting an assessment is free and does not commit you to anything. If we can help, we will explain what
            is involved and send a written quotation before any work starts.
          </p>
        </header>
        <Suspense fallback={<div className="rounded-xl border bg-white p-8 text-center text-neutral-500">Loading form…</div>}>
          <VisaAssessmentForm />
        </Suspense>
      </div>
    </div>
  )
}
