import type { Metadata } from "next"
import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import { siteConfig, siteUrl } from "@/lib/site-config"
import TrustBadges from "@/components/TrustBadges"
import ServiceCard from "@/components/ServiceCard"
import CountryCard from "@/components/CountryCard"
import PeopleShowcase from "@/components/PeopleShowcase"
import TestimonialCard from "@/components/TestimonialCard"
import SiteImage from "@/components/SiteImage"
import { REGISTRATION_FEE_ZAR, formatZarWithUsd } from "@/lib/pricing"
import { countries as countryImages, people } from "@/lib/site-images"

const services = [
  {
    title: "Work Abroad Placements",
    description: "Access legal employment opportunities in Europe and Canada with our vetted employer network.",
    icon: "briefcase",
    imageUrl: people.serviceJobs,
    imageAlt: "Warehouse worker ready for international placement",
  },
  {
    title: "Visa Application Assistance",
    description: "Navigate the complex visa process with step-by-step guidance and document preparation support.",
    icon: "document",
    imageUrl: people.serviceVisa,
    imageAlt: "Candidate preparing visa and travel documents",
  },
  {
    title: "Employer Recruitment Support",
    description: "We help international employers find skilled, pre-screened candidates from Africa.",
    icon: "users",
    imageUrl: people.serviceRecruitment,
    imageAlt: "Diverse team connecting candidates with employers",
  },
]

const testimonials = [
  {
    name: "David M.",
    location: "Kenya",
    quote: "ISN helped me secure a position in Poland. The process was smooth and professional.",
    imageSrc: people.portraitDavid,
    imageAlt: "David M. — successful candidate from Kenya",
  },
  {
    name: "Grace O.",
    location: "Nigeria",
    quote: "Their visa guidance was invaluable. I now work in Romania thanks to their support.",
    imageSrc: people.portraitGrace,
    imageAlt: "Grace O. — successful candidate from Nigeria",
  },
  {
    name: "Peter K.",
    location: "South Africa",
    quote: "Professional service from start to finish. Highly recommend to anyone seeking work abroad.",
    imageSrc: people.portraitPeter,
    imageAlt: "Peter K. — successful candidate from South Africa",
  },
]

const steps = [
  {
    number: "01",
    title: "Submit Your Application",
    description: "Fill out our online form with your details and job preferences.",
    imageSrc: people.stepApply,
    imageAlt: "Candidate submitting application",
  },
  {
    number: "02",
    title: "Get Matched with Opportunities",
    description: "Our team reviews your profile and connects you with suitable employers.",
    imageSrc: people.stepMatch,
    imageAlt: "Professional reviewing candidate profile",
  },
  {
    number: "03",
    title: "Begin Your Journey",
    description: "Receive guidance on visa processes and prepare for your new opportunity.",
    imageSrc: people.stepJourney,
    imageAlt: "Candidate preparing for international travel",
  },
]

const countries = [
  {
    name: "Poland",
    flag: "🇵🇱",
    jobs: ["Warehouse", "Food Production", "General Labour"],
    imageUrl: countryImages.Poland,
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    jobs: ["Agriculture", "Factory Work"],
    imageUrl: countryImages.Romania,
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    jobs: ["Logistics", "Manufacturing"],
    imageUrl: countryImages.Hungary,
  },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    jobs: ["Logistics", "Manufacturing", "General Labour"],
    imageUrl: countryImages.Lithuania,
  },
  {
    name: "Latvia",
    flag: "🇱🇻",
    jobs: ["Warehouse", "Food Production", "Services"],
    imageUrl: countryImages.Latvia,
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    jobs: ["Seasonal Agricultural Work"],
    imageUrl: countryImages["United Kingdom"],
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    jobs: ["Drivers", "General Labour"],
    imageUrl: countryImages.Canada,
  },
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

      <PeopleShowcase />

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
            Candidate resources:{" "}
            <span className="text-gold">work abroad, visas and destinations</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75 md:text-base">
            Practical, up-to-date articles for African candidates exploring lawful employment in Europe and Canada—covering
            application steps, documentation, and what to expect from the process.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75 md:text-base">
            Begin with our{" "}
            <Link href="/blog/how-to-apply-work-abroad-from-africa" className="font-medium text-gold hover:underline">
              step-by-step guide to applying for work abroad from Africa (2026)
            </Link>
            . Related reading includes{" "}
            <Link href="/blog/jobs-in-poland-for-africans-2026" className="font-medium text-gold hover:underline">
              jobs in Poland for African candidates
            </Link>
            ,{" "}
            <Link href="/blog/jobs-in-romania-for-africans-2026" className="font-medium text-gold hover:underline">
              working in Romania from Africa
            </Link>
            ,{" "}
            <Link href="/blog/poland-work-visa-cost" className="font-medium text-gold hover:underline">
              Poland work visa costs
            </Link>
            , and{" "}
            <Link href="/blog/easiest-europe-countries-for-africans" className="font-medium text-gold hover:underline">
              accessible European labour markets for African workers
            </Link>
            . When you are ready to move forward,{" "}
            <Link href="/apply" className="font-medium text-gold hover:underline">
              submit your candidate application
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
              <div key={index} className="group text-center">
                <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full ring-2 ring-gold/30">
                  <SiteImage src={step.imageSrc} alt={step.imageAlt} fill sizes="96px" />
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-gold/10 font-serif text-lg font-bold text-gold">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
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
              <TestimonialCard key={index} {...testimonial} />
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
          <p className="mb-2 max-w-2xl mx-auto text-base font-medium text-[#0a0a0a]">
            Free to submit your profile — {formatZarWithUsd(REGISTRATION_FEE_ZAR)} to activate matching.
          </p>
          <p className="text-[#0a0a0a]/80 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Take the first step towards your international career today.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#0a0a0a] text-white px-8 py-4 rounded font-semibold hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Start your application
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
