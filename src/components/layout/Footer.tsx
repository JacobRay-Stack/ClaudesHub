import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="font-display font-bold text-accent">Claudes</span>
            <span className="font-display font-bold text-foreground">Hub</span>
            <span className="ml-2 text-xs">Community-driven Claude Code resources</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link
              href="/resources"
              className="hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/discussions"
              className="hover:text-foreground transition-colors"
            >
              Discussions
            </Link>
            <Link
              href="/learn"
              className="hover:text-foreground transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/vibe-coders"
              className="hover:text-foreground transition-colors"
            >
              Vibe Coders
            </Link>
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/guidelines"
              className="hover:text-foreground transition-colors"
            >
              Guidelines
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
