import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tags" };

export default async function TagsPage() {
  const supabase = await createServerClient();
  const { data: resources } = await supabase
    .from("resources")
    .select("tags");

  const tagCounts: Record<string, number> = {};
  resources?.forEach((r) => {
    r.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-2">Tags</h1>
      <p className="text-muted mb-8">Browse resources by tag</p>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="card-interactive inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-card-hover"
          >
            <span className="text-foreground">{tag}</span>
            <span className="text-xs text-muted bg-background rounded-full px-1.5 py-0.5">
              {count}
            </span>
          </Link>
        ))}
        {sortedTags.length === 0 && (
          <p className="text-muted">No tags yet. Tags appear when resources are published.</p>
        )}
      </div>
    </div>
  );
}
