-- Staff Picks & Download Tracking
-- Run this in the Supabase SQL Editor after 001_initial_schema.sql

-- ============================================================
-- STAFF PICKS + DOWNLOAD COUNT on resources
-- ============================================================
alter table public.resources add column if not exists is_staff_pick boolean default false;
alter table public.resources add column if not exists download_count integer default 0;

-- Index for quick staff picks queries
create index if not exists idx_resources_staff_pick on public.resources (is_staff_pick) where is_staff_pick = true;

-- ============================================================
-- RESOURCE FILES (attachments for download)
-- ============================================================
create table if not exists public.resource_files (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources(id) on delete cascade,
  file_name text not null,
  file_size integer not null default 0,
  storage_path text not null,
  content_type text,
  download_count integer default 0,
  created_at timestamptz default now() not null
);

alter table public.resource_files enable row level security;

create policy "Resource files are viewable by everyone"
  on public.resource_files for select using (true);

create policy "Authors can manage their resource files"
  on public.resource_files for insert
  with check (
    exists (
      select 1 from public.resources
      where resources.id = resource_files.resource_id
      and resources.author_id = auth.uid()
    )
  );

create policy "Authors can delete their resource files"
  on public.resource_files for delete
  using (
    exists (
      select 1 from public.resources
      where resources.id = resource_files.resource_id
      and resources.author_id = auth.uid()
    )
  );

-- ============================================================
-- STORAGE BUCKET for resource files
-- ============================================================
insert into storage.buckets (id, name, public)
values ('resource-files', 'resource-files', true)
on conflict (id) do nothing;

-- Anyone can read files
create policy "Public read access for resource files"
  on storage.objects for select
  using (bucket_id = 'resource-files');

-- Authenticated users can upload
create policy "Authenticated users can upload resource files"
  on storage.objects for insert
  with check (bucket_id = 'resource-files' and auth.role() = 'authenticated');

-- Users can delete their own uploads
create policy "Users can delete own resource files"
  on storage.objects for delete
  using (bucket_id = 'resource-files' and auth.uid()::text = (storage.foldername(name))[1]);
