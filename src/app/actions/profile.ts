"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const display_name = formData.get("display_name") as string;
  const bio = formData.get("bio") as string;
  const username = formData.get("username") as string;

  if (!username?.trim()) return { error: "Username is required" };

  const supabase = await createServerClient();

  // Check username uniqueness (if changed)
  if (username !== user.username) {
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .neq("id", user.id)
      .maybeSingle();

    if (existing) return { error: "Username is already taken" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: display_name || null,
      bio: bio || null,
      username,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath(`/profile/${username}`);
  return { success: true };
}
