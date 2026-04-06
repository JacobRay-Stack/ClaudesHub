# ClaudesHub Section Specs -- Product Manager View

Each header nav section is its own product with its own PM thinking.

---

## 1. RESOURCES -- "The Library"

**PM: What is this section?**
The core of ClaudesHub. This is where people come to find, download, and share Claude Code artifacts. It's a searchable, filterable, community-voted library.

**Who comes here?**
- Builders looking for a specific tool ("I need an MCP server for Supabase")
- Browsers exploring what's possible ("What are people building?")
- Contributors sharing what they built

### Landing Page: `/resources`

**Current state:** Generic "Resources" heading, filter pills, card list. No personality, no guidance, no hook.

**What it should be:**

```
HERO STRIP (compact, not a full hero)
  Left: "Community Library" heading + "X resources shared by Y contributors"
  Right: [Submit Resource] button

FEATURED SECTION (rotating/curated)
  "Editor's Choice" or "This Week's Top" -- single highlighted resource
  with large card, description, download count, author

TYPE TABS (primary nav)
  [All] [Skills] [CLAUDE.md] [MCP Servers] [Hooks] [Guides] [Prompts]
  Each tab shows count badge

FILTER BAR
  Search | Category dropdown | Sort (Hot/New/Top)

RESOURCE GRID
  Cards in a list (current layout is fine)
  Each card: TypeBadge (colored), title, description, author, votes, comments, tags

PAGINATION
```

**Key decisions:**
- Featured resource at top gives the page a focal point even with low content
- Type tabs as primary filter because that's how people think ("I need a skill")
- Category as secondary dropdown (not pills -- too many items in the row)
- Sort defaults to "Hot" so best content surfaces

**Card behavior:**
- Click title -> resource detail
- Click tag -> /tags/[tag]
- Click author -> /profile/[username]
- TypeBadge is colored + has icon (already built)

### Detail Page: `/resources/[slug]`

**Current state:** Functional but flat. Vote sidebar, badges, content, files, comments.

**What it should be:**

```
BREADCRUMB
  Resources > Skills > Git Commit Generator

HEADER
  TypeBadge + CategoryBadge + StaffPickBadge
  Title (large, font-display)
  Description (muted)
  Author avatar + name + date + [Edit] if author

STATS BAR (new)
  Upvotes: 47 | Downloads: 312 | Comments: 8
  [Download Files] primary CTA button (for artifact types)

TAGS ROW
  Clickable tag pills

CONTENT (main body)
  Markdown rendered in a card
  For artifact types: files section above content
  For content types: content first, files below

COMMENTS
  Comment count heading
  Comment form (logged in only)
  Threaded comments
```

**Key additions:**
- Breadcrumb for navigation context
- Stats bar makes engagement visible (social proof)
- Prominent download CTA for artifact types
- Consider a "Copy to clipboard" button for code blocks in the content

### Submission Flow: `/resources/new`

**Current state:** Form with all fields visible at once. Works but overwhelming.

**What it should be:**

```
STEP 1: Pick a Type
  6 large type cards (like homepage Browse by Type)
  User clicks one, it highlights, template loads

STEP 2: Fill in Details
  Title
  Short Description
  Category dropdown
  Content (pre-filled template)
  Tags
  File upload area

STEP 3: Preview + Publish
  Show what the resource will look like as a card
  [Publish] button
```

**Key change:** Type selection becomes a visual choice (cards with icons) instead of a dropdown buried in a form. This teaches new contributors what each type means.

---

## 2. DISCUSSIONS -- "The Forum"

**PM: What is this section?**
Where the community talks. Q&A, troubleshooting, showcases, debates. This is what makes ClaudesHub sticky -- you come for the resources, you stay for the conversations.

**Who comes here?**
- People stuck on a problem ("Claude keeps losing context in large projects")
- People sharing wins ("Built my entire app with Claude Code in 3 hours")
- People asking opinions ("Cursor vs Claude Code for frontend work?")

### Landing Page: `/discussions`

**Current state:** Bare list with sort tabs. No personality.

**What it should be:**

```
HERO STRIP (compact)
  Left: "Community Discussions" + "Ask questions, share wins, help others"
  Right: [New Discussion] button

DISCUSSION TYPES (new concept -- not built yet)
  [All] [Questions] [Showcase] [Tips] [Meta]
  These are like flair/tags that categorize the discussion intent

FILTER BAR
  Search | Category dropdown | Sort (Hot/New/Top)

DISCUSSION LIST
  Cards with:
    - Discussion type badge (colored: Question=blue, Showcase=green, Tips=amber, Meta=gray)
    - Title
    - First 2 lines of body text (preview)
    - Author + date
    - Vote count + comment count
    - Category badge
    - "Answered" badge if marked as resolved (for questions)

SIDEBAR (desktop only)
  "Popular Tags" -- top 10 discussion tags
  "Top Contributors" -- 5 avatars with names and post counts
  "Community Stats" -- X discussions, Y comments, Z contributors
```

