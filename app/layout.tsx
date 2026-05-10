import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const BASE_URL = 'https://yourscents.beauty'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c97a6e',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Your Scents ✨ — Your Personal Fragrance Wardrobe',
  description:
    'Discover, collect, and layer fragrances you actually love. Your Scents matches you with the perfect scent for any vibe — from coffee dates to girls\' nights out.',
  keywords: [
    'fragrance wardrobe',
    'perfume collection',
    'scent layering',
    'cologne app',
    'fragrance notes',
    'perfume combos',
    'aesthetic perfume app',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Your Scents ✨ — Find Your Signature Scent',
    description:
      'Build your dream fragrance wardrobe and get AI-powered layering combos. Made for fragrance lovers.',
    type: 'website',
    url: BASE_URL,
    siteName: 'Your Scents',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Scents — Personal Fragrance Wardrobe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Scents ✨ — Find Your Signature Scent',
    description: 'Build your dream fragrance wardrobe and get AI-powered layering combos.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to GA so the script load doesn't block rendering */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        {children}
        <Toaster />

        {/* Google Analytics — loaded after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C4460XTQ0N"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C4460XTQ0N', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
