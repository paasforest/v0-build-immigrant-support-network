import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuideArticleView from "@/components/GuideArticleView"
import { GUIDES, getGuidePostDates, guideSlugs } from "@/lib/guides-data"
import { siteConfig } from "@/lib/site-config"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) return {}
  const canonical = `${siteConfig.url}/blog/${slug}`
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Immigrant Support Network — Jobs in Europe and Canada for Africans",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) notFound()

  const { published, modified } = getGuidePostDates(guide)
  const siteUrl = siteConfig.url
  const postUrl = `${siteUrl}/blog/${slug}`

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: guide.title, item: postUrl },
    ],
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.description,
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: "Immigrant Support Network",
    },
    publisher: {
      "@type": "Organization",
      name: "Immigrant Support Network",
      url: siteUrl,
    },
    url: postUrl,
    mainEntityOfPage: postUrl,
    image: [`${siteUrl}/og-image.jpg`],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <GuideArticleView guide={guide} slug={slug} />
    </>
  )
}
