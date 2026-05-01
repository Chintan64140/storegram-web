"use client";

import { Smartphone } from "lucide-react";

function trackView(startUrl) {
  if (!startUrl || typeof window === "undefined") {
    return;
  }

  fetch(startUrl, {
    cache: "no-store",
    keepalive: true,
    mode: "no-cors",
  }).catch(() => undefined);
}

export default function PublicDownloadActions({
  appDeepLink,
  appFallbackUrl,
  trackingStartUrl,
  compact = false,
}) {
  const wrapperClassName = compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-3";

  const handleAppOpen = (event) => {
    event.preventDefault();

    if (!appDeepLink) {
      window.location.href = appFallbackUrl;
      return;
    }

    trackView(trackingStartUrl);

    const cleanup = () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("blur", cleanup);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cleanup();
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      cleanup();
      window.location.href = appFallbackUrl;
    }, 1200);

    window.addEventListener("blur", cleanup);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.href = appDeepLink;
  };

  return (
    <div className={wrapperClassName}>
      <a
        href={appDeepLink || appFallbackUrl}
        onClick={handleAppOpen}
        className="btn btn-primary w-full justify-center"
      >
        <Smartphone size={18} />
        View on App
      </a>
    </div>
  );
}
