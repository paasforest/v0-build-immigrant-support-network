import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site-config"
import { isIndexable } from "@/lib/indexing"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Form endpoints are not content.
      disallow: ["/api/"],
    },
    // Non-production deployments stay crawlable so crawlers can see their noindex
    // tags, but do not advertise a sitemap.
    ...(isIndexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  }
}
