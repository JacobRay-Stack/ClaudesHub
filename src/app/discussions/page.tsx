"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchDiscussions } from "@/app/actions/discussions";
import { DiscussionCard } from "@/components/discussions/DiscussionCard";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SORT_OPTIONS } from "@/lib/constants";
import Link from "next/link";
import type { Discussion } from "@/lib/types";

function DiscussionsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "hot";
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchDiscussions(sort).then((result) => {
      setDiscussions(result.discussions);
      setLoading(false);
    });
  }, [sort]);

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/discussions?${params.toString()}`);
  }

  return (
    <>
      <Tabs tabs={SORT_OPTIONS} value={sort} onChange={updateSort} className="mb-6" />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-card animate-pulse" />
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <EmptyState
          title="No discussions yet"
          description="Start a conversation with the community."
          action={
            <Link href="/discussions/new">
              <Button>Start a Discussion</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {discussions.map((d) => (
            <DiscussionCard key={d.id} discussion={d} />
          ))}
        </div>
      )}
    </>
  );
}

export default function DiscussionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Link href="/discussions/new">
          <Button>New Discussion</Button>
        </Link>
      </div>
      <Suspense>
        <DiscussionsList />
      </Suspense>
    </div>
  );
}
