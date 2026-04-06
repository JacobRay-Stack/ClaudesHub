"use client";

import { useState, useTransition } from "react";
import { createComment } from "@/app/actions/comments";
import { Button } from "@/components/ui/Button";

interface CommentFormProps {
  resourceId?: string;
  discussionId?: string;
  parentId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function CommentForm({
  resourceId,
  discussionId,
  parentId,
  onCancel,
  onSuccess,
}: CommentFormProps) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!body.trim()) return;
    setError(null);

    const formData = new FormData();
    formData.set("body", body);
    if (resourceId) formData.set("resource_id", resourceId);
    if (discussionId) formData.set("discussion_id", discussionId);
    if (parentId) formData.set("parent_id", parentId);

    startTransition(async () => {
      const result = await createComment(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setBody("");
        onSuccess?.();
      }
    });
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[80px] resize-y"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSubmit} disabled={isPending || !body.trim()}>
          {isPending ? "Posting..." : parentId ? "Reply" : "Comment"}
        </Button>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
