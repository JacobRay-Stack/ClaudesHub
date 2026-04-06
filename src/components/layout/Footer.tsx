import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="text-accent font-bold">Claude</span>
            <span className="font-bold">sHub</span>
            <span className="ml-2">Community-driven Claude Code resources</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/resources" className="hover:text-foreground transition-colors">
              Resources
            </Link>
            <Link href="/discussions" className="hover:text-foreground transition-colors">
              Discussions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
