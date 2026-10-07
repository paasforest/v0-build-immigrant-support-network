"use client"

import Link from "next/link"
import { CheckCircle2, MessageCircle } from "lucide-react"
import { whatsappLink, siteConfig } from "@/lib/site-config"
import { CONTACT_METHODS, labelFor } from "@/lib/visa-assessment/options"

type Props = {
  reference: string
  name: string
  preferredContact: string
}

export default function AssessmentConfirmation({ reference, name, preferredContact }: Props) {
  const firstName = name.trim().split(/\s+/)[0] || "there"
  const method = preferredContact ? labelFor(CONTACT_METHODS, preferredContact).toLowerCase() : "your preferred contact method"

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-sm md:p-10" role="status" aria-live="polite">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-14 w-14 text-green-600" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-neutral-900 md:text-3xl">Thank you, {firstName}</h2>
        <p className="mt-3 max-w-xl text-neutral-700">
          Your visa assessment has been received. Our team will review the information you provided and contact you
          by {method} regarding the next steps.
        </p>

        <div className="mt-6 w-full max-w-sm rounded-lg border border-[#C9A84C]/40 bg-[#C9A84C]/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Your case reference</p>
          <p className="mt-1 font-mono text-2xl font-bold text-neutral-900" data-testid="case-reference">
            {reference}
          </p>
          <p className="mt-1 text-xs text-neutral-600">Please quote this reference whenever you contact us.</p>
        </div>
      </div>

      <div className="mt-8 space-y-3 text-sm leading-relaxed text-neutral-700">
        <h3 className="font-semibold text-neutral-900">What happens next</h3>
        <ol className="list-decimal space-y-2 pl-5">
          <li>We review your answers and any document you uploaded.</li>
          <li>We contact you to discuss your situation and ask any follow-up questions.</li>
          <li>
            If we can help, we explain what the assistance would involve and send you a written quotation. Government,
            embassy and visa-centre fees are separate from our service fees.
          </li>
          <li>You decide whether to proceed. Submitting this assessment does not commit you to anything.</li>
        </ol>
        <p>
          Please do not send passwords for any government or visa portal. We will never ask for them.
        </p>
        <p className="text-xs text-neutral-500">
          Immigrant Support Network is a private visa assistance service, not a government office, embassy, consulate
          or visa application centre. Visa decisions are made only by the relevant authority, and our assistance does
          not guarantee approval.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappLink(`Hello ${siteConfig.shortName}, my visa assessment reference is ${reference}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C9A84C] px-5 py-3 font-semibold text-black hover:bg-[#b8973f]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Message us on WhatsApp
        </a>
        <Link
          href="/guides"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 font-semibold text-neutral-800 hover:bg-neutral-50"
        >
          Read our visa guides
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 font-semibold text-neutral-800 hover:bg-neutral-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
