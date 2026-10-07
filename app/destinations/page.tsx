import type { Metadata } from "next"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import LinkCardGrid from "@/components/LinkCardGrid"
import SimplePageHeader from "@/components/SimplePageHeader"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { destinations } from "@/lib/visa-catalog"
import { breadcrumbLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Visa Destinations",
  description:
    "Visa assistance for the Schengen area, the United Kingdom, the United States and Canada: applications, refusals and re-applications.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Visa Destinations | Immigrant Support Network",
    description: "Schengen, UK, US and Canadian visa assistance.",
    url: "/destinations",
  },
}

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ href: "/destinations", label: "Destinations" }])} />
      <SimplePageHeader
        crumb="Destinations"
        title={
          <>
            Visa <span className="text-gold">Destinations</span>
          </>
        }
        intro={
          <>
            <p>
              We focus on the destinations we know well: the Schengen area, the United Kingdom, the United States and
              Canada. Each has its own application system, documents and refusal procedures.
            </p>
            <p>
              Travelling somewhere else? Choose &ldquo;Other country&rdquo; in the visa assessment and tell us about
              your situation. We will be honest about whether we can help.
            </p>
          </>
        }
      />
      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
          <LinkCardGrid items={[...destinations]} columns={2} />
          <VisaDisclaimer />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
