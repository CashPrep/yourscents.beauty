import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers on public pages
        userAgent: '*',
        allow: '/',
        // Block private/auth routes from indexing
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/login',
          '/signup',
          '/forgot-password',
          '/reset-password',
        ],
      },
    ],
    sitemap: 'https://yourscents.beauty/sitemap.xml',
    host: 'https://yourscents.beauty',
  }
}
