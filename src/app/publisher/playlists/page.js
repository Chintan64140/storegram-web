'use client';

export default function Playlists() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl">Unsupported Publisher Feature</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          This route now explains the current backend limitation clearly instead of showing a
          desktop-only placeholder screen.
        </p>
      </div>

      <div className="card w-full max-w-3xl">
        <p className="mb-4 text-sm leading-7 text-muted sm:text-base">
          Playlists are not part of the current backend API documentation. The publisher flow now avoids pretending this works.
          Use the documented publisher content endpoints instead:
        </p>
        <ul className="space-y-3 pl-5 text-sm leading-7 text-muted sm:text-base">
          <li>`POST /publisher/content/upload` to upload content</li>
          <li>`GET /publisher/content` to list uploaded files</li>
          <li>`PUT /publisher/content/:id` to update metadata</li>
          <li>`DELETE /publisher/content/:id` to remove content</li>
        </ul>
      </div>
    </div>
  );
}
