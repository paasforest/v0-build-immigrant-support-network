/** @type {import('next').NextConfig} */

/**
 * Former recruitment-era guide slugs. ISN no longer offers recruitment, so these
 * articles were retired; send any old links or search traffic to the guides hub.
 */
const retiredGuideSlugs = [
  "jobs-in-poland-for-africans-2026",
  "jobs-in-romania-for-africans-2026",
  "jobs-in-hungary-for-foreign-workers",
  "easiest-europe-countries-for-africans",
  "cheapest-countries-to-work-europe-from-africa",
  "poland-work-visa-cost",
  "how-to-apply-work-abroad-from-africa",
  "how-to-get-a-job-in-romania-from-africa",
]

const nextConfig = {
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Old candidate application → new visa case assessment
      { source: "/apply", destination: "/visa-assessment", permanent: true },

      // Retired recruitment pages (ISN does not find or provide jobs)
      { source: "/jobs", destination: "/visa-services", permanent: true },
      { source: "/jobs/:path*", destination: "/visa-services", permanent: true },
      { source: "/work-abroad", destination: "/visa-services/work-visa", permanent: true },
      { source: "/cv-services", destination: "/visa-services", permanent: true },

      // Blog merged into guides
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/:slug*", destination: "/guides", permanent: true },
      ...retiredGuideSlugs.map((slug) => ({
        source: `/guides/${slug}`,
        destination: "/guides",
        permanent: true,
      })),

      // URLs from the previous version of this site that may still be linked or indexed
      { source: "/services", destination: "/visa-services", permanent: true },
      { source: "/overseas-employment-support", destination: "/visa-services", permanent: true },
      { source: "/visa-updates", destination: "/guides", permanent: true },
    ]
  },
}

export default nextConfig
