import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createServerClient();

  const [
    { data: trendingResources },
    { data: recentDiscussions },
    { data: categories },
  ] = await Promise.all([
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
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Hub for{" "}
            <span className="text-accent">Claude Code</span>{" "}
            Skills
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Discover, share, and discuss skills, SOPs, MCP servers, and
            automation templates built by the Claude Code community.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/resources">
              <Button size="lg">Browse Resources</Button>
            </Link>
            <Link href="/resources/new">
              <Button variant="secondary" size="lg">
                Share a Skill
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-lg font-bold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-card hover:bg-card-hover transition-colors p-3 text-sm"
              >
                <Badge variant="accent">{cat.name}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Trending Resources */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Trending Resources</h2>
              <Link
                href="/resources"
                className="text-sm text-accent hover:underline"
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
                  <Link href="/resources/new" className="text-accent hover:underline">
                    Be the first to share one
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Discussions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Discussions</h2>
              <Link
                href="/discussions"
                className="text-sm text-accent hover:underline"
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
                    className="block rounded-lg border border-border bg-card hover:bg-card-hover transition-colors p-3"
                  >
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">
                      {d.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                      <span>{d.upvote_count} votes</span>
                      <span>{d.comment_count} comments</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted border border-border rounded-lg bg-card">
                  <p className="mb-2 text-sm">No discussions yet.</p>
                  <Link href="/discussions/new" className="text-accent hover:underline text-sm">
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
