"use client";

import { useState } from "react";

interface CopyConfigButtonProps {
  content: string;
}

export function CopyConfigButton({ content }: CopyConfigButtonProps) {
  const [copied, setCopied] = useState(false);

  // Extract the first JSON block from the markdown content
  const jsonMatch = content.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
  const configJson = jsonMatch?.[1]?.trim();

  if (!configJson) return null;

  async function handleCopy() {
    await navigator.clipboard.writeText(configJson!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-type-mcp/20 bg-type-mcp/5 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-bold text-type-mcp uppercase tracking-wider">
          Config
        </h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-type-mcp hover:text-type-mcp/80 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Config
            </>
          )}
        </button>
      </div>
      <pre className="text-xs font-mono text-foreground bg-background rounded-lg border border-border p-3 overflow-x-auto">
        {configJson}
      </pre>
    </div>
  );
}
