import Link from "next/link"
import SiteImage from "@/components/SiteImage"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
  imageUrl?: string
  imageAlt?: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  index,
  imageUrl,
  imageAlt,
}: ServiceCardProps) {
  const isAlternate = index % 2 === 1

  return (
    <div
      className={`group overflow-hidden rounded-lg border transition-all duration-300 hover:border-gold/50 ${
        isAlternate ? "border-white/20 bg-white text-[#0a0a0a]" : "border-[#2a2a2a] bg-[#111111] text-white"
      }`}
    >
      {imageUrl && (
        <div className="relative h-44 w-full overflow-hidden">
          <SiteImage
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="p-8">
        <div
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${
            isAlternate ? "bg-gold/10" : "bg-gold/10"
          }`}
        >
          {icon === "briefcase" && (
            <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
          {icon === "document" && (
            <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
          {icon === "users" && (
            <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>
        <h3 className={`mb-3 text-xl font-semibold ${isAlternate ? "text-[#0a0a0a]" : "text-white"}`}>{title}</h3>
        <p className={`mb-6 ${isAlternate ? "text-[#0a0a0a]/70" : "text-white/60"}`}>{description}</p>
        <Link
          href={icon === "briefcase" ? "/work-abroad" : icon === "document" ? "/visa-services" : "/contact"}
          className="inline-flex items-center gap-2 font-medium text-gold transition-all duration-300 hover:gap-3 hover:text-gold-light"
        >
          Learn More
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
