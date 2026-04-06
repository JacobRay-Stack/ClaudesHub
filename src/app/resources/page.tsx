import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import { searchResources } from "@/app/actions/resources";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Browse Claude Code skills, SOPs, MCP servers, and templates",
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
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  const { resources, total } = await searchResources(
    params.q || "",
    params.category || "",
    params.sort || "hot",
    parseInt(params.page || "1"),
    params.type || ""
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        <Link href="/resources/new">
          <Button>Submit Resource</Button>
        </Link>
      </div>

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
