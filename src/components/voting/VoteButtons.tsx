"use client";

import { useState, useTransition } from "react";
import { vote } from "@/app/actions/votes";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  targetType: "resource" | "discussion" | "comment";
  targetId: string;
  count: number;
  userVote: number | null;
  isAuthenticated: boolean;
  compact?: boolean;
}

export function VoteButtons({
  targetType,
  targetId,
  count: initialCount,
  userVote: initialVote,
  isAuthenticated,
  compact = false,
}: VoteButtonsProps) {
  const [count, setCount] = useState(initialCount);
  const [userVote, setUserVote] = useState(initialVote);
  const [isPending, startTransition] = useTransition();

  function handleVote(value: number) {
    if (!isAuthenticated) return;

    // Optimistic update
    const wasVoted = userVote === value;
    const oldVote = userVote;
    setUserVote(wasVoted ? null : value);
    setCount((prev) => {
      if (wasVoted) return prev - value;
      if (oldVote) return prev - oldVote + value;
      return prev + value;
    });

    startTransition(async () => {
      const result = await vote(targetType, targetId, value);
      if (result.error) {
        // Revert
        setUserVote(oldVote);
        setCount(initialCount);
      } else if (result.count !== undefined) {
        setCount(result.count);
      }
    });
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleVote(1)}
          disabled={!isAuthenticated || isPending}
          className={cn(
            "p-1 rounded transition-colors cursor-pointer",
            userVote === 1 ? "text-accent" : "text-muted hover:text-foreground",
            !isAuthenticated && "cursor-default opacity-50"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className={cn("text-sm font-medium", count > 0 ? "text-foreground" : "text-muted")}>
          {count}
        </span>
        <button
          onClick={() => handleVote(-1)}
          disabled={!isAuthenticated || isPending}
          className={cn(
            "p-1 rounded transition-colors cursor-pointer",
            userVote === -1 ? "text-danger" : "text-muted hover:text-foreground",
            !isAuthenticated && "cursor-default opacity-50"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 pt-1">
      <button
        onClick={() => handleVote(1)}
        disabled={!isAuthenticated || isPending}
        className={cn(
          "p-1 rounded transition-colors cursor-pointer",
          userVote === 1 ? "text-accent" : "text-muted hover:text-foreground",
          !isAuthenticated && "cursor-default opacity-50"
        )}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <span className={cn("text-sm font-bold", count > 0 ? "text-foreground" : "text-muted")}>
        {count}
      </span>
      <button
        onClick={() => handleVote(-1)}
        disabled={!isAuthenticated || isPending}
        className={cn(
          "p-1 rounded transition-colors cursor-pointer",
          userVote === -1 ? "text-danger" : "text-muted hover:text-foreground",
          !isAuthenticated && "cursor-default opacity-50"
        )}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
