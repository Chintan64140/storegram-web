"use client";

import Link from "next/link";
import Loader from "@/components/Loader";
import PublisherFilePreviewContent from "@/components/PublisherFilePreviewContent";
import api from "@/utils/api";
import { fetchFolderOptions } from "@/utils/publisherFiles";
import { ArrowLeft, Copy, Download, ExternalLink, Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function PublisherFilePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [file, setFile] = useState(null);
  const [folderOptions, setFolderOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const fileId = params?.id;
  const backSearch = useMemo(() => {
    const nextParams = new URLSearchParams();
    const folderId = searchParams.get("folderId");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (folderId) {
      nextParams.set("folderId", folderId);
    }
    if (page) {
      nextParams.set("page", page);
    }
    if (limit) {
      nextParams.set("limit", limit);
    }

    const queryString = nextParams.toString();
    return queryString ? `/publisher/files?${queryString}` : "/publisher/files";
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const [fileResponse, folderData] = await Promise.all([
          api.get(`/publisher/content/${fileId}`),
          fetchFolderOptions(),
        ]);

        if (!active) {
          return;
        }

        setFile(fileResponse.data?.file || fileResponse.data || null);
        setFolderOptions(folderData);
        setError("");
      } catch (err) {
        console.error("Failed to load preview file", err);
        if (active) {
          setError(err.response?.data?.error || "Failed to load file preview.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (fileId) {
      void loadData();
    }

    return () => {
      active = false;
    };
  }, [fileId]);

  const folderLabelMap = new Map(
    folderOptions.map((folder) => [folder.id, folder.label]),
  );
  const folderLabel = file
    ? folderLabelMap.get(file.folder_id) || "Library root"
    : "Library root";

  const copyViewerLink = async () => {
    const url = `${window.location.origin}/download/${file.short_id}`;
    await navigator.clipboard.writeText(url);
    setActionMessage("Viewer link copied to clipboard.");
    setError("");
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this file? This will permanently remove it from your storage and the cloud.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/publisher/content/${file.id}`);
      router.replace(backSearch);
    } catch (err) {
      console.error("Failed to delete file", err);
      setError(err.response?.data?.error || "Failed to delete file.");
      setActionMessage("");
    }
  };

  if (loading) {
    return <Loader text="Loading file preview..." />;
  }

  if (error || !file) {
    return (
      <div className="space-y-6">
        <Link
          href={backSearch}
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to File Manager
        </Link>

        <div className="card p-6 text-danger">{error || "File not found."}</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href={backSearch}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to File Manager
          </Link>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Preview File
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
            Review file details and open the original asset from a dedicated
            preview page.
          </p>
        </div>
      </div>

      {(error || actionMessage) && (
        <div
          className="card"
          style={{
            borderColor: error
              ? "rgba(255, 77, 77, 0.3)"
              : "rgba(0, 204, 102, 0.3)",
            color: error ? "var(--danger)" : "var(--success)",
          }}
        >
          {error || actionMessage}
        </div>
      )}

      <PublisherFilePreviewContent file={file} folderLabel={folderLabel} />
      <div className="card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted">
              Actions
            </div>
            <div className="mt-1 text-sm text-muted">
              Quick actions for this file.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap">
          <button
            type="button"
            onClick={() => void copyViewerLink()}
            className="btn btn-secondary w-full lg:w-auto"
          >
            <Copy size={16} />
            Copy Link
          </button>
          <a
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full lg:w-auto"
          >
            <ExternalLink size={16} />
            Open File
          </a>
          <a
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full lg:w-auto"
          >
            <Download size={16} />
            Download
          </a>
          <button
            type="button"
            onClick={() => void handleDelete()}
            className="btn w-full border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20 lg:w-auto"
          >
            <Trash size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
