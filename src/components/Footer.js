import Image from 'next/image';
import Link from 'next/link';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    items: [
      { label: 'Dashboard', href: '/publisher' },
      { label: 'Publisher Rates', href: '#rates' },
      { label: 'Download App', href: '#app' },
      { label: 'Payout Records', href: '#proof' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Features', href: '#features' },
      { label: 'Why StoreGram?', href: '#why-storegram' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#05080d]">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Image
              src="/Logo/Logo-Web.svg"
              alt="StoreGram"
              width={168}
              height={42}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Upload, share, and monetize your content with StoreGram. Built for creators,
              publishers, and audiences who want faster delivery with transparent analytics.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <Mail size={16} />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <MessageCircle size={16} />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <ShieldCheck size={16} />
              </span>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Get the App
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#app"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-white transition hover:border-accent"
              >
                Get it on Google Play
              </a>
              <a
                href="#app"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-white transition hover:border-accent"
              >
                Download on the App Store
              </a>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">
              STOREGRAM LLC
              <br />
              Creator-first file hosting and monetization platform.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} StoreGram. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link href="/" className="transition hover:text-white">
              DMCA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
