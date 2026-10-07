import Link from "next/link"

export type LinkCard = { href: string; label: string; short: string }

export default function LinkCardGrid({ items, columns = 2 }: { items: LinkCard[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns]
  return (
    <ul className={`grid grid-cols-1 gap-4 ${cols}`}>
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group block h-full rounded-lg border border-[#2a2a2a] bg-[#111111] p-5 transition-colors hover:border-gold/50"
          >
            <span className="font-semibold text-white group-hover:text-gold">{item.label}</span>
            <span className="mt-1 block text-sm leading-relaxed text-white/60">{item.short}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
