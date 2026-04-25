'use client';
import { UploadCloud, File, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '@/utils/api';

export default function UploadFiles() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const nextFile = acceptedFiles[0] || null;
      setSelectedFile(nextFile);
      setError('');
      setSuccess('');
      setUploadResult(null);

      if (nextFile && !title) {
        setTitle(nextFile.name);
      }
    },
    [title]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.mkv'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  const removeFile = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Choose one file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      if (title.trim()) {
        formData.append('title', title.trim());
      }

      if (duration.trim()) {
        formData.append('duration', duration.trim());
      }

      const response = await api.post('/publisher/content/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResult(response.data);
      setSuccess(response.data.message || 'File uploaded successfully.');
      setSelectedFile(null);
      setDuration('');
    } catch (err) {
      console.error('Upload failed', err);
      setError(err.response?.data?.error || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setSuccess('Copied to clipboard.');
    } catch {
      setError('Unable to copy to clipboard.');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">Upload Content</h1>

      <div className="card mb-8">
        <div
          {...getRootProps()}
          className="rounded-2xl border-2 border-dashed px-5 py-12 text-center transition sm:px-8"
          style={{
            borderColor: isDragActive ? 'var(--accent-primary)' : 'var(--border-color)',
            backgroundColor: isDragActive ? 'var(--accent-light)' : 'transparent',
          }}
        >
          <input {...getInputProps()} />
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong text-accent">
            <UploadCloud size={32} />
          </div>
          <h3 className="mb-2 text-xl font-bold sm:text-2xl">
            Choose one file to upload
          </h3>
          <p className="text-sm text-muted sm:text-base">
            Add one supported file and we&apos;ll prepare it for your publisher library.
          </p>
          <p className="mt-4 text-xs text-muted sm:text-sm">
            Supported formats: MP4, MKV, PNG, JPG, JPEG. Max size: 100MB.
          </p>
        </div>
      </div>

      {(error || success) && (
        <div
          className="card mb-6"
          style={{
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)',
          }}
        >
          {error || success}
        </div>
      )}

      {selectedFile && (
        <div className="card">
          <h3 className="mb-6 text-xl font-bold">Selected File</h3>
          <div className="grid gap-4">
            <div className="flex flex-col gap-4 rounded-2xl bg-surface-strong p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <File size={24} color="var(--accent-primary)" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button onClick={removeFile} className="self-end p-2 text-danger sm:self-auto">
                <X size={20} />
              </button>
            </div>

            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Optional title shown in the file list"
              />
            </div>

            <div className="input-group">
              <label>Duration in Seconds</label>
              <input
                type="number"
                className="input"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                min="0"
                placeholder="Optional for images"
              />
              <p className="text-sm text-muted">
                Duration helps calculate view validation and publisher earnings more accurately.
              </p>
            </div>

            <div className="mt-2 flex justify-stretch sm:justify-end">
              <button className="btn btn-primary w-full sm:w-auto" onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadResult && (
        <div className="card mt-6">
          <h3 className="mb-4 text-xl font-bold">Upload Response</h3>
          <div className="grid gap-4">
            <div className="rounded-2xl bg-surface-strong p-4">
              <p className="mb-2 text-sm text-muted">Public Short Link</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <code className="break-all text-accent">{uploadResult.shortLink}</code>
                <button className="btn btn-secondary w-full sm:w-auto" onClick={() => copyText(uploadResult.shortLink)}>
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-strong p-4">
              <p className="mb-2 text-sm text-muted">Tracking Status</p>
              <div className="grid gap-2 text-sm sm:text-base">
                <p><strong>View tracking:</strong> Ready</p>
                <p><strong>Playback updates:</strong> Enabled</p>
                <p><strong>Earnings sync:</strong> Active</p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-strong p-4">
              <p className="mb-2 text-sm text-muted">Stored File Record</p>
              <div className="grid gap-2 text-sm sm:text-base">
                <p><strong>Title:</strong> {uploadResult.file?.title || 'Untitled'}</p>
                <p><strong>Short ID:</strong> {uploadResult.file?.short_id}</p>
                <p><strong>Duration:</strong> {uploadResult.file?.duration || 0}s</p>
                <p><strong>Views:</strong> {uploadResult.file?.total_views || 0}</p>
                <p><strong>Earnings:</strong> ${Number(uploadResult.file?.total_earnings || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
