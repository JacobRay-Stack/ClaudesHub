"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const body = formData.get("body") as string;
  const resourceId = formData.get("resource_id") as string | null;
  const discussionId = formData.get("discussion_id") as string | null;
  const parentId = formData.get("parent_id") as string | null;

  if (!body?.trim()) return { error: "Comment cannot be empty" };
  if (!resourceId && !discussionId) return { error: "Invalid target" };

  let depth = 0;
  if (parentId) {
    const supabase = await createServerClient();
    const { data: parent } = await supabase
      .from("comments")
      .select("depth")
      .eq("id", parentId)
      .single();
    depth = (parent?.depth || 0) + 1;
    if (depth > 4) return { error: "Maximum nesting depth reached" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.from("comments").insert({
    body: body.trim(),
    author_id: user.id,
    resource_id: resourceId || null,
    discussion_id: discussionId || null,
    parent_id: parentId || null,
    depth,
  });

  if (error) return { error: error.message };

  // Revalidate the page to show new comment
  if (resourceId) {
    const { data: res } = await supabase
      .from("resources")
      .select("slug")
      .eq("id", resourceId)
      .single();
    if (res) revalidatePath(`/resources/${res.slug}`);
  } else if (discussionId) {
    const { data: disc } = await supabase
      .from("discussions")
      .select("slug")
      .eq("id", discussionId)
      .single();
    if (disc) revalidatePath(`/discussions/${disc.slug}`);
  }

  return { success: true };
}

export async function deleteComment(commentId: string) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("author_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}
