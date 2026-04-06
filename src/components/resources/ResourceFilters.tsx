"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/Tabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { SORT_OPTIONS, RESOURCE_TYPES } from "@/lib/constants";
import type { Category } from "@/lib/types";

interface ResourceFiltersProps {
  categories: Category[];
}

const typeTabs = [
  { value: "", label: "All" },
  ...RESOURCE_TYPES.map((t) => ({ value: t.value, label: t.label })),
];

export function ResourceFilters({ categories }: ResourceFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "hot";
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/resources?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={query}
          onChange={(v) => updateParams("q", v)}
          placeholder="Search resources..."
          className="flex-1"
        />
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => updateParams("category", e.target.value)}
            className="rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <Tabs
            tabs={SORT_OPTIONS}
            value={sort}
            onChange={(v) => updateParams("sort", v)}
          />
        </div>
      </div>

      {/* Type filter (primary) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {typeTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => updateParams("type", tab.value)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full border transition-colors cursor-pointer ${
              type === tab.value
                ? "bg-accent text-black border-accent font-medium"
                : "border-border text-muted hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
