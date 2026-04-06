import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { Markdown } from "@/components/ui/Markdown";
import { Badge, TypeBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import { VoteButtons } from "@/components/voting/VoteButtons";
import { CommentThread } from "@/components/comments/CommentThread";
import { CommentForm } from "@/components/comments/CommentForm";
import { FileUpload } from "@/components/resources/FileUpload";
import { CopyConfigButton } from "@/components/mcp/CopyConfigButton";
import { isArtifactType } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("resources")
    .select("title, description")
    .eq("slug", slug)
    .single();

  return {
    title: data?.title || "Resource",
    description: data?.description || undefined,
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const user = await getUser();

  const { data: resource } = await supabase
    .from("resources")
    .select("*, author:profiles(*), category:categories(*)")
    .eq("slug", slug)
    .single();

  if (!resource) notFound();

  const [{ data: comments }, { data: files }] = await Promise.all([
    supabase
      .from("comments")
      .select("*, author:profiles(*)")
      .eq("resource_id", resource.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("resource_files")
      .select("*")
      .eq("resource_id", resource.id)
      .order("created_at", { ascending: true }),
  ]);

  let userVote: number | null = null;
  if (user) {
    const { data: vote } = await supabase
      .from("votes")
      .select("value")
      .eq("user_id", user.id)
      .eq("resource_id", resource.id)
      .maybeSingle();
    userVote = vote?.value ?? null;
  }

  const isAuthor = user?.id === resource.author_id;
  const isArtifact = isArtifactType(resource.resource_type);

  const typeLabels: Record<string, string> = {
    skill: "Skills",
    "claude-config": "CLAUDE.md",
    "mcp-server": "MCP Servers",
    hook: "Hooks",
    guide: "Guides",
    prompt: "Prompts",
  };

  const totalDownloads = files?.reduce((a, f) => a + (f.download_count || 0), 0) ?? 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link href="/resources" className="hover:text-foreground transition-colors">
          Resources
        </Link>
        <span>/</span>
        <Link
          href={`/resources?type=${resource.resource_type}`}
          className="hover:text-foreground transition-colors"
        >
          {typeLabels[resource.resource_type] || resource.resource_type}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{resource.title}</span>
      </nav>

      <div className="flex gap-4">
        <VoteButtons
          targetType="resource"
          targetId={resource.id}
          count={resource.upvote_count}
          userVote={userVote}
          isAuthenticated={!!user}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {resource.is_staff_pick && (
              <Badge variant="success">Staff Pick</Badge>
            )}
            <TypeBadge type={resource.resource_type} />
            {resource.category && (
              <Link href={`/categories/${resource.category.slug}`}>
                <Badge variant="muted">{resource.category.name}</Badge>
              </Link>
            )}
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">
            {resource.title}
          </h1>
          {resource.description && (
            <p className="text-muted mb-4">{resource.description}</p>
          )}

          {/* Stats bar */}
          <div className="flex items-center gap-4 text-sm text-muted mb-4 pb-4 border-b border-border">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
              </svg>
              {resource.upvote_count} upvotes
            </span>
            {totalDownloads > 0 && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {totalDownloads} downloads
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {resource.comment_count} comments
            </span>
            {isArtifact && files && files.length > 0 && (
              <a
                href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resource-files/${files[0].storage_path}`}
                download={files[0].file_name}
                className="ml-auto text-xs bg-accent text-black px-3 py-1.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Download Files
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted mb-6">
            {resource.author && (
              <Link
                href={`/profile/${resource.author.username}`}
                className="flex items-center gap-1.5 hover:text-foreground"
              >
                <Avatar
                  src={resource.author.avatar_url}
                  alt={
                    resource.author.display_name || resource.author.username
                  }
                  size="sm"
                />
                <span>
                  {resource.author.display_name || resource.author.username}
                </span>
              </Link>
            )}
            <TimeAgo date={resource.created_at} />
            {isAuthor && (
              <Link href={`/resources/${resource.slug}/edit`}>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </Link>
            )}
          </div>
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-6">
              {resource.tags.map((tag: string) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <Badge
                    variant="default"
                    className="hover:border-accent/30 hover:text-accent transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {/* MCP servers: config copy button */}
          {resource.resource_type === "mcp-server" && resource.content && (
            <CopyConfigButton content={resource.content} />
          )}

          {/* Artifact types: files first, then content */}
          {isArtifact && (files?.length || isAuthor) ? (
            <>
              <div className="border border-border rounded-lg p-6 bg-card mb-6">
                <FileUpload
                  resourceId={resource.id}
                  files={files || []}
                  isAuthor={isAuthor}
                />
              </div>
              <div className="border border-border rounded-lg p-6 bg-card mb-8">
                <Markdown content={resource.content || ""} />
              </div>
            </>
          ) : (
            <>
              <div className="border border-border rounded-lg p-6 bg-card mb-6">
                <Markdown content={resource.content || ""} />
              </div>
              {(files?.length || isAuthor) ? (
                <div className="border border-border rounded-lg p-6 bg-card mb-8">
                  <FileUpload
                    resourceId={resource.id}
                    files={files || []}
                    isAuthor={isAuthor}
                  />
                </div>
              ) : null}
            </>
          )}

          {/* Marketplace interest CTA */}
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-5 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-sm text-foreground">
                  Need something like this built for you?
                </h3>
                <p className="text-xs text-muted mt-1">
                  We're exploring a marketplace where you can hire community
                  experts to build custom skills, configs, and automations.
                </p>
              </div>
              <a
                href="https://forms.gle/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs bg-accent text-black px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                I'd pay for custom help
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="font-display text-lg font-bold mb-4">
              Comments ({resource.comment_count})
            </h2>
            {user && <CommentForm resourceId={resource.id} />}
            <CommentThread
              comments={comments || []}
              resourceId={resource.id}
              isAuthenticated={!!user}
              currentUserId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
