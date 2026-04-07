"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/apply", label: "Apply" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const serviceLinks = [
    { href: "/work-abroad", label: "Work Abroad", description: "Job placements in Europe & Canada" },
    { href: "/visa-services", label: "Visa Services", description: "Application & documentation help" },
    { href: "/cv-services", label: "CV Services", description: "Professional European-format CVs" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Globe + ISN Logo */}
            <svg
              className="w-10 h-10 flex-shrink-0"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Globe */}
              <circle cx="24" cy="24" r="20" stroke="#C9A84C" strokeWidth="2" fill="none" />
              <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              <path d="M4 24h40" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M8 14h32" stroke="#C9A84C" strokeWidth="1" />
              <path d="M8 34h32" stroke="#C9A84C" strokeWidth="1" />
              {/* Plane accent */}
              <path d="M34 12l4-2-1 3-3-1z" fill="#C9A84C" />
            </svg>
            <div className="flex flex-col">
              <span className="text-gold font-serif text-xl font-bold leading-tight transition-all duration-300 group-hover:text-gold-light">
                ISN
              </span>
              <span className="text-white/80 text-xs leading-tight hidden sm:block">
                Immigrant Support Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold transition-all duration-300 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-gold transition-all duration-300 text-sm font-medium"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-[#111111] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                  servicesOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-3 hover:bg-[#1a1a1a] transition-all duration-200 group"
                  >
                    <span className="text-white group-hover:text-gold transition-colors duration-200 font-medium">
                      {link.label}
                    </span>
                    <span className="block text-xs text-white/50 mt-0.5">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold transition-all duration-300 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/apply"
              className="bg-gold text-[#0a0a0a] px-5 py-2 rounded font-semibold text-sm hover:bg-gold-light transition-all duration-300"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-gold transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-[#2a2a2a]">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-4 text-white/80 hover:text-gold hover:bg-[#111111] rounded transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-2 px-4 text-white/80 hover:text-gold hover:bg-[#111111] rounded transition-all duration-300"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileServicesOpen ? "max-h-48" : "max-h-0"
                }`}
              >
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false)
                      setMobileServicesOpen(false)
                    }}
                    className="block py-2 px-8 text-white/60 hover:text-gold hover:bg-[#111111] rounded transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-4 text-white/80 hover:text-gold hover:bg-[#111111] rounded transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="block mt-4 mx-4 text-center bg-gold text-[#0a0a0a] px-5 py-3 rounded font-semibold hover:bg-gold-light transition-all duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
