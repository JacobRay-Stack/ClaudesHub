import { createServerClient } from "@/lib/supabase/server";
import { DiscussionForm } from "@/components/discussions/DiscussionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Discussion",
};

export default async function NewDiscussionPage() {
  const supabase = await createServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Start a Discussion</h1>
      <DiscussionForm categories={categories || []} />
    </div>
  );
}
