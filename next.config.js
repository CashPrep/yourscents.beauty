/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRO_PRICE_ID',
    'STRIPE_COLLECTOR_PRICE_ID',
    'NEXT_PUBLIC_APP_URL',
  ]
  const missing = required.filter(k => !process.env[k])
  if (missing.length) {
    // Warn but do NOT throw — let the site build and serve static/marketing
    // pages even if payment/auth env vars aren't wired yet. API routes
    // validate their own required vars at runtime.
    console.warn(
      `[yourscents.beauty] WARNING: Missing environment variables:\n  ${missing.join('\n  ')}\n` +
      `Set them in Vercel → Settings → Environment Variables.`
    )
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  if (appUrl && appUrl.includes('localhost')) {
    console.warn(
      `[yourscents.beauty] WARNING: NEXT_PUBLIC_APP_URL is set to "${appUrl}" in production.\n` +
      `It should be your live domain, e.g. https://yourscents.beauty`
    )
  }
}

const nextConfig = {
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fimgs.net' },
      { protocol: 'https', hostname: '*.fimgs.net' },
      { protocol: 'https', hostname: 'www.fragrantica.com' },
      { protocol: 'https', hostname: 'fragrantica.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path((?!_next).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
module.exports = nextConfig
