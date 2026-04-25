'use client';
import Loader from '@/components/Loader';


import { useEffect, useState } from 'react';
import {
  Download,
  Eye,
  ExternalLink,
  Link as LinkIcon,
  Pencil,
  PlaySquare,
  Save,
  Trash,
  X,
  XCircle,
} from 'lucide-react';
import api from '@/utils/api';
import PaginationControls from '@/components/PaginationControls';

const VIDEO_EXTENSIONS = new Set(['mp4', 'mkv', 'webm', 'mov', 'm4v']);
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']);
const DOCUMENT_EXTENSIONS = new Set(['pdf', 'txt']);

const getFileExtension = (file) => {
  const source = file?.file_url || file?.title || '';
  const cleanSource = source.split('?')[0].split('#')[0];
  const extension = cleanSource.includes('.') ? cleanSource.split('.').pop() : '';
  return String(extension || '').toLowerCase();
};

const getPreviewType = (file) => {
  const extension = getFileExtension(file);

  if (VIDEO_EXTENSIONS.has(extension)) {
    return 'video';
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    return 'image';
  }

  if (DOCUMENT_EXTENSIONS.has(extension)) {
    return 'document';
  }

  return 'file';
};

const formatSizeInMb = (sizeInBytes) =>
  `${(Number(sizeInBytes || 0) / (1024 * 1024)).toFixed(2)} MB`;

