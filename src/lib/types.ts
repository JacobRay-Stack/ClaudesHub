export type ResourceType = "skill" | "claude-config" | "mcp-server" | "hook" | "guide" | "prompt";

export const ARTIFACT_TYPES: ResourceType[] = ["skill", "claude-config", "mcp-server", "hook"];
export const CONTENT_TYPES: ResourceType[] = ["guide", "prompt"];

export function isArtifactType(type: ResourceType): boolean {
  return ARTIFACT_TYPES.includes(type);
}

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  resource_type: ResourceType;
  category_id: number | null;
  author_id: string;
  tags: string[];
  upvote_count: number;
  comment_count: number;
  download_count: number;
  is_staff_pick: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: Category;
  files?: ResourceFile[];
}

export interface ResourceFile {
  id: string;
  resource_id: string;
  file_name: string;
  file_size: number;
  storage_path: string;
  content_type: string | null;
  download_count: number;
  created_at: string;
}

export type DiscussionType = "question" | "showcase" | "tips" | "meta";

export interface Discussion {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  discussion_type: DiscussionType;
  is_answered: boolean;
  author_id: string;
  category_id: number | null;
  upvote_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: Category;
}

export interface Comment {
  id: string;
  body: string;
  author_id: string;
  resource_id: string | null;
  discussion_id: string | null;
  parent_id: string | null;
  upvote_count: number;
  depth: number;
  created_at: string;
  // Joined
  author?: Profile;
  replies?: Comment[];
}

export interface Vote {
  id: string;
  user_id: string;
  resource_id: string | null;
  discussion_id: string | null;
  comment_id: string | null;
  value: number;
  created_at: string;
}

export type SortOption = "hot" | "new" | "top";
