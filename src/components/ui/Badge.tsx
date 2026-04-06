import { cn } from "@/lib/utils";
import { TYPE_COLORS, TYPE_ICONS } from "@/lib/constants";
import type { ResourceType } from "@/lib/types";

type Variant = "default" | "accent" | "success" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-card border border-border text-foreground",
  accent: "bg-accent/10 border border-accent/20 text-accent",
  success: "bg-success/10 border border-success/20 text-success",
  muted: "bg-card text-muted",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TypeBadgeProps {
  type: ResourceType;
  showIcon?: boolean;
  className?: string;
}

const typeLabels: Record<ResourceType, string> = {
  skill: "Skill",
  "claude-config": "CLAUDE.md",
  "mcp-server": "MCP Server",
  hook: "Hook",
  guide: "Guide",
  prompt: "Prompt",
};

export function TypeBadge({ type, showIcon = true, className }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TYPE_COLORS[type],
        className
      )}
    >
      {showIcon && (
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={TYPE_ICONS[type]} />
        </svg>
      )}
      {typeLabels[type]}
    </span>
  );
}
