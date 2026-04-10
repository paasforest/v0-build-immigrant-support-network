import Link from "next/link"
import RichParagraph from "@/components/RichParagraph"
import type { Guide } from "@/lib/guides-data"
import { estimateReadingMinutes, guidesList } from "@/lib/guides-data"

type GuideArticleViewProps = {
  guide: Guide
  slug: string
}

function ApplyNowCta({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-gold/40 bg-gold/5 p-6 text-center ${className}`}
    >
      <Link
        href="/apply"
        className="inline-block rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
      >
        Apply Now
      </Link>
      <p className="mt-3 text-sm text-white/60">
        Serious applicants only — fill in all details and respond quickly when we contact you.
      </p>
    </div>
  )
}

export default function GuideArticleView({ guide, slug }: GuideArticleViewProps) {
  const pinned =
    guide.relatedSlugs
      ?.map((s) => guidesList.find((g) => g.slug === s))
      .filter((g): g is (typeof guidesList)[number] => g != null) ?? null
  const related =
    pinned && pinned.length > 0 ? pinned : guidesList.filter((g) => g.slug !== slug).slice(0, 4)

  const minutes = guide.readingTimeMinutes ?? estimateReadingMinutes(guide)

  return (
    <article className="min-h-screen bg-[#0a0a0a]">
      <div className="border-b border-[#2a2a2a] bg-[#111111]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/50" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-gold">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{guide.title}</span>
          </nav>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">{guide.title}</h1>
          <p className="mt-3 text-lg text-white/65">{guide.description}</p>
          <p className="mt-2 text-sm text-white/45" aria-label="Estimated reading time">
            {minutes} min read
          </p>
        </div>
      </div>

      {guide.heroImage ? (
        <figure className="border-b border-[#2a2a2a] bg-[#0a0a0a]">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <img
              src={guide.heroImage.url}
              alt={guide.heroImage.alt}
              width={1600}
              height={900}
              className="max-h-[min(50vh,440px)] w-full rounded-lg object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </figure>
      ) : null}

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
              {section.image ? (
                <figure className="my-8 overflow-hidden rounded-lg border border-[#2a2a2a]">
                  <img
                    src={section.image.url}
                    alt={section.image.alt}
                    width={1200}
                    height={800}
                    className="max-h-[380px] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ) : null}
              {section.ctaAfter ? <ApplyNowCta className="mt-8" /> : null}
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

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-white">Related guides</h2>
            <ul className="mt-4 space-y-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={`/blog/${g.slug}`} className="text-gold hover:underline">
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
