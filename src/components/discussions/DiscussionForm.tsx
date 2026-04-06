"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createDiscussion } from "@/app/actions/discussions";
import type { Category } from "@/lib/types";

interface DiscussionFormProps {
  categories: Category[];
}

export function DiscussionForm({ categories }: DiscussionFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createDiscussion(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <Input
        id="title"
        name="title"
        label="Title"
        placeholder="What do you want to discuss?"
        required
      />

      <div className="space-y-1">
        <label htmlFor="category_id" className="block text-sm text-muted">
          Category (optional)
        </label>
        <select
          id="category_id"
          name="category_id"
          className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <option value="">General</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Textarea
        id="body"
        name="body"
        label="Body (Markdown supported)"
        placeholder="Share your thoughts, questions, or ideas..."
        className="min-h-[200px]"
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Start Discussion"}
      </Button>
    </form>
  );
}
