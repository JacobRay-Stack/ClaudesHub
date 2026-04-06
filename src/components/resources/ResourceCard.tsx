import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { TimeAgo } from "@/components/ui/TimeAgo";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="block rounded-lg border border-border bg-card hover:bg-card-hover transition-colors p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {resource.category && (
              <Badge variant="accent">{resource.category.name}</Badge>
            )}
            <Badge variant="muted">{resource.resource_type}</Badge>
          </div>
          <h3 className="font-medium text-foreground truncate">
            {resource.title}
          </h3>
          {resource.description && (
            <p className="text-sm text-muted mt-1 line-clamp-2">
              {resource.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs text-muted">
            {resource.author && (
              <div className="flex items-center gap-1.5">
                <Avatar
                  src={resource.author.avatar_url}
                  alt={resource.author.display_name || resource.author.username}
                  size="sm"
                />
                <span>{resource.author.display_name || resource.author.username}</span>
              </div>
            )}
            <TimeAgo date={resource.created_at} />
          </div>
        </div>
        <div className="flex flex-col items-center text-sm shrink-0">
          <svg
            className="w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="font-medium text-foreground">{resource.upvote_count}</span>
          <span className="text-xs text-muted">{resource.comment_count} comments</span>
        </div>
      </div>
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-background rounded px-1.5 py-0.5 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
