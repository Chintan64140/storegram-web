'use client';

export default function Branding() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Current Publisher API Coverage</h1>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The backend documentation currently exposes publisher APIs for authentication, upload, analytics, referrals, earnings, withdrawals, and content management.
          There is no branding endpoint in the published backend docs yet, so this page now shows API status instead of a fake save form.
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Available Publisher APIs</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              `GET /publisher/analytics/dashboard`, `GET /publisher/analytics/views`, `GET /publisher/analytics/users`,
              `POST /publisher/content/upload`, `GET /publisher/content`, `PUT /publisher/content/:id`,
              `DELETE /publisher/content/:id`, `GET /api/payments/earnings`, `POST /api/payments/request`,
              and `GET /api/referrals/stats`.
            </p>
          </div>

          <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Not Yet Documented</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Branding settings, theme colors, custom logos, and support-contact customization do not currently have matching backend endpoints.
              When those APIs exist, this page can be wired to them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
