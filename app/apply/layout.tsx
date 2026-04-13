import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Candidate Application",
  description: `Multi-step candidate application for work abroad. ${siteConfig.name} — pre-screened matching for Europe and Canada.`,
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply for Jobs Abroad",
    description:
      "Submit your application for warehouse, agriculture, hospitality, and other international placements.",
    url: `${siteConfig.url}/apply`,
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
