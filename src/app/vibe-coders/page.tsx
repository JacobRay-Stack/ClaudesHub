import { VIBE_TOPICS } from "@/lib/vibe-coders-data";
import { TermSearch } from "@/components/vibe-coders/TermSearch";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe Coders -- Learn the Language of the Web",
  description:
    "The complete guide to web development terminology for AI-assisted builders. Learn the anatomy of a website so you can talk to AI like a pro.",
};

export default function VibeCodersPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-medium text-accent mb-6">
              For AI-assisted builders
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
              Learn the language{" "}
              <span className="text-accent">before you build</span>
            </h1>
            <p className="text-lg text-muted mt-4 max-w-xl animate-fade-in-up stagger-1">
              You don't need to write code. But you need to speak the language.
              Knowing what a component, route, or database table is turns
              your AI conversations from 10 back-and-forths into one.
            </p>
            <p className="text-sm text-muted mt-4 animate-fade-in-up stagger-2">
              {VIBE_TOPICS.length} topics &middot; {totalTerms} terms
              &middot; Plain English with real-world analogies
            </p>
          </div>
        </div>
      </section>

      {/* Term Search */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <TermSearch />
        </div>
      </section>

      {/* Before/After */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="font-display font-bold mb-6 text-muted uppercase tracking-widest text-xs">
            Why Terminology Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
              <p className="text-xs font-mono text-danger mb-2">WITHOUT TERMINOLOGY</p>
              <p className="text-sm text-foreground italic">
                "Make it save stuff when they click the button and then show it
                on the other page"
              </p>
              <p className="text-xs text-muted mt-3">
                AI guesses. 5 back-and-forths. Wrong result half the time.
              </p>
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-5">
              <p className="text-xs font-mono text-success mb-2">WITH TERMINOLOGY</p>
              <p className="text-sm text-foreground italic">
                "Create a server action that inserts a row into the resources
                table with title and author_id, then redirect to
                /resources/[slug]"
              </p>
              <p className="text-xs text-muted mt-3">
                AI nails it first try. One prompt. Done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display font-bold mb-2 text-muted uppercase tracking-widest text-xs">
          Start Here
        </h2>
        <p className="text-muted text-sm mb-8">
          Go in order for the full picture, or jump to what you need.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {VIBE_TOPICS.map((topic, i) => (
            <Link
              key={topic.slug}
              href={`/vibe-coders/${topic.slug}`}
              className="card-interactive flex items-start gap-4 rounded-lg border border-border bg-card p-5 hover:bg-card-hover"
            >
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-card-hover border border-border">
                <span className="font-mono text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${topic.color}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={topic.icon} />
                  </svg>
                  <h3 className="font-display font-bold text-foreground">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-sm text-muted mt-1">{topic.subtitle}</p>
                <p className="text-xs text-muted mt-2">
                  {topic.sections.reduce((a, s) => a + s.terms.length, 0)} terms
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="font-display text-xl font-bold mb-2">
            Ready to build?
          </h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            Once you know the terms, check out the community's skills,
            configs, and guides to see them in action.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/resources"
              className="text-sm bg-accent text-black px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Browse Resources
            </Link>
            <Link
              href="/learn"
              className="text-sm bg-card border border-border text-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-card-hover transition-colors"
            >
              AI Skills by Role
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
