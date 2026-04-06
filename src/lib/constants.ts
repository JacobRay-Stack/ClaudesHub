export const RESOURCE_TYPES = [
  { value: "skill", label: "Skill" },
  { value: "sop", label: "SOP" },
  { value: "mcp-server", label: "MCP Server" },
  { value: "reference", label: "Reference" },
  { value: "template", label: "Template" },
] as const;

export const SORT_OPTIONS = [
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  code: "{ }",
  terminal: ">_",
  plug: "⚡",
  "git-branch": "⑂",
  chart: "📊",
  pen: "✎",
  shield: "🛡",
  rocket: "🚀",
  zap: "⚡",
  package: "📦",
};

export const ITEMS_PER_PAGE = 20;
