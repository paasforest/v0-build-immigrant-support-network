"use client"

import Link from "next/link"
import { useState } from "react"

const services = [
  {
    icon: "guide",
    title: "Visa Guidance",
    description: "Understanding which visa type applies to your situation and destination country. We help you navigate the different visa categories and their requirements.",
  },
  {
    icon: "docs",
    title: "Document Preparation",
    description: "Complete checklist and support for gathering all required documents. We ensure your application package is complete and properly organized.",
  },
  {
    icon: "assist",
    title: "Application Assistance",
    description: "Step-by-step help through the entire application process. From form filling to submission, we guide you every step of the way.",
  },
]

const processSteps = [
  { title: "Initial Consultation", description: "We assess your situation and determine the best visa pathway" },
  { title: "Document Collection", description: "Gather all required documents using our comprehensive checklist" },
  { title: "Application Preparation", description: "We help you complete all forms accurately and thoroughly" },
  { title: "Submission & Follow-up", description: "Submit your application and track its progress" },
]

const faqs = [
  {
    question: "How long does the visa process typically take?",
    answer: "Processing times vary by country and visa type. European work visas typically take 4-12 weeks, while Canadian visas may take 8-16 weeks. We&apos;ll provide specific timelines based on your situation.",
  },
  {
    question: "What documents do I need for a work visa?",
    answer: "Generally you&apos;ll need: valid passport, passport photos, proof of employment/job offer, educational certificates, medical certificate, police clearance, and financial statements. Requirements vary by country.",
  },
  {
    question: "Do you guarantee visa approval?",
    answer: "No, we do not guarantee visa approval as the final decision rests with immigration authorities. We provide guidance and support to maximize your chances of a successful application.",
  },
  {
    question: "What are your fees for visa assistance?",
    answer: "Our fees vary based on the type of visa and level of assistance required. Contact us for a personalized quote based on your specific needs and destination country.",
  },
]

export default function VisaServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Visa Application <span className="text-gold">Assistance</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Navigate the complex visa process with confidence. Our experienced team provides 
              guidance and support to help you prepare a strong visa application.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Our Visa Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive support at every stage of your visa journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] hover:border-gold/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  {service.icon === "guide" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {service.icon === "docs" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )}
                  {service.icon === "assist" && (
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-white/60">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A clear pathway from consultation to visa submission
            </p>
          </div>
          
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#2a2a2a]">
                <div className="h-full w-full bg-gradient-to-r from-gold via-gold to-transparent" />
              </div>
              
              <div className="grid grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold flex items-center justify-center text-[#0a0a0a] font-serif text-xl font-bold relative z-10">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden">
            <div className="relative pl-8 border-l-2 border-gold">
              {processSteps.map((step, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[2.5rem] w-10 h-10 rounded-full bg-gold flex items-center justify-center text-[#0a0a0a] font-serif font-bold">
                    {index + 1}
                  </div>
                  <div className="pl-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#222222] transition-all duration-300"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-white/60">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">
            Start Your Visa Process Today
          </h2>
          <p className="text-[#0a0a0a]/80 mb-8 max-w-2xl mx-auto">
            Get expert guidance on your visa application. Apply now to begin.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#0a0a0a] text-white px-8 py-4 rounded font-semibold hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Start Visa Process
          </Link>
        </div>
      </section>
    </>
  )
}
