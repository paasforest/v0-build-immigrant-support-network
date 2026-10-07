import type { Metadata } from "next"
import { notFound } from "next/navigation"
import VisaContentPageView from "@/components/VisaContentPageView"
import { findServicePage, servicePages } from "@/lib/visa-pages"

export const dynamicParams = false

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findServicePage((await params).slug)
  if (!page) return {}
  const path = `/visa-services/${page.slug}`
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: `${page.metaTitle} | Immigrant Support Network`, description: page.metaDescription, url: path },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = findServicePage((await params).slug)
  if (!page) notFound()
  return <VisaContentPageView page={page} path={`/visa-services/${page.slug}`} />
}
