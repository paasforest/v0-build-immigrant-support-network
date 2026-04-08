"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, MapPin, Clock, Euro, Filter, ChevronDown } from "lucide-react"

// Job data organized by country
const jobsData = {
  poland: {
    country: "Poland",
    flag: "🇵🇱",
    jobs: [
      {
        id: "pl-prod-1",
        title: "Production Worker",
        type: "Manufacturing",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "Long-term contracts available",
        requirements: ["Valid passport", "Physical fitness", "Reliability"],
        description:
          "General production roles in manufacturing facilities. Training is often provided on site.",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-mush-1",
        title: "Mushroom picker",
        type: "Agriculture",
        location: "Poland",
        salary: "32 PLN gross/h (~23.11 net) — rates per employer",
        duration: "~180–200 h/month (employer indicative)",
        requirements: [
          "Medical certificate for sanitary and epidemiological purposes — required before employment; the employer indicates support can be arranged to help you obtain it beforehand",
          "Valid passport and any permits required for lawful work in Poland",
          "Physical stamina and suitability for work in mushroom production",
        ],
        description:
          "Mushroom picking and quality control with a major Polish mushroom producer. We assist your application as a recruitment agency; the employer hires and pays you.",
        bodyParagraphs: [
          "Immigrant Support Network is a recruitment agency: we help candidates apply to third-party employers. We are not the hiring company, we do not sign your work contract ourselves, and we do not pay your wages. The summary below reflects information supplied by the employer for this vacancy.",
          "The employer describes their business as a leader in mushroom production and processing in Poland, with quality and work standards that allow products to be supplied to customers worldwide. They present themselves as a significant producer and supplier of processed mushrooms, with a brand that has been on the market since 1992.",
          "Main responsibilities (employer): picking mushrooms and controlling their quality.",
        ],
        employerOfferBullets: [
          "Contract of mandate (umowa zlecenie)",
          "32.00 PLN gross per hour (~23.11 PLN net per hour)",
          "Food allowance: 0.81 PLN net per hour",
          "Accommodation fee: 250 PLN per month",
          "Extra bonus depending on quality and quantity of mushrooms collected",
          "Approximately 180–200 hours per month",
          "Work clothes and laundry service at the factory",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1512595594595-82b7f049313b?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-mush-2",
        title: "Mushroom sorter",
        type: "Agriculture",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "Seasonal or long-term (role-dependent)",
        requirements: ["Valid passport", "Attention to detail", "Hygiene awareness"],
        description: "Sorting and grading mushrooms for packaging and distribution.",
        imageUrl:
          "https://images.unsplash.com/photo-1512595765784-5ebad80772a3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-hotel-1",
        title: "Hotel restaurant - waiter / waitress",
        type: "Hospitality",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Customer service attitude", "Basic English helpful"],
        description: "Front-of-house service in hotel restaurants — taking orders, serving guests, teamwork.",
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-sort-1",
        title: "Sorter box collector - Service Man",
        type: "Warehouse",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Physical fitness", "Shift flexibility"],
        description: "Sorting, collecting boxes, and supporting logistics operations in a service role.",
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-wh-1",
        title: "Warehouse worker (Mazowieckie voivodeship)",
        type: "Warehouse",
        location: "Mazowieckie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Warehouse or logistics experience a plus", "Safety awareness"],
        description: "Receiving, storing, and dispatching goods in a warehouse in the Mazowieckie region.",
        imageUrl:
          "https://images.unsplash.com/photo-1565514020126-678c2ecc3008?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-wh-2",
        title: "Order picker - warehouse worker (Śląskie voivodeship)",
        type: "Warehouse",
        location: "Śląskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Accuracy and pace", "RF scanner training often provided"],
        description: "Picking and preparing orders for shipment in a Śląskie warehouse environment.",
        imageUrl:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-1",
        title: "Meat Cutter and Packer — 20 vacancies (Wielkopolskie voivodeship)",
        type: "Food Production",
        location: "Wielkopolskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: [
          "No visa sponsorship — employer does not sponsor visas; you need existing right to work or your own visa route",
          "At least 1 year as production worker, butcher, or manual packer in the meat industry",
          "Willingness to work long hours and with meat products",
          "Able to work in a chilled area (3–7°C) and on your feet for long periods",
          "Physical endurance, responsibility, and accuracy",
          "Sanitary / hygiene certificates — if you do not have them, support can be provided to obtain them",
        ],
        description:
          "For a client company specializing in meat processing and packaging in Wielkopolskie, we are recruiting 20 meat cutters and packers. Your main tasks: cutting, trimming, and portioning meat to production standards; packing finished products; weighing, labeling, and preparing goods for shipment; keeping your workstation clean; and following hygiene and safety rules. The work is in a chilled production area, requires physical stamina, and strict sanitary standards.",
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-2",
        title: "Manual Packer - meat industry (Małopolskie voivodeship)",
        type: "Food Production",
        location: "Małopolskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Food hygiene awareness", "Physical stamina"],
        description: "Manual packing and labelling in the meat industry in Małopolskie.",
        imageUrl:
          "https://images.unsplash.com/photo-1585659722983-d3cd295b01b1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-3",
        title: "Production Worker - meat industry (Śląskie voivodeship)",
        type: "Food Production",
        location: "Śląskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Hygiene and safety compliance", "Teamwork"],
        description: "Production line work in meat processing in the Śląskie region.",
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-4",
        title: "Manual packer - meat industry (Dolnośląskie voivodeship)",
        type: "Food Production",
        location: "Dolnośląskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Food industry hygiene", "Reliability"],
        description: "Manual packing roles in meat industry facilities in Dolnośląskie.",
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-child-1",
        title: "Live-in Childcare & Household Assistant",
        type: "Childcare & Domestic",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "Typically live-in, long-term",
        requirements: ["Valid passport", "Experience with children preferred", "References may be required"],
        description: "Live-in support combining childcare and light household duties for a family residence.",
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-dom-1",
        title: "Domestic Helper (Live-in)",
        type: "Childcare & Domestic",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "Live-in, long-term",
        requirements: ["Valid passport", "Domestic or care experience helpful", "Trustworthiness"],
        description: "Live-in domestic assistance including cleaning, cooking support, and household tasks.",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-hotel-gen-1",
        title: "Job offers in Hotels and Restaurants",
        type: "Hospitality",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "Varies by employer",
        requirements: ["Valid passport", "Hospitality interest", "English or local language a plus"],
        description: "Various roles across hotels and restaurants — kitchen, service, housekeeping, and more.",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-cook-1",
        title: "Cook - Italian restaurant",
        type: "Hospitality",
        location: "Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Valid passport", "Cooking experience", "Food safety awareness"],
        description: "Preparing Italian cuisine in a restaurant setting — teamwork in a busy kitchen.",
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  romania: {
    country: "Romania",
    flag: "🇷🇴",
    jobs: [
      {
        id: "ro-construct-1",
        title: "Construction Worker",
        type: "Construction",
        location: "Bucharest, Romania",
        salary: "€800 - €1,100/month",
        duration: "6-12 months",
        requirements: ["Construction experience preferred", "Physical fitness", "Valid passport"],
        description: "General construction work including building, renovation, and infrastructure projects.",
      },
      {
        id: "ro-factory-1",
        title: "Factory Operative",
        type: "Manufacturing",
        location: "Cluj-Napoca, Romania",
        salary: "€750 - €1,000/month",
        duration: "12+ months",
        requirements: ["No experience needed", "Attention to detail", "Valid passport"],
        description: "Assembly line work in automotive and electronics manufacturing.",
      },
      {
        id: "ro-hotel-1",
        title: "Hotel Staff",
        type: "Hospitality",
        location: "Constanta, Romania",
        salary: "€700 - €900/month",
        duration: "Seasonal (4-6 months)",
        requirements: ["Basic English", "Customer service skills", "Valid passport"],
        description: "Housekeeping, kitchen assistance, and general hotel duties in coastal resorts.",
      },
    ],
  },
  germany: {
    country: "Germany",
    flag: "🇩🇪",
    jobs: [
      {
        id: "de-warehouse-1",
        title: "Logistics Coordinator",
        type: "Warehouse",
        location: "Berlin, Germany",
        salary: "€1,500 - €2,000/month",
        duration: "12+ months",
        requirements: ["Basic German or English", "Computer literacy", "Valid passport"],
        description: "Coordinate shipments and manage inventory in modern logistics centers.",
      },
      {
        id: "de-care-1",
        title: "Care Assistant",
        type: "Healthcare",
        location: "Munich, Germany",
        salary: "€1,800 - €2,500/month",
        duration: "12+ months",
        requirements: ["Care experience preferred", "German language (B1 level)", "Valid passport"],
        description: "Assist elderly residents in care homes with daily activities.",
      },
      {
        id: "de-driver-1",
        title: "Delivery Driver",
        type: "Transport",
        location: "Hamburg, Germany",
        salary: "€1,600 - €2,200/month",
        duration: "12+ months",
        requirements: ["Valid driving license", "Clean driving record", "Basic German"],
        description: "Deliver packages for major logistics companies.",
      },
    ],
  },
  netherlands: {
    country: "Netherlands",
    flag: "🇳🇱",
    jobs: [
      {
        id: "nl-farm-1",
        title: "Tulip Farm Worker",
        type: "Agriculture",
        location: "Lisse, Netherlands",
        salary: "€1,200 - €1,600/month",
        duration: "Seasonal (3-5 months)",
        requirements: ["No experience needed", "Physical fitness", "Valid passport"],
        description: "Planting, harvesting, and packaging tulips and other flowers.",
      },
      {
        id: "nl-warehouse-1",
        title: "E-commerce Fulfillment",
        type: "Warehouse",
        location: "Rotterdam, Netherlands",
        salary: "€1,400 - €1,800/month",
        duration: "12+ months",
        requirements: ["Basic English", "Fast-paced work ability", "Valid passport"],
        description: "Order picking and packing for major online retailers.",
      },
      {
        id: "nl-food-1",
        title: "Cheese Factory Worker",
        type: "Food Production",
        location: "Gouda, Netherlands",
        salary: "€1,300 - €1,700/month",
        duration: "12+ months",
        requirements: ["Food hygiene awareness", "Early shifts", "Valid passport"],
        description: "Work in traditional cheese production facilities.",
      },
    ],
  },
  canada: {
    country: "Canada",
    flag: "🇨🇦",
    jobs: [
      {
        id: "ca-farm-1",
        title: "Agricultural Worker",
        type: "Agriculture",
        location: "British Columbia, Canada",
        salary: "CAD $2,500 - $3,500/month",
        duration: "Seasonal (4-8 months)",
        requirements: ["Farm experience preferred", "Physical fitness", "Valid passport"],
        description: "Work on fruit farms, vineyards, and vegetable production.",
      },
      {
        id: "ca-meat-1",
        title: "Meat Processing Worker",
        type: "Food Production",
        location: "Alberta, Canada",
        salary: "CAD $2,800 - $3,800/month",
        duration: "12+ months",
        requirements: ["No experience needed", "Ability to work in cold", "Valid passport"],
        description: "Work in large meat processing facilities with potential for PR pathway.",
      },
      {
        id: "ca-truck-1",
        title: "Long-Haul Truck Driver",
        type: "Transport",
        location: "Ontario, Canada",
        salary: "CAD $4,000 - $6,000/month",
        duration: "12+ months",
        requirements: ["Valid Class 1/AZ license", "Clean driving record", "2+ years experience"],
        description: "Cross-country freight transportation with excellent earning potential.",
      },
    ],
  },
}

