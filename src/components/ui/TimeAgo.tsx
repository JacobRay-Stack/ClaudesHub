"use client";

import { formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  date: string;
  className?: string;
}

export function TimeAgo({ date, className }: TimeAgoProps) {
  return (
    <time dateTime={date} className={className}>
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </time>
  );
}
