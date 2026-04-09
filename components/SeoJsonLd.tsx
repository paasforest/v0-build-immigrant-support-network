import { siteConfig } from "@/lib/site-config"

const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EmploymentAgency"],
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  email: siteConfig.email,
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
}

export default function SeoJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
