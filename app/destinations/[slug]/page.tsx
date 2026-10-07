import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VisaContentPageView from "@/components/VisaContentPageView"
import { findDestinationPage, destinationPages } from "@/lib/visa-pages"

export const dynamicParams = false

export function generateStaticParams() {
  return destinationPages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findDestinationPage((await params).slug)
  if (!page) return {}
  const path = `/destinations/${page.slug}`
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: `${page.metaTitle} | Immigrant Support Network`, description: page.metaDescription, url: path },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = findDestinationPage((await params).slug)
  if (!page) notFound()
  return <VisaContentPageView page={page} path={`/destinations/${page.slug}`} />
}
