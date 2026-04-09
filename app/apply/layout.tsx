import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Apply for Jobs Abroad",
  description: `Apply for legal work abroad in Europe and Canada. ${siteConfig.name} connects candidates with vetted employers.`,
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
