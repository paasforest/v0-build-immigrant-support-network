import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const isAlternate = index % 2 === 1

  return (
    <div
      className={`p-8 rounded-lg border transition-all duration-300 hover:border-gold/50 group ${
        isAlternate
          ? "bg-white text-[#0a0a0a] border-white/20"
          : "bg-[#111111] text-white border-[#2a2a2a]"
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
        isAlternate ? "bg-gold/10" : "bg-gold/10"
      }`}>
        {icon === "briefcase" && (
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
        {icon === "document" && (
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        {icon === "users" && (
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${isAlternate ? "text-[#0a0a0a]" : "text-white"}`}>
        {title}
      </h3>
      <p className={`mb-6 ${isAlternate ? "text-[#0a0a0a]/70" : "text-white/60"}`}>
        {description}
      </p>
      <Link
        href={icon === "briefcase" ? "/work-abroad" : icon === "document" ? "/visa-services" : "/contact"}
        className="text-gold font-medium hover:text-gold-light transition-all duration-300 inline-flex items-center gap-2 group-hover:gap-3"
      >
        Learn More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