**Key additions:**
- Discussion types give structure ("Is this a question or a showcase?")
- Body preview helps people decide whether to click
- "Answered" badge for Q&A threads (social proof + helps searchers)
- Sidebar gives the page a community feel

### Detail Page: `/discussions/[slug]`

**Current state:** Title, body, comments. Functional.

**What it should be:**

```
HEADER
  Discussion type badge + Category badge
  Title (large)
  Author info + date + vote buttons
  [Mark as Answered] button (for question author)

BODY
  Markdown content
  If question type: "Accepted Answer" section at top (highlighted)

COMMENTS
  Comment form
  Threaded comments with depth
  Accepted answer gets green highlight border
```

**Key addition:** "Accepted Answer" for question-type discussions. The author can mark one comment as the answer. This appears highlighted at the top of the comments, like Stack Overflow. Helps people who find this discussion via search.

### New Discussion: `/discussions/new`

**Current state:** Basic form.

**What it should be:**

```
STEP 1: What kind of discussion?
  [Question] "I need help with something"
  [Showcase] "I built something cool"
  [Tips] "Here's something I learned"
  [Meta] "About ClaudesHub itself"

STEP 2: Details
  Title (placeholder changes by type:
    Question: "What's the best way to..."
    Showcase: "I built..."
    Tips: "TIL: ..."
    Meta: "Suggestion: ...")
  Body (markdown)
  Category dropdown
  Tags
```

---

## 3. LEARN -- "The Career Guide"

**PM: What is this section?**
The aspirational section. People come here to understand what AI skills matter for their career and how to develop them. This is the section that gets shared on LinkedIn.

**Who comes here?**
- Job seekers figuring out what AI skills to learn
- Career changers wondering if AI skills can help them transition
- Managers trying to understand what their team needs
- People who saw the salary stats and want in

### Landing Page: `/learn`

**Current state:** Stats bar + 8 role cards. Good but could be more compelling.

**What it should be:**

```
HERO
  Left: "AI skills that actually get you hired" + subtitle
  Right: Large stat callout -- "56% salary premium" with source

URGENCY BAR (new)
  Scrolling marquee or static bar:
  "109% increase in AI job postings" | "7x more roles requiring AI" | "50% of tech jobs now require AI skills"

QUIZ / SELECTOR (new, interactive)
  "What's your role?"
  Dropdown or button grid that immediately scrolls/navigates to the right path
  Makes it feel personalized

ROLE GRID
  8 role cards (current design is good)
  Each shows: icon, role name, hook stat, salary range, skill count
  Cards should feel clickable and substantive

TESTIMONIALS / PROOF (later)
  "I used this guide to land a $180K PM role" -- eventually user-generated
```

**Key additions:**
- Urgency bar creates FOMO (the salary data is genuinely compelling)
- Role selector/quiz makes it feel personalized vs. a generic list
- The page should feel like a career counselor, not a link directory

### Role Path Page: `/learn/[role]`

**Current state:** Hero, skills list, tools list, community resources. Solid structure.

**What it should be:**

```
HERO
  Back link
  Role icon + title + hook stat
  Salary range + premium stat

PROGRESS INDICATOR (new)
  "Your learning path" -- visual progress bar
  Shows 6 skills as dots/steps, highlights completed ones
  (Requires auth + tracking -- Phase 2, but design for it now)

OVERVIEW
  2-3 paragraph description of the role's AI landscape

SKILLS (numbered cards)
  Each card:
    Number badge
    Skill name
    Description
    "Resources for this skill" -- 2-3 relevant resources inline
    [Mark as Learned] button (Phase 2)

TOOLS
  Tool cards with links to official sites

COMMUNITY RESOURCES
  Filtered resources from the library
  [See all resources for this role] link

WHAT'S NEXT
  Link to related roles ("If you're a PM, you might also like: Designer, Data Scientist")
  Link to /resources to browse more
```

**Key additions:**
- Progress tracking (even if just visual for now) makes it feel like a course
- Inline resources under each skill (not just a dump at the bottom)
- Related roles cross-link keeps people exploring

---

## 4. VIBE CODERS -- "The Translator"

**PM: What is this section?**
A plain-English reference guide that translates developer jargon into language AI builders can understand. This is the thing people bookmark and come back to weekly.

**Who comes here?**
- Non-developers building with AI tools for the first time
- Entrepreneurs using Claude Code to build their product
- People who keep seeing terms they don't understand in AI output
- Students learning to code through AI

### Landing Page: `/vibe-coders`

**Current state:** Hero + 6 topic cards. Clean but static.

**What it should be:**

```
HERO
  "For AI-assisted builders" badge
  "Learn the language before you build" heading
  Subtitle explaining the value
  Topic + term count stats

SEARCH BAR (new -- most important addition)
  "Search 80+ terms..."
  Instant search across all terms in all topics
  Shows results as you type: term name + topic it's in + first line of explanation
  This is the #1 use case -- someone encounters a term and needs a quick lookup

TOPIC GRID
  6 numbered topic cards (current design)
  Show topic icon, title, subtitle, term count

QUICK REFERENCE (new)
  "Most looked-up terms" -- top 10 terms as a compact list
  Click any to jump to its explanation
  Seed this manually, later drive from analytics

BEFORE/AFTER EXAMPLE (new, inline)
  A single compelling before/after prompt example:
  Before: "Make it save stuff"
  After: "Create a server action that inserts into the resources table..."
  This immediately shows the value of learning terminology
```

