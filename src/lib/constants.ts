import type { ResourceType } from "./types";

export const RESOURCE_TYPES: { value: ResourceType; label: string; description: string }[] = [
  { value: "skill", label: "Skill", description: "Custom Claude Code skills that automate tasks" },
  { value: "claude-config", label: "CLAUDE.md", description: "Project configuration templates by stack" },
  { value: "mcp-server", label: "MCP Server", description: "Server configurations connecting Claude to tools" },
  { value: "hook", label: "Hook", description: "settings.json automation snippets" },
  { value: "guide", label: "Guide", description: "Workflow tutorials, patterns, and how-tos" },
  { value: "prompt", label: "Prompt", description: "Reusable prompt templates and patterns" },
] as const;

export const TYPE_COLORS: Record<ResourceType, string> = {
  skill: "bg-accent/10 border-accent/20 text-accent",
  "claude-config": "bg-type-config/10 border-type-config/20 text-type-config",
  "mcp-server": "bg-type-mcp/10 border-type-mcp/20 text-type-mcp",
  hook: "bg-success/10 border-success/20 text-success",
  guide: "bg-type-guide/10 border-type-guide/20 text-type-guide",
  prompt: "bg-type-prompt/10 border-type-prompt/20 text-type-prompt",
};

export const TYPE_ICONS: Record<ResourceType, string> = {
  skill: "M13 10V3L4 14h7v7l9-11h-7z",                              // lightning bolt
  "claude-config": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // file
  "mcp-server": "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", // link/plug
  hook: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",  // arrows/refresh
  guide: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", // book
  prompt: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", // chat bubble
};

export const SORT_OPTIONS = [
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
] as const;

export const ITEMS_PER_PAGE = 20;
