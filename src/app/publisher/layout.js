"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Folder,
  ListVideo,
  TrendingUp,
  Users,
  Palette,
  CreditCard,
  Settings as SettingsIcon,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import PublisherAuthGuard from "@/components/PublisherAuthGuard";
import { clearPublisherSession, getStoredPublisherUser } from "@/utils/auth";
import ThemeLogo from "@/components/ThemeLogo";

export default function PublisherLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [publisherName, setPublisherName] = useState("Publisher");

  useEffect(() => {
    const user = getStoredPublisherUser();
    setPublisherName(user?.name || "Publisher");
  }, []);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      clearPublisherSession();
      router.replace("/login");
      setIsLoggingOut(false);
    }
  };

  const publisherInitial = publisherName.charAt(0).toUpperCase();

  const menuSections = [
    {
      title: "Content",
      items: [
        { name: "Dashboard", path: "/publisher", icon: LayoutDashboard },
        { name: "Upload Files", path: "/publisher/upload", icon: UploadCloud },
        { name: "File Manager", path: "/publisher/files", icon: Folder },
        {
          name: "View Analytics",
          path: "/publisher/progress",
          icon: TrendingUp,
        },
        { name: "Referrals", path: "/publisher/refer", icon: Users },
      ],
    },
    {
      title: "Account",
      items: [
        { name: "Billing", path: "/publisher/billing", icon: CreditCard },
        { name: "Security", path: "/publisher/security", icon: Shield },
        { name: "Settings", path: "/publisher/settings", icon: SettingsIcon },
        { name: "Platform Status", path: "/publisher/branding", icon: Palette },
        { name: "Unsupported", path: "/publisher/playlists", icon: ListVideo },
      ],
    },
  ];

  return (
    <PublisherAuthGuard>
      <div className="min-h-screen bg-background text-foreground">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-border bg-surface/95 backdrop-blur transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-5">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight"
              onClick={() => setSidebarOpen(false)}
            >
              <ThemeLogo
                width={168}
                height={42}
                priority
                className="h-13 w-auto"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl border border-border p-2 text-muted transition hover:border-accent hover:text-foreground lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-8">
                <h4 className="mb-3 px-3 text-xs uppercase tracking-[0.24em] text-muted">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.path ||
                      (item.path !== "/publisher" &&
                        pathname.startsWith(item.path));

                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? "bg-accent text-white shadow-[0_14px_34px_rgba(0,160,254,0.26)]"
                              : "text-muted hover:bg-white/5 hover:text-foreground"
                          }`}
                        >
                          <Icon size={18} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-4 py-5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-danger transition hover:bg-danger/10"
            >
              <LogOut size={18} />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </aside>

        <div className="min-h-screen lg:pl-[272px]">
          <header className="glass sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((current) => !current)}
                className="rounded-2xl border border-border bg-surface/70 p-3 text-foreground transition hover:border-accent hover:bg-white/5 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Publisher workspace
                </p>
                <p className="truncate text-sm font-medium text-foreground sm:text-base">
                  Welcome, {publisherName}
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,160,254,0.24)]">
              {publisherInitial}
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </PublisherAuthGuard>
  );
}
