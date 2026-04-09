import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Visa Services",
  description: `Visa guidance and document preparation for work abroad in Europe and Canada. ${siteConfig.name}.`,
  alternates: {
    canonical: "/visa-services",
  },
  openGraph: {
    title: "Visa Application Support",
    description:
      "Step-by-step visa guidance, document checklists, and application support for international workers.",
    url: `${siteConfig.url}/visa-services`,
  },
}

export default function VisaServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
