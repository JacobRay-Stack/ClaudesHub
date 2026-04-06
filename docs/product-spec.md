# ClaudesHub Product Spec

The community hub for discovering, sharing, and discussing Claude Code skills, SOPs, MCP servers, and automation templates.

---

## 1. Homepage

**Approach:** Hybrid -- short hero + curated Staff Picks + community-driven content.

- Hero section: concise tagline, Browse Resources + Share a Skill CTAs
- Staff Picks section: manually curated by moderators, always visible, ensures quality first impression even with low community content
- Trending Resources: community-voted, auto-ranked
- Recent Discussions: latest community threads
- Categories grid: quick browse by type

The homepage should never look empty. Staff Picks are the quality floor.

---

## 2. Discovery

Four ways to find content:

**Categories** -- Broad groupings (Automation, DevOps, Data, Productivity, etc.). Each category has its own browse page.

**Search** -- Full-text search across resource titles, descriptions, and content.

**Tags** -- Freeform tags applied by authors. Clickable on resource cards, browsable on a dedicated /tags page. More granular than categories (e.g., "git", "refactoring", "postgres", "deployment").

**Collections** -- Curated lists of resources grouped by theme or use case. Initially created by moderators/staff ("Best MCP Servers for Data Teams", "Starter Pack for New Users"). Later opened to community creation via reputation threshold.

---

## 3. Contribution Loop

### Resource Submission

When a user submits a resource, the experience is:

1. Select resource type (skill, SOP, MCP server, template, reference)
2. Form pre-fills a **structured markdown template** specific to that type
3. Fill in the template sections (author can modify/remove sections as needed)
4. Attach files -- the actual downloadable artifacts (skill files, configs, scripts, etc.)
5. Add tags, select category
6. Submit for publishing

### Structured Templates by Type

**Skill:**
- Description
- What it does
- Installation / Setup
- Usage
- Code
- Compatibility / Requirements

**SOP (Standard Operating Procedure):**
- Description
- When to use this
- Prerequisites
- Steps
- Expected outcome
- Troubleshooting

**MCP Server:**
- Description
- What it connects to
- Setup / Configuration
- Available tools
- Example usage
- Requirements

**Template:**
- Description
- Use case
- How to customize
- File contents
- Requirements

**Reference:**
- Description
- Content (freeform)

Templates are guides, not constraints. Authors can restructure as needed.

### File Uploads & Downloads

- Authors upload files when creating/editing a resource
- Files stored in Supabase Storage
- Resource detail page shows download button with file name and size
- Download count tracked per resource (visible on cards and profiles)
- File types: any (skills are typically .md or .js, MCP configs are .json, etc.)

---

## 4. Engagement

### Notifications (Launch)

In-app notification system. Users receive notifications when:

- Someone comments on their resource or discussion
- Someone replies to their comment
- Their resource reaches upvote milestones (10, 25, 50, 100)
- Their resource is marked as Staff Pick
- A moderator takes action on their content

Notification bell in the header with unread count. Notification center page to view all.

### Reputation System (Launch)

Points awarded for community participation:

| Action | Points |
|---|---|
| Upload a resource | +10 |
| Resource gets upvoted | +2 |
| Comment gets upvoted | +1 |
| Resource marked Staff Pick | +25 |
| Resource downloaded | +1 |
| Start a discussion | +5 |
| Post a comment | +1 |

