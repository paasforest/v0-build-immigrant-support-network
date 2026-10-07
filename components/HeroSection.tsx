import Link from "next/link"
import Image from "next/image"
import { people } from "@/lib/site-images"
import { whatsappLink } from "@/lib/site-config"

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      aria-label="Immigrant Support Network: overseas visa assistance"
    >
      <div className="absolute inset-0">
        <Image
          src={people.visaJourney}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Immigrant Support Network</p>
        <h1 className="mb-6 text-balance font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Overseas <span className="text-gold">Visa Assistance</span>
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-pretty text-lg text-white/80 sm:text-xl">
          Professional assistance with overseas visa applications, refusals, re-applications, verification and
          difficult visa cases, for the Schengen area, the UK, the USA and Canada.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/visa-assessment"
            className="w-full rounded bg-gold px-8 py-4 text-lg font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light sm:w-auto"
          >
            Get a Visa Assessment
          </Link>
          <a
            href={whatsappLink("Hi ISN, I'd like to discuss my visa case.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] sm:w-auto"
          >
            Discuss Your Visa Case
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-sm text-white/55">
          We are a private assistance service, not a government office or visa centre. Visa decisions are made by the
          relevant authorities and cannot be guaranteed.
        </p>
      </div>
    </section>
  )
}
