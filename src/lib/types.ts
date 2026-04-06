export type ResourceType = "skill" | "sop" | "mcp-server" | "reference" | "template";

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
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: Category;
}

export interface Discussion {
  id: string;
  title: string;
  slug: string;
  body: string | null;
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
