import type { Metadata } from "next"
import HeroSection from "@/components/HeroSection"
import CtaBand from "@/components/CtaBand"
import VisaDisclaimer from "@/components/VisaDisclaimer"
import { siteConfig, siteUrl } from "@/lib/site-config"

const title = "Immigrant Support Network | Overseas Visa Assistance"

export const metadata: Metadata = {
  title: { absolute: title },
  description: siteConfig.shortDescription,
  alternates: { canonical: "/" },
  openGraph: { title, description: siteConfig.shortDescription, url: siteUrl },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <VisaDisclaimer />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
