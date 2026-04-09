import type { Metadata } from "next"
import Link from "next/link"
import { guidesList } from "@/lib/guides-data"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog — Work Abroad Tips & Visa Help",
  description: `Practical articles on jobs in Europe, visas, and moving from Africa — from ${siteConfig.name}. Plain language guides updated regularly.`,
  alternates: { canonical: "/blog" },
  keywords: [
    "how to go abroad from Africa",
    "farm jobs in Europe apply now",
    "visa sponsorship jobs Europe",
    "jobs in Poland for foreigners",
  ],
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="border-b border-[#2a2a2a] bg-gradient-to-b from-[#111111] to-[#0a0a0a] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">
            Blog & <span className="text-gold">guides</span>
          </h1>
          <p className="mt-4 text-lg text-white/70">
            We publish simple, honest articles for people searching things like{" "}
            <strong className="text-white/90">how can I go to Poland for work from Africa</strong>,{" "}
            <strong className="text-white/90">warehouse jobs in Europe</strong>, and{" "}
            <strong className="text-white/90">visa costs</strong>. Everything here supports our recruitment and visa
            support services — <strong className="text-white/90">not</strong> embassy decisions.
          </p>
          <Link
            href="/guides"
            className="mt-8 inline-block text-gold font-semibold hover:underline"
          >
            Browse all guides →
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-white">Latest guides</h2>
          <ul className="mt-6 space-y-4">
            {guidesList.map((g) => (
              <li key={g.slug}>
                <article className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 transition-colors hover:border-gold/40">
                  <h3 className="font-semibold text-white">
                    <Link href={`/guides/${g.slug}`} className="hover:text-gold">
                      {g.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{g.description}</p>
                  <Link href={`/guides/${g.slug}`} className="mt-3 inline-block text-sm font-medium text-gold hover:underline">
                    Read guide
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-lg border border-gold/30 bg-[#111111] p-6 text-center">
            <p className="text-white/80">
              <strong className="text-white">Consistency builds ranking.</strong> We add and refresh content regularly.
              When you are ready to move from reading to applying:
            </p>
            <Link
              href="/apply"
              className="mt-4 inline-block rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
            >
              Apply here
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
