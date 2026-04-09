import type { Metadata } from "next"
import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import { siteConfig, siteUrl } from "@/lib/site-config"
import TrustBadges from "@/components/TrustBadges"
import ServiceCard from "@/components/ServiceCard"
import CountryCard from "@/components/CountryCard"

const services = [
  {
    title: "Work Abroad Placements",
    description: "Access legal employment opportunities in Europe and Canada with our vetted employer network.",
    icon: "briefcase",
  },
  {
    title: "Visa Application Assistance",
    description: "Navigate the complex visa process with step-by-step guidance and document preparation support.",
    icon: "document",
  },
  {
    title: "Employer Recruitment Support",
    description: "We help international employers find skilled, pre-screened candidates from Africa.",
    icon: "users",
  },
]

const testimonials = [
  {
    name: "David M.",
    location: "Kenya",
    quote: "ISN helped me secure a position in Poland. The process was smooth and professional.",
  },
  {
    name: "Grace O.",
    location: "Nigeria",
    quote: "Their visa guidance was invaluable. I now work in Romania thanks to their support.",
  },
  {
    name: "Peter K.",
    location: "South Africa",
    quote: "Professional service from start to finish. Highly recommend to anyone seeking work abroad.",
  },
]

const countries = [
  {
    name: "Poland",
    flag: "🇵🇱",
    jobs: ["Warehouse", "Food Production", "General Labour"],
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    jobs: ["Agriculture", "Factory Work"],
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    jobs: ["Logistics", "Manufacturing"],
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    jobs: ["Logistics", "Manufacturing", "General Labour"],
    imageUrl:
      "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Latvia",
    flag: "🇱🇻",
    jobs: ["Warehouse", "Food Production", "Services"],
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    jobs: ["Seasonal Agricultural Work"],
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    jobs: ["Drivers", "General Labour"],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  },
]

const steps = [
  { number: "01", title: "Submit Your Application", description: "Fill out our online form with your details and job preferences." },
  { number: "02", title: "Get Matched with Opportunities", description: "Our team reviews your profile and connects you with suitable employers." },
  { number: "03", title: "Begin Your Journey", description: "Receive guidance on visa processes and prepare for your new opportunity." },
]

export const metadata: Metadata = {
  title: {
    absolute: "Immigrant Support Network | Work Abroad & Visa Assistance",
  },
  description: siteConfig.shortDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Immigrant Support Network | Work Abroad & Visa Assistance",
    description: siteConfig.shortDescription,
    url: siteUrl,
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Services Overview */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive support for your international career journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Destination Countries
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore opportunities in these countries
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <CountryCard key={index} {...country} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO: internal links to guides (jobs, visas, Europe from Africa) */}
      <section className="border-y border-[#2a2a2a] bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            Free guides: <span className="text-gold">jobs & visas</span>
          </h2>
          <p className="mt-4 text-white/70">
            Searching for{" "}
            <Link href="/guides/jobs-in-poland-for-africans-2026" className="text-gold hover:underline">
              jobs in Poland for Africans
            </Link>
            ,{" "}
            <Link href="/guides/how-to-get-a-job-in-romania-from-africa" className="text-gold hover:underline">
              work in Romania from Africa
            </Link>
            ,{" "}
            <Link href="/guides/poland-work-visa-cost" className="text-gold hover:underline">
              Poland work visa costs
            </Link>
            , or the{" "}
            <Link href="/guides/easiest-europe-countries-for-africans" className="text-gold hover:underline">
              easiest countries in Europe for Africans
            </Link>
            ? Read plain-language guides — then{" "}
            <Link href="/apply" className="text-gold hover:underline">
              apply here
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/guides"
              className="rounded border border-gold px-6 py-2 text-sm font-semibold text-gold hover:bg-gold/10"
            >
              All guides
            </Link>
            <Link href="/blog" className="rounded border border-white/20 px-6 py-2 text-sm font-semibold text-white hover:border-gold">
              Blog
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Your journey to working abroad in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-2 border-gold text-gold font-serif text-2xl font-bold mb-6 group-hover:bg-gold group-hover:text-[#0a0a0a] transition-all duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] hover:border-gold/50 transition-all duration-300"
              >
                <svg className="w-8 h-8 text-gold mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white/80 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="text-gold font-semibold">{testimonial.name}</div>
                <div className="text-white/40 text-sm">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">
            Ready to Work Abroad?
          </h2>
          <p className="text-[#0a0a0a]/80 mb-8 max-w-2xl mx-auto">
            Take the first step towards your international career today.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#0a0a0a] text-white px-8 py-4 rounded font-semibold hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-[#0a0a0a] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/40 text-xs text-center">
            Disclaimer: We do not guarantee job placement or visa approval. We provide recruitment and application support services.
          </p>
        </div>
      </section>
    </>
  )
}