**Key addition:** The search bar is the killer feature. Vibe coders don't read reference guides front-to-back. They encounter a term, need to look it up, and move on. A global term search makes this a tool they use daily, not a page they visit once.

### Topic Page: `/vibe-coders/[topic]`

**Current state:** Section headings, term cards with plain/analogy/AI tip. Good.

**What it should be:**

```
BREADCRUMB + TOPIC HEADER
  Topic number, icon, title, subtitle, term count

TABLE OF CONTENTS (new, sticky sidebar on desktop)
  Section headings as links
  Current section highlighted
  Lets you jump to specific terms

SECTIONS
  Section heading with divider
  Term cards:
    Term name (bold)
    Plain English explanation
    ANALOGY tag (amber) -- real-world comparison
    AI TIP tag (green) -- how this helps with AI
    RELATED TERMS (new) -- "See also: Component, Props, State"
    EXAMPLE (new, for select terms) -- actual code snippet showing the term in context

PREV/NEXT NAVIGATION
  Previous topic / Next topic buttons (already built)
```

**Key additions:**
- Table of contents for quick navigation on long pages
- Related terms create a wiki-like browsing experience
- Code examples for select terms (not all -- just the ones where seeing code helps)

---

## 5. TAGS -- "The Index"

**PM: What is this section?**
Honestly, Tags as a top-level nav item is questionable. It's a utility, not a destination. But we can make it useful.

**Two options:**

**Option A: Remove from header nav.** Tags are accessible from cards and the resource filter. They don't need their own nav slot. Replace with something more valuable in the header.

**Option B: Transform into a discovery page.** Instead of a flat tag cloud, make it a visual exploration tool.

**Recommendation: Option A.** Move the header slot to something more valuable. Tags page still exists at /tags but doesn't need prime nav real estate.

**What to replace it with:** Nothing. The current nav is: Resources | Discussions | Learn | Vibe Coders | Tags. Drop Tags, and you have 4 clean sections. Or replace with "Collections" once that feature is built.

If keeping Tags, here's the improved design:

```
HERO STRIP
  "Browse by Tag" + tag count + "Tags are applied by contributors"

TAG CLOUD (improved)
  Visual sizing -- tags with more resources are larger/bolder
  Color coding by most common resource type in that tag
  Hover shows: "X resources, top type: Skill"
  Click navigates to /tags/[tag]

TRENDING TAGS (new)
  "Tags gaining traction" -- tags with the most new resources in the last 30 days

POPULAR TAGS
  Top 20 tags by resource count, shown as a clean list with counts
```

---

## 6. HOMEPAGE -- "The Front Door"

**PM: What is this section?**
Not a nav section, but the most important page. Every first-time visitor lands here. It needs to answer three questions in 5 seconds:
1. What is this place?
2. Is there anything good here?
3. What should I do next?

### Current state:
Hero (left text, right image) + Staff Picks + Browse by Type + Trending + Discussions

### What it should be:

```
HERO
  Left: headline, subtitle, 2 CTAs
  Right: hero image (already added)
  Clean, fast, done.

SOCIAL PROOF BAR (new)
  "X resources | Y contributors | Z downloads"
  Simple stats that show the community is alive
  Even with small numbers, this signals activity

STAFF PICKS
  4 curated resources in a 2x2 grid
  These are YOUR quality signal. Curate aggressively.

BROWSE BY TYPE
  6 type cards with icons and counts
  This teaches new visitors what's here

TRENDING
  Top resources by votes (community signal)
  "View all" links to /resources

LEARN CTA (new section)
  "New to AI? Start here."
  Two paths:
    [AI Skills by Role] -> /learn
    [Web Dev for Vibe Coders] -> /vibe-coders
  This catches non-technical visitors who aren't ready to browse resources

RECENT DISCUSSIONS
  5 latest discussions
  "View all" links to /discussions

FOOTER
```

**Key additions:**
- Social proof bar (even "12 resources | 3 contributors" looks intentional early on)
- Learn CTA section bridges the gap for visitors who don't know what they need yet
- The homepage should work as a funnel: see value -> browse -> sign up -> contribute

---

## SUMMARY: WHAT EACH SECTION'S PM OWNS

| Section | PM Focus | Success Metric |
|---|---|---|
| **Resources** | Content quality, discoverability, contribution flow | Resources submitted per week, download rate |
| **Discussions** | Community engagement, question resolution | Comments per discussion, "answered" rate |
| **Learn** | Career value, shareability, resource-to-path linking | Page shares (LinkedIn), time on page |
| **Vibe Coders** | Comprehension, daily utility, search usage | Return visits, search queries, time on page |
| **Homepage** | First impression, conversion to browse/signup | Bounce rate, signup rate, pages per session |
