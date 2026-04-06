import { VIBE_TOPICS } from "@/lib/vibe-coders-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const data = VIBE_TOPICS.find((t) => t.slug === topic);
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.title} -- Vibe Coders Guide`,
    description: data.subtitle,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const topicIndex = VIBE_TOPICS.findIndex((t) => t.slug === topic);
  const data = VIBE_TOPICS[topicIndex];
  if (!data) notFound();

  const prev = topicIndex > 0 ? VIBE_TOPICS[topicIndex - 1] : null;
  const next =
    topicIndex < VIBE_TOPICS.length - 1 ? VIBE_TOPICS[topicIndex + 1] : null;

  const totalTerms = data.sections.reduce(
    (a, s) => a + s.terms.length,
    0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Breadcrumb */}
      <Link
        href="/vibe-coders"
        className="text-sm text-muted hover:text-foreground transition-colors mb-6 inline-block"
      >
        &larr; All topics
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-sm font-bold text-accent bg-accent/10 rounded px-2 py-0.5">
          {String(topicIndex + 1).padStart(2, "0")}
        </span>
        <svg
          className={`w-5 h-5 ${data.color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={data.icon} />
        </svg>
      </div>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
        {data.title}
      </h1>
      <p className="text-muted mb-2">{data.subtitle}</p>
      <p className="text-xs text-muted mb-10">{totalTerms} terms</p>

      {/* Sections */}
      {data.sections.map((section) => (
        <section key={section.heading} className="mb-12">
          <h2 className="font-display text-xl font-bold mb-6 pb-2 border-b border-border">
            {section.heading}
          </h2>
          <div className="space-y-4">
            {section.terms.map((item) => (
              <div
                key={item.term}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-display font-bold text-foreground mb-2">
                  {item.term}
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {item.plain}
                </p>
                {item.analogy && (
                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                      ANALOGY
                    </span>
                    <p className="text-muted">{item.analogy}</p>
                  </div>
                )}
                {item.aiTip && (
                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <span className="text-success font-mono text-xs mt-0.5 shrink-0">
                      AI TIP
                    </span>
                    <p className="text-muted">{item.aiTip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-8 mt-8">
        {prev ? (
          <Link
            href={`/vibe-coders/${prev.slug}`}
            className="card-interactive rounded-lg border border-border bg-card px-4 py-3 hover:bg-card-hover"
          >
            <p className="text-xs text-muted mb-1">&larr; Previous</p>
            <p className="text-sm font-medium text-foreground">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/vibe-coders/${next.slug}`}
            className="card-interactive rounded-lg border border-border bg-card px-4 py-3 hover:bg-card-hover text-right"
          >
            <p className="text-xs text-muted mb-1">Next &rarr;</p>
            <p className="text-sm font-medium text-foreground">{next.title}</p>
          </Link>
        ) : (
          <Link
            href="/resources"
            className="card-interactive rounded-lg border border-border bg-card px-4 py-3 hover:bg-card-hover text-right"
          >
            <p className="text-xs text-muted mb-1">You're ready &rarr;</p>
            <p className="text-sm font-medium text-accent">
              Browse Resources
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
