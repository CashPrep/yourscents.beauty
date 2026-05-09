# ScentStack — Production Setup Guide

> Follow every step in order. Skipping steps is the #1 cause of broken Stripe payments.

---

## 1. Clone & Install

```bash
git clone https://github.com/CashPrep/yourscents.beauty.git
cd yourscents.beauty
npm install
cp .env.example .env.local
```

---

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. **SQL Editor** → paste contents of `supabase/schema.sql` → **Run**
3. Run each migration in order:
   ```bash
   # In Supabase SQL Editor, run each file in supabase/migrations/ in filename order:
   # 20240001_email_signups.sql
   # 20260508_rating_personal_note.sql
   # 20260509_public_profile_read.sql
   # 20260509_stripe_customer_index.sql
   ```
4. **Settings → API** → copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` on the client. It bypasses RLS.

---

## 3. Stripe Setup

### 3a. Create Products
1. [stripe.com](https://stripe.com) → **Dashboard → Products → Add product**
2. Create **ScentStack Pro** — $7.99/month recurring → copy the `price_xxx` ID → `STRIPE_PRO_PRICE_ID`
3. Create **ScentStack Collector** — $14.99/month recurring → copy the `price_xxx` ID → `STRIPE_COLLECTOR_PRICE_ID`
4. **Developers → API keys** → copy:
   - Secret key → `STRIPE_SECRET_KEY`
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 3b. Register Production Webhook
> This is **required** for plan upgrades to activate after checkout.

1. **Stripe Dashboard → Developers → Webhooks → Add endpoint**
2. **Endpoint URL:** `https://yourscents.beauty/api/webhooks/stripe`
3. **Events to listen for** (select all of these):
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Click **Add endpoint** → **Reveal signing secret** → copy → `STRIPE_WEBHOOK_SECRET`

> ⚠️ The webhook secret from the Stripe CLI (`whsec_...`) is different from the
> production endpoint secret. Use the one from the dashboard endpoint, not the CLI.

### 3c. Enable Stripe Customer Portal
1. **Stripe Dashboard → Settings → Billing → Customer portal**
2. Toggle **Allow customers to cancel subscriptions** → **Save**
3. This powers the **Manage Plan** button in the user dashboard.

---

## 4. Fragrance API

**Option A — Fragella (recommended)**
1. Sign up at [api.fragella.com](https://api.fragella.com)
2. Copy your API key → `FRAGELLA_API_KEY`

**Option B — RapidAPI fallback**
1. [rapidapi.com](https://rapidapi.com/api-sports/api/perfumes-and-fragrances)
2. Copy your key → `RAPIDAPI_KEY`

The search route (`/api/fragrances/search`) tries Fragella first, then falls back to RapidAPI.

---

## 5. Vercel Deployment

### 5a. Set all environment variables in Vercel

Go to **Vercel → your project → Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from dashboard endpoint |
| `STRIPE_PRO_PRICE_ID` | `price_...` for $7.99/mo |
| `STRIPE_COLLECTOR_PRICE_ID` | `price_...` for $14.99/mo |
| `NEXT_PUBLIC_APP_URL` | `https://yourscents.beauty` |
| `FRAGELLA_API_KEY` | Your Fragella key |
| `RAPIDAPI_KEY` | Your RapidAPI key (optional backup) |

> ⚠️ `NEXT_PUBLIC_APP_URL` **must** be `https://yourscents.beauty` — never `localhost`.
> The build will throw an error if it detects localhost in production.

### 5b. Deploy

```bash
npm install -g vercel
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on push to `main`.

---

## 6. Local Development

```bash
npm run dev
# Open http://localhost:3000
```

For local Stripe webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the whsec_... it prints → paste into .env.local as STRIPE_WEBHOOK_SECRET
```

---

## 7. Post-Deploy Verification

After deploying, verify these manually:

- [ ] Sign up with a new email → profile row appears in Supabase `profiles` table with `plan = 'free'`
- [ ] Add 3 fragrances as free user → 4th add is blocked with upgrade prompt
- [ ] Click **Upgrade to Pro** → Stripe checkout opens with correct price
- [ ] Complete checkout with Stripe test card `4242 4242 4242 4242` → redirected to `/dashboard?upgraded=true` → plan badge shows **Pro**
- [ ] Check Supabase `profiles` table → `plan`, `stripe_customer_id`, `stripe_subscription_id` all populated
- [ ] Click **Manage Plan** → Stripe customer portal opens
- [ ] Cancel subscription in portal → webhook fires → plan reverts to `free`

---

## Plan Features

| Feature | Free | Pro ($7.99/mo) | Collector ($14.99/mo) |
|---|---|---|---|
| Wardrobe | 3 fragrances | Unlimited | Unlimited |
| Scent DNA | ✅ | ✅ | ✅ |
| Occasion Planner | ✅ (basic) | ✅ (AI stack) | ✅ |
| Stack Analysis | ❌ | ✅ | ✅ |
| Seasonal Rotation | ❌ | ✅ | ✅ |
| Discovery Feed | ❌ | ✅ | ✅ |
| Advanced Layering | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ✅ | ✅ (12hr) |
