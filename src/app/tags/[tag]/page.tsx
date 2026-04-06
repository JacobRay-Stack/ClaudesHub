import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const supabase = await createServerClient();
  const { data: resources } = await supabase
    .from("resources")
    .select("*, author:profiles(*), category:categories(*)")
    .contains("tags", [decoded])
    .order("upvote_count", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-sm text-muted hover:text-foreground transition-colors mb-2 inline-block"
        >
          &larr; All tags
        </Link>
        <h1 className="font-display text-3xl font-bold">
          <span className="text-accent">#</span>
          {decoded}
        </h1>
        <p className="text-muted mt-1">
          {resources?.length || 0} resource{resources?.length !== 1 ? "s" : ""} tagged
        </p>
      </div>
      <div className="grid gap-3">
        {resources && resources.length > 0 ? (
          resources.map((r) => <ResourceCard key={r.id} resource={r} />)
        ) : (
          <div className="text-center py-12 text-muted border border-border rounded-lg bg-card">
            <p>No resources with this tag yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
