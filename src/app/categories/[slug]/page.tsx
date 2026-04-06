import { createServerClient } from "@/lib/supabase/server";
import { searchResources } from "@/app/actions/resources";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .single();

  return {
    title: data?.name || "Category",
    description: data?.description || undefined,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const supabase = await createServerClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  const { resources } = await searchResources(
    "",
    slug,
    sp.sort || "hot",
    parseInt(sp.page || "1")
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">{category.name}</h1>
      {category.description && (
        <p className="text-muted mb-6">{category.description}</p>
      )}
      <ResourceGrid resources={resources} />
    </div>
  );
}
