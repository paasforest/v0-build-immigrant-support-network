import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site-config"
import { destinationPages, servicePages } from "@/lib/visa-pages"
import { guides } from "@/lib/guides"

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: string }

/** Every public, indexable page. Redirected legacy URLs are intentionally not listed. */
function sitemapEntries(): Entry[] {
  return [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/visa-assessment", changeFrequency: "monthly", priority: 0.9 },
    { path: "/visa-services", changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((p) => ({ path: `/visa-services/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { path: "/destinations", changeFrequency: "monthly", priority: 0.8 },
    ...destinationPages.map((p) => ({ path: `/destinations/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.7 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.7 },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: g.updated })),
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }))
}
