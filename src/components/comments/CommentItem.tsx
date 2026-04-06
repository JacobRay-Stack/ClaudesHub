"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import { VoteButtons } from "@/components/voting/VoteButtons";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/lib/types";

interface CommentItemProps {
  comment: Comment;
  resourceId?: string;
  discussionId?: string;
  isAuthenticated: boolean;
  currentUserId?: string;
}

export function CommentItem({
  comment,
  resourceId,
  discussionId,
  isAuthenticated,
  currentUserId,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="group">
      <div className="flex gap-3">
        <Avatar
          src={comment.author?.avatar_url}
          alt={comment.author?.display_name || comment.author?.username || ""}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-medium text-foreground">
              {comment.author?.display_name || comment.author?.username}
            </span>
            <TimeAgo date={comment.created_at} />
          </div>
          <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">
            {comment.body}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <VoteButtons
              targetType="comment"
              targetId={comment.id}
              count={comment.upvote_count}
              userVote={null}
              isAuthenticated={isAuthenticated}
              compact
            />
            {isAuthenticated && comment.depth < 4 && (
              <button
                onClick={() => setShowReply(!showReply)}
                className="text-xs text-muted hover:text-foreground cursor-pointer"
              >
                Reply
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-2">
              <CommentForm
                resourceId={resourceId}
                discussionId={discussionId}
                parentId={comment.id}
                onCancel={() => setShowReply(false)}
                onSuccess={() => setShowReply(false)}
              />
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-3 pl-3 border-l border-border space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              resourceId={resourceId}
              discussionId={discussionId}
              isAuthenticated={isAuthenticated}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
