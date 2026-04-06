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

  const categoryTabs = [
    { value: "", label: "All" },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={query}
          onChange={(v) => updateParams("q", v)}
          placeholder="Search resources..."
          className="flex-1"
        />
        <Tabs
          tabs={SORT_OPTIONS}
          value={sort}
          onChange={(v) => updateParams("sort", v)}
        />
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

      {/* Category filter (secondary) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => updateParams("category", tab.value)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full border transition-colors cursor-pointer ${
              category === tab.value
                ? "bg-card-hover text-foreground border-foreground/20 font-medium"
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
