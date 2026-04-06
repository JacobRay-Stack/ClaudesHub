-- ClaudesHub Initial Schema
-- Run this in the Supabase SQL Editor

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  new_username text;
  suffix text;
begin
  -- Try email prefix first, then generate random
  new_username := lower(split_part(new.email, '@', 1));
  -- Remove non-alphanumeric chars
  new_username := regexp_replace(new_username, '[^a-z0-9]', '', 'g');
  -- If username taken, append random suffix
  if exists (select 1 from public.profiles where username = new_username) then
    suffix := substr(md5(random()::text), 1, 4);
    new_username := new_username || suffix;
  end if;
  -- Still collision? One more try
  if exists (select 1 from public.profiles where username = new_username) then
    suffix := substr(md5(random()::text), 1, 6);
    new_username := new_username || suffix;
  end if;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    new_username,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- CATEGORIES
-- ============================================================
create table public.categories (
  id serial primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  icon text,
  sort_order int default 0 not null
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

-- Seed the 10 categories
insert into public.categories (name, slug, description, icon, sort_order) values
  ('Code Generation & Refactoring', 'code-generation', 'Scaffolding, boilerplate, migrations, language conversions, test generation', 'code', 1),
  ('DevOps & Infrastructure', 'devops-infrastructure', 'CI/CD pipelines, Docker, Terraform, deployment automation', 'terminal', 2),
  ('MCP Server Integrations', 'mcp-servers', 'Pre-built MCP servers connecting Claude to external tools and APIs', 'plug', 3),
  ('Git & Code Review', 'git-code-review', 'PR creation, commit conventions, automated review, changelog generation', 'git-branch', 4),
  ('Data & Analytics', 'data-analytics', 'SQL generation, CSV analysis, dashboard creation, data pipeline scaffolding', 'chart', 5),
  ('Writing & Content', 'writing-content', 'Blog posts, docs, marketing copy, SEO optimization, email drafts', 'pen', 6),
  ('Security & Compliance', 'security-compliance', 'Dependency audits, secret scanning, OWASP checks, policy generation', 'shield', 7),
  ('Project Bootstrapping', 'project-bootstrapping', 'Full project templates with opinionated stacks, pre-configured tooling', 'rocket', 8),
  ('AI Agent & Workflow Automation', 'agent-workflows', 'Multi-step agent chains, hooks, subagent orchestration, cron-triggered tasks', 'zap', 9),
  ('Domain-Specific Packs', 'domain-packs', 'Vertical skill bundles for specific industries or frameworks', 'package', 10);

-- ============================================================
-- RESOURCES
-- ============================================================
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  content text,
  resource_type text not null default 'skill' check (resource_type in ('skill', 'sop', 'mcp-server', 'reference', 'template')),
  category_id int references public.categories(id),
  author_id uuid references public.profiles(id) not null,
  tags text[] default '{}',
  upvote_count int default 0 not null,
  comment_count int default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_resources_category on public.resources(category_id);
create index idx_resources_author on public.resources(author_id);
create index idx_resources_created on public.resources(created_at desc);
create index idx_resources_upvotes on public.resources(upvote_count desc);
create index idx_resources_tags on public.resources using gin(tags);

alter table public.resources enable row level security;

create policy "Resources are viewable by everyone"
  on public.resources for select using (true);

create policy "Authenticated users can create resources"
  on public.resources for insert with check (auth.uid() = author_id);

create policy "Authors can update their own resources"
  on public.resources for update using (auth.uid() = author_id);

create policy "Authors can delete their own resources"
  on public.resources for delete using (auth.uid() = author_id);

-- ============================================================
-- DISCUSSIONS
-- ============================================================
create table public.discussions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body text,
  author_id uuid references public.profiles(id) not null,
  category_id int references public.categories(id),
  upvote_count int default 0 not null,
  comment_count int default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_discussions_created on public.discussions(created_at desc);
create index idx_discussions_upvotes on public.discussions(upvote_count desc);
create index idx_discussions_author on public.discussions(author_id);

alter table public.discussions enable row level security;

create policy "Discussions are viewable by everyone"
  on public.discussions for select using (true);

create policy "Authenticated users can create discussions"
  on public.discussions for insert with check (auth.uid() = author_id);

create policy "Authors can update their own discussions"
  on public.discussions for update using (auth.uid() = author_id);

create policy "Authors can delete their own discussions"
  on public.discussions for delete using (auth.uid() = author_id);

-- ============================================================
-- COMMENTS (unified for resources + discussions, nested)
-- ============================================================
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  author_id uuid references public.profiles(id) not null,
  resource_id uuid references public.resources(id) on delete cascade,
  discussion_id uuid references public.discussions(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  upvote_count int default 0 not null,
  depth int default 0 not null,
  created_at timestamptz default now() not null,
  constraint comment_target_check check (
    (resource_id is not null and discussion_id is null) or
    (resource_id is null and discussion_id is not null)
  )
);

create index idx_comments_resource on public.comments(resource_id) where resource_id is not null;
create index idx_comments_discussion on public.comments(discussion_id) where discussion_id is not null;
create index idx_comments_parent on public.comments(parent_id) where parent_id is not null;

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can create comments"
  on public.comments for insert with check (auth.uid() = author_id);

create policy "Authors can update their own comments"
  on public.comments for update using (auth.uid() = author_id);

create policy "Authors can delete their own comments"
  on public.comments for delete using (auth.uid() = author_id);

-- Trigger to increment comment_count on resources/discussions
create or replace function public.handle_comment_count()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if TG_OP = 'INSERT' then
    if new.resource_id is not null then
      update public.resources set comment_count = comment_count + 1 where id = new.resource_id;
    elsif new.discussion_id is not null then
      update public.discussions set comment_count = comment_count + 1 where id = new.discussion_id;
    end if;
  elsif TG_OP = 'DELETE' then
    if old.resource_id is not null then
      update public.resources set comment_count = greatest(comment_count - 1, 0) where id = old.resource_id;
    elsif old.discussion_id is not null then
      update public.discussions set comment_count = greatest(comment_count - 1, 0) where id = old.discussion_id;
    end if;
  end if;
  return coalesce(new, old);
end;
$$;

create trigger on_comment_change
  after insert or delete on public.comments
  for each row execute function public.handle_comment_count();

-- ============================================================
-- VOTES
-- ============================================================
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) not null,
  resource_id uuid references public.resources(id) on delete cascade,
  discussion_id uuid references public.discussions(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz default now() not null,
  constraint vote_target_check check (
    (resource_id is not null)::int + (discussion_id is not null)::int + (comment_id is not null)::int = 1
  )
);

