import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Badge, TypeBadge } from "@/components/ui/Badge";
import { RESOURCE_TYPES, TYPE_ICONS } from "@/lib/constants";
import Link from "next/link";
import type { ResourceType } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createServerClient();

  const [
    { data: trendingResources },
    { data: recentDiscussions },
    { count: resourceCount },
    { count: contributorCount },
    { data: allResources },
  ] = await Promise.all([
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .order("upvote_count", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("discussions")
      .select("*, author:profiles(*), category:categories(*)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("resources")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("resources")
      .select("tags, resource_type"),
  ]);

  // Count resources per type
  const typeCounts: Record<string, number> = {};
  allResources?.forEach((r) => {
    typeCounts[r.resource_type] = (typeCounts[r.resource_type] || 0) + 1;
  });

  // Get popular tags
  const tagCounts: Record<string, number> = {};
  allResources?.forEach((r) => {
    r.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_300px] gap-4 items-start">

        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block sticky top-[60px]">
          {/* Type nav */}
          <nav className="mb-6">
            {RESOURCE_TYPES.map((t) => (
              <Link
                key={t.value}
                href={`/resources?type=${t.value}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:bg-card hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={TYPE_ICONS[t.value as ResourceType]} />
                </svg>
                <span>{t.label}</span>
                {typeCounts[t.value] > 0 && (
                  <span className="ml-auto text-xs text-muted">
                    {typeCounts[t.value]}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Links */}
          <nav className="mb-6 space-y-1">
            <Link
              href="/discussions"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:bg-card hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Discussions
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:bg-card hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
              About
            </Link>
            <Link
              href="/guidelines"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:bg-card hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Guidelines
            </Link>
          </nav>

          {/* Popular tags */}
          {topTags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-foreground px-3 mb-2">
                Popular Tags
              </h3>
              <div className="space-y-0.5">
                {topTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-muted hover:bg-card hover:text-foreground transition-colors"
                  >
                    <span>#{tag}</span>
                    <span className="text-xs">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* MAIN FEED */}
        <main>
          {/* Feed tabs */}
          <div className="flex items-center gap-1 mb-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-sm font-bold text-foreground"
            >
              Trending
            </Link>
            <Link
              href="/resources?sort=new"
              className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              Latest
            </Link>
            <Link
              href="/resources?sort=top"
              className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              Top
            </Link>
          </div>

          {/* Resource cards */}
          <div className="space-y-2">
            {trendingResources && trendingResources.length > 0 ? (
              trendingResources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))
            ) : (
              <div className="text-center py-16 text-muted rounded-lg border border-border bg-card">
                <p className="mb-2">No resources yet.</p>
                <Link
                  href="/resources/new"
                  className="text-accent hover:underline"
                >
                  Be the first to share one
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden md:block sticky top-[60px] space-y-3">

          {/* CTA */}
          <div className="rounded-lg bg-accent p-5 text-center">
            <h3 className="font-display font-bold text-black text-sm mb-1">
              Share what you've built
            </h3>
            <p className="text-xs text-black/70 mb-3">
              Skills, configs, hooks, MCP servers — if it helped you,
              it'll help someone else.
            </p>
            <Link
              href="/resources/new"
              className="inline-block bg-black text-accent px-4 py-2 rounded-lg text-xs font-bold hover:bg-black/80 transition-colors"
            >
              Submit a Resource
            </Link>
          </div>

          {/* Community stats */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex justify-around py-3 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">
                  {resourceCount || 0}
                </div>
                <div className="text-[0.6rem] text-muted uppercase tracking-wider">
                  Resources
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {contributorCount || 0}
                </div>
                <div className="text-[0.6rem] text-muted uppercase tracking-wider">
                  Contributors
                </div>
              </div>
            </div>
          </div>

          {/* Active discussions */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 font-bold text-sm border-b border-border">
              Active Discussions
            </div>
            <div>
              {recentDiscussions && recentDiscussions.length > 0 ? (
                recentDiscussions.map((d) => (
                  <Link
                    key={d.id}
                    href={`/discussions/${d.slug}`}
                    className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-card-hover transition-colors"
                  >
                    <span className="text-sm font-bold text-accent min-w-[24px] text-center">
                      {d.upvote_count}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-foreground leading-snug">
                        {d.title}
                      </p>
                      <p className="text-[0.65rem] text-muted mt-1">
                        {d.comment_count} comments
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-xs text-muted">
                  <p className="mb-1">No discussions yet.</p>
                  <Link
                    href="/discussions/new"
                    className="text-accent hover:underline"
                  >
                    Start one
                  </Link>
                </div>
              )}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
