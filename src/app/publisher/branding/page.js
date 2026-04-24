'use client';

export default function Branding() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl">Current Publisher API Coverage</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          This page reflects the backend routes currently available to publishers, so the UI does
          not pretend unsupported branding features already exist.
        </p>
      </div>

      <div className="card w-full max-w-3xl">
        <p className="mb-6 text-sm leading-7 text-muted sm:text-base">
          The backend documentation currently exposes publisher APIs for authentication, upload, analytics, referrals, earnings, withdrawals, and content management.
          There is no branding endpoint in the published backend docs yet, so this page now shows API status instead of a fake save form.
        </p>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-surface-strong p-5">
            <h3 className="mb-2 text-lg font-bold">Available Publisher APIs</h3>
            <p className="text-sm leading-7 text-muted sm:text-base">
              `GET /publisher/analytics/dashboard`, `GET /publisher/analytics/views`, `GET /publisher/analytics/users`,
              `POST /publisher/content/upload`, `GET /publisher/content`, `PUT /publisher/content/:id`,
              `DELETE /publisher/content/:id`, `GET /api/payments/earnings`, `POST /api/payments/request`,
              and `GET /api/referrals/stats`.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-strong p-5">
            <h3 className="mb-2 text-lg font-bold">Not Yet Documented</h3>
            <p className="text-sm leading-7 text-muted sm:text-base">
              Branding settings, theme colors, custom logos, and support-contact customization do not currently have matching backend endpoints.
              When those APIs exist, this page can be wired to them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
