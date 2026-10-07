import type { Metadata } from "next"
import Link from "next/link"
import PageHero from "@/components/PageHero"
import CtaBand from "@/components/CtaBand"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { people } from "@/lib/site-images"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Immigrant Support Network: an overseas visa assistance service helping clients prepare visa applications and resolve visa problems such as refusals, document requests and verification.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Immigrant Support Network",
    description:
      "An overseas visa assistance service: application preparation and visa problem solving for Schengen, UK, USA and Canada.",
  },
}

const principles = [
  {
    title: "Honest assessment",
    description:
      "We tell you what we see in your case, including weaknesses and risks. We do not promise outcomes that only a government authority can decide.",
  },
  {
    title: "Clear scope before you commit",
    description:
      "After reviewing your situation we explain what help you need, what it includes and our quotation. You decide whether to proceed.",
  },
  {
    title: "Careful with your information",
    description:
      "We ask only for what we need at each stage. Sensitive documents are collected later, during onboarding, through private channels.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={
          <>
            About <span className="text-gold">Immigrant Support Network</span>
          </>
        }
        subtitle="Overseas visa assistance: preparing visa applications and helping clients deal with visa problems."
        imageSrc={people.visaJourney}
        imageAlt="Traveller preparing documents for a visa application"
      />

      <section className="bg-[#111111] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">What we do</h2>
          <div className="space-y-4 leading-relaxed text-white/75">
            <p>
              {siteConfig.name} (ISN) helps people prepare and navigate overseas visa applications, with a focus on
              the Schengen area, the United Kingdom, the United States and Canada.
            </p>
            <p>
              Our work covers two areas. The first is <strong className="text-white">application assistance</strong>:
              understanding which visa category fits your trip, building a complete and well-organised document set,
              completing forms accurately with you, and preparing for your appointment.
            </p>
            <p>
              The second is <strong className="text-white">visa problem solving</strong>: reviewing a refusal,
              preparing a stronger re-application, responding to requests for additional documents or verification,
              and dealing with appointment or application-centre problems. Many of the people who contact us already
              have a problem with an application, and these cases are a central part of our work.
            </p>
            <p>
              We are based in {siteConfig.location} and work with clients by WhatsApp, phone and email.
            </p>
          </div>

          <h2 className="mb-6 mt-14 font-serif text-3xl font-bold text-white md:text-4xl">How we work</h2>
          <ol className="list-decimal space-y-3 pl-5 leading-relaxed text-white/75">
            <li>
              You submit a short{" "}
              <Link href="/visa-assessment" className="text-gold hover:underline">
                visa assessment
              </Link>{" "}
              describing your situation.
            </li>
            <li>We review the information and contact you about the next steps.</li>
            <li>We explain the service your case needs, what it includes and our quotation.</li>
            <li>If you decide to proceed, we onboard you and collect the full documentation at that stage.</li>
          </ol>
          <p className="mt-4 text-sm text-white/60">
            Submitting an assessment does not commit you to anything. We do not publish fixed prices because visa
            cases differ in complexity; any quotation is given after we understand your case.
          </p>

          <h2 className="mb-6 mt-14 font-serif text-3xl font-bold text-white md:text-4xl">What we do not do</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-white/75">
            <li>We do not find jobs, provide employment or connect people with employers.</li>
            <li>We do not guarantee visas, approvals or appointment dates.</li>
            <li>We do not ask for, or store, passwords for government or visa-centre portals.</li>
            <li>We do not represent ourselves as a government office, embassy, consulate or visa application centre.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-white md:text-4xl">Our principles</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-8">
                <h3 className="mb-3 text-xl font-semibold text-gold">{p.title}</h3>
                <p className="leading-relaxed text-white/65">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <VisaDisclaimer />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
