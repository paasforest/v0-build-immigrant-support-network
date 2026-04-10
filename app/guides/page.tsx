import type { Metadata } from "next"
import Link from "next/link"
import { guidesList } from "@/lib/guides-data"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Free Guides — Jobs & Visas in Europe from Africa",
  description: `${siteConfig.name}: practical guides on jobs in Poland, Romania, Hungary, visa costs, and applying for work abroad from Africa.`,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides — Work in Europe from Africa",
    description:
      "Jobs, visas, costs, and realistic steps — written in plain language. Recruitment agency support, not government advice.",
    url: `${siteConfig.url}/guides`,
  },
}

const prioritySlugs = new Set([
  "how-to-apply-work-abroad-from-africa",
  "easiest-europe-countries-for-africans",
  "jobs-in-poland-for-africans-2026",
  "jobs-in-romania-for-africans-2026",
  "jobs-in-hungary-for-foreign-workers",
])

export default function GuidesHubPage() {
  const priority = guidesList.filter((g) => prioritySlugs.has(g.slug))
  const rest = guidesList.filter((g) => !prioritySlugs.has(g.slug))

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="border-b border-[#2a2a2a] bg-gradient-to-b from-[#111111] to-[#0a0a0a] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">
            Guides: <span className="text-gold">Jobs & visas</span> from Africa
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Plain-language answers on <strong className="text-white/90">jobs in Poland</strong>,{" "}
            <strong className="text-white/90">Romania</strong>, <strong className="text-white/90">Hungary</strong>,{" "}
            costs, and <strong className="text-white/90">how to apply</strong>. {siteConfig.name} is a{" "}
            <strong className="text-white/90">recruitment agency</strong> — we help you apply to employers; we do not
            replace embassies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/apply"
              className="rounded bg-gold px-6 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
            >
              Apply here
            </Link>
            <Link
              href="/visa-services"
              className="rounded border border-gold px-6 py-3 font-semibold text-gold hover:bg-gold/10"
            >
              Visa services
            </Link>
            <Link href="/jobs" className="rounded border border-white/20 px-6 py-3 font-semibold text-white hover:border-gold">
              Job listings
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gold md:text-3xl">Start here (high priority)</h2>
          <ul className="mt-6 space-y-4">
            {priority.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/blog/${g.slug}`}
                  className="group block rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 transition-colors hover:border-gold/50"
                >
                  <span className="font-semibold text-white group-hover:text-gold">{g.title}</span>
                  <span className="mt-1 block text-sm text-white/60">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-serif text-2xl font-semibold text-white md:text-3xl">More guides</h2>
          <ul className="mt-6 space-y-4">
            {rest.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/blog/${g.slug}`}
                  className="group block rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 transition-colors hover:border-gold/50"
                >
                  <span className="font-semibold text-white group-hover:text-gold">{g.title}</span>
                  <span className="mt-1 block text-sm text-white/60">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center text-sm text-white/50">
            New articles are added regularly. For updates, check back or{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
