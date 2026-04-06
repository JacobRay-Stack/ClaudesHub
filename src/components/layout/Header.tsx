import Link from "next/link";
import { getUser } from "@/lib/auth";
import { UserMenu } from "@/components/auth/UserMenu";

export async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-0.5 font-display text-lg tracking-tight"
          >
            <span className="text-accent font-bold">Claudes</span>
            <span className="text-foreground font-bold">Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/resources"
              className="text-muted hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/discussions"
              className="text-muted hover:text-foreground transition-colors"
            >
              Discussions
            </Link>
            <Link
              href="/learn"
              className="text-muted hover:text-foreground transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/vibe-coders"
              className="text-muted hover:text-foreground transition-colors"
            >
              Vibe Coders
            </Link>
            <Link
              href="/tags"
              className="text-muted hover:text-foreground transition-colors"
            >
              Tags
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex items-center gap-2">
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
            </div>
          )}
        </div>
      </div>
      <div className="header-line" />
    </header>
  );
}
