'use client';

export default function Playlists() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl">Unsupported Publisher Feature</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          This route now explains the current product limitation clearly instead of showing a
          desktop-only placeholder screen.
        </p>
      </div>

      <div className="card w-full max-w-3xl">
        <p className="mb-4 text-sm leading-7 text-muted sm:text-base">
          Playlists are not part of the current publisher toolset yet. For now, use the existing
          upload and file management flow to organize and maintain your content:
        </p>
        <ul className="space-y-3 pl-5 text-sm leading-7 text-muted sm:text-base">
          <li>Upload new content from the publisher dashboard</li>
          <li>Review and manage all uploaded files in file manager</li>
          <li>Edit titles and descriptions whenever needed</li>
          <li>Remove content that you no longer want to keep live</li>
        </ul>
      </div>
    </div>
  );
}
