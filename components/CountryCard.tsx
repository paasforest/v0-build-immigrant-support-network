import Link from "next/link"

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
      className="group block overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] hover:border-gold transition-all duration-300"
    >
      <div className="relative h-36 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/65 to-[#0a0a0a]/35" />
        <div className="relative z-10 flex h-full items-end p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl drop-shadow-md" aria-hidden>
              {flag}
            </span>
            <h3 className="text-xl font-semibold text-white drop-shadow-sm group-hover:text-gold transition-all duration-300">
              {name}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <ul className="space-y-2">
          {jobs.map((job, index) => (
            <li key={index} className="flex items-center gap-2 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-gold" />
              {job}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
