'use client'
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeLogo from "@/components/ThemeLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Why StoreGram?", href: "#why-storegram" },
  { label: "Publisher Rates", href: "#rates" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  return (
    <div className="absolute bg-transparent w-full sm:sticky top-0 z-50 sm:bg-background/80 px-2 pt-3 backdrop-blur-xl sm:px-3 sm:pt-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-[2rem] border border-[rgba(0,160,254,0.16)] px-3 py-3 shadow-[0_0_0_1px_rgba(0,160,254,0.06),0_20px_60px_rgba(0,0,0,0.18)] [background:var(--nav-bg)] sm:rounded-full sm:px-5 md:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center">
          <ThemeLogo
            width={168}
            height={42}
            priority
            className="h-12 w-auto sm:h-12 md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(0,160,254,0.3)] transition hover:bg-accent-hover sm:min-h-[2.75rem] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-[2.5rem] items-center justify-center whitespace-nowrap rounded-full border border-[rgba(0,160,254,0.28)] bg-[rgba(0,160,254,0.12)] px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-[rgba(0,160,254,0.18)] sm:min-h-[2.75rem] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Join Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
