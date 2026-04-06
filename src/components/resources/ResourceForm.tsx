"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createResource, updateResource } from "@/app/actions/resources";
import { RESOURCE_TYPES } from "@/lib/constants";
import { RESOURCE_TEMPLATES } from "@/lib/resource-templates";
import type { Category, Resource, ResourceType } from "@/lib/types";

interface ResourceFormProps {
  categories: Category[];
  resource?: Resource;
}

export function ResourceForm({ categories, resource }: ResourceFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resourceType, setResourceType] = useState<ResourceType>(
    resource?.resource_type || "skill"
  );
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = !!resource;

  // Track whether the user has typed custom content
  const isTemplateContent = (content: string) => {
    return Object.values(RESOURCE_TEMPLATES).some(
      (t) => t.trim() === content.trim()
    );
  };

  function handleTypeChange(newType: ResourceType) {
    setResourceType(newType);
    if (!isEditing && contentRef.current) {
      const current = contentRef.current.value;
      // Only replace content if it's empty or still a template
      if (!current.trim() || isTemplateContent(current)) {
        contentRef.current.value = RESOURCE_TEMPLATES[newType];
      }
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    if (isEditing) formData.set("id", resource!.id);
    const action = isEditing ? updateResource : createResource;
    const result = await action(formData);
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
        placeholder="e.g., Git Commit Message Generator"
        defaultValue={resource?.title}
        required
      />

      <Input
        id="description"
        name="description"
        label="Short Description"
        placeholder="A brief summary of what this does"
        defaultValue={resource?.description || ""}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="resource_type" className="block text-sm text-muted">
            Type
          </label>
          <select
            id="resource_type"
            name="resource_type"
            value={resourceType}
            onChange={(e) =>
              handleTypeChange(e.target.value as ResourceType)
            }
            className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="category_id" className="block text-sm text-muted">
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={resource?.category_id || ""}
            required
            className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Textarea
        id="content"
        name="content"
        label="Content (Markdown supported)"
        placeholder="Paste the skill code, SOP steps, or reference content here..."
        defaultValue={
          resource?.content ||
          RESOURCE_TEMPLATES[resourceType]
        }
        ref={contentRef}
        className="min-h-[300px] font-mono text-sm"
        required
      />

      <Input
        id="tags"
        name="tags"
        label="Tags (comma-separated)"
        placeholder="e.g., git, automation, productivity"
        defaultValue={resource?.tags.join(", ") || ""}
      />

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? isEditing
              ? "Saving..."
              : "Publishing..."
            : isEditing
              ? "Save Changes"
              : "Publish Resource"}
        </Button>
      </div>
    </form>
  );
}
