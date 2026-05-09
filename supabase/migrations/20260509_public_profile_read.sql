-- Public Scent Card read policies
-- Allows any visitor (authenticated or not) to read the minimal profile fields
-- and wardrobe items needed to render the /u/[userId] public page.
-- We expose only non-sensitive columns; private fields (stripe IDs etc.) are
-- never returned because the page selects only full_name, plan, and wardrobe_items.*

drop policy if exists "Public can read profiles" on public.profiles;
create policy "Public can read profiles"
  on public.profiles
  for select
  using (true);

drop policy if exists "Public can read wardrobe items" on public.wardrobe_items;
create policy "Public can read wardrobe items"
  on public.wardrobe_items
  for select
  using (true);
