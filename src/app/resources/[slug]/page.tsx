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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
