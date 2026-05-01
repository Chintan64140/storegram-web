import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PublicDownloadActions from '@/components/PublicDownloadActions';
import {
  Download,
  PlaySquare,
} from 'lucide-react';

const DEFAULT_API_URL = 'https://storegram-backend-39ki.onrender.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
const DEFAULT_APP_DEEP_LINK_BASE = 'storegram://download';
const APP_DEEP_LINK_BASE =
  process.env.NEXT_PUBLIC_APP_DEEP_LINK_BASE?.trim() || DEFAULT_APP_DEEP_LINK_BASE;
const APP_VIEW_FALLBACK_URL =
  process.env.NEXT_PUBLIC_APP_VIEW_URL?.trim() ||
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ||
  '/#app';

const VIDEO_EXTENSIONS = new Set(['mp4', 'mkv', 'webm', 'mov', 'm4v']);
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']);
const DOCUMENT_EXTENSIONS = new Set(['pdf', 'txt']);

function getFileExtension(file) {
  const source = file?.file_url || file?.title || '';
  const cleanSource = source.split('?')[0].split('#')[0];
  const extension = cleanSource.includes('.') ? cleanSource.split('.').pop() : '';
  return String(extension || '').toLowerCase();
}

function getPreviewType(file) {
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
}

function formatSize(size) {
  const bytes = Number(size || 0);

  if (!bytes) {
    return 'Unknown';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

function formatDuration(seconds) {
  const totalSeconds = Number(seconds || 0);

  if (!totalSeconds) {
    return 'N/A';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }

  return `${secs}s`;
}

function formatUploadedDate(value) {
  if (!value) {
    return 'Unknown';
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return null;
  }

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function getFileHostLabel(fileUrl) {
  if (!fileUrl) {
    return 'Unknown';
  }

  try {
    return new URL(fileUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown';
  }
}

async function getFile(shortId) {
  const baseUrls = [...new Set([API_URL, DEFAULT_API_URL].map((value) => value?.trim()).filter(Boolean))];
  let lastError = null;

  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/files/${shortId}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        lastError = new Error(`Fetch failed with status ${response.status} for ${baseUrl}`);
        continue;
      }

      const data = await response.json();
      return data || null;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    console.error('Failed to load public file preview', lastError);
  }

  return null;
}

function buildAppDeepLink(file, shortId) {
  const directAppUrl = file?.app_view_url || file?.deep_link_url || file?.app_url;

  if (directAppUrl) {
    return directAppUrl;
  }

  return APP_DEEP_LINK_BASE.includes('{shortId}')
    ? APP_DEEP_LINK_BASE.replace('{shortId}', shortId)
    : `${APP_DEEP_LINK_BASE.replace(/\/$/, '')}/${shortId}`;
}

function buildPreviewDetails(file, shortId, previewType) {
  const details = [
    {
      label: 'Preview Type',
      value: previewType,
      valueClassName: 'capitalize',
    },
    {
      label: 'File Size',
      value: formatSize(file.size),
    },
    {
      label: 'Shared On',
      value: formatUploadedDate(file.created_at),
    },
    {
      label: 'Short Link',
      value: file.short_id || shortId,
    },
    {
      label: 'Hosted On',
      value: getFileHostLabel(file.file_url),
    },
  ];

  if (Number(file.duration) > 0) {
    details.splice(2, 0, {
      label: 'Duration',
      value: formatDuration(file.duration),
    });
  }

  if (file.total_views != null) {
    details.push({
      label: 'Views',
      value: Number(file.total_views || 0).toLocaleString(),
    });
  }

  const earnings = formatCurrency(file.total_earnings);
  if (earnings) {
    details.push({
      label: 'Earnings',
      value: earnings,
      valueClassName: 'text-success',
    });
  }

  return details;
}

function PreviewContent({ file }) {
  const previewType = getPreviewType(file);

  if (previewType === 'video') {
    return (
      <video
        src={file.file_url}
        controls
        playsInline
        preload="metadata"
        className="max-h-[70vh] w-full bg-black"
      />
    );
  }

  if (previewType === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={file.file_url}
        alt={file.title || 'File preview'}
        className="block max-h-[70vh] max-w-full object-contain"
      />
    );
  }

  if (previewType === 'document') {
    return (
      <iframe
        src={file.file_url}
        title={file.title || 'Document preview'}
        className="h-[70vh] w-full border-0 bg-[#111]"
      />
    );
  }

  return (
    <div className="p-6 text-center sm:p-8">
      <h2 className="mb-3 text-lg font-bold">Preview not available inline</h2>
      <p className="mx-auto mb-5 max-w-md text-sm text-muted sm:text-base">
        This file type does not have an embedded preview yet. Continue in the StoreGram app to
        access it.
      </p>
    </div>
  );
}

export default async function DownloadPage({ params }) {
  const { shortId } = await params;
  const previewPayload = await getFile(shortId);
  const file = previewPayload?.file || null;

  if (!file) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="card w-full max-w-xl border-white/10 bg-surface/90 p-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
            <h1 className="text-3xl font-bold text-foreground">File not found</h1>
            <p className="mt-4 text-sm text-muted">
              The link may be invalid, expired, or the file may no longer be available.
            </p>
            <Link href="/" className="btn btn-primary mt-8 inline-flex">
              Back to StoreGram
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const previewType = getPreviewType(file);
  const appDeepLink = buildAppDeepLink(file, shortId);
  const previewDetails = buildPreviewDetails(file, shortId, previewType);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
            <section className="card border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.98)_100%)] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-7">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-2 text-accent">
                    <PlaySquare size={16} />
                    <span className="text-xs font-bold uppercase tracking-[0.12em]">
                      Public Preview
                    </span>
                  </div>
                  <h1 className="break-words text-2xl font-extrabold sm:text-3xl">
                    {file.title || 'Untitled File'}
                  </h1>
                  <p className="mt-2 text-sm text-muted sm:text-base">
                    {file.description || 'No description added for this file yet.'}
                  </p>
                </div>

                <div className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                  {file.short_id || shortId}
                </div>
              </div>

              <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] sm:min-h-[440px]">
                <PreviewContent file={file} />
              </div>

              <div className="mt-4">
                <PublicDownloadActions
                  appDeepLink={appDeepLink}
                  appFallbackUrl={APP_VIEW_FALLBACK_URL}
                  trackingStartUrl={previewPayload?.tracking?.startUrl || null}
                  compact
                />
              </div>

              <p className="mt-4 text-sm text-muted">
                If the embedded preview is limited on your device, continue in the StoreGram app.
              </p>
            </section>

            <aside className="space-y-5">
              <div className="card border-white/10 bg-surface/90 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Download size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Ready to continue</div>
                    <div className="text-xs text-muted">Open this file in the StoreGram app</div>
                  </div>
                </div>

                <PublicDownloadActions
                  appDeepLink={appDeepLink}
                  appFallbackUrl={APP_VIEW_FALLBACK_URL}
                  trackingStartUrl={previewPayload?.tracking?.startUrl || null}
                />

                <p className="mt-4 text-xs text-muted">
                  By accessing this file, you agree to the StoreGram terms of service.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {previewDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-border bg-white/[0.03] p-4"
                  >
                    <div className="mb-1 text-xs text-muted">{detail.label}</div>
                    <div className={`font-bold text-foreground ${detail.valueClassName || ''}`.trim()}>
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/60 px-4 py-8 text-center text-sm text-muted sm:px-6">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} StoreGram. Secure file sharing and in-app viewing.</p>
        </div>
      </footer>
    </div>
  );
}
