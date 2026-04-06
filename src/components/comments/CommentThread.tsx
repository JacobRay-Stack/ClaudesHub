import { CommentItem } from "./CommentItem";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Comment } from "@/lib/types";

interface CommentThreadProps {
  comments: Comment[];
  resourceId?: string;
  discussionId?: string;
  isAuthenticated: boolean;
  currentUserId?: string;
}

function buildTree(comments: Comment[]): Comment[] {
  const map = new Map<string, Comment>();
  const roots: Comment[] = [];

  // Index all comments
  for (const c of comments) {
    map.set(c.id, { ...c, replies: [] });
  }

  // Build tree
  for (const c of comments) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies!.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export function CommentThread({
  comments,
  resourceId,
  discussionId,
  isAuthenticated,
  currentUserId,
}: CommentThreadProps) {
  const tree = buildTree(comments);

  if (tree.length === 0) {
    return (
      <EmptyState
        title="No comments yet"
        description={
          isAuthenticated
            ? "Be the first to share your thoughts."
            : "Sign in to join the conversation."
        }
      />
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {tree.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          resourceId={resourceId}
          discussionId={discussionId}
          isAuthenticated={isAuthenticated}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
