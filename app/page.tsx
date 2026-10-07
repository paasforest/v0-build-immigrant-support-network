import type { Metadata } from "next"
import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import CtaBand from "@/components/CtaBand"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { siteConfig, siteUrl } from "@/lib/site-config"
import { applicationServices, problemServices, destinations } from "@/lib/visa-catalog"

const title = "Immigrant Support Network | Overseas Visa Assistance"

export const metadata: Metadata = {
  title: { absolute: title },
  description: siteConfig.shortDescription,
  alternates: { canonical: "/" },
  openGraph: { title, description: siteConfig.shortDescription, url: siteUrl },
}

const problemExtras = [
  {
    href: "/visa-assessment?type=appointment_problem",
    label: "Appointment & application-centre problems",
    short: "Booking difficulties, rejected submissions or delays at a visa centre",
  },
  {
    href: "/visa-assessment?type=complex_case",
    label: "Complex visa situations",
    short: "Previous refusals, urgent travel, family applications or unusual circumstances",
  },
]

const destinationNotes: Record<string, string> = {
  schengen:
    "Short-stay visas for the 29 Schengen countries, applied for through the consulate of your main destination.",
  uk: "UK visitor and other visas, applied for online with biometrics at a visa application centre.",
  usa: "US visitor (B1/B2) and other non-immigrant visas: the DS-160 form and a consular interview.",
  canada: "Canadian visitor visas and other permits, applied for online with biometrics.",
}

const steps = [
  {
    title: "Tell us your situation",
    body: "Complete a short visa assessment: what you need help with, your destination and the basic facts. Upload a refusal letter or request letter if it relates to your problem.",
  },
  {
    title: "We review your case",
    body: "We read the information you sent and identify what your situation needs.",
  },
  {
    title: "We explain the service and quotation",
    body: "We contact you to explain the help we can offer, what it includes and our quotation. Government and visa-centre fees are explained separately.",
  },
  {
    title: "You decide",
    body: "There is no obligation. If you decide to proceed, we onboard you and collect your full documents at that stage.",
  },
]

const faqs = [
  {
    q: "Can you guarantee my visa?",
    a: "No. Only the relevant government authority can decide a visa application, and nobody can honestly guarantee the outcome. We help you prepare a complete, accurate and well-organised application, or respond properly to a problem.",
  },
  {
    q: "How much does your service cost?",
    a: "Visa cases differ a lot in complexity, so we do not publish fixed prices. After reviewing your assessment we explain the service your case needs and give you a quotation before you commit. Government, embassy and visa-centre fees are separate and are paid to those bodies.",
  },
  {
    q: "Can you help me find a job abroad?",
    a: "No. We do not find jobs, provide employment or connect people with employers. If you already have a genuine job offer and the employer's supporting documents, we can assist with the work visa application documents.",
  },
  {
    q: "My visa was refused. Can you still help?",
    a: "Yes, refusals are one of the main things we help with. We review the refusal letter and your previous application, explain what the reasons mean, and discuss whether and how to re-apply or what other options exist.",
  },
]

function ServiceList({ items }: { items: { href: string; label: string; short: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group block rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 transition-colors hover:border-gold/50"
          >
            <span className="font-semibold text-white group-hover:text-gold">{item.label}</span>
            <span className="mt-1 block text-sm text-white/60">{item.short}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* What we help with */}
      <section className="bg-[#0a0a0a] py-20" aria-labelledby="help-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 id="help-heading" className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Visa applications and <span className="text-gold">visa problem solving</span>
            </h2>
            <p className="mx-auto max-w-2xl text-white/65">
              Whether you are applying for the first time or something has gone wrong with an application, start with
              a professional assessment of your situation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gold">When there is a problem</h3>
              <p className="mb-5 text-sm text-white/60">
                Refusals, re-applications, document requests and verification are a central part of our work.
              </p>
              <ServiceList items={[...problemServices, ...problemExtras]} />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gold">New visa applications</h3>
              <p className="mb-5 text-sm text-white/60">
                Help choosing the right visa category, preparing documents and completing the application.
              </p>
              <ServiceList items={applicationServices} />
            </div>
          </div>
          <p className="mt-10 text-center">
            <Link href="/visa-services" className="font-medium text-gold hover:underline">
              See all visa services →
            </Link>
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-[#111111] py-20" aria-labelledby="destinations-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 id="destinations-heading" className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Destinations we assist with
            </h2>
            <p className="mx-auto max-w-2xl text-white/65">
              We focus on the Schengen area, the United Kingdom, the United States and Canada. For other countries,
              describe your situation in the assessment and we will tell you whether we can help.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={d.href}
                className="group rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6 transition-colors hover:border-gold/50"
              >
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-gold">{d.label}</h3>
                <p className="text-sm leading-relaxed text-white/60">{destinationNotes[d.slug]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0a0a0a] py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 id="how-heading" className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-white/65">Assessment first, quotation second, and no obligation in between.</p>
          </div>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-6">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold font-serif font-bold text-gold">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/visa-assessment"
              className="rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] transition-colors hover:bg-gold-light"
            >
              Start Your Assessment
            </Link>
            <Link href="/how-it-works" className="font-medium text-gold hover:underline">
              More about how we work →
            </Link>
          </div>
        </div>
      </section>

      {/* Fees and FAQ */}
      <section className="bg-[#111111] py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="mb-10 text-center font-serif text-3xl font-bold text-white md:text-4xl">
            Common questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
                <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-gold transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-white/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <VisaDisclaimer />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
