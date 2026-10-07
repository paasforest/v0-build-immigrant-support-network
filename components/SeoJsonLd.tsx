import { siteConfig } from "@/lib/site-config"

/**
 * Site-wide structured data. ISN is a private visa assistance service: no licences,
 * certifications or government affiliations are claimed here.
 */
const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  email: siteConfig.email,
  telephone: siteConfig.phoneE164,
  areaServed: { "@type": "Country", name: "South Africa" },
  serviceType: "Visa application assistance",
  knowsAbout: [
    "Schengen visa applications",
    "UK visa applications",
    "US visa applications",
    "Canadian visa applications",
    "Visa refusals and re-applications",
  ],
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  inLanguage: "en-ZA",
  publisher: { "@id": `${siteConfig.url}/#organization` },
}

export default function SeoJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}
