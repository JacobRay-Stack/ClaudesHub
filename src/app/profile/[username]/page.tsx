import { createServerClient } from "@/lib/supabase/server";
import { Avatar } from "@/components/ui/Avatar";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { DiscussionCard } from "@/components/discussions/DiscussionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const [{ data: resources }, { data: discussions }] = await Promise.all([
    supabase
      .from("resources")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("author_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("discussions")
      .select("*, author:profiles(*), category:categories(*)")
      .eq("author_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-start gap-4 mb-8">
        <Avatar
          src={profile.avatar_url}
          alt={profile.display_name || profile.username}
          size="lg"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-sm text-muted">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm text-foreground mt-2">{profile.bio}</p>
          )}
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">Resources</h2>
        {resources && resources.length > 0 ? (
          <div className="grid gap-3">
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <EmptyState title="No resources yet" />
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4">Discussions</h2>
        {discussions && discussions.length > 0 ? (
          <div className="space-y-3">
            {discussions.map((d) => (
              <DiscussionCard key={d.id} discussion={d} />
            ))}
          </div>
        ) : (
          <EmptyState title="No discussions yet" />
        )}
      </section>
    </div>
  );
}
