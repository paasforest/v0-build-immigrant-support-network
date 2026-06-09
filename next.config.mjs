/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      {
        source: "/blog/how-to-get-a-job-in-romania-from-africa",
        destination: "/blog/jobs-in-romania-for-africans-2026",
        permanent: true,
      },
      {
        source: "/guides/how-to-get-a-job-in-romania-from-africa",
        destination: "/guides/jobs-in-romania-for-africans-2026",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
