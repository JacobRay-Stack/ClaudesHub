import { createServerClient } from "@/lib/supabase/server";
import { ResourceForm } from "@/components/resources/ResourceForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Resource",
};

export default async function NewResourcePage() {
  const supabase = await createServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submit a Resource</h1>
      <ResourceForm categories={categories || []} />
    </div>
  );
}
