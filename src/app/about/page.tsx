import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What is ClaudesHub and why it exists.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold mb-6">
        About <span className="text-accent">Claudes</span>Hub
      </h1>

      <div className="prose">
        <p>
          ClaudesHub is the community hub for Claude Code users. A place to
          discover, share, and discuss the skills, CLAUDE.md configs, MCP
          servers, hooks, guides, and prompts that make Claude Code more
          powerful.
        </p>

        <h2>Why This Exists</h2>
        <p>
          Claude Code is an incredible tool, but its real power comes from what
          the community builds on top of it. Custom skills that automate
          repetitive tasks. CLAUDE.md configs tuned for specific stacks. MCP
          servers that connect Claude to new services. Hooks that automate your
          workflow. Guides that teach you patterns you didn't know existed.
        </p>
        <p>
          All of that knowledge was scattered across GitHub repos, Discord
          threads, and Reddit posts. ClaudesHub brings it together in one
          searchable, voteable, downloadable place with real community
          discussion.
        </p>

        <h2>How It Works</h2>
        <ul>
          <li>
            <strong>Browse</strong> resources by type, category, tag, or search.
            Community voting surfaces the best content.
          </li>
          <li>
            <strong>Download</strong> skills, configs, and hooks directly. No
            hunting through repos or copy-pasting from screenshots.
          </li>
          <li>
            <strong>Share</strong> what you've built. Upload your resources with
            structured templates that make them easy to follow.
          </li>
          <li>
            <strong>Discuss</strong> ideas, ask questions, troubleshoot
            problems, and help others in community threads.
          </li>
        </ul>

        <h2>Staff Picks</h2>
        <p>
          We manually review and highlight the best resources as Staff Picks.
          These are the resources we'd recommend to anyone getting started or
          looking to level up their Claude Code workflow.
        </p>

        <h2>Built By the Community</h2>
        <p>
          ClaudesHub is only as good as what people contribute. If you've built
          something useful with Claude Code, share it. If you've found a better
          way to do something, write it up. The best communities are the ones
          where everyone teaches and everyone learns.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-10">
        <Link href="/resources">
          <Button size="lg">Browse Resources</Button>
        </Link>
        <Link href="/guidelines">
          <Button variant="secondary" size="lg">
            Submission Guidelines
          </Button>
        </Link>
      </div>
    </div>
  );
}
