'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import Loader from '@/components/Loader';
import { 
  Folder as FolderIcon, 
  FolderPlus, 
  Pencil, 
  Trash, 
  ChevronRight, 
  ArrowLeft,
  X,
  Check
} from 'lucide-react';

export default function FoldersManager() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folderHistory, setFolderHistory] = useState([]); // Array of { id, name }

  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const [actionMessage, setActionMessage] = useState('');

  const fetchFolders = async (parentId = null) => {
    setLoading(true);
    try {
      const response = await api.get('/publisher/folders', {
        params: { parentId: parentId || '' }
      });
      setFolders(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch folders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchFolders(currentFolderId);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [currentFolderId]);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const response = await api.post('/publisher/folders', {
        name: newFolderName,
        parentId: currentFolderId
      });
      setFolders([...folders, response.data]);
      setNewFolderName('');
      setIsCreating(false);
      setActionMessage('Folder created successfully');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create folder');
    }
  };

  const handleUpdateFolder = async (id) => {
    if (!editName.trim()) return;
    try {
      const response = await api.put(`/publisher/folders/${id}`, {
        name: editName,
        parentId: currentFolderId
      });
      setFolders(folders.map(f => f.id === id ? response.data : f));
      setEditingId(null);
      setEditName('');
      setActionMessage('Folder renamed successfully');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to rename folder');
    }
  };

  const handleDeleteFolder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this folder? This action cannot be undone.')) return;
    
    try {
      await api.delete(`/publisher/folders/${id}`);
      setFolders(folders.filter(f => f.id !== id));
      setActionMessage('Folder deleted successfully');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete folder');
    }
  };

  const navigateToFolder = (folder) => {
    setFolderHistory([...folderHistory, { id: folder.id, name: folder.name }]);
    setCurrentFolderId(folder.id);
  };

  const navigateUp = () => {
    if (folderHistory.length === 0) return;
    const newHistory = [...folderHistory];
    newHistory.pop();
    setFolderHistory(newHistory);
    setCurrentFolderId(newHistory.length > 0 ? newHistory[newHistory.length - 1].id : null);
  };

  const navigateToBreadcrumb = (index) => {
    const newHistory = folderHistory.slice(0, index + 1);
    setFolderHistory(newHistory);
    setCurrentFolderId(newHistory[newHistory.length - 1].id);
  };

  const navigateToRoot = () => {
    setFolderHistory([]);
    setCurrentFolderId(null);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Folders</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
            Organize uploaded publisher content, rename folders, and jump straight into uploads.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={currentFolderId ? `/publisher/upload?folderId=${currentFolderId}` : '/publisher/upload'}
            className="btn btn-secondary"
          >
            Upload Here
          </Link>
          <button 
            onClick={() => setIsCreating(true)}
            className="btn btn-primary"
          >
            <FolderPlus size={18} />
            New Folder
          </button>
        </div>
      </div>

      {(error || actionMessage) && (
        <div
          className="card p-4"
          style={{
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)',
            backgroundColor: error ? 'rgba(255, 77, 77, 0.05)' : 'rgba(0, 204, 102, 0.05)'
          }}
        >
          {error || actionMessage}
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap rounded-2xl border border-border bg-surface p-4 text-sm font-medium">
        {folderHistory.length > 0 && (
          <button 
            onClick={navigateUp}
            className="mr-2 rounded-lg p-1 hover:bg-white/5 text-muted transition"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        
        <button 
          onClick={navigateToRoot}
          className={`hover:text-accent transition ${folderHistory.length === 0 ? 'text-foreground font-bold' : 'text-muted'}`}
        >
          Home
        </button>
        
        {folderHistory.map((folder, idx) => (
          <div key={folder.id} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-muted" />
            <button
              onClick={() => navigateToBreadcrumb(idx)}
              className={`hover:text-accent transition ${idx === folderHistory.length - 1 ? 'text-foreground font-bold' : 'text-muted'}`}
            >
              {folder.name}
            </button>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="card p-4 border-accent">
          <form onSubmit={handleCreateFolder} className="flex items-center gap-3">
            <FolderIcon size={24} className="text-accent shrink-0" />
            <input
              type="text"
              autoFocus
              className="input flex-1 bg-transparent"
              placeholder="Folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <button 
                type="submit" 
                className="rounded-lg p-2 text-success hover:bg-success/10 transition"
                disabled={!newFolderName.trim()}
              >
                <Check size={20} />
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsCreating(false);
                  setNewFolderName('');
                }}
                className="rounded-lg p-2 text-muted hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <Loader text="Loading folders..." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {folders.length === 0 && !isCreating ? (
            <div className="col-span-full py-12 text-center text-muted">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <FolderIcon size={32} className="opacity-50" />
              </div>
              <p>No folders found here.</p>
              <button 
                onClick={() => setIsCreating(true)}
                className="mt-4 text-accent hover:underline"
              >
                Create your first folder
              </button>
            </div>
          ) : (
            folders.map((folder) => (
              <div 
                key={folder.id} 
                className="card group flex flex-col justify-between p-4 transition-all hover:border-accent/50 hover:shadow-lg"
              >
                {editingId === folder.id ? (
                   <div className="flex items-center gap-2 w-full">
                     <FolderIcon size={24} className="text-accent shrink-0" />
                     <input
                       type="text"
                       autoFocus
                       className="input flex-1 min-w-0 px-2 py-1 h-auto text-sm"
                       value={editName}
                       onChange={(e) => setEditName(e.target.value)}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter') handleUpdateFolder(folder.id);
                         if (e.key === 'Escape') setEditingId(null);
                       }}
                     />
                     <button 
                       onClick={() => handleUpdateFolder(folder.id)}
                       className="text-success hover:bg-success/10 p-1 rounded transition"
                     >
                       <Check size={16} />
                     </button>
                     <button 
                       onClick={() => setEditingId(null)}
                       className="text-muted hover:bg-white/10 p-1 rounded transition"
                     >
                       <X size={16} />
                     </button>
                   </div>
                ) : (
                  <>
                    <div 
                      className="flex cursor-pointer items-start justify-between gap-3"
                      onClick={() => navigateToFolder(folder)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                          <FolderIcon size={20} className="fill-current opacity-20 group-hover:opacity-100" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold group-hover:text-accent transition-colors">
                            {folder.name}
                          </h3>
                          <p className="text-xs text-muted mt-0.5 truncate">
                            {new Date(folder.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-border/50 pt-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/publisher/files?folderId=${folder.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg px-3 py-2 text-sm text-accent transition hover:bg-accent/10"
                        title="View content"
                      >
                        View Files
                      </Link>
                      <Link
                        href={`/publisher/upload?folderId=${folder.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg px-3 py-2 text-sm text-accent transition hover:bg-accent/10"
                        title="Upload into folder"
                      >
                        Upload
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(folder.id);
                          setEditName(folder.name);
                        }}
                        className="rounded-lg p-2 text-muted hover:bg-white/10 hover:text-foreground transition"
                        title="Rename folder"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                        className="rounded-lg p-2 text-danger hover:bg-danger/10 transition"
                        title="Delete folder"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
