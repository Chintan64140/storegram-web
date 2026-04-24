'use client';

export default function Playlists() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Unsupported Publisher Feature</h1>

      <div className="card" style={{ maxWidth: '700px' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
          Playlists are not part of the current backend API documentation. The publisher flow now avoids pretending this works.
          Use the documented publisher content endpoints instead:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li>`POST /publisher/content/upload` to upload content</li>
          <li>`GET /publisher/content` to list uploaded files</li>
          <li>`PUT /publisher/content/:id` to update metadata</li>
          <li>`DELETE /publisher/content/:id` to remove content</li>
        </ul>
      </div>
    </div>
  );
}
