import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { Markdown } from "@/components/ui/Markdown";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import { Badge } from "@/components/ui/Badge";
import { VoteButtons } from "@/components/voting/VoteButtons";
import { CommentThread } from "@/components/comments/CommentThread";
import { CommentForm } from "@/components/comments/CommentForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("discussions")
    .select("title")
    .eq("slug", slug)
    .single();

  return { title: data?.title || "Discussion" };
}

export default async function DiscussionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const user = await getUser();

  const { data: discussion } = await supabase
    .from("discussions")
    .select("*, author:profiles(*), category:categories(*)")
    .eq("slug", slug)
    .single();

  if (!discussion) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("*, author:profiles(*)")
    .eq("discussion_id", discussion.id)
    .order("created_at", { ascending: true });

  let userVote: number | null = null;
  if (user) {
    const { data: vote } = await supabase
      .from("votes")
      .select("value")
      .eq("user_id", user.id)
      .eq("discussion_id", discussion.id)
      .maybeSingle();
    userVote = vote?.value ?? null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex gap-4">
        <VoteButtons
          targetType="discussion"
          targetId={discussion.id}
          count={discussion.upvote_count}
          userVote={userVote}
          isAuthenticated={!!user}
        />
        <div className="flex-1 min-w-0">
          {discussion.category && (
            <Badge variant="accent" className="mb-2">
              {discussion.category.name}
            </Badge>
          )}
          <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted mb-6">
            {discussion.author && (
              <Link
                href={`/profile/${discussion.author.username}`}
                className="flex items-center gap-1.5 hover:text-foreground"
              >
                <Avatar
                  src={discussion.author.avatar_url}
                  alt={discussion.author.display_name || discussion.author.username}
                  size="sm"
                />
                <span>{discussion.author.display_name || discussion.author.username}</span>
              </Link>
            )}
            <TimeAgo date={discussion.created_at} />
          </div>

          {discussion.body && (
            <div className="border border-border rounded-lg p-6 bg-card mb-8">
              <Markdown content={discussion.body} />
            </div>
          )}

          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-bold mb-4">
              Comments ({discussion.comment_count})
            </h2>
            {user && (
              <CommentForm discussionId={discussion.id} />
            )}
            <CommentThread
              comments={comments || []}
              discussionId={discussion.id}
              isAuthenticated={!!user}
              currentUserId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
