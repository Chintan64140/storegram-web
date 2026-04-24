'use client';

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

const formatSizeInMb = (sizeInBytes) => `${(Number(sizeInBytes || 0) / (1024 * 1024)).toFixed(2)} MB`;

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

  const mediaContainerStyle = {
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
    minHeight: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        className="card"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(1080px, 100%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, rgba(16,16,16,0.98) 0%, rgba(8,8,8,0.98) 100%)',
          borderColor: 'rgba(255,255,255,0.09)',
          boxShadow: '0 30px 120px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
              <PlaySquare size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                File Preview
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>{file.title || 'Untitled File'}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {file.description || 'No description added for this file yet.'}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close preview"
            style={{
              padding: '0.65rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-secondary)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={mediaContainerStyle}>
          {previewType === 'video' && (
            <video
              src={file.file_url}
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', maxHeight: '68vh', backgroundColor: '#000' }}
            />
          )}

          {previewType === 'image' && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.file_url}
                alt={file.title || 'Uploaded file preview'}
                style={{ maxWidth: '100%', maxHeight: '68vh', objectFit: 'contain', display: 'block' }}
              />
            </>
          )}

          {previewType === 'document' && (
            <iframe
              src={file.file_url}
              title={file.title || 'Document preview'}
              style={{ width: '100%', height: '68vh', border: 0, backgroundColor: '#111' }}
            />
          )}

          {previewType === 'file' && (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>Preview not available inline</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 1rem' }}>
                This file type does not have an embedded preview yet, but you can still open it in a new tab or download it directly.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink size={16} />
                  Open File
                </a>
                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginTop: '1.25rem' }}>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>Short ID</div>
            <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{file.short_id || 'N/A'}</div>
          </div>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>Size</div>
            <div style={{ fontWeight: 700 }}>{formatSizeInMb(file.size)}</div>
          </div>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>Views</div>
            <div style={{ fontWeight: 700 }}>{Number(file.total_views || 0).toLocaleString()}</div>
          </div>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>Earnings</div>
            <div style={{ fontWeight: 700, color: 'var(--success)' }}>${Number(file.total_earnings || 0).toFixed(2)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <ExternalLink size={16} />
            Open in New Tab
          </a>
          <button onClick={onClose} className="btn btn-primary">
            Close Preview
          </button>
        </div>
      </div>
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
    if (!window.confirm('Are you sure you want to delete this file? This will permanently remove it from your storage and the cloud.')) {
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

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="animate-fade-in">
      {previewFile && <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.35rem' }}>File Manager</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Preview videos, images, and supported documents directly from your uploaded file list.
          </p>
        </div>
      </div>

      {(error || actionMessage) && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)',
          }}
        >
          {error || actionMessage}
        </div>
      )}

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
                <td style={{ fontWeight: 500, color: 'var(--text-primary)', minWidth: '220px' }}>
                  {editingId === file.id ? (
                    <input
                      type="text"
                      className="input"
                      value={editValues.title}
                      onChange={(event) => setEditValues((current) => ({ ...current, title: event.target.value }))}
                    />
                  ) : (
                    file.title || 'Untitled'
                  )}
                </td>
                <td style={{ color: 'var(--text-secondary)', minWidth: '220px' }}>
                  {editingId === file.id ? (
                    <input
                      type="text"
                      className="input"
                      value={editValues.description}
                      onChange={(event) => setEditValues((current) => ({ ...current, description: event.target.value }))}
                    />
                  ) : (
                    file.description || 'No description'
                  )}
                </td>
                <td style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  {getPreviewType(file)}
                </td>
                <td style={{ color: 'var(--accent-primary)' }}>{file.short_id}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{formatSizeInMb(file.size).replace(' MB', '')}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{Number(file.total_views || 0).toLocaleString()}</td>
                <td style={{ color: 'var(--success)', fontWeight: 'bold' }}>{Number(file.total_earnings || 0).toFixed(2)}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{new Date(file.created_at).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setPreviewFile(file)}
                      style={{ padding: '0.5rem', color: '#fff', backgroundColor: 'rgba(0, 160, 254, 0.16)', borderRadius: '4px', border: '1px solid rgba(0, 160, 254, 0.35)' }}
                      title="Preview"
                    >
                      <Eye size={16} />
                    </button>

                    {editingId === file.id ? (
                      <>
                        <button onClick={() => saveFile(file.id)} style={{ padding: '0.5rem', color: 'var(--success)', backgroundColor: 'rgba(0, 204, 102, 0.1)', borderRadius: '4px' }} title="Save">
                          <Save size={16} />
                        </button>
                        <button onClick={cancelEditing} style={{ padding: '0.5rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }} title="Cancel">
                          <XCircle size={16} />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => startEditing(file)} style={{ padding: '0.5rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }} title="Edit">
                        <Pencil size={16} />
                      </button>
                    )}

                    <button onClick={() => void copyLink(file.short_id)} style={{ padding: '0.5rem', color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)', borderRadius: '4px' }} title="Copy Link">
                      <LinkIcon size={16} />
                    </button>

                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.5rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }} title="Open File">
                      <ExternalLink size={16} />
                    </a>

                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.5rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }} title="Download">
                      <Download size={16} />
                    </a>

                    <button onClick={() => void handleDelete(file.id)} style={{ padding: '0.5rem', color: 'var(--danger)', backgroundColor: 'rgba(255, 77, 77, 0.1)', borderRadius: '4px' }} title="Delete">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>No files found.</td>
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
  );
}