Points are never deducted (downvotes don't subtract). Total reputation score displayed on profile and as a small badge next to username in comments/cards.

### Badges

Awarded at milestones:

- **Early Adopter** -- Joined during the first 3 months
- **First Share** -- Uploaded your first resource
- **Contributor** -- 5 resources uploaded
- **Prolific** -- 25 resources uploaded
- **Community Pillar** -- 100 resources uploaded
- **Helpful** -- 50 comments posted
- **Popular** -- Any single resource reaches 50 upvotes
- **Viral** -- Any single resource reaches 100 downloads
- **Staff Pick Author** -- Had a resource marked Staff Pick
- **Trusted** -- Reached 500 reputation (unlocks moderation powers)

Badges displayed on user profile. Top badge shown next to username on cards.

### Weekly Digest Email (Later)

Automated email summarizing the week's activity:
- New Staff Picks
- Top voted resources
- Active discussions
- Community stats

Triggered when there is enough content to fill a meaningful digest. Opt-in.

---

## 5. Profiles

**Contributor-focused profiles.** Not social -- no followers, no feed.

Profile page displays:

- Avatar (from GitHub OAuth)
- Display name + username
- Bio
- Linked GitHub account (auto-populated from OAuth)
- Join date
- **Reputation score**
- **Badges earned** (displayed as icons/chips)
- **Stats:** total resources, total downloads received, total upvotes received
- **Resources tab:** grid of user's published resources
- **Discussions tab:** list of user's discussions

---

## 6. Moderation

### Report System (Launch)

- Report button on every resource, discussion, and comment
- Report reasons: spam, low quality, offensive, duplicate, other
- Reports go to a moderation queue

### Moderation Roles

**Admin (you):**
- Full access from day one
- Review reports, remove content, ban users
- Mark resources as Staff Pick
- Manage collections
- Manage categories

**Trusted Contributor (earned via reputation):**
- Unlocked at 500 reputation points
- Can flag content for review
- Can vote on flagged items in the mod queue
- Cannot directly remove content or ban users

**Future: Community Moderators**
- Hand-picked from top trusted contributors
- Full moderation powers (remove content, handle reports)
- Added as the community grows beyond what one person can moderate

### Staff Picks

- Any moderator or admin can mark a resource as "Staff Pick"
- Staff Picks get a distinct visual badge on their card
- Dedicated Staff Picks section on homepage
- Staff Pick status awards +25 reputation to the author
- Used to highlight the best content and set quality expectations

---

## 7. Site Pages

### Existing Pages
- `/` -- Homepage (hero + staff picks + trending + discussions)
- `/resources` -- Browse all resources (search, filter, sort, paginated)
- `/resources/[slug]` -- Resource detail (content + files + votes + comments)
- `/resources/new` -- Submit a resource
- `/resources/[slug]/edit` -- Edit a resource
- `/discussions` -- Browse all discussions
- `/discussions/[slug]` -- Discussion detail
- `/discussions/new` -- New discussion
- `/categories/[slug]` -- Browse by category
- `/profile/[username]` -- User profile
- `/settings` -- Account settings
- `/login` -- Log in
- `/signup` -- Sign up

### New Pages to Build
- `/about` -- What is ClaudesHub, who's behind it, mission
- `/guidelines` -- Submission guidelines, quality expectations, rules
- `/faq` -- Common questions about the site and Claude Code
- `/collections` -- Browse all collections
- `/collections/[slug]` -- Single collection (curated list of resources)
- `/tags` -- Browse all tags
- `/tags/[tag]` -- Resources with a specific tag
- `/leaderboard` -- Top contributors by reputation (weekly, monthly, all-time)
- `/notifications` -- Notification center

### Admin Pages (Later)
- `/admin/reports` -- Moderation queue
- `/admin/staff-picks` -- Manage staff picks
- `/admin/collections` -- Manage collections

---

## 8. Data Model Additions

New tables/fields needed beyond current schema:

- **resource_files** -- file uploads linked to resources (name, storage path, size, download count)
- **collections** -- id, title, slug, description, cover_image, author_id, is_public
- **collection_items** -- collection_id, resource_id, sort_order, note
- **notifications** -- id, user_id, type, title, body, resource_id/discussion_id/comment_id, read, created_at
- **reports** -- id, reporter_id, target_type, target_id, reason, details, status, resolved_by, created_at
- **user_badges** -- user_id, badge_type, awarded_at
- **staff_picks** -- resource_id, picked_by, picked_at
- Add `reputation` integer field to profiles table
- Add `download_count` to resources table
- Add `is_staff_pick` boolean to resources table

---

## 9. Build Priority

### Phase 1 -- Core Polish (Now)
- Tags: make clickable, add /tags and /tags/[tag] pages
- File uploads/downloads on resources
- Structured markdown templates per resource type
- Staff Picks: flag on resources, homepage section
- About page, submission guidelines page

### Phase 2 -- Engagement
- Notification system (in-app)
- Reputation scoring (auto-calculated)
- Badges (awarded at milestones)
- Leaderboard page
- Enhanced profiles (stats, badges, reputation display)

### Phase 3 -- Curation
- Collections (create, browse, manage)
- FAQ page
- Report/moderation system
- Admin pages

### Phase 4 -- Growth
- Weekly digest email
- Trusted contributor mod powers
- Community moderator roles
- SEO optimization
- Open Graph previews for social sharing
