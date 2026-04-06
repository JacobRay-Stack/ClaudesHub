import Link from "next/link";
import { getUser } from "@/lib/auth";
import { UserMenu } from "@/components/auth/UserMenu";

export async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between px-4 h-14 gap-4">
        <Link
          href="/"
          className="flex items-center gap-0.5 font-display text-lg tracking-tight shrink-0"
        >
          <span className="text-accent font-bold">Claudes</span>
          <span className="text-foreground font-bold">Hub</span>
        </Link>

        {/* Search */}
        <form
          action="/resources"
          method="get"
          className="flex-1 max-w-[420px] relative hidden sm:block"
        >
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            name="q"
            placeholder="Search skills, configs, MCP servers..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
        </form>

        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <Link
                href="/resources/new"
                className="text-sm bg-accent text-black px-3 py-1.5 rounded-lg font-medium hover:bg-accent/90 transition-colors hidden sm:inline-flex"
              >
                Submit
              </Link>
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-accent text-black px-4 py-1.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
