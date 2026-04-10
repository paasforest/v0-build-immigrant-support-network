import Link from "next/link"
import { Check } from "lucide-react"
import RichParagraph from "@/components/RichParagraph"
import GuideTableOfContents from "@/components/GuideTableOfContents"
import type { Guide, SectionCtaButton, SupportHighlightPoint } from "@/lib/guides-data"
import {
  estimateReadingMinutes,
  estimateWordCount,
  guidesList,
  headingToAnchorId,
} from "@/lib/guides-data"

type GuideArticleViewProps = {
  guide: Guide
  slug: string
}

function SectionCtaButtons({ buttons }: { buttons: SectionCtaButton[] }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      {buttons.map((b) => {
        const primary = b.primary !== false
        return (
          <Link
            key={`${b.href}-${b.label}`}
            href={b.href}
            className={
              primary
                ? "inline-flex min-w-[200px] justify-center rounded bg-gold px-8 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
                : "inline-flex min-w-[200px] justify-center rounded border border-gold/50 px-6 py-3 font-semibold text-gold hover:bg-gold/10"
            }
          >
            {b.label}
          </Link>
        )
      })}
    </div>
  )
}

function SupportHighlightsCard({ intro, points }: { intro: string; points: SupportHighlightPoint[] }) {
  return (
    <div className="mt-4 rounded-xl border border-[#2a2a2a] bg-[#131313] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-8">
      <p className="text-[15px] leading-relaxed text-white/78">{intro}</p>
      <ul className="mt-8 space-y-7">
        {points.map((pt) => (
          <li key={pt.title} className="flex gap-3.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} aria-hidden />
              <div className="min-w-0">
              <p className="font-medium text-white">{pt.title}</p>
              <div className="mt-1.5 [&_p]:mb-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/68">
                <RichParagraph text={pt.body} />
              </div>
              {pt.linkAfter ? (
                <Link
                  href={pt.linkAfter.href}
                  className="mt-2 inline-block text-sm font-medium text-gold/90 hover:text-gold hover:underline"
                >
                  {pt.linkAfter.label}
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProcessStartApplyCta() {
  return (
    <div className="mt-10 rounded-lg border border-white/[0.08] bg-[#0f0f0f] px-6 py-8 text-center md:px-8">
      <p className="text-base text-white/80">Ready to start your process?</p>
      <Link
        href="/apply"
        className="mt-5 inline-flex rounded-md bg-gold px-10 py-3 text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:bg-gold-light"
      >
        Apply Now
      </Link>
    </div>
  )
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
        Apply today — we respond within 24 hours (business days). Fill in all details so we can help you faster.
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
  const wordCount = estimateWordCount(guide)
  const wordsLabel = wordCount.toLocaleString("en-ZA")
  const showToc = guide.showTableOfContents === true
  const showFooterCard = guide.showDefaultFooterApplyCard !== false

  const tocHeadings = guide.sections.map((s) => ({
    id: headingToAnchorId(s.h2),
    title: s.h2,
  }))

  const mainCard = (
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

      {guide.sections.map((section) => {
        const anchor = headingToAnchorId(section.h2)
        return (
          <section key={section.h2} id={anchor} className="mb-10 scroll-mt-28">
            <h2 className="font-serif text-xl font-semibold text-gold md:text-2xl">{section.h2}</h2>
            {section.supportCard ? (
              <>
                <SupportHighlightsCard intro={section.supportCard.intro} points={section.supportCard.points} />
                <ProcessStartApplyCta />
              </>
            ) : (
              section.paragraphs.map((p, i) => (
                <RichParagraph key={i} text={p} />
              ))
            )}
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
            {section.customCtas && section.customCtas.length > 0 ? (
              <SectionCtaButtons buttons={section.customCtas} />
            ) : null}
            {(!section.customCtas || section.customCtas.length === 0) && section.ctaAfter ? (
              <ApplyNowCta className="mt-8" />
            ) : null}
          </section>
        )
      })}

      {showFooterCard ? (
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
      ) : null}
    </div>
  )

  const relatedBlock =
    related.length > 0 ? (
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
    ) : null

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
          <p className="mt-2 text-sm text-white/45" aria-label="Word count and estimated reading time">
            {wordsLabel} words · {minutes} min read
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

      {showToc ? (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:items-start lg:gap-10">
            <GuideTableOfContents headings={tocHeadings} />
            <div className="min-w-0">
              {mainCard}
              {relatedBlock}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {mainCard}
          {relatedBlock}
        </div>
      )}
    </article>
  )
}
