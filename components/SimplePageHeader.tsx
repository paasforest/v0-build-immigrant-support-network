import Link from "next/link"

/** Text-only page header with breadcrumb, used on content pages. */
export default function SimplePageHeader({
  title,
  intro,
  crumb,
}: {
  title: React.ReactNode
  intro?: React.ReactNode
  crumb?: string
}) {
  return (
    <section className="bg-[#0a0a0a] pb-12 pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {crumb ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/80">{crumb}</li>
            </ol>
          </nav>
        ) : null}
        <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">{title}</h1>
        {intro ? <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">{intro}</div> : null}
      </div>
    </section>
  )
}
