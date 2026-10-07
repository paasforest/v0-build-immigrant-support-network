import type { Metadata } from "next"
import Link from "next/link"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import SimplePageHeader from "@/components/SimplePageHeader"
import { guides } from "@/lib/guides"
import { breadcrumbLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Visa Guides",
  description:
    "Plain-language guides on overseas visa problems: what to do after a refusal, responding to document requests, and appointment or application-centre problems.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Visa Guides | Immigrant Support Network",
    description: "Plain-language guides on visa refusals, document requests and appointment problems.",
    url: "/guides",
  },
}

export default function GuidesHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ href: "/guides", label: "Guides" }])} />
      <SimplePageHeader
        crumb="Guides"
        title={
          <>
            Visa <span className="text-gold">Guides</span>
          </>
        }
        intro={
          <p>
            Plain-language guides on common visa problems. They are general information; for help with your own case,
            start a visa assessment.
          </p>
        }
      />
      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-4">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group block rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6 transition-colors hover:border-gold/50"
                >
                  <h2 className="font-serif text-xl font-bold text-white group-hover:text-gold md:text-2xl">{g.title}</h2>
                  <p className="mt-2 leading-relaxed text-white/65">{g.description}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-gold">Read the guide →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
