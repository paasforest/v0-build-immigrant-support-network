import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
          Work Abroad Opportunities{" "}
          <span className="text-gold">&</span> Visa Assistance
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 text-pretty">
          Connecting African talent with international employers in Europe & Canada. Start your journey to a better
          future today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/work-abroad"
            className="w-full sm:w-auto bg-gold text-[#0a0a0a] px-8 py-4 rounded font-semibold text-lg hover:bg-gold-light transition-all duration-300"
          >
            Apply for Jobs
          </Link>
          <Link
            href="/visa-services"
            className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded font-semibold text-lg hover:bg-white hover:text-[#0a0a0a] transition-all duration-300"
          >
            Visa Assistance
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
