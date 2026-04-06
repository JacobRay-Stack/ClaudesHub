import Link from "next/link";
import { getUser } from "@/lib/auth";
import { UserMenu } from "@/components/auth/UserMenu";

export async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-accent">Claude</span>
            <span className="text-foreground">sHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
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
                className="text-sm bg-accent text-black px-3 py-1.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
