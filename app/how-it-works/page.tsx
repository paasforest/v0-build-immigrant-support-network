import type { Metadata } from "next"
import Link from "next/link"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import SimplePageHeader from "@/components/SimplePageHeader"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { breadcrumbLd, faqLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Immigrant Support Network works: a free visa assessment, a review of your case, a written quotation, and onboarding only if you decide to proceed.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works | Immigrant Support Network",
    description: "Assessment first, quotation second, and no obligation in between.",
    url: "/how-it-works",
  },
}

const steps = [
  {
    title: "Choose what you need help with",
    body: "Start the visa assessment and choose your situation: a new application, a refusal, a re-application, a document request, a verification issue, an appointment problem, or something more complex.",
  },
  {
    title: "Tell us the basics",
    body: "Answer a few questions about your destination, visa type and situation. We only ask for basic information at this stage. We do not ask for your passport number, ID number, bank statements or any portal password.",
  },
  {
    title: "Upload a document, only if it is relevant",
    body: "If your case is about a specific letter, such as a refusal letter or a request for documents, you can upload it. Uploads are stored privately and are only accessible to our team.",
  },
  {
    title: "Submit and receive a reference",
    body: "When you submit, you receive a case reference (for example ISN-2026-000123). Please quote it whenever you contact us.",
  },
  {
    title: "We review your case",
    body: "Our team reads your assessment and any document you uploaded, and works out what your situation needs.",
  },
  {
    title: "We contact you",
    body: "We get in touch by your preferred method to discuss your situation, ask any follow-up questions and explain the options honestly, including if we think we cannot help.",
  },
  {
    title: "You receive a written quotation",
    body: "If we can help, we explain the scope of work and send a written quotation. Government, embassy and visa-centre fees are explained separately; they are not part of our fee.",
  },
  {
    title: "You decide",
    body: "There is no obligation. If you decide to go ahead, we onboard you and only then collect the full documents your application needs, through a private channel.",
  },
]

const faqs = [
  {
    q: "Is the assessment free?",
    a: "Yes. Submitting a visa assessment costs nothing and does not commit you to anything.",
  },
  {
    q: "Why don't you publish prices?",
    a: "A simple visitor application and a case with several previous refusals need very different amounts of work. Rather than publish prices that would not fit most cases, we quote in writing after understanding your situation.",
  },
  {
    q: "Who submits the visa application?",
    a: "You do, through the official channel for your destination. We help you prepare; you stay in control of your application and your accounts. We never ask for your portal passwords.",
  },
  {
    q: "Can you guarantee the outcome or speed things up?",
    a: "No. Decisions and processing times are controlled by the relevant government authority. Anyone who guarantees a visa or an appointment should be treated with caution.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ href: "/how-it-works", label: "How It Works" }]), faqLd(faqs)]} />
      <SimplePageHeader
        crumb="How It Works"
        title={
          <>
            How It <span className="text-gold">Works</span>
          </>
        }
        intro={<p>Assessment first, quotation second, and no obligation in between.</p>}
      />

      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold font-serif font-bold text-gold">
                  {i + 1}
                </span>
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-white">{step.title}</h2>
                  <p className="leading-relaxed text-white/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/visa-assessment"
              className="inline-block rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] transition-colors hover:bg-gold-light"
            >
              Start Your Assessment
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">Common questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-lg border border-[#2a2a2a] bg-[#111111] p-5">
                  <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-white/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
          <VisaDisclaimer />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
