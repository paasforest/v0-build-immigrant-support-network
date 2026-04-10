"use client"

import { useEffect, useState } from "react"

type Heading = { id: string; title: string }

export default function GuideTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    const elements = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el != null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-12% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      className="mb-10 rounded-lg border border-[#2a2a2a] bg-[#111111] p-4 lg:sticky lg:top-24 lg:mb-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-5"
      aria-label="On this page"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">On this page</p>
      <ol className="space-y-2 text-sm">
        {headings.map((h, i) => {
          const isActive = activeId === h.id
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block rounded px-2 py-1.5 transition-colors ${
                  isActive ? "bg-gold/15 font-medium text-gold" : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-white/35">{i + 1}.</span> {h.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