create unique index idx_votes_resource on public.votes(user_id, resource_id) where resource_id is not null;
create unique index idx_votes_discussion on public.votes(user_id, discussion_id) where discussion_id is not null;
create unique index idx_votes_comment on public.votes(user_id, comment_id) where comment_id is not null;

alter table public.votes enable row level security;

create policy "Users can view their own votes"
  on public.votes for select using (auth.uid() = user_id);

create policy "Authenticated users can insert votes"
  on public.votes for insert with check (auth.uid() = user_id);

create policy "Users can delete their own votes"
  on public.votes for delete using (auth.uid() = user_id);

-- RPC function for atomic vote handling
create or replace function public.handle_vote(
  p_user_id uuid,
  p_resource_id uuid default null,
  p_discussion_id uuid default null,
  p_comment_id uuid default null,
  p_value smallint default 1
)
returns int
language plpgsql
security definer set search_path = ''
as $$
declare
  existing_value smallint;
  new_count int;
begin
  -- Check for existing vote
  select value into existing_value from public.votes
  where user_id = p_user_id
    and resource_id is not distinct from p_resource_id
    and discussion_id is not distinct from p_discussion_id
    and comment_id is not distinct from p_comment_id;

  if existing_value is not null then
    if existing_value = p_value then
      -- Same vote: remove it (toggle off)
      delete from public.votes
      where user_id = p_user_id
        and resource_id is not distinct from p_resource_id
        and discussion_id is not distinct from p_discussion_id
        and comment_id is not distinct from p_comment_id;

      -- Update count: subtract the old value
      if p_resource_id is not null then
        update public.resources set upvote_count = upvote_count - existing_value where id = p_resource_id returning upvote_count into new_count;
      elsif p_discussion_id is not null then
        update public.discussions set upvote_count = upvote_count - existing_value where id = p_discussion_id returning upvote_count into new_count;
      elsif p_comment_id is not null then
        update public.comments set upvote_count = upvote_count - existing_value where id = p_comment_id returning upvote_count into new_count;
      end if;
    else
      -- Different vote: update it
      update public.votes set value = p_value
      where user_id = p_user_id
        and resource_id is not distinct from p_resource_id
        and discussion_id is not distinct from p_discussion_id
        and comment_id is not distinct from p_comment_id;

      -- Update count: swing by 2 (remove old, add new)
      if p_resource_id is not null then
        update public.resources set upvote_count = upvote_count + (p_value - existing_value) where id = p_resource_id returning upvote_count into new_count;
      elsif p_discussion_id is not null then
        update public.discussions set upvote_count = upvote_count + (p_value - existing_value) where id = p_discussion_id returning upvote_count into new_count;
      elsif p_comment_id is not null then
        update public.comments set upvote_count = upvote_count + (p_value - existing_value) where id = p_comment_id returning upvote_count into new_count;
      end if;
    end if;
  else
    -- No existing vote: insert new
    insert into public.votes (user_id, resource_id, discussion_id, comment_id, value)
    values (p_user_id, p_resource_id, p_discussion_id, p_comment_id, p_value);

    if p_resource_id is not null then
      update public.resources set upvote_count = upvote_count + p_value where id = p_resource_id returning upvote_count into new_count;
    elsif p_discussion_id is not null then
      update public.discussions set upvote_count = upvote_count + p_value where id = p_discussion_id returning upvote_count into new_count;
    elsif p_comment_id is not null then
      update public.comments set upvote_count = upvote_count + p_value where id = p_comment_id returning upvote_count into new_count;
    end if;
  end if;

  return coalesce(new_count, 0);
end;
$$;
