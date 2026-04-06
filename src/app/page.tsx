import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/Button";
import { RESOURCE_TYPES, TYPE_ICONS } from "@/lib/constants";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createServerClient();

  const [
    { data: staffPicks },
    { data: trendingResources },
    { data: recentDiscussions },
    { data: allResources },
  ] = await Promise.all([
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("is_staff_pick", true)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .order("upvote_count", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("discussions")
      .select("*, author:profiles(*), category:categories(*)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("resources")
      .select("resource_type"),
  ]);

  // Count resources per type
  const typeCounts: Record<string, number> = {};
  allResources?.forEach((r) => {
    typeCounts[r.resource_type] = (typeCounts[r.resource_type] || 0) + 1;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="hero-glow animate-glow-pulse" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
                The community for{" "}
                <span className="text-accent">Claude Code</span>{" "}
                builders
              </h1>
              <p className="text-lg md:text-xl text-muted mt-6 max-w-xl animate-fade-in-up stagger-1">
                Skills, configs, hooks, and MCP servers
                — discovered, shared, and refined by the community.
              </p>
              <div className="flex items-center gap-3 mt-8 animate-fade-in-up stagger-2">
                <Link href="/resources">
                  <Button size="lg">Browse Resources</Button>
                </Link>
                <Link href="/resources/new">
                  <Button variant="secondary" size="lg">
                    Share Something
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block shrink-0 animate-fade-in-up stagger-2">
              <img
                src="/hero.png"
                alt="ClaudesHub community"
                className="w-[420px] rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Picks */}
      {staffPicks && staffPicks.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-success text-lg">*</span>
              <h2 className="font-display text-lg font-bold">Staff Picks</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {staffPicks.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Type */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="font-display font-bold mb-5 text-muted uppercase tracking-widest text-xs">
            Browse by Type
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {RESOURCE_TYPES.map((t) => (
              <Link
                key={t.value}
                href={`/resources?type=${t.value}`}
                className="card-interactive flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center hover:bg-card-hover"
              >
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={TYPE_ICONS[t.value]} />
                </svg>
                <span className="text-sm font-medium text-foreground">
                  {t.label}
                </span>
                <span className="text-xs text-muted">
                  {typeCounts[t.value] || 0} resources
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Trending Resources */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold">Trending</h2>
              <Link
                href="/resources"
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-3">
              {trendingResources && trendingResources.length > 0 ? (
                trendingResources.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))
              ) : (
                <div className="text-center py-12 text-muted border border-border rounded-lg bg-card">
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
          </div>

          {/* Recent Discussions */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold">Discussions</h2>
              <Link
                href="/discussions"
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentDiscussions && recentDiscussions.length > 0 ? (
                recentDiscussions.map((d) => (
                  <Link
                    key={d.id}
                    href={`/discussions/${d.slug}`}
                    className="card-interactive block rounded-lg border border-border bg-card p-3 hover:bg-card-hover"
                  >
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">
                      {d.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span>{d.upvote_count} votes</span>
                      <span className="text-border">|</span>
                      <span>{d.comment_count} comments</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted border border-border rounded-lg bg-card">
                  <p className="mb-2 text-sm">No discussions yet.</p>
                  <Link
                    href="/discussions/new"
                    className="text-accent hover:underline text-sm"
                  >
                    Start one
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
