import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { ResourceForm } from "@/components/resources/ResourceForm";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Resource",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerClient();

  const [{ data: resource }, { data: categories }] = await Promise.all([
    supabase
      .from("resources")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .single(),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  if (!resource) notFound();
  if (resource.author_id !== user.id) redirect(`/resources/${slug}`);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Resource</h1>
      <ResourceForm categories={categories || []} resource={resource} />
    </div>
  );
}
