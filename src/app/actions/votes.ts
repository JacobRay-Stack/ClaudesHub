"use server";

import { createServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

type TargetType = "resource" | "discussion" | "comment";

export async function vote(targetType: TargetType, targetId: string, value: number) {
  const user = await getUser();
  if (!user) return { error: "You must be logged in" };

  const supabase = await createServerClient();

  const params: Record<string, unknown> = {
    p_user_id: user.id,
    p_value: value,
    p_resource_id: null,
    p_discussion_id: null,
    p_comment_id: null,
  };

  if (targetType === "resource") params.p_resource_id = targetId;
  else if (targetType === "discussion") params.p_discussion_id = targetId;
  else if (targetType === "comment") params.p_comment_id = targetId;

  const { data, error } = await supabase.rpc("handle_vote", params);

  if (error) return { error: error.message };
  return { count: data as number };
}
