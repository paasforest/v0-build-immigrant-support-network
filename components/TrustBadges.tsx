const stats = [
  { value: "500+", label: "Applications Processed" },
  { value: "12+", label: "African Countries Served" },
  { value: "70%", label: "Junk Applications Filtered Out" },
  { value: "24hr", label: "Response Time" },
]

export default function TrustBadges() {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#111111] py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-3xl font-bold text-gold md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-white/65 md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
