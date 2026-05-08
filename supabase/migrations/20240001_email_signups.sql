-- Email signups table for homepage lead capture
create table if not exists public.email_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text default 'homepage',
  created_at  timestamptz default now()
);

-- Only the service role can insert/read — no public access
alter table public.email_signups enable row level security;

-- Block all anon/authenticated access (service role bypasses RLS)
create policy "no public access" on public.email_signups
  for all using (false);
