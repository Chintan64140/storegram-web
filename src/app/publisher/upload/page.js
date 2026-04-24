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

  const onDrop = useCallback(acceptedFiles => {
    const nextFile = acceptedFiles[0] || null;
    setSelectedFile(nextFile);
    setError('');
    setSuccess('');
    setUploadResult(null);

    if (nextFile && !title) {
      setTitle(nextFile.name);
    }
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.mkv'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
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
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Upload Content</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div 
          {...getRootProps()} 
          style={{ 
            border: `2px dashed ${isDragActive ? 'var(--accent-primary)' : 'var(--border-color)'}`, 
            borderRadius: '12px', 
            padding: '4rem 2rem', 
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive ? 'var(--accent-light)' : 'transparent',
            transition: 'all 0.2s'
          }}
        >
          <input {...getInputProps()} />
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)' }}>
            <UploadCloud size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Choose one file for the publisher upload API</h3>
          <p style={{ color: 'var(--text-secondary)' }}>The backend expects `multipart/form-data` with the file in a field named `file`.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>Supported by the API: MP4, MKV, PNG, JPG, JPEG. Max size: 100MB.</p>
        </div>
      </div>

      {(error || success) && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)'
          }}
        >
          {error || success}
        </div>
      )}

      {selectedFile && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Selected File</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <File size={24} color="var(--accent-primary)" />
                <div>
                  <p style={{ fontWeight: 500 }}>{selectedFile.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={removeFile} style={{ color: 'var(--danger)', padding: '0.5rem' }}>
                <X size={20} />
              </button>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Title</label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Optional title shown in the file list"
              />
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Duration in Seconds</label>
              <input
                type="number"
                className="input"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                min="0"
                placeholder="Optional for images"
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                The API uses duration to calculate the valid-view threshold for tracking and publisher earnings.
              </p>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload via /publisher/content/upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadResult && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Upload Response</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Public Short Link</p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <code style={{ color: 'var(--accent-primary)' }}>{uploadResult.shortLink}</code>
                <button className="btn btn-secondary" onClick={() => copyText(uploadResult.shortLink)}>Copy</button>
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tracking Endpoints</p>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <code>{uploadResult.tracking?.start}</code>
                <code>{uploadResult.tracking?.heartbeat}</code>
                <code>{uploadResult.tracking?.end}</code>
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Stored File Record</p>
              <p><strong>Title:</strong> {uploadResult.file?.title || 'Untitled'}</p>
              <p><strong>Short ID:</strong> {uploadResult.file?.short_id}</p>
              <p><strong>Duration:</strong> {uploadResult.file?.duration || 0}s</p>
              <p><strong>Views:</strong> {uploadResult.file?.total_views || 0}</p>
              <p><strong>Earnings:</strong> ${Number(uploadResult.file?.total_earnings || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
