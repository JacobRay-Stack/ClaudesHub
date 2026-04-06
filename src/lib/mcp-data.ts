export interface McpCategory {
  slug: string;
  label: string;
  description: string;
  icon: string;
}

export const MCP_CATEGORIES: McpCategory[] = [
  {
    slug: "databases",
    label: "Databases",
    description: "PostgreSQL, Supabase, MongoDB, Redis, SQLite",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  },
  {
    slug: "communication",
    label: "Communication",
    description: "Slack, Discord, Email, Teams, Telegram",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    slug: "devtools",
    label: "Dev Tools",
    description: "GitHub, GitLab, Jira, Linear, Sentry",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    slug: "analytics",
    label: "Analytics",
    description: "Grafana, Datadog, Mixpanel, PostHog",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    slug: "productivity",
    label: "Productivity",
    description: "Notion, Google Drive, Airtable, Todoist",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    slug: "cloud",
    label: "Cloud & Infra",
    description: "AWS, Vercel, Cloudflare, Docker",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    slug: "file-systems",
    label: "File Systems",
    description: "Local files, S3, Google Cloud Storage",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  },
  {
    slug: "apis",
    label: "APIs & Services",
    description: "REST APIs, Stripe, Twilio, OpenAI",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  },
];

export const TOKEN_USAGE_LEVELS = {
  low: { label: "Low", color: "text-success", description: "< 5K tokens on init" },
  medium: { label: "Medium", color: "text-accent", description: "5-20K tokens on init" },
  high: { label: "High", color: "text-type-guide", description: "20-50K tokens on init" },
  heavy: { label: "Heavy", color: "text-danger", description: "50K+ tokens on init" },
} as const;
