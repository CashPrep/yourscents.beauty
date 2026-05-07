import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ScentStack — Layer Your Fragrances Like a Pro',
  description: 'Catalog your fragrance collection, discover the best occasions for each scent, and create incredible layering combinations with real perfume data from 70,000+ fragrances.',
  keywords: ['fragrance', 'perfume', 'scent stacking', 'layering', 'cologne', 'perfume app'],
  openGraph: {
    title: 'ScentStack — Layer Your Fragrances Like a Pro',
    description: 'Discover the best occasions and layering combos for your fragrance wardrobe.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
