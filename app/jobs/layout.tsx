import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Job Opportunities",
  description: `Browse legal job listings in Poland, Romania, Hungary, the Baltics, Germany, the Netherlands, and Canada. ${siteConfig.name}.`,
  alternates: {
    canonical: "/jobs",
  },
  openGraph: {
    title: "Job Opportunities Abroad",
    description:
      "Warehouse, agriculture, hospitality, food production, and more — with recruitment agency support.",
    url: `${siteConfig.url}/jobs`,
  },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
