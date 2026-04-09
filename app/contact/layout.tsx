import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for work abroad, recruitment, and visa support. Email ${siteConfig.email}.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us",
    description: `Reach ${siteConfig.name} for international job placements and visa guidance.`,
    url: `${siteConfig.url}/contact`,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
