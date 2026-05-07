/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.fragella.com' },
      { protocol: 'https', hostname: 'fimgs.net' },
      { protocol: 'https', hostname: '*.fragrantica.com' },
    ],
  },
}

module.exports = nextConfig
