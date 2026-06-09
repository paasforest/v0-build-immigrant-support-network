import SiteImage from "@/components/SiteImage"

type TestimonialCardProps = {
  quote: string
  name: string
  location: string
  imageSrc: string
  imageAlt: string
  rating?: number
}

export default function TestimonialCard({
  quote,
  name,
  location,
  imageSrc,
  imageAlt,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 transition-all duration-300 hover:border-gold/50">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
          <SiteImage src={imageSrc} alt={imageAlt} fill sizes="56px" className="object-cover" />
        </div>
        <div>
          <div className="font-semibold text-gold">{name}</div>
          <div className="text-sm text-white/45">{location}</div>
        </div>
      </div>
      {rating != null && rating > 0 && (
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-gold text-gold" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      )}
      <svg className="mb-3 h-7 w-7 text-gold/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-[15px] italic leading-relaxed text-white/80">&quot;{quote}&quot;</p>
    </div>
  )
}
