import SiteImage from "@/components/SiteImage"
import { gallery } from "@/lib/site-images"

export default function PeopleShowcase() {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#111111] py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            Candidates like <span className="text-gold">you</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/60">
            From Kenya, Nigeria, Ghana, South Africa, and across the continent — African workers we help
            place in legal roles across Europe and Canada.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {gallery.map((item) => (
            <figure
              key={item.caption}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]"
            >
              <SiteImage
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-3 pb-3 pt-12">
                <span className="mb-1 block text-base" aria-hidden>
                  {item.flag}
                </span>
                <span className="block text-xs font-medium leading-snug text-white md:text-sm">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
