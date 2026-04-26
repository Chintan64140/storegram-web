"use client";

import Link from "next/link";
import Loader from "@/components/Loader";
import PaginationControls from "@/components/PaginationControls";
import { getPreviewType } from "@/components/PublisherFilePreviewContent";
import { fetchFolderOptions, formatSizeInMb } from "@/utils/publisherFiles";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  Eye,
  ExternalLink,
  Folder as FolderIcon,
  FolderOpen,
  Link as LinkIcon,
  Pencil,
  Save,
  Trash,
  XCircle,
} from "lucide-react";

function FileActionButtons({
  file,
  editingId,
  previewHref,
  onSave,
  onCancel,
  onEdit,
  onCopyLink,
  onDelete,
}) {
  const isEditing = editingId === file.id;

  const buttonClassName =
    "inline-flex h-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition";

  return (
    <div className="grid grid-cols-2 sm:flex gap-2 ">
      <Link
        href={previewHref}
        className={`${buttonClassName} border-accent/30 bg-accent/10 text-white hover:bg-accent/20`}
        title="Preview"
      >
        <Eye size={16} />
      </Link>
      <button
        type="button"
        onClick={() => void onCopyLink(file.short_id)}
        className={`${buttonClassName} border-accent/30 bg-accent/10 text-accent hover:bg-accent/20`}
        title="Copy Link"
      >
        <LinkIcon size={16} />
      </button>

      {isEditing ? (
        <>
          <button
            type="button"
            onClick={() => onSave(file.id)}
            className={`${buttonClassName} border-success/30 bg-success/10 text-success hover:bg-success/20`}
            title="Save"
          >
            <Save size={16} />
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
            title="Cancel"
          >
            <XCircle size={16} />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => onEdit(file)}
          className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
          title="Edit"
        >
          <Pencil size={16} />
        </button>
      )}

      {/* <a
        href={file.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
        title="Open File"
      >
        <ExternalLink size={16} />
      </a> */}

      {/* <a
        href={file.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
        title="Download"
      >
        <Download size={16} />
      </a> */}

      {/* <button
        type="button"
        onClick={() => void onDelete(file.id)}
        className={`${buttonClassName} border-danger/30 bg-danger/10 text-danger hover:bg-danger/20`}
        title="Delete"
      >
        <Trash size={16} />
      </button> */}
    </div>
  );
}

