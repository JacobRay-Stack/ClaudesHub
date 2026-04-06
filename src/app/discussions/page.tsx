"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchDiscussions } from "@/app/actions/discussions";
import { DiscussionCard } from "@/components/discussions/DiscussionCard";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SORT_OPTIONS, DISCUSSION_TYPES } from "@/lib/constants";
import Link from "next/link";
import type { Discussion } from "@/lib/types";

const discussionTypeTabs = [
  { value: "", label: "All" },
  ...DISCUSSION_TYPES.map((t) => ({ value: t.value, label: t.label })),
];

function DiscussionsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "hot";
  const typeFilter = searchParams.get("type") || "";
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchDiscussions(sort).then((result) => {
      let filtered = result.discussions;
      if (typeFilter) {
        filtered = filtered.filter(
          (d) => d.discussion_type === typeFilter
        );
      }
      setDiscussions(filtered);
      setLoading(false);
    });
  }, [sort, typeFilter]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/discussions?${params.toString()}`);
  }

  return (
    <>
      {/* Type filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-3">
        {discussionTypeTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => updateParam("type", tab.value)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full border transition-colors cursor-pointer ${
              typeFilter === tab.value
                ? "bg-accent text-black border-accent font-medium"
                : "border-border text-muted hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Tabs
        tabs={SORT_OPTIONS}
        value={sort}
        onChange={(v) => updateParam("sort", v)}
        className="mb-6"
      />

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
      {/* Hero strip */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">
            Community Discussions
          </h1>
          <p className="text-sm text-muted mt-1">
            Ask questions, share wins, help others
          </p>
        </div>
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
