"use client";

import { useRouter } from "next/navigation";
import { ROLE_PATHS } from "@/lib/learn-data";

export function RoleSelector() {
  const router = useRouter();

  function handleSelect(slug: string) {
    if (slug) {
      router.push(`/learn/${slug}`);
    }
  }

  return (
    <div className="text-center">
      <h2 className="font-display text-xl font-bold mb-2">
        What's your role?
      </h2>
      <p className="text-sm text-muted mb-6">
        Pick your role and we'll show you exactly what AI skills to learn.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {ROLE_PATHS.map((path) => (
          <button
            key={path.slug}
            onClick={() => handleSelect(path.slug)}
            className="card-interactive inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm hover:bg-card-hover hover:border-accent/30 cursor-pointer transition-all"
          >
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={path.icon} />
            </svg>
            <span className="text-foreground font-medium">{path.role}</span>
            <span className="text-xs text-accent">
              +{path.salaryPremium}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
