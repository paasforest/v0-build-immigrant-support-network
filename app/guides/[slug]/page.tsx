import { permanentRedirect } from "next/navigation"
import { guideSlugs } from "@/lib/guides-data"

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

export default async function LegacyGuideToBlogRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  permanentRedirect(`/blog/${slug}`)
}
