import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import { searchResources } from "@/app/actions/resources";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceCard } from "@/components/resources/ResourceCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse Claude Code skills, configs, MCP servers, hooks, guides, and prompts",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
    type?: string;
  }>;
}

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createServerClient();

  const [
    { data: categories },
    { count: resourceCount },
    { data: contributorData },
    { data: featuredResource },
  ] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("resources")
      .select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("is_staff_pick", true)
      .order("upvote_count", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const { resources, total } = await searchResources(
    params.q || "",
    params.category || "",
    params.sort || "hot",
    parseInt(params.page || "1"),
    params.type || ""
  );

  const contributorCount = contributorData?.length ?? 0;
  const hasActiveFilters = params.q || params.category || params.type;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero strip */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">
            Community Library
          </h1>
          <p className="text-sm text-muted mt-1">
            {resourceCount ?? 0} resources shared by{" "}
            {contributorCount} contributors
          </p>
        </div>
        <Link href="/resources/new">
          <Button>Submit Resource</Button>
        </Link>
      </div>

      {/* Featured resource (only when no filters active) */}
      {!hasActiveFilters && featuredResource && (
        <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-1">
          <div className="flex items-center gap-2 px-3 pt-2 pb-1">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              Editor's Choice
            </span>
          </div>
          <ResourceCard resource={featuredResource} />
        </div>
      )}

      {/* MCP Directory link */}
      {!hasActiveFilters && (
        <Link
          href="/mcp"
          className="card-interactive flex items-center justify-between rounded-lg border border-type-mcp/20 bg-type-mcp/5 p-4 mb-6 hover:bg-type-mcp/10"
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-type-mcp"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">
                MCP Server Directory
              </p>
              <p className="text-xs text-muted">
                Browse, configure, and review MCP servers for Claude Code
              </p>
            </div>
          </div>
          <svg
            className="w-4 h-4 text-muted shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}

      <Suspense>
        <ResourceFilters categories={categories || []} />
      </Suspense>

      <div className="mt-6">
        <ResourceGrid resources={resources} />
      </div>

      {total > 20 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(total / 20) }, (_, i) => (
            <Link
              key={i}
              href={`/resources?${new URLSearchParams({
                ...(params.q ? { q: params.q } : {}),
                ...(params.category ? { category: params.category } : {}),
                ...(params.sort ? { sort: params.sort } : {}),
                ...(params.type ? { type: params.type } : {}),
                page: String(i + 1),
              }).toString()}`}
              className={`px-3 py-1 rounded text-sm ${
                String(i + 1) === (params.page || "1")
                  ? "bg-accent text-black"
                  : "bg-card text-muted hover:text-foreground border border-border"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
