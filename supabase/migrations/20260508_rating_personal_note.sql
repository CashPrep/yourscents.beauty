-- Add rating and personal_note columns to wardrobe_items
ALTER TABLE public.wardrobe_items
  ADD COLUMN IF NOT EXISTS rating int default 0,
  ADD COLUMN IF NOT EXISTS personal_note text;
