import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Your Scents ✨ — Find Your Signature Scent',
    description:
      'Build your dream fragrance wardrobe and get AI-powered layering combos. Made for fragrance lovers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
