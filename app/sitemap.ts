import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site-config"

const routes: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/jobs", changeFrequency: "daily", priority: 0.95 },
  { path: "/apply", changeFrequency: "weekly", priority: 0.95 },
  { path: "/work-abroad", changeFrequency: "weekly", priority: 0.9 },
  { path: "/visa-services", changeFrequency: "monthly", priority: 0.85 },
  { path: "/cv-services", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
