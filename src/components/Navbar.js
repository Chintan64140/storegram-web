import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'Why StoreGram?', href: '#why-storegram' },
  { label: 'Publisher Rates', href: '#rates' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-background/80 px-3 pt-4 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border border-[rgba(0,160,254,0.16)] bg-[#05090f]/95 px-5 py-3 shadow-[0_0_0_1px_rgba(0,160,254,0.06),0_20px_60px_rgba(0,0,0,0.45)] md:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/Logo/Logo-Web.svg"
            alt="StoreGram"
            width={168}
            height={42}
            priority
            className="h-10 w-auto"
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

        <div className="flex items-center gap-3">
          <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-accent md:inline-flex">
            <Sparkles size={17} />
          </span>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(0,160,254,0.3)] transition hover:bg-accent-hover"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(0,160,254,0.28)] bg-[rgba(0,160,254,0.12)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(0,160,254,0.18)]"
          >
            Join Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
