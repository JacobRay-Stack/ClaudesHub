import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import { Badge } from "@/components/ui/Badge";
import { DISCUSSION_TYPES } from "@/lib/constants";
import type { Discussion } from "@/lib/types";

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  const typeInfo = DISCUSSION_TYPES.find(
    (t) => t.value === discussion.discussion_type
  );

  return (
    <Link
      href={`/discussions/${discussion.slug}`}
      className="card-interactive flex items-start gap-4 rounded-lg border border-border bg-card hover:bg-card-hover p-4"
    >
      <div className="flex flex-col items-center text-sm shrink-0 min-w-[40px]">
        <svg
          className="w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span className="font-medium text-foreground">
          {discussion.upvote_count}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {typeInfo && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          )}
          {discussion.is_answered && (
            <Badge variant="success">Answered</Badge>
          )}
          {discussion.category && (
            <Badge variant="muted">{discussion.category.name}</Badge>
          )}
        </div>
        <h3 className="font-medium text-foreground">{discussion.title}</h3>
        {discussion.body && (
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {discussion.body.slice(0, 150)}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-muted">
          {discussion.author && (
            <div className="flex items-center gap-1.5">
              <Avatar
                src={discussion.author.avatar_url}
                alt={
                  discussion.author.display_name || discussion.author.username
                }
                size="sm"
              />
              <span>
                {discussion.author.display_name || discussion.author.username}
              </span>
            </div>
          )}
          <TimeAgo date={discussion.created_at} />
          <span>{discussion.comment_count} comments</span>
        </div>
      </div>
    </Link>
  );
}
