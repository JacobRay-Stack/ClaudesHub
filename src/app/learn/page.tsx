import { ROLE_PATHS } from "@/lib/learn-data";
import { VIBE_TOPICS } from "@/lib/vibe-coders-data";
import { RoleSelector } from "@/components/learn/RoleSelector";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "AI skills by role, web dev terminology for vibe coders, and everything you need to level up with Claude Code.",
};

export default function LearnPage() {
  const totalTerms = VIBE_TOPICS.reduce(
    (acc, t) => acc + t.sections.reduce((a, s) => a + s.terms.length, 0),
    0
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
              Learn to build{" "}
              <span className="text-accent">smarter</span>
            </h1>
            <p className="text-lg text-muted mt-4 max-w-xl animate-fade-in-up stagger-1">
              Whether you're learning AI skills for your career or figuring
              out what a "component" is, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid md:grid-cols-2 gap-4">
            {/* AI Skills by Role */}
            <Link
              href="#career-paths"
              className="card-interactive rounded-lg border border-border bg-card p-6 hover:bg-card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold">
                  AI Skills by Role
                </h2>
              </div>
              <p className="text-sm text-muted">
                What AI skills does your job actually require? 8 career paths
                with salary data, specific skills to learn, and tools to master.
              </p>
              <p className="text-xs text-accent mt-3 font-medium">
                8 roles &middot; 48 skills &middot; salary data
              </p>
            </Link>

            {/* Vibe Coders */}
            <Link
              href="/vibe-coders"
              className="card-interactive rounded-lg border border-border bg-card p-6 hover:bg-card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-type-prompt/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-type-prompt"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold">
                  Vibe Coders Guide
                </h2>
              </div>
              <p className="text-sm text-muted">
                Building with AI but don't know the lingo? Learn what
                components, routes, APIs, and databases actually are -- in plain
                English.
              </p>
              <p className="text-xs text-type-prompt mt-3 font-medium">
                {VIBE_TOPICS.length} topics &middot; {totalTerms} terms &middot;
                plain English
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Urgency bar */}
      <section className="border-b border-border bg-card" id="career-paths">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-center gap-6 md:gap-10 text-center overflow-x-auto scrollbar-none">
            <div className="shrink-0">
              <p className="font-display text-lg md:text-xl font-bold text-accent">
                56%
              </p>
              <p className="text-xs text-muted">salary premium</p>
            </div>
            <div className="w-px h-8 bg-border shrink-0" />
            <div className="shrink-0">
              <p className="font-display text-lg md:text-xl font-bold text-accent">
                109%
              </p>
              <p className="text-xs text-muted">AI job posting growth</p>
            </div>
            <div className="w-px h-8 bg-border shrink-0" />
            <div className="shrink-0">
              <p className="font-display text-lg md:text-xl font-bold text-accent">
                7x
              </p>
              <p className="text-xs text-muted">more roles need AI</p>
            </div>
            <div className="w-px h-8 bg-border shrink-0" />
            <div className="shrink-0">
              <p className="font-display text-lg md:text-xl font-bold text-accent">
                50%
              </p>
              <p className="text-xs text-muted">of tech jobs require AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role selector */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <RoleSelector />
        </div>
      </section>

      {/* Role grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display font-bold mb-2 text-muted uppercase tracking-widest text-xs">
          All Career Paths
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
