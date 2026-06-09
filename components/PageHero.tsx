import SiteImage from "@/components/SiteImage"

type PageHeroProps = {
  title: React.ReactNode
  subtitle: string
  imageSrc: string
  imageAlt: string
  minHeight?: string
}

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  minHeight = "min-h-[38vh] md:min-h-[44vh]",
}: PageHeroProps) {
  return (
    <section className={`relative flex ${minHeight} items-center justify-center overflow-hidden py-14 md:py-16`}>
      <div className="absolute inset-0">
        <SiteImage
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/92 to-[#0a0a0a]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-5 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">{subtitle}</p>
      </div>
    </section>
  )
}
