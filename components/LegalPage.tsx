import JsonLd from "@/components/JsonLd"
import SimplePageHeader from "@/components/SimplePageHeader"
import { breadcrumbLd } from "@/lib/structured-data"

export const LEGAL_LAST_UPDATED = "7 October 2026"

/** Shared layout for legal and policy pages. Children are plain <h2>/<p>/<ul> content. */
export default function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string
  path: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ href: path, label: title }])} />
      <SimplePageHeader crumb={title} title={title} intro={intro ? <p>{intro}</p> : undefined} />
      <section className="bg-[#111111] py-16">
        <article
          className="mx-auto max-w-3xl px-4 text-white/75 sm:px-6 lg:px-8 [&_a]:text-gold [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <p className="text-sm text-white/50">Last updated: {LEGAL_LAST_UPDATED}</p>
          {children}
        </article>
      </section>
    </>
  )
}
