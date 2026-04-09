import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import RichParagraph from "@/components/RichParagraph"
import { GUIDES, guideSlugs, guidesList } from "@/lib/guides-data"
import { siteConfig } from "@/lib/site-config"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${siteConfig.url}/guides/${slug}`,
      type: "article",
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) notFound()

  const others = guidesList.filter((g) => g.slug !== slug).slice(0, 4)

  return (
    <article className="min-h-screen bg-[#0a0a0a]">
      <div className="border-b border-[#2a2a2a] bg-[#111111]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/50">
            <Link href="/guides" className="hover:text-gold">
              Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{guide.title}</span>
          </nav>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">{guide.title}</h1>
          <p className="mt-3 text-lg text-white/65">{guide.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-6 md:p-8">
          <RichParagraph text={guide.intro} />

          <div className="my-8 flex flex-wrap gap-3 border-y border-[#2a2a2a] py-6">
            <span className="text-sm text-white/50">Quick links:</span>
            <Link href="/apply" className="text-sm font-medium text-gold hover:underline">
              Apply
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-gold hover:underline">
              Jobs
            </Link>
            <Link href="/visa-services" className="text-sm font-medium text-gold hover:underline">
              Visa services
            </Link>
            <Link href="/work-abroad" className="text-sm font-medium text-gold hover:underline">
              Work abroad
            </Link>
            <Link href="/cv-services" className="text-sm font-medium text-gold hover:underline">
              CV services
            </Link>
          </div>

          {guide.sections.map((section) => (
            <section key={section.h2} className="mb-10 scroll-mt-24">
              <h2 className="font-serif text-xl font-semibold text-gold md:text-2xl">{section.h2}</h2>
              {section.paragraphs.map((p, i) => (
                <RichParagraph key={i} text={p} />
              ))}
            </section>
          ))}

          <div className="rounded-lg bg-gold/10 p-6 md:p-8">
            <h2 className="font-serif text-xl font-semibold text-white">Ready to take the next step?</h2>
            <p className="mt-2 text-white/75">
              Submit your details and preferred destination — we help you connect with employers and prepare your
              application.
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-block rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
            >
              Apply here
            </Link>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-white">Related guides</h2>
            <ul className="mt-4 space-y-3">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-gold hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
