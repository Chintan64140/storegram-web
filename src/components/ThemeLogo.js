"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "storegram-theme";

function resolveTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function subscribe(onStoreChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("storegram-theme-change", onStoreChange);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("storegram-theme-change", onStoreChange);
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getSnapshot() {
  return resolveTheme();
}

function getServerSnapshot() {
  return "dark";
}

export default function ThemeLogo({
  width,
  height,
  className,
  priority = false,
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const src =
    theme === "light" ? "/Logo/Logo-web-black.svg" : "/Logo/Logo-Web.svg";
  const src2 =
    theme === "light" ? "/Logo/Logo-Mobile-black.svg" : "/Logo/Logo-Mobile.svg";

  return (
    <div>
      <div className="hidden sm:block">
        <Image
          src={src}
          alt="StoreGram"
          width={width}
          height={height}
          priority={priority}
          className={className}
        />
      </div>

      <div className="block sm:hidden">
        <Image
          src={src2}
          alt="StoreGram"
          width={width}
          height={height}
          priority={priority}
          className={className}
        />
      </div>
    </div>
  );
}
