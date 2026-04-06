"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { VIBE_TOPICS } from "@/lib/vibe-coders-data";

interface FlatTerm {
  term: string;
  plain: string;
  topicSlug: string;
  topicTitle: string;
}

export function TermSearch() {
  const [query, setQuery] = useState("");

  const allTerms = useMemo<FlatTerm[]>(() => {
    const terms: FlatTerm[] = [];
    for (const topic of VIBE_TOPICS) {
      for (const section of topic.sections) {
        for (const t of section.terms) {
          terms.push({
            term: t.term,
            plain: t.plain,
            topicSlug: topic.slug,
            topicTitle: topic.title,
          });
        }
      }
    }
    return terms;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTerms
      .filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.plain.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, allTerms]);

  return (
    <div className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${allTerms.length} terms... (e.g., "component", "API", "database")`}
          className="w-full rounded-lg border border-border bg-input-bg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
          {results.map((r) => (
            <Link
              key={`${r.topicSlug}-${r.term}`}
              href={`/vibe-coders/${r.topicSlug}`}
              onClick={() => setQuery("")}
              className="block px-4 py-3 hover:bg-card-hover transition-colors border-b border-border last:border-0"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {r.term}
                  </p>
                  <p className="text-xs text-muted truncate mt-0.5">
                    {r.plain.slice(0, 100)}...
                  </p>
                </div>
                <span className="text-xs text-muted shrink-0 bg-background rounded px-2 py-0.5">
                  {r.topicTitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-card shadow-lg z-50 p-4 text-center">
          <p className="text-sm text-muted">
            No terms match "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
