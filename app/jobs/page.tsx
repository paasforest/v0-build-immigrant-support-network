"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, Filter, ChevronDown } from "lucide-react"
import JobListingCard from "@/components/JobListingCard"
import { getAllJobs, getJobCountsByCountry, jobCountries, jobTypes } from "@/lib/jobs-data"

export default function JobsPage() {
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedType, setSelectedType] = useState("All Types")
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  const allJobs = getAllJobs()
  const countryCounts = getJobCountsByCountry()

  const filteredJobs = allJobs.filter((job) => {
    const countryMatch = selectedCountry === "All Countries" || job.country === selectedCountry
    const typeMatch = selectedType === "All Types" || job.type === selectedType
    return countryMatch && typeMatch
  })

  const featuredJobs = filteredJobs.filter((j) => j.featured)
  const regularJobs = filteredJobs.filter((j) => !j.featured)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#111111] to-[#0a0a0a] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Available <span className="text-gold">Job Opportunities</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-white/70 md:text-xl">
              Browse verified vacancies across Europe and Canada — with pay rates, accommodation
              details, and requirements listed upfront.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="rounded-lg bg-gold px-8 py-4 font-semibold text-[#0a0a0a] transition hover:bg-gold-light"
              >
                Apply Now
              </Link>
              <Link
                href="/cv-services"
                className="rounded-lg border border-gold px-8 py-4 font-semibold text-gold transition hover:bg-gold hover:text-[#0a0a0a]"
              >
                Need a Professional CV?
              </Link>
            </div>
          </div>

          {/* Country quick-filter chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedCountry("All Countries")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCountry === "All Countries"
                  ? "bg-gold text-[#0a0a0a]"
                  : "border border-[#2a2a2a] text-white/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              All ({allJobs.length})
            </button>
            {countryCounts.map(({ country, flag, count }) => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCountry === country
                    ? "bg-gold text-[#0a0a0a]"
                    : "border border-[#2a2a2a] text-white/70 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {flag} {country} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[#2a2a2a] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-white/70">
              <Filter className="h-5 w-5" />
              <span>Filter by type:</span>
            </div>
            <div className="relative w-full md:w-56">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#2a2a2a] bg-[#111111] px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-white/70">
            Showing <span className="font-semibold text-gold">{filteredJobs.length}</span>{" "}
            {filteredJobs.length === 1 ? "position" : "positions"}
            {selectedCountry !== "All Countries" && (
              <>
                {" "}
                in <span className="text-white">{selectedCountry}</span>
              </>
            )}
          </p>

          {featuredJobs.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-5 font-serif text-2xl text-white">
                Featured <span className="text-gold">Openings</span>
              </h2>
              <div className="space-y-5">
                {featuredJobs.map((job) => (
                  <JobListingCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onToggle={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {regularJobs.length > 0 && (
            <div>
              {featuredJobs.length > 0 && (
                <h2 className="mb-5 font-serif text-2xl text-white">
                  All <span className="text-gold">Listings</span>
                </h2>
              )}
              <div className="space-y-5">
                {regularJobs.map((job) => (
                  <JobListingCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onToggle={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="py-16 text-center">
              <Briefcase className="mx-auto mb-4 h-16 w-16 text-white/20" />
              <h3 className="mb-2 text-xl text-white">No jobs found</h3>
              <p className="text-white/60">Try adjusting your filters to see more opportunities.</p>
            </div>
          )}
        </div>
      </section>

      {/* CV CTA */}
      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Stand Out with a <span className="text-gold">Professional CV</span>
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg text-white/70">
            European employers expect CVs in a specific format. Let our experts create a
            professional, European-standard CV that gets you noticed.
          </p>
          <Link
            href="/cv-services"
            className="inline-block rounded-lg bg-gold px-8 py-4 font-semibold text-[#0a0a0a] transition hover:bg-gold-light"
          >
            View CV Services
          </Link>
        </div>
      </section>
    </div>
  )
}
