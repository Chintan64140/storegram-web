import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Download, ExternalLink, PlaySquare } from 'lucide-react';

const DEFAULT_API_URL = 'https://storegram-backend-39ki.onrender.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

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
      return data?.file || null;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    console.error('Failed to load watch page file', lastError);
  }

  return null;
}

export default async function WatchPage({ params }) {
  const { shortId } = await params;
  const file = await getFile(shortId);

  if (!file?.file_url) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="card w-full max-w-xl border-white/10 bg-surface/90 p-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
            <h1 className="text-3xl font-bold text-foreground">Video not found</h1>
            <p className="mt-4 text-sm text-muted">
              This shared video is unavailable right now.
            </p>
            <Link href={`/download/${shortId}`} className="btn btn-primary mt-8 inline-flex">
              Back to Download Page
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-5xl animate-fade-in">
          <section className="card border-white/10 bg-[linear-gradient(180deg,rgba(16,16,16,0.98)_0%,rgba(8,8,8,0.98)_100%)] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-7">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-2 text-accent">
                  <PlaySquare size={16} />
                  <span className="text-xs font-bold uppercase tracking-[0.12em]">
                    Web Playback
                  </span>
                </div>
                <h1 className="break-words text-2xl font-extrabold sm:text-3xl">
                  {file.title || 'Untitled Video'}
                </h1>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  Watch the shared video on the web or download the original file.
                </p>
              </div>

              <div className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                {file.short_id || shortId}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
              <video
                src={file.file_url}
                controls
                playsInline
                preload="metadata"
                autoPlay
                className="aspect-video w-full bg-black"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={`/api/public-download/${shortId}`} download className="btn btn-primary w-full justify-center sm:w-auto">
                <Download size={18} />
                Download File
              </a>

              <a href={file.file_url} className="btn w-full justify-center sm:w-auto">
                <ExternalLink size={18} />
                Open Original File
              </a>

              <Link href={`/download/${shortId}`} className="btn w-full justify-center sm:w-auto">
                Back to Preview
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
