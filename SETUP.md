# ScentStack — Setup Guide

## 1. Clone & Install
```bash
git clone https://github.com/CashPrep/scentstack.git
cd scentstack
npm install
cp .env.example .env.local
```

## 2. Supabase Setup
1. Go to [supabase.com](https://supabase.com) → New Project
2. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. Go to **Settings → API** → copy `Project URL` and `anon key`
4. Paste into `.env.local`

## 3. Fragella API (Fragrance Data — 70k+ fragrances)
1. Sign up at [api.fragella.com](https://api.fragella.com)
2. Get your API key
3. Add to `.env.local` as `FRAGELLA_API_KEY`

## 4. Stripe Setup
1. Go to [stripe.com](https://stripe.com) → Dashboard
2. Create two recurring products:
   - **ScentStack Pro** — $7.99/month
   - **ScentStack Collector** — $14.99/month
3. Copy the Price IDs into `.env.local`
4. Get your Stripe secret key and publishable key
5. For webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## 5. Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

## 6. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
# Add all env vars in Vercel dashboard under Settings → Environment Variables
```

## Stripe Webhook (Production)
- In Stripe Dashboard → Webhooks → Add endpoint
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.deleted`

## Pricing Summary
| Plan | Price | Fragrances | Stacks | Occasion Planner |
|------|-------|------------|--------|------------------|
| Free | $0 | 10 max | 3/day | ❌ |
| Pro | $7.99/mo | Unlimited | Unlimited | ✅ |
| Collector | $14.99/mo | Unlimited | Unlimited | ✅ + Profiles |
