import { ROLE_PATHS } from "@/lib/learn-data";
import { createServerClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/ResourceCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const path = ROLE_PATHS.find((p) => p.slug === role);
  if (!path) return { title: "Not Found" };
  return {
    title: path.title,
    description: path.hook,
  };
}

export default async function RolePathPage({ params }: PageProps) {
  const { role } = await params;
  const path = ROLE_PATHS.find((p) => p.slug === role);
  if (!path) notFound();

  // Fetch resources matching this role's tags
  const supabase = await createServerClient();
  const { data: resources } = await supabase
    .from("resources")
    .select("*, author:profiles(*), category:categories(*)")
    .overlaps("tags", path.resourceTags)
    .order("upvote_count", { ascending: false })
    .limit(6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Link
            href="/learn"
            className="text-sm text-muted hover:text-foreground transition-colors mb-4 inline-block"
          >
            &larr; All paths
          </Link>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
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
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                {path.title}
              </h1>
              <p className="text-lg text-muted mt-3 max-w-2xl">{path.hook}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-6">
            <div>
              <p className="font-display text-xl font-bold text-accent">
                {path.salaryRange}
              </p>
              <p className="text-xs text-muted">salary range</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="font-display text-xl font-bold text-accent">
                +{path.salaryPremium}
              </p>
              <p className="text-xs text-muted">with AI skills</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Overview */}
        <div className="max-w-3xl mb-12">
          <p className="text-foreground leading-relaxed">{path.description}</p>
        </div>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold mb-6">
            Skills Employers Want
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {path.skills.map((skill, i) => (
              <div
                key={skill.name}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-accent bg-accent/10 rounded px-2 py-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-bold text-foreground">
                    {skill.name}
                  </h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold mb-6">
            Tools to Learn
          </h2>
          <div className="flex flex-wrap gap-3">
            {path.tools.map((tool) => (
              <div
                key={tool.name}
                className="card-interactive rounded-lg border border-border bg-card px-4 py-3 hover:bg-card-hover"
              >
                <p className="text-sm font-medium text-foreground">
                  {tool.name}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Resources */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold">
              Community Resources
            </h2>
            <Link
              href={`/resources?q=${encodeURIComponent(path.role.toLowerCase())}`}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </Link>
          </div>
          {resources && resources.length > 0 ? (
            <div className="grid gap-3">
              {resources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-border rounded-lg bg-card">
              <p className="text-muted mb-2">
                No resources tagged for this role yet.
              </p>
              <p className="text-sm text-muted mb-4">
                Be the first to share a skill, guide, or prompt for{" "}
                {path.role.toLowerCase()}s.
              </p>
              <Link href="/resources/new">
                <Button>Submit a Resource</Button>
              </Link>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="font-display text-xl font-bold mb-2">
            Have something to share?
          </h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            If you've built a skill, written a guide, or crafted prompts
            relevant to {path.role.toLowerCase()}s, share it with the community.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/resources/new">
              <Button size="lg">Submit a Resource</Button>
            </Link>
            <Link href="/discussions/new">
              <Button variant="secondary" size="lg">
                Start a Discussion
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
