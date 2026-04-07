import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Immigrant Support Network",
  description: "Learn about Immigrant Support Network - connecting African talent with international employers since our founding.",
}

const values = [
  {
    title: "Integrity",
    description: "We operate with complete transparency and honesty in all our dealings with candidates and employers.",
    icon: "shield",
  },
  {
    title: "Opportunity",
    description: "We create pathways for talented individuals to access better employment and life opportunities abroad.",
    icon: "star",
  },
  {
    title: "Support",
    description: "We provide comprehensive guidance throughout your journey, from application to arrival.",
    icon: "heart",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-gold">Immigrant Support Network</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Bridging the gap between African talent and international opportunity
            </p>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Immigrant Support Network helps African candidates access legal work opportunities 
                  abroad and supports employers facing labour shortages. We bridge the gap between 
                  talent and opportunity.
                </p>
                <p>
                  Our team understands the challenges faced by those seeking international employment. 
                  We provide guidance through the complex processes of job placement and visa applications, 
                  ensuring our candidates are well-prepared for their journey.
                </p>
                <p>
                  We work with reputable employers in Europe and Canada who are committed to providing 
                  fair wages, safe working conditions, and legal employment contracts.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-lg">
                <p className="text-[#0a0a0a] font-semibold">Founded by Charles</p>
                <p className="text-[#0a0a0a]/70 text-sm">Based in South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[#111111] p-8 rounded-lg border border-[#2a2a2a] text-center hover:border-gold/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  {value.icon === "shield" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {value.icon === "star" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                  {value.icon === "heart" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gold mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#111111] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Candidates Placed" },
              { value: "5", label: "Destination Countries" },
              { value: "50+", label: "Partner Employers" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] p-6 rounded-lg border border-[#2a2a2a]">
            <h3 className="text-white font-semibold mb-3">Important Disclaimer</h3>
            <p className="text-white/60 text-sm">
              We do not guarantee job placement or visa approval. We provide recruitment and 
              application support services. Final decisions on employment and visa applications 
              rest with employers and immigration authorities respectively.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
