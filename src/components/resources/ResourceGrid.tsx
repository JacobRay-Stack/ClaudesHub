import { ResourceCard } from "./ResourceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Resource } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <EmptyState
        title="No resources found"
        description="Be the first to share a skill, config, or guide with the community."
        action={
          <Link href="/resources/new">
            <Button>Submit a Resource</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
