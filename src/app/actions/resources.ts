"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const resourceSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(500).optional(),
  content: z.string().min(10),
  resource_type: z.enum(["skill", "sop", "mcp-server", "reference", "template"]),
  category_id: z.coerce.number().int().positive(),
  tags: z.string().optional(),
});

export async function createResource(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    resource_type: formData.get("resource_type"),
    category_id: formData.get("category_id"),
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { tags: tagString, ...data } = parsed.data;
  const tags = tagString
    ? tagString.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  const slug = slugify(data.title) + "-" + Date.now().toString(36);

  const supabase = await createServerClient();
  const { error } = await supabase.from("resources").insert({
    ...data,
    slug,
    tags,
    author_id: user.id,
  });

  if (error) return { error: error.message };
  redirect(`/resources/${slug}`);
}

export async function updateResource(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const id = formData.get("id") as string;
  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    resource_type: formData.get("resource_type"),
    category_id: formData.get("category_id"),
    tags: formData.get("tags"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { tags: tagString, ...data } = parsed.data;
  const tags = tagString
    ? tagString.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("resources")
    .update({ ...data, tags, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) return { error: error.message };

  // Fetch the slug for redirect
  const { data: resource } = await supabase
    .from("resources")
    .select("slug")
    .eq("id", id)
    .single();

  redirect(`/resources/${resource?.slug}`);
}

export async function deleteResource(id: string) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) return { error: error.message };
  redirect("/resources");
}

export async function searchResources(
  query: string = "",
  categorySlug: string = "",
  sort: string = "hot",
  page: number = 1,
  resourceType: string = ""
) {
  const supabase = await createServerClient();
  let q = supabase
    .from("resources")
    .select("*, author:profiles(*), category:categories(*)", { count: "exact" });

  if (query) {
    q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }

  if (categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (cat) q = q.eq("category_id", cat.id);
  }

  if (resourceType) {
    q = q.eq("resource_type", resourceType);
  }

  switch (sort) {
    case "new":
      q = q.order("created_at", { ascending: false });
      break;
    case "top":
      q = q.order("upvote_count", { ascending: false });
      break;
    case "hot":
    default:
      q = q
        .order("upvote_count", { ascending: false })
        .order("created_at", { ascending: false });
      break;
  }

  const from = (page - 1) * ITEMS_PER_PAGE;
  q = q.range(from, from + ITEMS_PER_PAGE - 1);

  const { data, count, error } = await q;

  if (error) return { resources: [], total: 0, error: error.message };
  return { resources: data || [], total: count || 0 };
}
