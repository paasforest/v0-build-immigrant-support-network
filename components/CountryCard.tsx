import Link from "next/link"

interface CountryCardProps {
  name: string
  flag: string
  jobs: string[]
}

export default function CountryCard({ name, flag, jobs }: CountryCardProps) {
  return (
    <Link
      href="/work-abroad"
      className="group block bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a] hover:border-gold transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{flag}</span>
        <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-all duration-300">
          {name}
        </h3>
      </div>
      <ul className="space-y-2">
        {jobs.map((job, index) => (
          <li key={index} className="flex items-center gap-2 text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {job}
          </li>
        ))}
      </ul>
    </Link>
  )
}
