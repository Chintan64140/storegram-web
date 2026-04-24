import Link from 'next/link';
import {
  ArrowRight,
  BanknoteArrowDown,
  BarChart3,
  Bot,
  Check,
  CirclePlay,
  CloudUpload,
  Download,
  Eye,
  Infinity,
  MessageCircleMore,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  Wallet,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const payoutMethods = ['PhonePe', 'GPay', 'UPI', 'Bank Transfer', 'PayPal', 'SWIFT'];

const powerTools = [
  {
    title: 'Dashboard',
    subtitle: 'For publishers',
    description:
      'Upload files, manage branding, track performance, and control your account from one centralized space.',
    cta: 'Go To Dashboard',
    href: '/publisher',
    icon: BarChart3,
    reverse: false,
  },
  {
    title: 'Mobile App',
    subtitle: 'For consumers',
    description:
      'Access files on the go with quick playback, file downloads, and smoother navigation for shared content.',
    cta: 'Download Mobile App',
    href: '#app',
    icon: Smartphone,
    reverse: true,
  },
  {
    title: 'Telegram Channel',
    subtitle: 'Community & support',
    description:
      'Stay updated, discover upload workflows, and connect with support through a faster community channel.',
    cta: 'Join Telegram Channel',
    href: '/contact',
    icon: MessageCircleMore,
    reverse: false,
  },
];

const comparisonRows = [
  ['Live view count', true, false, false],
  ['Monetization from first view', true, false, false],
  ['Low payout threshold', true, false, false],
  ['Unlimited cloud storage workflow', true, true, false],
  ['Publisher dashboard analytics', true, true, false],
  ['Fast video playback', true, true, true],
  ['Referral growth support', true, false, false],
];

const exclusiveFeatures = [
  {
    eyebrow: 'Live analytics',
    title: 'Unlimited & Live View Count',
    description:
      'Track performance in real time with no guesswork. Publishers can see how content is actually moving.',
    statA: 'Live',
    statALabel: 'View tracking',
    statB: 'Unlimited',
    statBLabel: 'View limit',
  },
  {
    eyebrow: 'Referral growth',
    title: 'Original Uploader Referral System',
    description:
      'Give original uploaders a stronger growth path with referral-style upside tied to distribution and reach.',
    statA: '5%',
    statALabel: 'Referral bonus',
    statB: '100x',
    statBLabel: 'Reach potential',
  },
];

const workflow = [
  {
    step: '01',
    title: 'Upload',
    description: 'Upload any file via dashboard or upload bot.',
    icon: CloudUpload,
  },
  {
    step: '02',
    title: 'Share',
    description: 'Share the link with your audience anywhere.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Views',
    description: 'Consumers access your files with fast delivery.',
    icon: CirclePlay,
  },
  {
    step: '04',
    title: 'Monetize',
    description: 'Start generating value from the very first valid view.',
    icon: Wallet,
  },
];

const uploadMethods = [
  {
    title: 'Web Dashboard',
    description: 'Upload directly from your browser with organized file management.',
    icon: MonitorSmartphone,
  },
  {
    title: 'File Uploader Bot',
    description: 'Send files quickly through a bot-style upload workflow.',
    icon: Bot,
  },
  {
    title: 'Link Converter Bot',
    description: 'Convert external links and route them into your StoreGram workflow.',
    icon: BanknoteArrowDown,
  },
];

const audienceColumns = [
  {
    eyebrow: 'For creators',
    title: 'Publishers',
    description: 'Upload files, share links, and monetize your content.',
    cta: 'Sign Up for Free',
    href: '/register',
    points: [
      'Unlimited cloud storage',
      'Monetization from 1st view',
      'Low payout threshold',
      'Fair monetization rates',
      'Realtime view count',
      'Fast global payouts',
      'Dashboard file upload',
      'Bot-based upload support',
      'Telegram and email support',
    ],
  },
  {
    eyebrow: 'For viewers',
    title: 'Consumers',
    description: 'Watch, download, and enjoy content on the app.',
    cta: 'Download App',
    href: '#app',
    points: [
      'Android and iOS app flow',
      'Direct link to app experience',
      'Fast video streaming',
      'Advanced player feel',
      'Download and share files',
      'Minimal friction access',
      'Offline viewing support',
      'Responsive mobile playback',
      'Discord and email support',
    ],
  },
];

const appFeatures = [
  { title: 'Download Files', description: 'Access and save files shared by creators.', icon: Download },
  { title: 'Stream Videos', description: 'Watch content with a smooth built-in player.', icon: CirclePlay },
  { title: 'Live Access', description: 'Open content instantly from shared links.', icon: Eye },
  { title: 'Offline Access', description: 'Keep important files available while traveling.', icon: Check },
];

const faqs = [
  {
    question: 'How do publishers start earning?',
    answer:
      'Publishers can upload content, share links, and begin monetization from the first valid view tracked inside the dashboard.',
  },
  {
    question: 'Does StoreGram support multiple upload methods?',
    answer:
      'Yes. The platform is structured around dashboard uploads plus bot-assisted and converted-link style workflows.',
  },
  {
    question: 'Can viewers access content on mobile?',
    answer:
      'Yes. The homepage highlights a mobile-first access path with app-style download, streaming, and offline support sections.',
  },
  {
    question: 'How are payouts presented?',
    answer:
      'The public site positions StoreGram as a transparent payout platform with analytics, low thresholds, and multiple payout method messaging.',
  },
];

function MockDashboard() {
  return (
    <div className="relative rounded-[2rem] border border-[rgba(0,160,254,0.16)] bg-[linear-gradient(180deg,rgba(9,12,18,0.98),rgba(4,7,11,0.98))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.46)]">
      <div className="absolute inset-x-10 -top-10 h-28 rounded-full bg-[rgba(0,160,254,0.18)] blur-3xl" />
      <div className="relative grid gap-4 lg:grid-cols-[1.45fr_0.65fr]">
        <div className="rounded-[1.6rem] border border-border bg-white/5 p-4">
          <div className="grid gap-4 lg:grid-cols-[190px_1fr]">
            <div className="rounded-[1.2rem] border border-border bg-white/3 p-4">
              <div className="h-10 w-28 rounded-xl bg-[rgba(0,160,254,0.16)]" />
              <div className="mt-6 space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-9 rounded-xl bg-white/6" />
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[1.2rem] border border-border bg-white/3 p-4">
              <div className="grid gap-3 md:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="rounded-xl bg-white px-4 py-3 text-[#0d1420]">
                    <div className="h-3 w-16 rounded-full bg-slate-200" />
                    <div className="mt-3 h-7 w-20 rounded-full bg-slate-300" />
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto rounded-xl bg-white p-4">
                <div className="h-4 w-40 rounded-full bg-slate-200" />
                <div className="mt-4 grid min-w-[34rem] gap-3">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="grid grid-cols-[1.2fr_0.45fr_0.35fr_0.45fr] gap-3">
                      <div className="h-10 rounded-lg bg-slate-100" />
                      <div className="h-10 rounded-lg bg-slate-100" />
                      <div className="h-10 rounded-lg bg-slate-100" />
                      <div className="h-10 rounded-lg bg-emerald-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[260px] items-center justify-center">
          <div className="rounded-[2.4rem] border border-[rgba(255,255,255,0.1)] bg-[#0a0f15] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="rounded-[2rem] bg-white px-4 pb-5 pt-4 text-[#0d1420]">
              <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-slate-300" />
              <div className="mx-auto h-14 w-36 rounded-2xl bg-[rgba(0,160,254,0.1)]" />
              <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="space-y-2 text-center">
                      <div className="mx-auto h-8 w-8 rounded-full bg-[rgba(0,160,254,0.12)]" />
                      <div className="h-2 rounded-full bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                <div className="h-3 w-28 rounded-full bg-slate-200" />
                <div className="mt-4 h-11 rounded-xl border border-slate-200" />
                <div className="mt-4 mx-auto h-11 w-40 rounded-xl bg-[#0d1420]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualCard({ icon: Icon }) {
  return (
    <div className="mx-auto flex w-full max-w-[28rem] justify-center">
      <div className="relative w-full rounded-[2rem] border border-[rgba(0,160,254,0.14)] bg-[linear-gradient(180deg,rgba(10,16,24,0.98),rgba(6,8,12,0.98))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
        <div className="absolute inset-x-16 top-4 h-16 rounded-full bg-[rgba(0,160,254,0.16)] blur-3xl" />
        <div className="relative flex min-h-[21rem] items-center justify-center rounded-[1.6rem] border border-border bg-[rgba(255,255,255,0.03)] p-6">
          <div className="w-full max-w-[18rem] rounded-[1.6rem] border border-[rgba(255,255,255,0.09)] bg-[#0a0f15] p-4">
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-[rgba(0,160,254,0.14)] p-4 text-accent">
                <Icon size={26} />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 rounded-xl bg-white/8" />
              ))}
            </div>
            <div className="mt-4 h-24 rounded-2xl bg-[rgba(0,160,254,0.1)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonMark({ enabled }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
        enabled ? 'bg-accent/15 text-accent' : 'bg-white/8 text-muted'
      }`}
    >
      {enabled ? <Check size={16} /> : <span className="text-xs">x</span>}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-3 pt-8">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(0,160,254,0.18),_transparent_46%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.42)_100%)]" />
          <div className="container relative py-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent">
                <Sparkles size={16} />
                Upload, Share & Monetize
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-7xl">
                Upload, Share & <span className="text-accent">Monetize</span> Your Content
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#a8bfd7] md:text-xl">
                Creators upload files through the dashboard, consumers access them seamlessly,
                and monetization starts from the first meaningful view.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-7 py-4 text-lg font-semibold text-white shadow-[0_12px_32px_rgba(0,160,254,0.34)] transition hover:bg-accent-hover sm:w-auto"
                >
                  <CloudUpload size={22} />
                  Start Uploading Free
                </Link>
                <Link
                  href="/publisher"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[rgba(0,160,254,0.2)] bg-surface px-7 py-4 text-lg font-semibold text-white transition hover:border-accent sm:w-auto"
                >
                  <MonitorSmartphone size={22} />
                  Open Dashboard
                </Link>
              </div>

              <p className="mt-8 text-sm text-muted">
                By continuing you agree to our terms and platform guidelines.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-base text-[#b4cbe2]">
                <div className="inline-flex items-center gap-2">
                  <Infinity size={18} className="text-accent" />
                  Unlimited Storage
                </div>
                <div className="inline-flex items-center gap-2">
                  <Eye size={18} className="text-accent" />
                  Live View Count
                </div>
                <div className="inline-flex items-center gap-2">
                  <Wallet size={18} className="text-accent" />
                  Fast Global Payouts
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#app"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-white transition hover:border-accent"
                >
                  Get it on Google Play
                </a>
                <a
                  href="#app"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-white transition hover:border-accent"
                >
                  Download on the App Store
                </a>
              </div>
            </div>

            <div className="mt-16">
              <MockDashboard />
            </div>
          </div>
        </section>

        <section id="proof" className="border-t border-border bg-[#02050a] px-3 py-20">
          <div className="container text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
              Trusted payout partners
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Multiple Payout Methods
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
              Choose from a variety of payout-friendly methods. We process earnings with
              transparency and low-friction delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {['Fast Processing', 'Global Payouts', 'Low Minimum Threshold'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(0,160,254,0.18)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {payoutMethods.map((method) => (
                <div
                  key={method}
                  className="rounded-[1.6rem] border border-border bg-surface px-4 py-10 text-center text-lg font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="px-3 py-24">
          <div className="container">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent">
                <Sparkles size={16} />
                Everything You Need
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                One Platform, Three Powerful Tools
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
                Upload from your dashboard, support mobile consumption, and keep your audience
                connected through a complete creator-friendly workflow.
              </p>
            </div>

            <div className="mt-16 space-y-20">
              {powerTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <div
                    key={tool.title}
                    className={`grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] ${
                      tool.reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                    }`}
                  >
                    <VisualCard icon={Icon} />

                    <div>
                      <div className="rounded-[2rem] border border-border bg-[rgba(255,255,255,0.02)] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
                        <div className="inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                          <Icon size={24} />
                        </div>
                        <h3 className="mt-6 text-4xl font-semibold text-white">{tool.title}</h3>
                        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                          {tool.subtitle}
                        </p>
                        <p className="mt-6 text-lg leading-8 text-[#a8bfd7]">{tool.description}</p>
                        <Link
                          href={tool.href}
                          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_32px_rgba(0,160,254,0.34)] transition hover:bg-accent-hover"
                        >
                          {tool.cta}
                          <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why-storegram" className="border-t border-border bg-[#03060b] px-3 py-24">
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                StoreGram vs others
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Why <span className="text-accent">StoreGram</span> Is Better
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
                Features designed for creator transparency, monetization, and operational speed.
              </p>
            </div>

            <div className="mt-14 overflow-x-auto rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="min-w-[44rem]">
                <div className="grid grid-cols-[1.5fr_0.55fr_0.75fr_0.65fr] border-b border-border bg-[rgba(255,255,255,0.02)] px-5 py-5 text-sm font-semibold text-white md:px-8">
                  <div>Feature</div>
                  <div className="text-accent">StoreGram</div>
                  <div className="text-muted">Cloud Platforms</div>
                  <div className="text-muted">File Hosts</div>
                </div>

                {comparisonRows.map(([label, storegram, cloud, host]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[1.5fr_0.55fr_0.75fr_0.65fr] items-center border-b border-border px-5 py-5 text-sm md:px-8"
                  >
                    <div className="font-medium text-white">{label}</div>
                    <div><ComparisonMark enabled={storegram} /></div>
                    <div><ComparisonMark enabled={cloud} /></div>
                    <div><ComparisonMark enabled={host} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 py-24">
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                Exclusive features explained
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Features No Other Platform Offers
              </h2>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {exclusiveFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(9,12,18,0.96),rgba(4,7,11,0.96))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
                >
                  <div className="rounded-[1.6rem] border border-border bg-white/4 p-4">
                    <div className="flex aspect-video items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(0,160,254,0.1))]">
                      <div className="rounded-full bg-red-600 px-6 py-4 text-sm font-bold text-white shadow-[0_14px_36px_rgba(220,38,38,0.45)]">
                        Preview
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-3 py-1.5 text-sm font-semibold text-accent">
                      {feature.eyebrow}
                    </span>
                    <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-3 py-1.5 text-sm font-semibold text-accent">
                      StoreGram Exclusive
                    </span>
                  </div>

                  <h3 className="mt-6 text-4xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-5 text-lg leading-8 text-[#a8bfd7]">{feature.description}</p>

                  <div className="mt-8 flex flex-wrap gap-10">
                    <div>
                      <div className="text-5xl font-semibold text-accent">{feature.statA}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                        {feature.statALabel}
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-semibold text-accent">{feature.statB}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                        {feature.statBLabel}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-[#02050a] px-3 py-24">
          <div className="container text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
              How it works
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Upload, Share & Monetize
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
              Creators upload through the dashboard or upload bot, audiences access content
              smoothly, and revenue visibility starts immediately.
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {workflow.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(0,160,254,0.16)] bg-[rgba(0,160,254,0.08)] text-accent">
                      <Icon size={28} />
                    </div>
                    <div className="relative mx-auto -mt-16 mb-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <h3 className="text-3xl font-semibold text-white">{item.title}</h3>
                    <p className="mx-auto mt-4 max-w-xs text-base leading-7 text-[#a8bfd7]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 rounded-[2.2rem] border border-[rgba(0,160,254,0.16)] bg-[rgba(0,160,254,0.08)] px-8 py-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                Publisher monetization
              </p>
              <h3 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                Monetize from Day One
              </h3>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
                Unlike generic hosting products, StoreGram is framed around creator earnings,
                low thresholds, and transparent growth signals from the first view.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-background/70 px-4 py-2 text-sm font-semibold text-white">
                  Low Minimum Payout
                </span>
                <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-background/70 px-4 py-2 text-sm font-semibold text-white">
                  Instant Payout Messaging
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="rates" className="px-3 py-24">
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                Multiple ways to upload
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Choose whatever suits your workflow
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {uploadMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <div key={method.title} className="rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
                    <div className="mx-auto inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold text-white">{method.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#a8bfd7]">{method.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {audienceColumns.map((column, index) => (
                <div
                  key={column.title}
                  className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(9,12,18,0.96),rgba(4,7,11,0.96))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                    {column.eyebrow}
                  </p>
                  <h3 className="mt-4 text-4xl font-semibold text-white">{column.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-[#a8bfd7]">{column.description}</p>
                  <ul className="mt-8 space-y-4">
                    {column.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base text-white">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check size={14} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={column.href}
                    className={`mt-9 inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold transition ${
                      index === 0
                        ? 'bg-accent text-white shadow-[0_12px_32px_rgba(0,160,254,0.34)] hover:bg-accent-hover'
                        : 'border border-[rgba(0,160,254,0.2)] bg-surface text-white hover:border-accent'
                    }`}
                  >
                    {column.cta}
                    <ArrowRight size={20} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="app" className="border-t border-border bg-[#02050a] px-3 py-24">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent">
              <Smartphone size={16} />
              Free on Android & iOS
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Get the StoreGram App
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#a8bfd7]">
              Stream videos, download files, and access your content on the go. One app
              designed around a faster viewer experience.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="rounded-[2rem] border border-border bg-surface px-6 py-8">
                    <div className="mx-auto inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#a8bfd7]">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-6 py-4 text-sm font-semibold text-white transition hover:border-accent"
              >
                Get it on Google Play
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-6 py-4 text-sm font-semibold text-white transition hover:border-accent"
              >
                Download on the App Store
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">
              No account required to explore. Fast access for shared content.
            </p>
          </div>
        </section>

        <section id="faq" className="px-3 py-24">
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                FAQ
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Common Questions
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[1.8rem] border border-border bg-surface p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
                >
                  <h3 className="text-2xl font-semibold text-white">{item.question}</h3>
                  <p className="mt-4 text-base leading-7 text-[#a8bfd7]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