function PreviewModal({ file, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!file) {
    return null;
  }

  const previewType = getPreviewType(file);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        className="card max-h-[90vh] w-full max-w-5xl overflow-y-auto border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.98)_100%)] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 text-accent">
              <PlaySquare size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.12em]">File Preview</span>
            </div>
            <h2 className="break-words text-xl font-extrabold sm:text-2xl">
              {file.title || 'Untitled File'}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {file.description || 'No description added for this file yet.'}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close preview"
            className="self-end rounded-full border border-white/10 bg-white/5 p-2 text-muted transition hover:border-accent hover:text-foreground sm:self-start"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] sm:min-h-[340px]">
          {previewType === 'video' && (
            <video
              src={file.file_url}
              controls
              playsInline
              preload="metadata"
              className="max-h-[62vh] w-full bg-black sm:max-h-[68vh]"
            />
          )}

          {previewType === 'image' && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.file_url}
                alt={file.title || 'Uploaded file preview'}
                className="block max-h-[62vh] max-w-full object-contain sm:max-h-[68vh]"
              />
            </>
          )}

          {previewType === 'document' && (
            <iframe
              src={file.file_url}
              title={file.title || 'Document preview'}
              className="h-[62vh] w-full border-0 bg-[#111] sm:h-[68vh]"
            />
          )}

          {previewType === 'file' && (
            <div className="p-6 text-center sm:p-8">
              <h3 className="mb-3 text-lg font-bold">Preview not available inline</h3>
              <p className="mx-auto mb-5 max-w-md text-sm text-muted sm:text-base">
                This file type does not have an embedded preview yet, but you can still open it in
                a new tab or download it directly.
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

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
            <div className="mb-1 text-xs text-muted">Short ID</div>
            <div className="break-all font-bold text-accent">{file.short_id || 'N/A'}</div>
          </div>
          <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
            <div className="mb-1 text-xs text-muted">Size</div>
            <div className="font-bold">{formatSizeInMb(file.size)}</div>
          </div>
          <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
            <div className="mb-1 text-xs text-muted">Views</div>
            <div className="font-bold">{Number(file.total_views || 0).toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
            <div className="mb-1 text-xs text-muted">Earnings</div>
            <div className="font-bold text-success">
              ${Number(file.total_earnings || 0).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <a
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full sm:w-auto"
          >
            <ExternalLink size={16} />
            Open in New Tab
          </a>
          <button onClick={onClose} className="btn btn-primary w-full sm:w-auto">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

function FileActionButtons({
  file,
  editingId,
  onPreview,
  onSave,
  onCancel,
  onEdit,
  onCopyLink,
  onDelete,
}) {
  const isEditing = editingId === file.id;

  const buttonClassName =
    'inline-flex h-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition';

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      <button
        type="button"
        onClick={() => onPreview(file)}
        className={`${buttonClassName} border-accent/30 bg-accent/10 text-white hover:bg-accent/20`}
        title="Preview"
      >
        <Eye size={16} />
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

      <button
        type="button"
        onClick={() => void onCopyLink(file.short_id)}
        className={`${buttonClassName} border-accent/30 bg-accent/10 text-accent hover:bg-accent/20`}
        title="Copy Link"
      >
        <LinkIcon size={16} />
      </button>

      <a
        href={file.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
        title="Open File"
      >
        <ExternalLink size={16} />
      </a>

      <a
        href={file.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClassName} border-border bg-surface-strong text-muted hover:text-foreground`}
        title="Download"
      >
        <Download size={16} />
      </a>

      <button
        type="button"
        onClick={() => void onDelete(file.id)}
        className={`${buttonClassName} border-danger/30 bg-danger/10 text-danger hover:bg-danger/20`}
        title="Delete"
      >
        <Trash size={16} />
      </button>
    </div>
  );
}

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '' });
  const [actionMessage, setActionMessage] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    let active = true;

    const loadFiles = async () => {
      try {
        setError('');
        const response = await api.get('/publisher/content', { params: { page, limit } });

        if (!active) {
          return;
        }

        setFiles(response.data.data || []);
        setPagination(response.data.pagination || null);
      } catch (err) {
        console.error('Failed to fetch files', err);
        if (active) {
          setError(err.response?.data?.error || 'Failed to fetch files.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      void loadFiles();
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [page, limit]);

  const refreshFiles = async () => {
    try {
      setError('');
      const response = await api.get('/publisher/content', { params: { page, limit } });
      setFiles(response.data.data || []);
      setPagination(response.data.pagination || null);
    } catch (err) {
      console.error('Failed to refresh files', err);
      setError(err.response?.data?.error || 'Failed to refresh files.');
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this file? This will permanently remove it from your storage and the cloud.'
      )
    ) {
      return;
    }

    try {
      await api.delete(`/publisher/content/${id}`);
      setActionMessage('Content deleted successfully.');
      setPreviewFile((current) => (current?.id === id ? null : current));
      await refreshFiles();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete file.');
    }
  };

  const copyLink = async (shortId) => {
    const url = `${window.location.origin}/download/${shortId}`;
    await navigator.clipboard.writeText(url);
    setActionMessage('Viewer link copied to clipboard.');
  };

  const startEditing = (file) => {
    setEditingId(file.id);
    setEditValues({
      title: file.title || '',
      description: file.description || '',
    });
    setActionMessage('');
    setError('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({ title: '', description: '' });
  };

  const saveFile = async (id) => {
    try {
      setError('');
      const response = await api.put(`/publisher/content/${id}`, {
        title: editValues.title,
        description: editValues.description,
      });

      const updatedFile = response.data.file;

      setFiles((currentFiles) =>
        currentFiles.map((file) => (file.id === id ? updatedFile : file))
      );
      setPreviewFile((current) => (current?.id === id ? updatedFile : current));
      setActionMessage(response.data.message || 'Content updated successfully.');
      cancelEditing();
    } catch (err) {
      console.error('Failed to update content', err);
      setError(err.response?.data?.error || 'Failed to update content.');
    }
  };

  if (loading) return <Loader text="Loading files..." />;

  return (
    <div className="animate-fade-in space-y-6">
      {previewFile && <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">File Manager</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
            Preview videos, images, and supported documents directly from your uploaded file list.
          </p>
        </div>
      </div>

      {(error || actionMessage) && (
        <div
          className="card"
          style={{
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)',
          }}
        >
          {error || actionMessage}
        </div>
      )}

      <div className="grid gap-4 md:hidden">
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
                      {isEditing ? 'Editing file' : file.title || 'Untitled'}
                    </h2>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {file.short_id || 'N/A'}
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
                          setEditValues((current) => ({ ...current, title: event.target.value }))
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
                  </div>
                ) : (
                  <p className="text-sm text-muted">
                    {file.description || 'No description added for this file.'}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface-strong/70 p-4">
                  <div>
                    <div className="text-xs text-muted">Size</div>
                    <div className="mt-1 text-sm font-semibold">{formatSizeInMb(file.size)}</div>
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
                  onPreview={setPreviewFile}
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
          <div className="card p-8 text-center text-sm text-muted">No files found.</div>
        )}

        <div className="card p-4">
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
                          setEditValues((current) => ({ ...current, title: event.target.value }))
                        }
                      />
                    ) : (
                      file.title || 'Untitled'
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
                      file.description || 'No description'
                    )}
                  </td>
                  <td className="text-muted capitalize">{getPreviewType(file)}</td>
                  <td className="text-accent">{file.short_id}</td>
                  <td className="text-muted">{formatSizeInMb(file.size).replace(' MB', '')}</td>
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
                      onPreview={setPreviewFile}
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
                  <td colSpan="9" className="text-center">
                    No files found.
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
