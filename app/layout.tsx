import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SeoJsonLd from '@/components/SeoJsonLd'
import PublicOnly from '@/components/PublicOnly'
import { siteConfig, siteUrl } from '@/lib/site-config'
import { isIndexable } from '@/lib/indexing'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Immigrant Support Network | Overseas Visa Assistance',
    template: '%s | Immigrant Support Network',
  },
  description: siteConfig.shortDescription,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: siteConfig.name,
    title: 'Immigrant Support Network | Overseas Visa Assistance',
    description: siteConfig.shortDescription,
    url: siteUrl,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Immigrant Support Network: overseas visa assistance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigrant Support Network | Overseas Visa Assistance',
    description: siteConfig.shortDescription,
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <SeoJsonLd />
        <PublicOnly>
          <Navbar />
        </PublicOnly>
        <main className="flex-1">
          {children}
        </main>
        <PublicOnly>
          <Footer />
          <WhatsAppButton />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </PublicOnly>
      </body>
    </html>
  )
}
