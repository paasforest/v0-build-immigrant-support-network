"use client"

import Link from "next/link"
import { MapPin, Clock, Euro, ChevronDown, Star, Users } from "lucide-react"
import SiteImage from "@/components/SiteImage"
import type { FlatJob } from "@/lib/jobs-data"

type Props = {
  job: FlatJob
  expanded: boolean
  onToggle: () => void
}

export default function JobListingCard({ job, expanded, onToggle }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#111111] transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5">
      <button type="button" onClick={onToggle} className="w-full text-left">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="relative h-52 w-full shrink-0 lg:h-auto lg:w-72 xl:w-80">
            <SiteImage
              src={job.imageUrl}
              alt={`${job.title} — ${job.location}`}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/50 lg:via-transparent lg:to-transparent" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-black/60 px-2.5 py-1 text-lg backdrop-blur-sm">{job.flag}</span>
              {job.featured && (
                <span className="flex items-center gap-1 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-[#0a0a0a]">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </span>
              )}
              {job.vacancies != null && job.vacancies > 0 && (
                <span className="flex items-center gap-1 rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Users className="h-3 w-3" />
                  {job.vacancies} open
                </span>
              )}
            </div>
            <span className="absolute bottom-3 left-3 rounded-md bg-gold/90 px-2.5 py-1 text-xs font-semibold text-[#0a0a0a]">
              {job.type}
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
            <div className="min-w-0 flex-1">
              <h3 className="mb-3 font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                {job.title}
              </h3>
              <div className="grid gap-2 text-sm text-white/65 sm:grid-cols-1">
                <span className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {job.location}
                </span>
                <span className="flex items-start gap-2 font-medium text-gold/90">
                  <Euro className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {job.salary}
                </span>
                <span className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {job.duration}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">{job.description}</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[#2a2a2a] pt-4">
              <span className="text-xs font-medium uppercase tracking-wide text-white/40">
                {expanded ? "Hide details" : "View full details"}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[min(90vh,36rem)]" : "max-h-0"
        }`}
      >
        <div className="border-t border-[#2a2a2a] bg-[#0d0d0d] px-5 pb-6 pt-5 sm:px-6">
          {job.bodyParagraphs && job.bodyParagraphs.length > 0 ? (
            <div className="mb-5 space-y-3">
              {job.bodyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-sm leading-relaxed ${
                    index === 0 ? "rounded-lg border border-white/10 bg-white/5 p-3 text-white/60 italic" : "text-white/70"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="mb-5 text-sm leading-relaxed text-white/70">{job.description}</p>
          )}

          {job.employerOfferBullets && job.employerOfferBullets.length > 0 && (
            <div className="mb-5 rounded-lg border border-gold/20 bg-gold/5 p-4">
              <h4 className="mb-3 text-sm font-semibold text-gold">What the employer offers</h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {job.employerOfferBullets.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-white">Requirements</h4>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/apply?country=${encodeURIComponent(job.country)}&job=${encodeURIComponent(job.type)}&position=${encodeURIComponent(job.title)}`}
              className="flex-1 rounded-lg bg-gold px-6 py-3 text-center font-semibold text-[#0a0a0a] transition hover:bg-gold-light"
            >
              Apply for This Job
            </Link>
            <Link
              href="/cv-services"
              className="flex-1 rounded-lg border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Get CV Help First
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
