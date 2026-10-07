import Link from "next/link"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { siteConfig, whatsappLink } from "@/lib/site-config"
import { problemServices, destinations } from "@/lib/visa-catalog"

const companyLinks = [
  { href: "/visa-assessment", label: "Get a Visa Assessment" },
  { href: "/visa-services", label: "Visa Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
]

function LinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-white">{title}</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/60 transition-all duration-300 hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-2 font-serif text-xl font-bold text-gold">{siteConfig.name}</p>
            <p className="mb-4 text-sm font-medium text-white/80">{siteConfig.tagline}</p>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Help with overseas visa applications and visa problems: refusals, re-applications, additional document
              requests, verification and appointment issues.
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                Phone / WhatsApp:{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
              </li>
              <li>Location: {siteConfig.location}</li>
            </ul>
          </div>

          <LinkList title="Company" links={companyLinks} />
          <LinkList
            title="Visa problems & destinations"
            links={[...problemServices.map((s) => ({ href: s.href, label: s.label })), ...destinations.map((d) => ({ href: d.href, label: d.label }))]}
          />
          <LinkList title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 border-t border-[#2a2a2a] pt-8">
          <VisaDisclaimer compact />
          <p className="mt-4 text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
