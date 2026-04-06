import type { ResourceType } from "./types";

export const RESOURCE_TEMPLATES: Record<ResourceType, string> = {
  skill: `## Description
What does this skill do? One or two sentences.

## What It Does
Explain the behavior in detail. When does it trigger? What does it automate?

## Installation
How to install or add this skill to Claude Code.

\`\`\`bash
# Example: copy to your skills directory
cp skill-name/ ~/.claude/skills/
\`\`\`

## Usage
How to trigger or use it. Include example prompts if applicable.

## The Code
\`\`\`
Paste the SKILL.md or skill code here
\`\`\`

## Compatibility
Claude Code version, OS requirements, or other dependencies.
`,

  "claude-config": `## Description
What project type or stack is this CLAUDE.md designed for?

## Stack
List the technologies this configuration targets (e.g., Next.js, TypeScript, Tailwind).

## What It Configures
Explain what behaviors, rules, and conventions this CLAUDE.md sets up for Claude Code.

## The File
\`\`\`markdown
Paste your CLAUDE.md content here
\`\`\`

## Customization
What parts should someone modify for their own project? Any sections that are opinionated?
`,

  "mcp-server": `## Description
What does this MCP server connect Claude Code to?

## What It Connects To
The service, API, or system this server interfaces with.

## Setup
How to install and configure. Include the settings.json or .mcp.json snippet.

\`\`\`json
{
  "mcpServers": {
    "server-name": {
      "command": "",
      "args": []
    }
  }
}
\`\`\`

## Available Tools
List the tools this server exposes and what each one does.

## Example Usage
Show example prompts that use this server's tools.

## Requirements
API keys, dependencies, or system requirements. Note any token usage considerations.
`,

  hook: `## Description
What does this hook do?

## Trigger
When does it fire? (PreToolUse, PostToolUse, Notification, etc.)

## Configuration
Paste the settings.json snippet:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": ""
      }
    ]
  }
}
\`\`\`

## How It Works
Step-by-step explanation of what the hook does when triggered.

## Requirements
Any external tools, scripts, or dependencies needed.
`,

  guide: `## Description
What does this guide cover?

## Who This Is For
What experience level or use case is this guide targeting?

## The Guide
Write your tutorial, workflow pattern, or how-to here. Use headings to break up sections.

### Step 1

### Step 2

### Step 3

## Tips & Gotchas
Common mistakes or non-obvious details worth knowing.
`,

  prompt: `## Description
What does this prompt pattern accomplish?

## When to Use
What situation or task is this prompt designed for?

## The Prompt
\`\`\`
Paste the prompt here
\`\`\`

## Example Output
What kind of result does this produce? Include a sample if possible.

## Variations
Any modifications for different use cases or contexts.
`,
};
