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
        id: "pl-farm-1",
        title: "Farm Worker - Fruit Picking",
        type: "Agriculture",
        location: "Various regions, Poland",
        salary: "€800 - €1,200/month",
        duration: "Seasonal (3-6 months)",
        requirements: ["No experience needed", "Physical fitness", "Valid passport"],
        description: "Seasonal work picking apples, strawberries, and other fruits on Polish farms. Accommodation provided.",
      },
      {
        id: "pl-farm-2",
        title: "Greenhouse Worker",
        type: "Agriculture",
        location: "Mazovia, Poland",
        salary: "€900 - €1,100/month",
        duration: "6-12 months",
        requirements: ["Basic farming knowledge preferred", "Willingness to learn", "Valid passport"],
        description: "Work in modern greenhouses growing vegetables. Climate-controlled environment.",
      },
      {
        id: "pl-warehouse-1",
        title: "Warehouse Operative",
        type: "Warehouse",
        location: "Warsaw, Poland",
        salary: "€1,000 - €1,400/month",
        duration: "12+ months",
        requirements: ["Forklift license preferred", "Shift work flexibility", "Valid passport"],
        description: "Picking, packing, and shipping goods in large distribution centers.",
      },
      {
        id: "pl-food-1",
        title: "Food Production Worker",
        type: "Food Production",
        location: "Lodz, Poland",
        salary: "€950 - €1,200/month",
        duration: "12+ months",
        requirements: ["Hygiene certificate (provided)", "Ability to work in cold environments", "Valid passport"],
        description: "Work in meat processing or food packaging facilities.",
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
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full text-left p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{job.flag}</span>
                        <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Euro className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ChevronDown
                        className={`w-6 h-6 text-gold transition-transform duration-300 ${
                          expandedJob === job.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedJob === job.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-[#2a2a2a] pt-4">
                    <p className="text-white/70 mb-4">{job.description}</p>
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
