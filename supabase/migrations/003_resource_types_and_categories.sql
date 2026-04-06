-- Resource Types & Categories Overhaul
-- Run this in the Supabase SQL Editor after 002

-- ============================================================
-- 1. UPDATE RESOURCE TYPES
-- ============================================================

-- First, remap existing resources to new type names
update public.resources set resource_type = 'claude-config' where resource_type = 'sop';
update public.resources set resource_type = 'prompt' where resource_type = 'template';
update public.resources set resource_type = 'guide' where resource_type = 'reference';

-- Drop old constraint and add new one with all 6 types
alter table public.resources drop constraint if exists resources_resource_type_check;
alter table public.resources add constraint resources_resource_type_check
  check (resource_type in ('skill', 'claude-config', 'mcp-server', 'hook', 'guide', 'prompt'));

-- ============================================================
-- 2. UPDATE CATEGORIES (10 -> 7)
-- ============================================================

-- Remove categories that overlap with types or are too vague
-- First, unlink any resources pointing to the removed categories
update public.resources set category_id = null
  where category_id in (
    select id from public.categories
    where slug in ('mcp-servers', 'agent-workflows', 'domain-packs')
  );

-- Also unlink any discussions pointing to removed categories
update public.discussions set category_id = null
  where category_id in (
    select id from public.categories
    where slug in ('mcp-servers', 'agent-workflows', 'domain-packs')
  );

delete from public.categories where slug in ('mcp-servers', 'agent-workflows', 'domain-packs');

-- Rename and clean up remaining categories
update public.categories set name = 'Code & Refactoring', slug = 'code', sort_order = 1
  where slug = 'code-generation';

update public.categories set name = 'DevOps & Infra', slug = 'devops', sort_order = 2
  where slug = 'devops-infrastructure';

update public.categories set name = 'Git & Review', slug = 'git', sort_order = 3
  where slug = 'git-code-review';

update public.categories set name = 'Data & Analytics', slug = 'data', sort_order = 4
  where slug = 'data-analytics';

update public.categories set name = 'Writing & Content', slug = 'writing', sort_order = 5
  where slug = 'writing-content';

update public.categories set name = 'Security', slug = 'security', sort_order = 6
  where slug = 'security-compliance';

update public.categories set name = 'Project Setup', slug = 'project-setup', sort_order = 7
  where slug = 'project-bootstrapping';
