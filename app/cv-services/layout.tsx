import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "CV Services",
  description: `European-format CV writing for work abroad. Professional CV packages from ${siteConfig.name}.`,
  alternates: {
    canonical: "/cv-services",
  },
  openGraph: {
    title: "Professional CV Services",
    description: "European-standard CVs to help you stand out to international employers.",
    url: `${siteConfig.url}/cv-services`,
  },
}

export default function CvServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
