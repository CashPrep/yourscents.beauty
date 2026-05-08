import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Your Scents — Build Your Fragrance Wardrobe',
  description:
    'Catalog your fragrance collection, discover optimal wear occasions for each scent, and find the best layering combinations using real note data from 70,000+ perfumes and colognes.',
  keywords: [
    'fragrance wardrobe',
    'perfume collection tracker',
    'scent layering',
    'cologne app',
    'fragrance notes',
    'perfume combinations',
  ],
  openGraph: {
    title: 'Your Scents — Layer Your Fragrances Like a Pro',
    description:
      'Discover the best occasions and layering combos for every fragrance you own. Backed by real top, middle, and base note data.',
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
