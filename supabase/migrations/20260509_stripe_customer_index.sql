-- Index on stripe_customer_id for fast webhook lookups.
-- The Stripe webhook fires on every subscription event and looks up a profile
-- by stripe_subscription_id. Without an index this is a full table scan.
create index if not exists profiles_stripe_subscription_id_idx
  on public.profiles (stripe_subscription_id)
  where stripe_subscription_id is not null;

create index if not exists profiles_stripe_customer_id_idx
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;
