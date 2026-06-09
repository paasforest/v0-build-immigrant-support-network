import SiteImage from "@/components/SiteImage"
import { gallery } from "@/lib/site-images"

export default function PeopleShowcase() {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#111111] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            Real candidates. <span className="text-gold">Real opportunities.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/60">
            We connect African talent with verified employers across Europe and Canada — from warehouse
            and agriculture to hospitality and manufacturing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((item) => (
            <figure
              key={item.caption}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-[#2a2a2a]"
            >
              <SiteImage
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-10 text-xs font-medium text-white md:text-sm">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
