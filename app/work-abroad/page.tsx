import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work Abroad | Immigrant Support Network",
  description: "Explore legal work opportunities in Poland, Romania, Hungary, UK, and Canada. Find warehouse, agriculture, and general labour positions.",
}

const countries = [
  {
    name: "Poland",
    flag: "🇵🇱",
    jobs: ["Warehouse Operations", "Food Production", "General Labour", "Factory Work"],
    description: "Poland offers numerous opportunities in manufacturing and logistics sectors with competitive wages.",
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    jobs: ["Agriculture", "Factory Work", "Food Processing", "Construction"],
    description: "Romania has growing demand for workers in agriculture and manufacturing industries.",
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    jobs: ["Logistics", "Manufacturing", "Assembly Line", "Warehouse"],
    description: "Hungary offers stable employment in its thriving manufacturing and logistics sectors.",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    jobs: ["Seasonal Agricultural Work", "Food Packing", "Farm Work"],
    description: "The UK provides seasonal opportunities in agriculture with established worker programs.",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    jobs: ["Drivers", "General Labour", "Warehouse", "Construction Support"],
    description: "Canada offers diverse opportunities with pathways to permanent residency.",
  },
]

export default function WorkAbroadPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              International Work <span className="text-gold">Opportunities</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              We connect pre-screened African candidates with legal employment opportunities 
              in Europe and Canada. All placements follow proper work permit and visa procedures.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section with Background Image */}
      <section 
        className="relative py-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-white mb-6">
              Why Work Abroad?
            </h2>
            <ul className="space-y-4">
              {[
                "Access higher wages and better working conditions",
                "Gain valuable international work experience",
                "Support your family with stable income",
                "Legal employment with proper documentation",
                "Potential pathways to permanent residency",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-white/80">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Available Destinations
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore opportunities by country
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{country.flag}</span>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-gold transition-all duration-300">
                      {country.name}
                    </h3>
                  </div>
                  <p className="text-white/60 mb-6 text-sm">
                    {country.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-gold text-sm font-semibold mb-3 uppercase tracking-wider">
                      Available Positions
                    </h4>
                    <ul className="space-y-2">
                      {country.jobs.map((job, jobIndex) => (
                        <li key={jobIndex} className="flex items-center gap-2 text-white/70 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {job}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/apply"
                    className="block w-full text-center bg-gold text-[#0a0a0a] px-6 py-3 rounded font-semibold hover:bg-gold-light transition-all duration-300"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Basic Requirements
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              What you need to qualify for our work placement program
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "id", title: "Valid Passport", desc: "Must have at least 12 months validity" },
              { icon: "health", title: "Good Health", desc: "Able to pass medical examinations" },
              { icon: "work", title: "Work Readiness", desc: "Willing to work in labour-intensive roles" },
              { icon: "docs", title: "Clean Record", desc: "No criminal history or immigration issues" },
            ].map((req, index) => (
              <div key={index} className="bg-[#111111] p-6 rounded-lg border border-[#2a2a2a] text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  {req.icon === "id" && (
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  )}
                  {req.icon === "health" && (
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {req.icon === "work" && (
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {req.icon === "docs" && (
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-white font-semibold mb-2">{req.title}</h3>
                <p className="text-white/60 text-sm">{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[#0a0a0a]/80 mb-8 max-w-2xl mx-auto">
            Submit your application today and take the first step towards working abroad.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#0a0a0a] text-white px-8 py-4 rounded font-semibold hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  )
}
