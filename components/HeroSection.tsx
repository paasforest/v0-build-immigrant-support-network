import Link from "next/link"
import SiteImage from "@/components/SiteImage"
import { people } from "@/lib/site-images"

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0a0a0a]"
      aria-label="African candidates pursuing international careers"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_55%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div className="text-center lg:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <span aria-hidden>🌍</span> African candidates · Europe & Canada
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-balance text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            Your Path to <span className="text-gold">Work Abroad</span> Starts Here
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-white/80 lg:mx-0 sm:text-xl">
            We connect pre-screened African candidates with legal jobs in Europe and Canada — warehouse,
            agriculture, hospitality, manufacturing, and more. Build your profile. Get matched. Start your
            journey.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/apply"
              className="w-full rounded bg-gold px-8 py-4 text-lg font-semibold text-[#0a0a0a] transition hover:bg-gold-light sm:w-auto"
            >
              Apply as a Candidate
            </Link>
            <Link
              href="/jobs"
              className="w-full rounded border-2 border-white/80 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-[#0a0a0a] sm:w-auto"
            >
              Browse Jobs
            </Link>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg lg:max-w-none">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl border border-gold/25 shadow-2xl shadow-black/40">
            <SiteImage
              src={people.heroCandidateMain}
              alt="African male candidate ready for international work placement"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 text-sm font-medium text-white/90">
              Pre-screened · Document-ready
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#2a2a2a]">
            <SiteImage
              src={people.heroCandidateSecondary}
              alt="African female candidate pursuing career abroad"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#2a2a2a]">
            <SiteImage
              src={people.heroCandidateTertiary}
              alt="African professional candidate applying for work abroad"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
