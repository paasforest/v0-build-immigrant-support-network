import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SeoJsonLd from '@/components/SeoJsonLd'
import { siteConfig, siteUrl } from '@/lib/site-config'

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
    default: 'Immigrant Support Network | Work Abroad & Visa Assistance',
    template: '%s | Immigrant Support Network',
  },
  description: siteConfig.shortDescription,
  keywords: [
    'work abroad',
    'visa assistance',
    'immigration',
    'jobs in Europe',
    'jobs in Canada',
    'jobs in Poland',
    'jobs in Romania',
    'jobs in Hungary',
    'jobs in Lithuania',
    'jobs in Latvia',
    'African workers',
    'recruitment agency',
    'international jobs',
    'European work permit',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: siteConfig.name,
    title: 'Immigrant Support Network | Work Abroad & Visa Assistance',
    description: siteConfig.shortDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigrant Support Network',
    description: siteConfig.shortDescription,
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
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
