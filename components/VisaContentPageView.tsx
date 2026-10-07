import Link from "next/link"
import { Check, X } from "lucide-react"
import CtaBand from "@/components/CtaBand"
import JsonLd from "@/components/JsonLd"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/structured-data"
import type { VisaContentPage } from "@/lib/visa-pages"

/** Shared layout for visa service and destination pages. */
export default function VisaContentPageView({ page, path }: { page: VisaContentPage; path: string }) {
  const crumbs = [page.parent, { href: path, label: page.name }]
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          serviceLd({ name: page.h1, description: page.metaDescription, path }),
          ...(page.faqs.length ? [faqLd(page.faqs)] : []),
        ]}
      />

      <section className="bg-[#0a0a0a] pb-14 pt-28 md:pt-36">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={page.parent.href} className="hover:text-gold">{page.parent.label}</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/80">{page.name}</li>
            </ol>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">{page.h1}</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
            {page.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={page.assessmentHref}
              className="rounded bg-gold px-8 py-3 text-center font-semibold text-[#0a0a0a] transition-colors hover:bg-gold-light"
            >
              Get a Visa Assessment
            </Link>
            <Link
              href="/how-it-works"
              className="rounded border border-white/30 px-8 py-3 text-center font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          {page.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-4 leading-relaxed text-white/70">{p}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-6 text-white/70 marker:text-gold">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">How we can help</h2>
              <ul className="space-y-3">
                {page.weHelp.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">What we do not do</h2>
              <ul className="space-y-3">
                {page.weDont.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-gold/30 bg-gold/5 p-6">
            <h2 className="mb-2 text-lg font-semibold text-white">Fees</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We do not publish fixed prices because cases differ. After reviewing your assessment, we explain the
              service your case needs and send a written quotation before any work starts. Government, embassy and
              visa-centre fees are separate from our service fee and are paid to those bodies. Submitting an assessment
              is free. See our <Link href="/refund-policy" className="text-gold underline">refund policy</Link>.
            </p>
          </div>

          {page.faqs.length ? (
            <div>
              <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">Common questions</h2>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <details key={faq.q} className="group rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
                    <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {faq.q}
                        <span className="text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-white/70">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          {page.related.length ? (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">Related</h2>
              <ul className="flex flex-wrap gap-3">
                {page.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-block rounded border border-[#2a2a2a] px-4 py-2 text-sm text-white/80 hover:border-gold/50 hover:text-gold">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <VisaDisclaimer />
        </div>
      </section>

      <CtaBand title={page.ctaTitle} assessmentHref={page.assessmentHref} />
    </>
  )
}
