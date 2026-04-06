import { ROLE_PATHS } from "@/lib/learn-data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn AI Skills by Role",
  description:
    "AI skills employers want, organized by job role. Find exactly what you need to learn for your career -- with resources to get started.",
};

export default function LearnPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
              AI skills that{" "}
              <span className="text-accent">actually get you hired</span>
            </h1>
            <p className="text-lg text-muted mt-4 max-w-xl animate-fade-in-up stagger-1">
              Candidates with AI skills earn 28-56% more. But every role needs
              different skills. Find exactly what matters for yours.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl font-bold text-accent">56%</p>
              <p className="text-xs text-muted mt-1">salary premium for AI-skilled workers</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent">109%</p>
              <p className="text-xs text-muted mt-1">growth in AI job postings (2024-2025)</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent">7x</p>
              <p className="text-xs text-muted mt-1">more roles requiring AI skills than 2 years ago</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent">50%</p>
              <p className="text-xs text-muted mt-1">of tech jobs now require AI skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role paths */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display font-bold mb-2 text-muted uppercase tracking-widest text-xs">
          Choose Your Role
        </h2>
        <p className="text-muted text-sm mb-8">
          Each path shows the specific AI skills employers want, the tools to
          learn, and community resources to get started.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {ROLE_PATHS.map((path) => (
            <Link
              key={path.slug}
              href={`/learn/${path.slug}`}
              className="card-interactive flex items-start gap-4 rounded-lg border border-border bg-card p-5 hover:bg-card-hover"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={path.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground">
                  {path.role}
                </h3>
                <p className="text-sm text-muted mt-1 line-clamp-2">
                  {path.hook}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium text-accent">
                    {path.salaryRange}
                  </span>
                  <span className="text-xs text-muted">
                    {path.skills.length} skills to learn
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