const jobTypes = [
  "All Types",
  "Agriculture",
  "Warehouse",
  "Food Production",
  "Construction",
  "Manufacturing",
  "Hospitality",
  "Healthcare",
  "Transport",
  "Childcare & Domestic",
]

const countries = ["All Countries", "Poland", "Romania", "Germany", "Netherlands", "Canada"]

export default function JobsPage() {
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedType, setSelectedType] = useState("All Types")
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  // Flatten and filter jobs
  const allJobs = Object.values(jobsData).flatMap((countryData) =>
    countryData.jobs.map((job) => ({
      ...job,
      country: countryData.country,
      flag: countryData.flag,
    }))
  )

  const filteredJobs = allJobs.filter((job) => {
    const countryMatch = selectedCountry === "All Countries" || job.country === selectedCountry
    const typeMatch = selectedType === "All Types" || job.type === selectedType
    return countryMatch && typeMatch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Available <span className="text-gold">Job Opportunities</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Browse our current job listings across Europe and Canada. Find the right opportunity
            and apply with your CV today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-gold text-[#0a0a0a] px-8 py-4 rounded font-semibold hover:bg-gold-light transition-all duration-300"
            >
              Apply Now
            </Link>
            <Link
              href="/cv-services"
              className="border border-gold text-gold px-8 py-4 rounded font-semibold hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
            >
              Need a Professional CV?
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-white/70">
              <Filter className="w-5 h-5" />
              <span>Filter jobs:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Country Filter */}
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="appearance-none bg-[#111111] border border-[#2a2a2a] text-white px-4 py-3 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-gold w-full sm:w-48"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
              </div>

              {/* Job Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-[#111111] border border-[#2a2a2a] text-white px-4 py-3 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-gold w-full sm:w-48"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-white/70">
              Showing <span className="text-gold font-semibold">{filteredJobs.length}</span> jobs
            </p>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-gold/50 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    {"imageUrl" in job && (job as { imageUrl?: string }).imageUrl ? (
                      <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56 md:w-64">
                        <img
                          src={(job as { imageUrl: string }).imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent sm:bg-gradient-to-t sm:from-black/40 sm:to-transparent" />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col justify-between gap-4 p-6 lg:flex-row lg:items-center">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="text-2xl">{job.flag}</span>
                          <span className="rounded bg-gold/10 px-2 py-1 text-xs font-medium text-gold">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">{job.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 shrink-0" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Euro className="h-4 w-4 shrink-0" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 shrink-0" />
                            {job.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-6 w-6 shrink-0 text-gold transition-transform duration-300 self-end sm:self-center ${
                          expandedJob === job.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedJob === job.id ? "max-h-[min(85vh,28rem)] sm:max-h-[32rem]" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-[#2a2a2a] px-6 pb-6 pt-4">
                    {"bodyParagraphs" in job &&
                    Array.isArray(job.bodyParagraphs) &&
                    job.bodyParagraphs.length > 0 ? (
                      <div className="mb-4 space-y-3">
                        {job.bodyParagraphs.map((paragraph, index) => (
                          <p key={index} className="text-white/70 text-sm leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/70 mb-4">{job.description}</p>
                    )}
                    {"employerOfferBullets" in job &&
                      Array.isArray(job.employerOfferBullets) &&
                      job.employerOfferBullets.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-white mb-2">
                            What the employer offers (details from the employer)
                          </h4>
                          <ul className="space-y-1">
                            {job.employerOfferBullets.map((item, index) => (
                              <li
                                key={index}
                                className="text-white/60 text-sm flex items-start gap-2"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-gold rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-white/60 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/apply?country=${encodeURIComponent(job.country)}&job=${encodeURIComponent(job.type)}&position=${encodeURIComponent(job.title)}`}
                        className="bg-gold text-[#0a0a0a] px-6 py-3 rounded font-semibold text-center hover:bg-gold-light transition-all duration-300"
                      >
                        Apply for This Job
                      </Link>
                      <Link
                        href="/cv-services"
                        className="border border-white/20 text-white px-6 py-3 rounded font-semibold text-center hover:border-gold hover:text-gold transition-all duration-300"
                      >
                        Get CV Help First
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No jobs found</h3>
              <p className="text-white/60">Try adjusting your filters to see more opportunities.</p>
            </div>
          )}
        </div>
      </section>

      {/* CV Services CTA */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Stand Out with a <span className="text-gold">Professional CV</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            European employers expect CVs in a specific format. Let our experts create a
            professional, European-standard CV that gets you noticed.
          </p>
          <Link
            href="/cv-services"
            className="inline-block bg-gold text-[#0a0a0a] px-8 py-4 rounded font-semibold hover:bg-gold-light transition-all duration-300"
          >
            View CV Services
          </Link>
        </div>
      </section>
    </div>
  )
}
