-- ScentStack Database Schema (safe to re-run)

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'collector')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.wardrobe_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  fragrance_id text not null,
  fragrance_name text not null,
  brand text,
  notes text[] default '{}',
  accords text[] default '{}',
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.saved_stacks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stack_name text not null,
  fragrance_ids text[] not null,
  occasion text,
  confidence text,
  notes jsonb,
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, plan)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'plan', 'free')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.wardrobe_items enable row level security;
alter table public.saved_stacks enable row level security;

drop policy if exists "Users can manage their own profile" on public.profiles;
create policy "Users can manage their own profile"
  on public.profiles for all using (auth.uid() = id);

drop policy if exists "Users can manage their own wardrobe" on public.wardrobe_items;
create policy "Users can manage their own wardrobe"
  on public.wardrobe_items for all using (auth.uid() = user_id);

drop policy if exists "Users can manage their own stacks" on public.saved_stacks;
create policy "Users can manage their own stacks"
  on public.saved_stacks for all using (auth.uid() = user_id);

create index if not exists wardrobe_items_user_id_idx on public.wardrobe_items(user_id);
create index if not exists saved_stacks_user_id_idx on public.saved_stacks(user_id);
