import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import { Badge } from "@/components/ui/Badge";
import type { Discussion } from "@/lib/types";

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Link
      href={`/discussions/${discussion.slug}`}
      className="flex items-start gap-4 rounded-lg border border-border bg-card hover:bg-card-hover transition-colors p-4"
    >
      <div className="flex flex-col items-center text-sm shrink-0 min-w-[40px]">
        <svg
          className="w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="font-medium text-foreground">{discussion.upvote_count}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {discussion.category && (
            <Badge variant="accent">{discussion.category.name}</Badge>
          )}
        </div>
        <h3 className="font-medium text-foreground">{discussion.title}</h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted">
          {discussion.author && (
            <div className="flex items-center gap-1.5">
              <Avatar
                src={discussion.author.avatar_url}
                alt={discussion.author.display_name || discussion.author.username}
                size="sm"
              />
              <span>{discussion.author.display_name || discussion.author.username}</span>
            </div>
          )}
          <TimeAgo date={discussion.created_at} />
          <span>{discussion.comment_count} comments</span>
        </div>
      </div>
    </Link>
  );
}
