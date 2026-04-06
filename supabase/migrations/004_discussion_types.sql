-- Discussion Types
-- Run this in the Supabase SQL Editor after 003

alter table public.discussions add column if not exists discussion_type text not null default 'question'
  check (discussion_type in ('question', 'showcase', 'tips', 'meta'));

alter table public.discussions add column if not exists is_answered boolean default false;

-- Index for filtering by type
create index if not exists idx_discussions_type on public.discussions (discussion_type);
