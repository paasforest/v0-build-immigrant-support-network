import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { findGuide, guides } from "@/lib/guides"
import { articleLd, breadcrumbLd } from "@/lib/structured-data"

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = findGuide((await params).slug)
  if (!guide) return {}
  const path = `/guides/${guide.slug}`
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: path,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  }
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = findGuide((await params).slug)
  if (!guide) notFound()
  const path = `/guides/${guide.slug}`

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { href: "/guides", label: "Guides" },
            { href: path, label: guide.title },
          ]),
          articleLd({ title: guide.title, description: guide.description, path, published: guide.published, updated: guide.updated }),
        ]}
      />
      <article>
        <header className="bg-[#0a0a0a] pb-10 pt-28 md:pt-36">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-gold">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/guides" className="hover:text-gold">Guides</Link></li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">{guide.title}</h1>
            <p className="mt-4 text-sm text-white/50">Updated {formatDate(guide.updated)}</p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
              {guide.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </header>

        <section className="bg-[#111111] py-14">
          <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
            {guide.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="mb-4 font-serif text-2xl font-bold text-white">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mb-4 leading-relaxed text-white/70">{p}</p>
                ))}
                {s.bullets ? (
                  <ul className="list-disc space-y-2 pl-6 text-white/70 marker:text-gold">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <div className="rounded-lg border border-gold/30 bg-gold/5 p-6">
              <p className="leading-relaxed text-white/75">
                This guide is general information, not advice for your specific case. Rules differ between countries
                and change over time; always check the official government website for your destination. For help with
                your own situation, see{" "}
                <Link href={guide.service.href} className="text-gold underline">{guide.service.label}</Link> or{" "}
                <Link href={guide.assessmentHref} className="text-gold underline">start a visa assessment</Link>.
              </p>
            </div>

            <VisaDisclaimer />
          </div>
        </section>
      </article>
      <CtaBand assessmentHref={guide.assessmentHref} />
    </>
  )
}
