import type { Metadata } from "next"
import Link from "next/link"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import LinkCardGrid from "@/components/LinkCardGrid"
import SimplePageHeader from "@/components/SimplePageHeader"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { applicationServices, destinations, problemServices } from "@/lib/visa-catalog"
import { breadcrumbLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Visa Services",
  description:
    "Overseas visa assistance: visa refusals, re-applications, additional document requests, verification issues, and new visitor, business, family, study and work visa applications.",
  alternates: { canonical: "/visa-services" },
  openGraph: {
    title: "Visa Services | Immigrant Support Network",
    description: "Visa application assistance and visa problem solving for the Schengen area, the UK, the USA and Canada.",
    url: "/visa-services",
  },
}

const otherProblems = [
  {
    href: "/visa-assessment?type=appointment_problem",
    label: "Appointment & application-centre problems",
    short: "Difficulty booking, a rejected submission, missing documents at the centre or other centre issues",
  },
  {
    href: "/visa-assessment?type=complex_case",
    label: "Complex visa situations",
    short: "Several previous refusals, urgent travel, family groups, previous overstays or other unusual circumstances",
  },
  {
    href: "/visa-assessment?type=general_assessment",
    label: "Not sure what you need?",
    short: "Describe your situation and we will tell you whether and how we can help",
  },
]

export default function VisaServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ href: "/visa-services", label: "Visa Services" }])} />
      <SimplePageHeader
        crumb="Visa Services"
        title={
          <>
            Visa <span className="text-gold">Services</span>
          </>
        }
        intro={
          <p>
            We help with two things: preparing overseas visa applications properly, and sorting out visa problems when
            something has gone wrong. Every case starts with a free assessment, so we understand your situation before
            recommending anything.
          </p>
        }
      />

      <section className="bg-[#111111] py-16" aria-labelledby="problems-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="problems-heading" className="mb-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Visa problems
          </h2>
          <p className="mb-6 text-white/60">Refusals, re-applications, document requests and verification.</p>
          <LinkCardGrid items={[...problemServices, ...otherProblems]} columns={3} />
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16" aria-labelledby="applications-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="applications-heading" className="mb-2 font-serif text-2xl font-bold text-white md:text-3xl">
            New visa applications
          </h2>
          <p className="mb-6 text-white/60">
            Choosing the right visa, preparing documents and completing the application.
          </p>
          <LinkCardGrid items={applicationServices} columns={3} />
          <p className="mt-6 text-sm text-white/55">
            We do not find jobs, provide employment or place students. Work visa assistance is only for applicants who
            already have a genuine job offer.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] py-16" aria-labelledby="destinations-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="destinations-heading" className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
            Destinations
          </h2>
          <LinkCardGrid items={[...destinations]} columns={4} />
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gold/30 bg-gold/5 p-6">
            <h2 className="mb-2 text-lg font-semibold text-white">Fees</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Cases differ, so we do not publish fixed prices. After reviewing your assessment, we explain what your
              case needs and send a written quotation before any work starts. Government, embassy and visa-centre fees
              are separate and are paid to those bodies.{" "}
              <Link href="/how-it-works" className="text-gold underline">How it works</Link>
            </p>
          </div>
          <VisaDisclaimer />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
