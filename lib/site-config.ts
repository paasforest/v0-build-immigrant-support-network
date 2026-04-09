/**
 * Canonical site URL for SEO (sitemap, Open Graph, JSON-LD).
 * Set NEXT_PUBLIC_SITE_URL in Vercel → Environment Variables to your live domain,
 * e.g. https://www.immigrantsupportnetwork.co.za
 */
export const siteUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  "https://immigrantsupportnetwork.co.za"

export const siteConfig = {
  url: siteUrl,
  name: "Immigrant Support Network",
  shortDescription:
    "Connecting African talent with international employers in Europe and Canada. Legal work placements and visa assistance.",
  email: "info@immigrantsupportnetwork.co.za",
}
