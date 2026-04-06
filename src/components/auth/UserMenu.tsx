"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { signOut } from "@/app/actions/auth";
import type { Profile } from "@/lib/types";

interface UserMenuProps {
  user: Profile;
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Avatar
          src={user.avatar_url}
          alt={user.display_name || user.username}
          size="sm"
        />
        <span className="text-sm text-foreground hidden sm:inline">
          {user.display_name || user.username}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
          <Link
            href={`/profile/${user.username}`}
            className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-card-hover"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/resources/new"
            className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-card-hover"
            onClick={() => setOpen(false)}
          >
            Submit Resource
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-card-hover"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <hr className="border-border my-1" />
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-card-hover cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
