import Link from "next/link"
import SiteImage from "@/components/SiteImage"
import { people } from "@/lib/site-images"

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center"
      aria-label="African professionals pursuing international careers"
    >
      <div className="absolute inset-0">
        <SiteImage
          src={people.heroMain}
          alt="Diverse international professionals collaborating at work"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 font-serif text-4xl font-bold text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Work Abroad Opportunities <span className="text-gold">&</span> Visa Assistance
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-pretty text-lg text-white/80 sm:text-xl">
          Connecting African talent with international employers in Europe & Canada. We maintain a database of
          pre-screened, document-ready African candidates with verified profiles — ready for international employer
          matching. Start your journey to a better future today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/work-abroad"
            className="w-full rounded bg-gold px-8 py-4 text-lg font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light sm:w-auto"
          >
            Apply for Jobs
          </Link>
          <Link
            href="/visa-services"
            className="w-full rounded border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] sm:w-auto"
          >
            Visa Assistance
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
