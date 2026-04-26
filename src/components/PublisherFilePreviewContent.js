"use client";

import { Download, ExternalLink, PlaySquare } from "lucide-react";
import { formatSizeInMb } from "@/utils/publisherFiles";

const VIDEO_EXTENSIONS = new Set(["mp4", "mkv", "webm", "mov", "m4v"]);
const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);
const DOCUMENT_EXTENSIONS = new Set(["pdf", "txt"]);

export const getFileExtension = (file) => {
  const source = file?.file_url || file?.title || "";
  const cleanSource = source.split("?")[0].split("#")[0];
  const extension = cleanSource.includes(".")
    ? cleanSource.split(".").pop()
    : "";
  return String(extension || "").toLowerCase();
};

export const getPreviewType = (file) => {
  const extension = getFileExtension(file);

  if (VIDEO_EXTENSIONS.has(extension)) {
    return "video";
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }

  if (DOCUMENT_EXTENSIONS.has(extension)) {
    return "document";
  }

  return "file";
};

export default function PublisherFilePreviewContent({
  file,
  folderLabel = "Library root",
  badgeLabel = "File Preview",
}) {
  if (!file) {
    return null;
  }

  const previewType = getPreviewType(file);

  return (
    <div className="space-y-6">
      <div className="card border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.98)_100%)] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 text-accent">
              <PlaySquare size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.12em]">
                {badgeLabel}
              </span>
            </div>
            <h1 className="break-words text-2xl font-extrabold sm:text-3xl">
              {file.title || "Untitled File"}
            </h1>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {file.description || "No description added for this file yet."}
            </p>
          </div>

          <div className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            {file.short_id || "N/A"}
          </div>
        </div>

        <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] sm:min-h-[420px]">
          {previewType === "video" && (
            <video
              src={file.file_url}
              controls
              playsInline
              preload="metadata"
              className="max-h-[70vh] w-full bg-black"
            />
          )}

          {previewType === "image" && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.file_url}
                alt={file.title || "Uploaded file preview"}
                className="block max-h-[70vh] max-w-full object-contain"
              />
            </>
          )}

          {previewType === "document" && (
            <iframe
              src={file.file_url}
              title={file.title || "Document preview"}
              className="h-[70vh] w-full border-0 bg-[#111]"
            />
          )}

          {previewType === "file" && (
            <div className="p-6 text-center sm:p-8">
              <h2 className="mb-3 text-lg font-bold">
                Preview not available inline
              </h2>
              <p className="mx-auto mb-5 max-w-md text-sm text-muted sm:text-base">
                This file type does not have an embedded preview yet, but you
                can still open it in a new tab or download it directly.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <ExternalLink size={16} />
                  Open File
                </a>
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Preview Type</div>
          <div className="font-bold capitalize">{previewType}</div>
        </div>
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Folder</div>
          <div className="font-bold">{folderLabel}</div>
        </div>
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Size</div>
          <div className="font-bold">{formatSizeInMb(file.size)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Uploaded</div>
          <div className="font-bold">
            {new Date(file.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Views</div>
          <div className="font-bold">
            {Number(file.total_views || 0).toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
          <div className="mb-1 text-xs text-muted">Earnings</div>
          <div className="font-bold text-success">
            ${Number(file.total_earnings || 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={file.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full sm:w-auto"
        >
          <Download size={16} />
          Download
        </a>
      </div> */}
    </div>
  );
}
