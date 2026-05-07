# ScentStack 🌸

**The fragrance stacking app powered by real perfume data.**

ScentStack lets users catalog their fragrance collection, analyze real scent notes, get occasion-based recommendations, and discover layering combinations that create entirely new scent profiles — all backed by the Fragella API (70,000+ fragrances).

## Features
- 🔍 Search 70,000+ real fragrances via Fragella API
- 📦 Build your personal fragrance wardrobe
- 🎯 Occasion-based recommendations (date night, office, wedding, etc.)
- 🧪 Layering engine — combines your scents into new profiles
- 💳 Stripe subscription billing (Free / Pro / Collector)
- 🔐 Supabase auth + database
- ⚡ Next.js 14 App Router + Tailwind CSS

## Stack
- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes (serverless)
- **Auth + DB**: Supabase
- **Payments**: Stripe
- **Fragrance Data**: Fragella API
- **Deployment**: Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your API keys
npm run dev
```

## Environment Variables
See `.env.example` for all required keys.

## Pricing
- **Free** — up to 10 fragrances, 3 stacks/day
- **Pro ($7.99/mo)** — unlimited fragrances, unlimited stacks, occasion planner
- **Collector ($14.99/mo)** — everything in Pro + shareable profiles + priority support
