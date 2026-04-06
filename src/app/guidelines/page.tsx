import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission Guidelines",
  description: "How to submit quality resources to ClaudesHub.",
};

export default function GuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold mb-6">
        Submission Guidelines
      </h1>

      <div className="prose">
        <p>
          ClaudesHub is a curated community. These guidelines help keep the
          quality high and make resources useful for everyone.
        </p>

        <h2>What to Share</h2>
        <ul>
          <li>
            <strong>Skills</strong> -- Custom Claude Code skills that automate
            tasks, add capabilities, or improve workflows.
          </li>
          <li>
            <strong>CLAUDE.md Configs</strong> -- Project configuration files
            tuned for specific stacks, frameworks, or workflows.
          </li>
          <li>
            <strong>MCP Servers</strong> -- Server configurations that connect
            Claude Code to external services and APIs.
          </li>
          <li>
            <strong>Hooks</strong> -- settings.json hook configurations that
            automate actions at lifecycle events.
          </li>
          <li>
            <strong>Guides</strong> -- Workflow tutorials, patterns, and
            how-tos that help others use Claude Code more effectively.
          </li>
          <li>
            <strong>Prompts</strong> -- Reusable prompt patterns and templates
            for common tasks.
          </li>
        </ul>

        <h2>Quality Standards</h2>
        <p>A good submission includes:</p>
        <ul>
          <li>
            <strong>A clear title</strong> that describes what the resource
            does, not how clever it is.
          </li>
          <li>
            <strong>A short description</strong> so people know at a glance if
            it's relevant to them.
          </li>
          <li>
            <strong>Complete content</strong> using the structured template for
            your resource type. Fill in every section that applies. Delete
            sections that don't.
          </li>
          <li>
            <strong>Attached files</strong> when applicable. If your skill is a
            file, upload it. Don't make people copy-paste from a code block.
          </li>
          <li>
            <strong>Relevant tags</strong> so people can find it. Use existing
            tags when possible.
          </li>
        </ul>

        <h2>What Not to Share</h2>
        <ul>
          <li>
            Resources that don't work or are incomplete. Test before you
            publish.
          </li>
          <li>
            Duplicates of existing resources. Search first. If yours is better,
            explain why in the description.
          </li>
          <li>
            Promotional content, affiliate links, or resources that exist
            primarily to drive traffic elsewhere.
          </li>
          <li>
            Content that requires paid services without disclosing that
            upfront.
          </li>
          <li>
            Anything malicious, offensive, or that violates others' privacy.
          </li>
        </ul>

        <h2>Formatting Tips</h2>
        <ul>
          <li>
            Use the pre-filled template. It exists to help you structure your
            submission clearly.
          </li>
          <li>
            Use code blocks with language hints for syntax highlighting.
          </li>
          <li>
            Keep descriptions concise. If it takes a paragraph to explain what
            your resource does, it might need a better name.
          </li>
          <li>
            Include example usage. Show people what it looks like to actually
            use your resource.
          </li>
        </ul>

        <h2>Moderation</h2>
        <p>
          Resources that violate these guidelines may be removed. Repeated
          violations may result in account restrictions. If you see something
          that shouldn't be here, use the report button.
        </p>
        <p>
          The best resources may be highlighted as Staff Picks, which gives
          them extra visibility on the homepage and a reputation bonus for the
          author.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-10">
        <Link href="/resources/new">
          <Button size="lg">Submit a Resource</Button>
        </Link>
        <Link href="/resources">
          <Button variant="secondary" size="lg">
            Browse Resources
          </Button>
        </Link>
      </div>
    </div>
  );
}
