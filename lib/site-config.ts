/**
 * Canonical site URL for SEO (sitemap, Open Graph, JSON-LD).
 * Set NEXT_PUBLIC_SITE_URL in Vercel → Environment Variables to your live domain,
 * Use the same host you set as primary in Vercel (www vs apex). This site redirects apex → www.
 * e.g. https://www.immigrantsupportnetwork.co.za
 */
export const siteUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  "https://www.immigrantsupportnetwork.co.za"

export const siteConfig = {
  url: siteUrl,
  name: "Immigrant Support Network",
  shortName: "ISN",
  tagline: "Overseas Visa Assistance",
  shortDescription:
    "Overseas visa assistance: help with Schengen, UK, USA and Canada visa applications, refusals, re-applications, document requests and difficult visa cases.",
  email: "info@immigrantsupportnetwork.co.za",
  phoneDisplay: "+27 77 438 8845",
  phoneE164: "+27774388845",
  whatsappNumber: "27774388845",
  location: "South Africa",
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
