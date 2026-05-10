'use client'
import { useState } from 'react'
import { ShoppingBag, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { buildShopLinks } from '@/lib/affiliate'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

interface Props {
  fragranceName: string
  brand: string
  /** compact = single button that expands a dropdown; full = all links inline */
  variant?: 'compact' | 'full'
}

export default function ShopLinks({ fragranceName, brand, variant = 'compact' }: Props) {
  const [open, setOpen] = useState(false)
  const links = buildShopLinks(fragranceName, brand)

  if (variant === 'full') {
    return (
      <div className="flex flex-wrap gap-2">
        {links.map(l => (
          <a
            key={l.retailer}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
          >
            <span>{l.emoji}</span>{l.label}
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>
        ))}
      </div>
    )
  }

  // Compact: primary button + dropdown
  const primary = links[0]
  return (
    <div className="relative inline-flex">
      <a
        href={primary.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-l-full"
        style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
      >
        <ShoppingBag className="h-3 w-3" /> Shop
      </a>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center px-1.5 rounded-r-full border-l"
        style={{
          background:   ROSE_LIGHT,
          color:        ROSE_TEXT,
          borderColor:  `${ROSE}33`,
        }}
        aria-label="More shops"
      >
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 mb-1 rounded-xl shadow-lg py-1 z-20 min-w-[160px]"
          style={{ background: '#fff', border: `1px solid ${ROSE}33` }}
        >
          {links.map(l => (
            <a
              key={l.retailer}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted transition-colors"
              style={{ color: ROSE_TEXT }}
              onClick={() => setOpen(false)}
            >
              <span>{l.emoji}</span>
              <span className="font-medium">{l.label}</span>
              <ExternalLink className="h-2.5 w-2.5 ml-auto opacity-50" />
            </a>
          ))}
          <p className="text-[9px] text-center py-1 opacity-40">affiliate links</p>
        </div>
      )}
    </div>
  )
}
