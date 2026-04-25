'use client';

export default function Branding() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl">Current Publisher Coverage</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          This page highlights the publisher tools that are currently available, so the UI does not
          pretend unsupported branding features already exist.
        </p>
      </div>

      <div className="card w-full max-w-3xl">
        <p className="mb-6 text-sm leading-7 text-muted sm:text-base">
          Publisher tools currently cover authentication, uploads, analytics, referrals, earnings,
          withdrawals, and file management. Custom branding controls are not available yet, so this
          page shares product status instead of a fake settings form.
        </p>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-border bg-surface-strong p-5">
            <h3 className="mb-2 text-lg font-bold">Available Right Now</h3>
            <p className="text-sm leading-7 text-muted sm:text-base">
              Dashboard insights, view analytics, uploads, file management, referral tracking,
              earnings history, withdrawal requests, and core account tools are all supported in
              the current publisher experience.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-strong p-5">
            <h3 className="mb-2 text-lg font-bold">Coming Later</h3>
            <p className="text-sm leading-7 text-muted sm:text-base">
              Branding settings, theme colors, custom logos, and support-contact customization are
              not available yet. When those features are ready, this page can be expanded to manage
              them directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
