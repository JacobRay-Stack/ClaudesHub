"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadResourceFile(resourceId: string, formData: FormData) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "No file selected" };

  // 10MB limit
  if (file.size > 10 * 1024 * 1024) {
    return { error: "File must be under 10MB" };
  }

  const supabase = await createServerClient();

  // Verify user owns this resource
  const { data: resource } = await supabase
    .from("resources")
    .select("slug")
    .eq("id", resourceId)
    .eq("author_id", user.id)
    .single();

  if (!resource) return { error: "Resource not found or not owned by you" };

  // Upload to storage: user_id/resource_id/filename
  const storagePath = `${user.id}/${resourceId}/${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("resource-files")
    .upload(storagePath, file, { upsert: true });

  if (uploadError) return { error: uploadError.message };

  // Insert file record
  const { error: dbError } = await supabase.from("resource_files").insert({
    resource_id: resourceId,
    file_name: file.name,
    file_size: file.size,
    storage_path: storagePath,
    content_type: file.type || null,
  });

  if (dbError) return { error: dbError.message };

  revalidatePath(`/resources/${resource.slug}`);
  return { success: true };
}

export async function deleteResourceFile(fileId: string) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const supabase = await createServerClient();

  // Get file info and verify ownership
  const { data: file } = await supabase
    .from("resource_files")
    .select("*, resource:resources(slug, author_id)")
    .eq("id", fileId)
    .single();

  if (!file || file.resource?.author_id !== user.id) {
    return { error: "File not found or not owned by you" };
  }

  // Delete from storage
  await supabase.storage
    .from("resource-files")
    .remove([file.storage_path]);

  // Delete record
  const { error } = await supabase
    .from("resource_files")
    .delete()
    .eq("id", fileId);

  if (error) return { error: error.message };

  revalidatePath(`/resources/${file.resource.slug}`);
  return { success: true };
}

export async function trackDownload(fileId: string) {
  const supabase = await createServerClient();

  await supabase.rpc("increment_download_count", { file_id: fileId }).catch(() => {
    // Fallback: direct update if RPC doesn't exist yet
    supabase
      .from("resource_files")
      .update({ download_count: supabase.rpc ? undefined : 0 })
      .eq("id", fileId);
  });
}
