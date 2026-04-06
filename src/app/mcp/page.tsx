import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { MCP_CATEGORIES } from "@/lib/mcp-data";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory",
  description:
    "The definitive directory of MCP servers for Claude Code. Find configs, setup guides, and community reviews for 400+ Model Context Protocol servers.",
};

export default async function McpPage() {
  const supabase = await createServerClient();

  const [
    { data: featuredServers },
    { data: trendingServers },
    { count: totalServers },
    { data: allMcpResources },
  ] = await Promise.all([
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("resource_type", "mcp-server")
      .eq("is_staff_pick", true)
      .order("upvote_count", { ascending: false })
      .limit(3),
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("resource_type", "mcp-server")
      .order("upvote_count", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("resources")
      .select("*", { count: "exact", head: true })
      .eq("resource_type", "mcp-server"),
    supabase
      .from("resources")
      .select("tags")
      .eq("resource_type", "mcp-server"),
  ]);

  // Count MCP resources per category tag
  const categoryCounts: Record<string, number> = {};
  allMcpResources?.forEach((r) => {
    r.tags?.forEach((tag: string) => {
      const cat = MCP_CATEGORIES.find(
        (c) => c.slug === tag || c.label.toLowerCase().includes(tag)
      );
      if (cat) {
        categoryCounts[cat.slug] = (categoryCounts[cat.slug] || 0) + 1;
      }
    });
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="hero-glow animate-glow-pulse" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-type-mcp/10 border border-type-mcp/20 px-3 py-1 text-xs font-medium text-type-mcp mb-6">
              Model Context Protocol
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
              The MCP Server{" "}
              <span className="text-accent">Directory</span>
            </h1>
            <p className="text-lg text-muted mt-4 max-w-xl animate-fade-in-up stagger-1">
              Find, configure, and review MCP servers for Claude Code. Real
              configs, real setup guides, real community feedback on what
              actually works.
            </p>
            <div className="flex items-center gap-4 mt-6 animate-fade-in-up stagger-2">
              <p className="text-sm text-muted">
                <strong className="text-foreground">{totalServers || 0}</strong>{" "}
                server configs shared
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 animate-fade-in-up stagger-2">
              <Link href="/resources?type=mcp-server">
                <Button size="lg">Browse All Servers</Button>
              </Link>
              <Link href="/resources/new">
                <Button variant="secondary" size="lg">
                  Share a Config
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is MCP */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-type-mcp" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <h3 className="font-display font-bold text-sm">Connect</h3>
              </div>
              <p className="text-sm text-muted">
                MCP servers connect Claude Code to external tools -- databases,
                APIs, services. One config snippet in your settings.json.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="font-display font-bold text-sm">Copy Config</h3>
              </div>
              <p className="text-sm text-muted">
                Every listing includes the exact JSON config. Copy it, paste
                it into your settings, and you're connected.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h3 className="font-display font-bold text-sm">Community Reviews</h3>
              </div>
              <p className="text-sm text-muted">
                Real feedback on what works, what breaks, and what eats
                your tokens. No more guessing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="font-display font-bold mb-5 text-muted uppercase tracking-widest text-xs">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MCP_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/resources?type=mcp-server&q=${encodeURIComponent(cat.label.toLowerCase())}`}
                className="card-interactive flex flex-col gap-2 rounded-lg border border-border bg-card p-4 hover:bg-card-hover"
              >
                <svg
                  className="w-5 h-5 text-type-mcp"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={cat.icon} />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {cat.label}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredServers && featuredServers.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-success text-lg">*</span>
              <h2 className="font-display text-lg font-bold">
                Staff Pick Servers
              </h2>
            </div>
            <div className="grid gap-3">
              {featuredServers.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold">
              Trending Servers
            </h2>
            <Link
              href="/resources?type=mcp-server"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-3">
            {trendingServers && trendingServers.length > 0 ? (
              trendingServers.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))
            ) : (
              <div className="text-center py-12 text-muted border border-border rounded-lg bg-card">
                <p className="mb-2">No MCP server configs shared yet.</p>
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
      </section>

      {/* Marketplace interest CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 md:p-8 text-center">
            <h2 className="font-display text-xl font-bold mb-2">
              Need help setting up MCP servers?
            </h2>
            <p className="text-sm text-muted max-w-lg mx-auto mb-4">
              We're exploring a marketplace where you can hire community experts
              to configure MCP servers, build custom integrations, and set up
              your full Claude Code workflow.
            </p>
            <a
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm bg-accent text-black px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              I'd pay for expert help
            </a>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-4">
              How to Install an MCP Server
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="font-mono text-xs text-accent bg-accent/10 rounded px-2 py-0.5">
                  01
                </span>
                <p className="text-foreground font-medium mt-2">
                  Find a server
                </p>
                <p className="text-muted mt-1">
                  Browse the directory or search for the service you want to
                  connect to.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-accent bg-accent/10 rounded px-2 py-0.5">
                  02
                </span>
                <p className="text-foreground font-medium mt-2">
                  Copy the config
                </p>
                <p className="text-muted mt-1">
                  Copy the JSON config snippet and paste it into your
                  settings.json or .mcp.json file.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-accent bg-accent/10 rounded px-2 py-0.5">
                  03
                </span>
                <p className="text-foreground font-medium mt-2">
                  Add your keys
                </p>
                <p className="text-muted mt-1">
                  Set any required environment variables (API keys, tokens)
                  and restart Claude Code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
