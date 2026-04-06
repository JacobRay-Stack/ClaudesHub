"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { uploadResourceFile, deleteResourceFile } from "@/app/actions/files";
import type { ResourceFile } from "@/lib/types";

interface FileUploadProps {
  resourceId: string;
  files: ResourceFile[];
  isAuthor: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ resourceId, files, isAuthor }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadResourceFile(resourceId, formData);
    if (result.error) setError(result.error);

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleDelete(fileId: string) {
    const result = await deleteResourceFile(fileId);
    if (result.error) setError(result.error);
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display text-sm font-bold text-muted uppercase tracking-wider">
        Files
      </h3>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg
                  className="w-5 h-5 text-accent shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">
                    {f.file_name}
                  </p>
                  <p className="text-xs text-muted">
                    {formatFileSize(f.file_size)}
                    {f.download_count > 0 &&
                      ` \u00b7 ${f.download_count} download${f.download_count !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resource-files/${f.storage_path}`}
                  download={f.file_name}
                  className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Download
                </a>
                {isAuthor && (
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="text-xs text-danger hover:text-danger/80 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAuthor && (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-card file:px-3 file:py-1.5 file:text-sm file:text-foreground file:cursor-pointer hover:file:bg-card-hover"
          />
          {uploading && (
            <span className="text-xs text-muted">Uploading...</span>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}

      {files.length === 0 && !isAuthor && (
        <p className="text-sm text-muted">No files attached.</p>
      )}
    </div>
  );
}
