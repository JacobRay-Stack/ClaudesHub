"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const discussionSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(10),
  category_id: z.coerce.number().int().positive().optional(),
});

export async function createDiscussion(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const parsed = discussionSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    category_id: formData.get("category_id") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const slug = slugify(parsed.data.title) + "-" + Date.now().toString(36);

  const supabase = await createServerClient();
  const { error } = await supabase.from("discussions").insert({
    ...parsed.data,
    slug,
    author_id: user.id,
  });

  if (error) return { error: error.message };
  redirect(`/discussions/${slug}`);
}

export async function deleteDiscussion(id: string) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("discussions")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) return { error: error.message };
  redirect("/discussions");
}

export async function searchDiscussions(
  sort: string = "hot",
  page: number = 1
) {
  const supabase = await createServerClient();
  let q = supabase
    .from("discussions")
    .select("*, author:profiles(*), category:categories(*)", { count: "exact" });

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
  if (error) return { discussions: [], total: 0 };
  return { discussions: data || [], total: count || 0 };
}
