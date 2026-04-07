"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, FileText, Star, Clock, Shield, Award, ChevronDown } from "lucide-react"

const packages = [
  {
    id: "basic",
    name: "Basic CV",
    price: "R250",
    originalPrice: "R400",
    description: "European format CV only",
    features: [
      "European format CV",
      "Professional layout",
      "1 revision included",
      "PDF & Word formats",
      "Delivered in 3-5 days",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "CV + Cover Letter",
    price: "R400",
    originalPrice: "R600",
    description: "Best for serious applicants",
    features: [
      "European format CV",
      "Premium professional layout",
      "Custom cover letter",
      "Unlimited revisions",
      "PDF & Word formats",
      "LinkedIn optimization tips",
      "Delivered in 2-3 days",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Complete Package",
    price: "R550",
    originalPrice: "R800",
    description: "CV + Cover Letter + LinkedIn",
    features: [
      "European format CV",
      "Executive-level design",
      "Custom cover letter",
      "LinkedIn profile rewrite",
      "Unlimited revisions",
      "PDF & Word formats",
      "Interview preparation guide",
      "Delivered in 24-48 hours",
      "1-on-1 consultation call",
      "90-day support",
    ],
    popular: false,
  },
]

const faqs = [
  {
    question: "Why do I need a European-format CV?",
    answer:
      "European employers expect CVs in a specific format that differs from other regions. Our CVs include the right sections, photo placement, and formatting that European recruiters prefer. This significantly increases your chances of getting called for interviews.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You'll need to provide your personal details, work history, education, skills, and any certifications. We'll send you a simple questionnaire after purchase. If you have an existing CV, you can share that as a starting point.",
  },
  {
    question: "How long does it take to receive my CV?",
    answer:
      "Delivery times depend on your package: Basic (3-5 days), Professional (2-3 days), Premium (24-48 hours). Rush delivery is available for an additional fee.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Yes! Basic package includes 1 revision, while Professional and Premium packages include unlimited revisions until you're completely satisfied.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept EFT / bank transfers (South African banks) and mobile money. Payment details will be provided via WhatsApp after you place your order.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. We take data privacy seriously. Your personal information is only used to create your CV and is never shared with third parties.",
  },
]

const testimonials = [
  {
    name: "Emmanuel K.",
    location: "Kenya",
    text: "The professional CV helped me land a warehouse job in Poland within 2 weeks of applying. Worth every cent!",
    rating: 5,
  },
  {
    name: "Grace M.",
    location: "South Africa",
    text: "I had no idea my CV was holding me back. The European format CV opened so many doors for me.",
    rating: 5,
  },
  {
    name: "David O.",
    location: "Nigeria",
    text: "The premium package was excellent. The cover letter and interview tips really made a difference.",
    rating: 5,
  },
]

export default function CVServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const handleOrder = (packageId: string) => {
    setSelectedPackage(packageId)
    // In production, this would redirect to payment or WhatsApp
    const pkg = packages.find((p) => p.id === packageId)
    const message = `Hi! I'm interested in ordering the ${pkg?.name} (${pkg?.price}). Please send me the details.`
    window.open(`https://wa.me/27774388845?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Professional CV Writing Service</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Get a <span className="text-gold">European-Standard CV</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Stand out from the crowd with a professionally written CV that meets European employer
            expectations. Increase your chances of landing that dream job abroad.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              500+ CVs Created
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              95% Success Rate
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              Satisfaction Guaranteed
            </span>
          </div>
        </div>
      </section>

      {/* Why European CV Section */}
      <section className="py-16 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            Why You Need a <span className="text-gold">European-Format CV</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Correct Format</h3>
              <p className="text-white/60 text-sm">
                European CVs have specific sections and layouts that differ from other regions.
                Wrong format = rejected application.
              </p>
            </div>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ATS-Optimized</h3>
              <p className="text-white/60 text-sm">
                Our CVs pass Applicant Tracking Systems used by European employers to filter
                candidates automatically.
              </p>
            </div>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Professional Quality</h3>
              <p className="text-white/60 text-sm">
                Written by experienced HR professionals who understand what European recruiters
                look for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-white text-center mb-4">
            Choose Your <span className="text-gold">Package</span>
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Select the package that best fits your needs. All packages include a professionally
            written CV in European format.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-[#111111] border rounded-lg overflow-hidden transition-all duration-300 ${
                  pkg.popular
                    ? "border-gold scale-105 shadow-lg shadow-gold/10"
                    : "border-[#2a2a2a] hover:border-gold/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gold text-[#0a0a0a] text-center py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${pkg.popular ? "pt-10" : ""}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gold">{pkg.price}</span>
                    <span className="text-white/40 line-through ml-2">{pkg.originalPrice}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleOrder(pkg.id)}
                    className={`w-full py-3 rounded font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? "bg-gold text-[#0a0a0a] hover:bg-gold-light"
                        : "border border-gold text-gold hover:bg-gold hover:text-[#0a0a0a]"
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mt-8">
            Payment via EFT / Bank Transfer or Mobile Money accepted
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            How It <span className="text-gold">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Package",
                desc: "Select the CV package that fits your needs and budget.",
              },
              {
                step: "2",
                title: "Send Information",
                desc: "Fill out our simple questionnaire with your details and experience.",
              },
              {
                step: "3",
                title: "Expert Review",
                desc: "Our writers craft your professional European-format CV.",
              },
              {
                step: "4",
                title: "Receive CV",
                desc: "Get your polished CV in PDF and Word format, ready to use.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gold text-[#0a0a0a] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/70 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#2a2a2a] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <p className="px-4 pb-4 text-white/60">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to <span className="text-gold">Get Started?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Invest in your future. A professional CV is the first step to landing your dream job
            abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-gold text-[#0a0a0a] px-8 py-4 rounded font-semibold hover:bg-gold-light transition-all duration-300"
            >
              View Packages
            </a>
            <Link
              href="/contact"
              className="border border-white/20 text-white px-8 py-4 rounded font-semibold hover:border-gold hover:text-gold transition-all duration-300"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
