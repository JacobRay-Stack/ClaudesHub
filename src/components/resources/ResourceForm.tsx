"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createResource, updateResource } from "@/app/actions/resources";
import { RESOURCE_TYPES, TYPE_ICONS } from "@/lib/constants";
import { RESOURCE_TEMPLATES } from "@/lib/resource-templates";
import type { Category, Resource, ResourceType } from "@/lib/types";

interface ResourceFormProps {
  categories: Category[];
  resource?: Resource;
}

export function ResourceForm({ categories, resource }: ResourceFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resourceType, setResourceType] = useState<ResourceType | null>(
    resource?.resource_type || null
  );
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = !!resource;

  const isTemplateContent = (content: string) => {
    return Object.values(RESOURCE_TEMPLATES).some(
      (t) => t.trim() === content.trim()
    );
  };

  function handleTypeSelect(newType: ResourceType) {
    setResourceType(newType);
    if (!isEditing && contentRef.current) {
      const current = contentRef.current.value;
      if (!current.trim() || isTemplateContent(current)) {
        contentRef.current.value = RESOURCE_TEMPLATES[newType];
      }
    }
  }

  async function handleSubmit(formData: FormData) {
    if (!resourceType) {
      setError("Please select a resource type");
      return;
    }
    setLoading(true);
    setError(null);
    formData.set("resource_type", resourceType);
    if (isEditing) formData.set("id", resource!.id);
    const action = isEditing ? updateResource : createResource;
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  // Step 1: Type selection (only for new resources)
  if (!resourceType && !isEditing) {
    return (
      <div>
        <h2 className="font-display text-xl font-bold mb-2">
          What are you sharing?
        </h2>
        <p className="text-sm text-muted mb-6">
          Pick the type that best describes your resource.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {RESOURCE_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => handleTypeSelect(t.value)}
              className="card-interactive flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center hover:bg-card-hover cursor-pointer transition-colors"
            >
              <svg
                className="w-7 h-7 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={TYPE_ICONS[t.value]} />
              </svg>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t.label}
                </p>
                <p className="text-xs text-muted mt-1">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Form
  const selectedType = RESOURCE_TYPES.find((t) => t.value === resourceType);

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Type indicator (changeable) */}
      {!isEditing && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={TYPE_ICONS[resourceType!]} />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedType?.label}
              </p>
              <p className="text-xs text-muted">{selectedType?.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setResourceType(null)}
            className="text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            Change
          </button>
        </div>
      )}

      {/* Hidden field for edit mode */}
      {isEditing && (
        <input type="hidden" name="resource_type" value={resourceType!} />
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

      <Textarea
        id="content"
        name="content"
        label="Content (Markdown supported)"
        placeholder="Paste the skill code, SOP steps, or reference content here..."
        defaultValue={
          resource?.content || RESOURCE_TEMPLATES[resourceType!]
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