export default function FileManager() {
  const searchParams = useSearchParams();
  const initialFolderId =
    String(searchParams.get("folderId") || "").trim() || null;
  const [folders, setFolders] = useState([]);
  const [folderOptions, setFolderOptions] = useState([]);
  const [folderHistory, setFolderHistory] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
  const [files, setFiles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    folderId: "",
  });
  const [actionMessage, setActionMessage] = useState("");

  const folderLabelMap = new Map(
    folderOptions.map((folder) => [folder.id, folder.label]),
  );

  const loadFolderOptions = async () => {
    const options = await fetchFolderOptions();
    setFolderOptions(options);
  };

  const loadCurrentView = async ({
    nextPage = page,
    nextLimit = limit,
    nextFolderId = currentFolderId,
    showLoader = true,
  } = {}) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      setError("");

      const fileParams = { page: nextPage, limit: nextLimit };
      if (nextFolderId) {
        fileParams.folderId = nextFolderId;
      } else {
        fileParams.rootOnly = true;
      }

      const [folderResponse, fileResponse] = await Promise.all([
        api.get("/publisher/folders", {
          params: { parentId: nextFolderId || "" },
        }),
        api.get("/publisher/content", { params: fileParams }),
      ]);

      setFolders(Array.isArray(folderResponse.data) ? folderResponse.data : []);
      setFiles(fileResponse.data.data || []);
      setPagination(fileResponse.data.pagination || null);
    } catch (err) {
      console.error("Failed to load file manager", err);
      setError(err.response?.data?.error || "Failed to fetch files.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let active = true;

    const loadOptions = async () => {
      try {
        const options = await fetchFolderOptions();

        if (!active) {
          return;
        }

        setFolderOptions(options);
      } catch (err) {
        console.error("Failed to load folder options", err);
        if (active) {
          setError((currentError) => currentError || "Failed to load folders.");
        }
      }
    };

    void loadOptions();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const fileParams = { page, limit };
        if (currentFolderId) {
          fileParams.folderId = currentFolderId;
        } else {
          fileParams.rootOnly = true;
        }

        const [folderResponse, fileResponse] = await Promise.all([
          api.get("/publisher/folders", {
            params: { parentId: currentFolderId || "" },
          }),
          api.get("/publisher/content", { params: fileParams }),
        ]);

        if (!active) {
          return;
        }

        setError("");
        setFolders(
          Array.isArray(folderResponse.data) ? folderResponse.data : [],
        );
        setFiles(fileResponse.data.data || []);
        setPagination(fileResponse.data.pagination || null);
      } catch (err) {
        console.error("Failed to fetch files", err);
        if (active) {
          setError(err.response?.data?.error || "Failed to fetch files.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      active = false;
    };
  }, [page, limit, currentFolderId]);

  const refreshCurrentView = async () => {
    await loadCurrentView({ showLoader: false });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this file? This will permanently remove it from your storage and the cloud.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/publisher/content/${id}`);
      setActionMessage("Content deleted successfully.");
      await refreshCurrentView();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete file.");
    }
  };

  const copyLink = async (shortId) => {
    const url = `${window.location.origin}/download/${shortId}`;
    await navigator.clipboard.writeText(url);
    setActionMessage("Viewer link copied to clipboard.");
  };

  const startEditing = (file) => {
    setEditingId(file.id);
    setEditValues({
      title: file.title || "",
      description: file.description || "",
      folderId: file.folder_id || "",
    });
    setActionMessage("");
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({ title: "", description: "", folderId: "" });
  };

  const saveFile = async (id) => {
    try {
      setError("");
      const response = await api.put(`/publisher/content/${id}`, {
        title: editValues.title,
        description: editValues.description,
        folderId: editValues.folderId,
      });

      setActionMessage(
        response.data.message || "Content updated successfully.",
      );
      cancelEditing();
      await refreshCurrentView();
      await loadFolderOptions();
    } catch (err) {
      console.error("Failed to update content", err);
      setError(err.response?.data?.error || "Failed to update content.");
    }
  };

  const navigateToFolder = (folder) => {
    setFolderHistory((current) => [
      ...current,
      { id: folder.id, name: folder.name },
    ]);
    setCurrentFolderId(folder.id);
    setPage(1);
    setActionMessage("");
  };

  const navigateUp = () => {
    if (folderHistory.length === 0) {
      return;
    }

    const newHistory = [...folderHistory];
    newHistory.pop();
    setFolderHistory(newHistory);
    setCurrentFolderId(
      newHistory.length > 0 ? newHistory[newHistory.length - 1].id : null,
    );
    setPage(1);
    setActionMessage("");
  };

  const navigateToBreadcrumb = (index) => {
    const nextHistory = folderHistory.slice(0, index + 1);
    setFolderHistory(nextHistory);
    setCurrentFolderId(nextHistory[nextHistory.length - 1].id);
    setPage(1);
    setActionMessage("");
  };

  const navigateToRoot = () => {
    setFolderHistory([]);
    setCurrentFolderId(null);
    setPage(1);
    setActionMessage("");
  };

  const buildPreviewHref = (fileId) => {
    const nextParams = new URLSearchParams();

    if (currentFolderId) {
      nextParams.set("folderId", currentFolderId);
    }

    nextParams.set("page", String(page));
    nextParams.set("limit", String(limit));

    return `/publisher/files/${fileId}?${nextParams.toString()}`;
  };

  if (loading) {
    return <Loader text="Loading file manager..." />;
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">File Manager</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
            Browse your library folder by folder and move uploaded content
            whenever you need.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
          {currentFolderId
            ? `Current folder: ${folderLabelMap.get(currentFolderId) || "Selected folder"}`
            : "Current folder: Library root"}
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

      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap rounded-2xl border border-border bg-surface p-4 text-sm font-medium">
        {folderHistory.length > 0 && (
          <button
            onClick={navigateUp}
            className="mr-2 rounded-lg p-1 text-muted transition hover:bg-white/5"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <button
          onClick={navigateToRoot}
          className={`transition ${
            folderHistory.length === 0
              ? "font-bold text-foreground"
              : "text-muted hover:text-accent"
          }`}
        >
          Home
        </button>

        {folderHistory.map((folder, index) => (
          <div key={folder.id} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-muted" />
            <button
              onClick={() => navigateToBreadcrumb(index)}
              className={`transition ${
                index === folderHistory.length - 1
                  ? "font-bold text-foreground"
                  : "text-muted hover:text-accent"
              }`}
            >
              {folder.name}
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FolderOpen size={18} className="text-accent" />
          <h2 className="text-lg font-bold">Folders in this location</h2>
        </div>

        {folders.length === 0 ? (
          <div className="card p-6 text-sm text-muted">
            No child folders here yet. You can create one from the folders
            screen and then upload content into it.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {folders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                onClick={() => navigateToFolder(folder)}
                className="card flex items-center justify-between gap-4 p-4 text-left transition hover:border-accent/50 hover:shadow-lg"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <FolderIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{folder.name}</p>
                    <p className="text-xs text-muted">
                      Created {new Date(folder.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="shrink-0 text-muted" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {files.map((file) => {
          const isEditing = editingId === file.id;

          return (
            <div key={file.id} className="card p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted">
                      {getPreviewType(file)}
                    </div>
                    <h2 className="mt-1 break-words text-lg font-bold">
                      {isEditing ? "Editing file" : file.title || "Untitled"}
                    </h2>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {file.short_id || "N/A"}
                  </div>
                </div>

                {isEditing ? (
                  <div className="grid gap-3">
                    <div className="input-group">
                      <label>File Name</label>
                      <input
                        type="text"
                        className="input"
                        value={editValues.title}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Description</label>
                      <input
                        type="text"
                        className="input"
                        value={editValues.description}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Folder</label>
                      <select
                        className="input"
                        value={editValues.folderId}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            folderId: event.target.value,
                          }))
                        }
                      >
                        <option value="">Library root</option>
                        {folderOptions.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted">
                      {file.description ||
                        "No description added for this file."}
                    </p>
                    <p className="text-sm text-muted">
                      Folder:{" "}
                      {folderLabelMap.get(file.folder_id) || "Library root"}
                    </p>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface-strong/70 p-4">
                  <div>
                    <div className="text-xs text-muted">Size</div>
                    <div className="mt-1 text-sm font-semibold">
                      {formatSizeInMb(file.size)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Views</div>
                    <div className="mt-1 text-sm font-semibold">
                      {Number(file.total_views || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Earnings</div>
                    <div className="mt-1 text-sm font-semibold text-success">
                      ${Number(file.total_earnings || 0).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Uploaded</div>
                    <div className="mt-1 text-sm font-semibold">
                      {new Date(file.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <FileActionButtons
                  file={file}
                  editingId={editingId}
                  previewHref={buildPreviewHref(file.id)}
                  onSave={saveFile}
                  onCancel={cancelEditing}
                  onEdit={startEditing}
                  onCopyLink={copyLink}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          );
        })}

        {files.length === 0 && (
          <div className="card p-8 text-center text-sm text-muted">
            No files found in this folder.
          </div>
        )}

        <div className="card !py-0 !px-4">
          <PaginationControls
            pagination={pagination}
            onPageChange={setPage}
            onLimitChange={(nextLimit) => {
              setLimit(nextLimit);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="card table-container">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Description</th>
                <th>Folder</th>
                <th>Type</th>
                <th>Short ID</th>
                <th>Size (MB)</th>
                <th>Views</th>
                <th>Earnings ($)</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="min-w-[220px] font-medium text-foreground">
                    {editingId === file.id ? (
                      <input
                        type="text"
                        className="input"
                        value={editValues.title}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                      />
                    ) : (
                      file.title || "Untitled"
                    )}
                  </td>
                  <td className="min-w-[220px] text-muted">
                    {editingId === file.id ? (
                      <input
                        type="text"
                        className="input"
                        value={editValues.description}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                      />
                    ) : (
                      file.description || "No description"
                    )}
                  </td>
                  <td className="min-w-[220px] text-muted">
                    {editingId === file.id ? (
                      <select
                        className="input"
                        value={editValues.folderId}
                        onChange={(event) =>
                          setEditValues((current) => ({
                            ...current,
                            folderId: event.target.value,
                          }))
                        }
                      >
                        <option value="">Library root</option>
                        {folderOptions.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      folderLabelMap.get(file.folder_id) || "Library root"
                    )}
                  </td>
                  <td className="text-muted capitalize">
                    {getPreviewType(file)}
                  </td>
                  <td className="text-accent">{file.short_id}</td>
                  <td className="text-muted">
                    {formatSizeInMb(file.size).replace(" MB", "")}
                  </td>
                  <td className="text-muted">
                    {Number(file.total_views || 0).toLocaleString()}
                  </td>
                  <td className="font-bold text-success">
                    {Number(file.total_earnings || 0).toFixed(2)}
                  </td>
                  <td className="text-muted">
                    {new Date(file.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <FileActionButtons
                      file={file}
                      editingId={editingId}
                      previewHref={buildPreviewHref(file.id)}
                      onSave={saveFile}
                      onCancel={cancelEditing}
                      onEdit={startEditing}
                      onCopyLink={copyLink}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center">
                    No files found in this folder.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PaginationControls
            pagination={pagination}
            onPageChange={setPage}
            onLimitChange={(nextLimit) => {
              setLimit(nextLimit);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
