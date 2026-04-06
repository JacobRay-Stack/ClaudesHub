import { cn } from "@/lib/utils";

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
