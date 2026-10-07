import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Visa Guides",
  description: `${siteConfig.name}: plain-language guides on overseas visa applications, refusals and document requests.`,
  alternates: { canonical: "/guides" },
}

export default function GuidesHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="border-b border-[#2a2a2a] bg-gradient-to-b from-[#111111] to-[#0a0a0a] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-white md:text-5xl">
            Visa <span className="text-gold">guides</span>
          </h1>
          <p className="mt-4 text-lg text-white/70">Plain-language guides on overseas visas are being prepared.</p>
          <Link
            href="/visa-assessment"
            className="mt-8 inline-block rounded bg-gold px-6 py-3 font-semibold text-[#0a0a0a] hover:bg-gold-light"
          >
            Get a Visa Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}
