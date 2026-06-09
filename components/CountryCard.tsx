import Link from "next/link"
import SiteImage from "@/components/SiteImage"

interface CountryCardProps {
  name: string
  flag: string
  jobs: string[]
  imageUrl: string
}

export default function CountryCard({ name, flag, jobs, imageUrl }: CountryCardProps) {
  return (
    <Link
      href="/work-abroad"
      className="group block overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:border-gold"
      aria-label={`Work opportunities in ${name}: ${jobs.slice(0, 3).join(", ")}`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <SiteImage
          src={imageUrl}
          alt={`Workers and job opportunities in ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/65 to-[#0a0a0a]/35" />
        <div className="relative z-10 flex h-full items-end p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl drop-shadow-md" aria-hidden>
              {flag}
            </span>
            <h3 className="text-xl font-semibold text-white drop-shadow-sm transition-all duration-300 group-hover:text-gold">
              {name}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <ul className="space-y-2">
          {jobs.map((job, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-white/60">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {job}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
