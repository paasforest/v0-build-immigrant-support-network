import SiteImage from "@/components/SiteImage"

type PageHeroProps = {
  title: React.ReactNode
  subtitle: string
  imageSrc: string
  imageAlt: string
  /** Lighter overlay for brighter photos */
  overlay?: "dark" | "medium"
  minHeight?: string
}

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  overlay = "dark",
  minHeight = "min-h-[42vh] md:min-h-[48vh]",
}: PageHeroProps) {
  const overlayClass =
    overlay === "medium" ? "bg-[#0a0a0a]/72" : "bg-[#0a0a0a]/78"

  return (
    <section className={`relative flex ${minHeight} items-center justify-center py-16 md:py-20`}>
      <div className="absolute inset-0">
        <SiteImage src={imageSrc} alt={imageAlt} fill priority sizes="100vw" />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-5 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">{subtitle}</p>
      </div>
    </section>
  )
}
