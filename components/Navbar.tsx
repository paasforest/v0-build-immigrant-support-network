"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { applicationServices, problemServices, destinations } from "@/lib/visa-catalog"

type MenuItem = { href: string; label: string; short?: string }
type Menu = { id: string; label: string; items: MenuItem[] }

const menus: Menu[] = [
  {
    id: "services",
    label: "Visa Services",
    items: [
      { href: "/visa-services", label: "All visa services", short: "Applications and visa problem solving" },
      ...problemServices,
      ...applicationServices,
    ],
  },
  {
    id: "destinations",
    label: "Destinations",
    items: [{ href: "/destinations", label: "All destinations", short: "Where we assist" }, ...destinations],
  },
]

const plainLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <svg className="h-10 w-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="24" cy="24" r="20" stroke="#C9A84C" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
        <path d="M4 24h40" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M8 14h32" stroke="#C9A84C" strokeWidth="1" />
        <path d="M8 34h32" stroke="#C9A84C" strokeWidth="1" />
        <path d="M34 12l4-2-1 3-3-1z" fill="#C9A84C" />
      </svg>
      <div className="flex flex-col">
        <span className="font-serif text-xl font-bold leading-tight text-gold transition-all duration-300 group-hover:text-gold-light">
          ISN
        </span>
        <span className="hidden text-xs leading-tight text-white/80 sm:block">Immigrant Support Network</span>
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenu, setMobileMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null)
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const closeAll = () => {
    setIsOpen(false)
    setOpenMenu(null)
    setMobileMenu(null)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={navRef}>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-6 lg:flex">
            {menus.map((menu) => (
              <div className="relative" key={menu.id}>
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                  aria-expanded={openMenu === menu.id}
                  aria-controls={`menu-${menu.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-white/80 transition-all duration-300 hover:text-gold"
                >
                  {menu.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openMenu === menu.id ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`menu-${menu.id}`}
                  className={`absolute left-0 top-full mt-2 max-h-[75vh] w-72 overflow-y-auto rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-xl transition-all duration-200 ${
                    openMenu === menu.id ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="group block px-4 py-3 transition-all duration-200 hover:bg-[#1a1a1a]"
                    >
                      <span className="font-medium text-white transition-colors duration-200 group-hover:text-gold">
                        {item.label}
                      </span>
                      {item.short ? <span className="mt-0.5 block text-xs text-white/50">{item.short}</span> : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-all duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/visa-assessment"
              className="rounded bg-gold px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light"
            >
              Get a Visa Assessment
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white transition-all duration-300 hover:text-gold lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          // Collapsed panel stays in the DOM for the animation; inert keeps its links out of tab order and the a11y tree.
          inert={!isOpen}
          className={`overflow-y-auto transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 border-t border-[#2a2a2a] py-4">
            {menus.map((menu) => (
              <div key={menu.id}>
                <button
                  type="button"
                  onClick={() => setMobileMenu(mobileMenu === menu.id ? null : menu.id)}
                  aria-expanded={mobileMenu === menu.id}
                  className="flex w-full items-center justify-between rounded px-4 py-2 text-white/80 transition-all duration-300 hover:bg-[#111111] hover:text-gold"
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileMenu === menu.id ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {mobileMenu === menu.id ? (
                  <div>
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="block rounded px-8 py-2 text-sm text-white/60 transition-all duration-300 hover:bg-[#111111] hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="block rounded px-4 py-2 text-white/80 transition-all duration-300 hover:bg-[#111111] hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/visa-assessment"
              onClick={closeAll}
              className="mx-4 mt-4 block rounded bg-gold px-5 py-3 text-center font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light"
            >
              Get a Visa Assessment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
