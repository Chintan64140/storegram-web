import Link from "next/link";
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
  Apple,
  Play,
} from "lucide-react";
import { FaGooglePay, FaUniversity, FaGlobe } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { RiBankLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const payoutMethods = [
  { name: "PhonePe", icon: <SiPhonepe size={28} /> },
  { name: "G Pay", icon: <FaGooglePay size={46} /> },
  { name: "UPI", icon: <MdCurrencyExchange size={28} /> },
  { name: "AirTM", icon: <FaGlobe size={28} /> },
  { name: "Bank Transfer", icon: <RiBankLine size={28} /> },
  { name: "SWIFT", icon: <FaUniversity size={28} /> },
];
const powerTools = [
  {
    title: "Dashboard",
    subtitle: "For publishers",
    description:
      "Upload files, manage branding, track performance, and control your account from one centralized space.",
    cta: "Go To Dashboard",
    href: "/publisher",
    icon: BarChart3,
    reverse: false,
  },
  {
    title: "Mobile App",
    subtitle: "For consumers",
    description:
      "Access files on the go with quick playback, file downloads, and smoother navigation for shared content.",
    cta: "Download Mobile App",
    href: "#app",
    icon: Smartphone,
    reverse: true,
  },
  {
    title: "Telegram Channel",
    subtitle: "Community & support",
    description:
      "Stay updated, discover upload workflows, and connect with support through a faster community channel.",
    cta: "Join Telegram Channel",
    href: "/contact",
    icon: MessageCircleMore,
    reverse: false,
  },
];

const comparisonRows = [
  ["Live view count", true, false, false],
  ["Monetization from first view", true, false, false],
  ["Low payout threshold", true, false, false],
  ["Unlimited cloud storage workflow", true, true, false],
  ["Publisher dashboard analytics", true, true, false],
  ["Fast video playback", true, true, true],
  ["Referral growth support", true, false, false],
];

const exclusiveFeatures = [
  {
    eyebrow: "Live analytics",
    title: "Unlimited & Live View Count",
    description:
      "Track performance in real time with no guesswork. Publishers can see how content is actually moving.",
    statA: "Live",
    statALabel: "View tracking",
    statB: "Unlimited",
    statBLabel: "View limit",
  },
  {
    eyebrow: "Referral growth",
    title: "Original Uploader Referral System",
    description:
      "Give original uploaders a stronger growth path with referral-style upside tied to distribution and reach.",
    statA: "5%",
    statALabel: "Referral bonus",
    statB: "100x",
    statBLabel: "Reach potential",
  },
];

const workflow = [
  {
    step: "01",
    title: "Upload",
    description: "Upload any file via dashboard or upload bot.",
    icon: CloudUpload,
  },
  {
    step: "02",
    title: "Share",
    description: "Share the link with your audience anywhere.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Views",
    description: "Consumers access your files with fast delivery.",
    icon: CirclePlay,
  },
  {
    step: "04",
    title: "Monetize",
    description: "Start generating value from the very first valid view.",
    icon: Wallet,
  },
];

const uploadMethods = [
  {
    title: "Web Dashboard",
    description:
      "Upload directly from your browser with organized file management.",
    icon: MonitorSmartphone,
  },
  {
    title: "File Uploader Bot",
    description: "Send files quickly through a bot-style upload workflow.",
    icon: Bot,
  },
  {
    title: "Link Converter Bot",
    description:
      "Convert external links and route them into your StoreGram workflow.",
    icon: BanknoteArrowDown,
  },
];

const audienceColumns = [
  {
    eyebrow: "For creators",
    title: "Publishers",
    description: "Upload files, share links, and monetize your content.",
    cta: "Sign Up for Free",
    href: "/register",
    points: [
      "Unlimited cloud storage",
      "Monetization from 1st view",
      "Low payout threshold",
      "Fair monetization rates",
      "Realtime view count",
      "Fast global payouts",
      "Dashboard file upload",
      "Bot-based upload support",
      "Telegram and email support",
    ],
  },
  {
    eyebrow: "For viewers",
    title: "Consumers",
    description: "Watch, download, and enjoy content on the app.",
    cta: "Download App",
    href: "#app",
    points: [
      "Android and iOS app flow",
      "Direct link to app experience",
      "Fast video streaming",
      "Advanced player feel",
      "Download and share files",
      "Minimal friction access",
      "Offline viewing support",
      "Responsive mobile playback",
      "Discord and email support",
    ],
  },
];

const appFeatures = [
  {
    title: "Download Files",
    description: "Access and save files shared by creators.",
    icon: Download,
  },
  {
    title: "Stream Videos",
    description: "Watch content with a smooth built-in player.",
    icon: CirclePlay,
  },
  {
    title: "Live Access",
    description: "Open content instantly from shared links.",
    icon: Eye,
  },
  {
    title: "Offline Access",
    description: "Keep important files available while traveling.",
    icon: Check,
  },
];

const faqs = [
  {
    question: "How do publishers start earning?",
    answer:
      "Publishers can upload content, share links, and begin monetization from the first valid view tracked inside the dashboard.",
  },
  {
    question: "Does StoreGram support multiple upload methods?",
    answer:
      "Yes. The platform is structured around dashboard uploads plus bot-assisted and converted-link style workflows.",
  },
  {
    question: "Can viewers access content on mobile?",
    answer:
      "Yes. The homepage highlights a mobile-first access path with app-style download, streaming, and offline support sections.",
  },
  {
    question: "How are payouts presented?",
    answer:
      "The public site positions StoreGram as a transparent payout platform with analytics, low thresholds, and multiple payout method messaging.",
  },
];

function VisualCard({ icon: Icon }) {
  return (
    <div className="mx-auto flex w-full max-w-[28rem] justify-center">
      <div className="relative w-full rounded-[2rem] border border-[rgba(0,160,254,0.14)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] [background:var(--hero-shell)]">
        <div className="absolute inset-x-16 top-4 h-16 rounded-full bg-[rgba(0,160,254,0.16)] blur-3xl" />
        <div className="relative flex min-h-[21rem] items-center justify-center rounded-[1.6rem] border border-border p-6 [background:var(--surface-tint)]">
          <div
            className="w-full max-w-[18rem] rounded-[1.6rem] border p-4"
            style={{
              borderColor: "var(--surface-border-strong)",
              backgroundColor: "var(--device-shell-bg)",
            }}
          >
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-[rgba(0,160,254,0.14)] p-4 text-accent">
                <Icon size={26} />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-10 rounded-xl [background:var(--surface-tint-strong)]"
                />
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
    <div className="flex justify-center items-center">
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          enabled
            ? "bg-accent/15 text-accent"
            : "[background:var(--surface-tint-strong)] text-muted"
        }`}
      >
        {enabled ? <IoMdCheckmark /> : <IoMdClose />}
      </span>
    </div>
  );
}

const features = [
  { icon: Infinity, text: "Unlimited Storage" },
  { icon: Eye, text: "Live View Count" },
  { icon: Wallet, text: "Fast Global Payouts" },
];

const appLinks = [
  {
    label: "Get it on Google Play",
    href: "#app",
    icon: Play,
    img: "/Dashboard/playstore.svg",
  },
  {
    label: "Download on the App Store",
    href: "#app",
    icon: Apple,
    img: "/Dashboard/appstore.svg",
  },
];

export default function Home() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden px-3 pt-5 sm:pt-6">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(0,160,254,0.18),_transparent_46%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#00a0fe69_100%)]" />
          <div className="container relative py-10 sm:py-12 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent">
                <Sparkles size={16} />
                Upload, Share & Monetize
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                Upload, Share & <span className="text-accent">Monetize</span>{" "}
                Your Content
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[var(--soft-text)] md:text-xl">
                Creators upload files through the dashboard, consumers access
                them seamlessly, and monetization starts from the first
                meaningful view.
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
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[rgba(0,160,254,0.2)] bg-surface px-7 py-4 text-lg font-semibold text-foreground transition hover:border-accent sm:w-auto"
                >
                  <MonitorSmartphone size={22} />
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-base text-[var(--soft-text-strong)]">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="inline-flex items-center gap-2">
                      <Icon size={18} className="text-accent" />
                      {item.text}
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                {appLinks.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="items-center justify-center border rounded-[10px] bg-surface overflow-hidden text-sm font-semibold transition hover:border-accent"
                    >
                      <img src={item.img} className="h-12 sm:h-14" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className=" border-border bg-card px-3 py-20">
          <div className="container text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
              Trusted payout partners
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Multiple Payout Methods
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
              Choose from a variety of payout-friendly methods. We process
              earnings with transparency and low-friction delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Fast Processing",
                "Global Payouts",
                "Low Minimum Threshold",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(0,160,254,0.18)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 justify-center py-16 pb-4">
              {payoutMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-36 h-24 flex flex-col items-center justify-center gap-2 
          rounded-2xl border border-box-border-text
 bg-card
          text-box-border-text hover:text-accent-hover 
          hover:border-accent-hover transition-all duration-300 cursor-pointer"
                >
                  <div>{method.icon}</div>
                  {method.name == "G Pay" ? (
                    ""
                  ) : (
                    <span className="text-sm font-medium">{method.name}</span>
                  )}
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
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                One Platform, Three Powerful Tools
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
                Upload from your dashboard, support mobile consumption, and keep
                your audience connected through a complete creator-friendly
                workflow.
              </p>
            </div>

            <div className="mt-16 gap-x-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {powerTools.map((tool, index) => {
                const Icon = tool.icon;

                return (
                  <div
                    key={index}
                    className="rounded-[2rem] border justify-between flex flex-col border-border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.14)] [background:var(--surface-gradient)]"
                  >
                    <div>
                      <div className="inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                        <Icon size={24} />
                      </div>
                      <h3 className="mt-6 text-4xl font-semibold text-foreground">
                        {tool.title}
                      </h3>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        {tool.subtitle}
                      </p>
                      <p className="mt-6 text-lg leading-8 text-[var(--soft-text)]">
                        {tool.description}
                      </p>
                    </div>
                    <Link
                      href={tool.href}
                      className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_32px_rgba(0,160,254,0.34)] transition hover:bg-accent-hover"
                    >
                      {tool.cta}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="why-storegram"
          className="border-t border-border bg-[var(--deep-section-alt-bg)] px-3 py-24"
        >
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                StoreGram vs others
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Why <span className="text-accent">StoreGram</span> Is Better
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
                Features designed for creator transparency, monetization, and
                operational speed.
              </p>
            </div>

            <div className="mt-14 overflow-x-auto rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="min-w-[44rem]">
                <div className="grid text-center grid-cols-[1.5fr_0.55fr_0.75fr_0.65fr] border-b border-border px-5 py-5 text-sm font-semibold text-foreground [background:var(--surface-tint)] md:px-8">
                  <div className="text-left">Feature</div>
                  <div className="text-accent">StoreGram</div>
                  <div className="text-muted">Cloud Platforms</div>
                  <div className="text-muted">File Hosts</div>
                </div>

                {comparisonRows.map(([label, storegram, cloud, host]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[1.5fr_0.55fr_0.75fr_0.65fr] items-center border-b border-border px-5 py-5 text-sm md:px-8"
                  >
                    <div className="font-medium text-foreground">{label}</div>

                    <ComparisonMark enabled={storegram} />

                    <ComparisonMark enabled={cloud} />

                    <ComparisonMark enabled={host} />
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
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Features No Other Platform Offers
              </h2>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {exclusiveFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-border p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] [background:var(--panel-gradient)]"
                >
                  {/* <div className="rounded-[1.6rem] border border-border p-4 [background:var(--surface-tint-strong)]">
                    <div className="flex aspect-video items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(0,160,254,0.1))]">
                      <div className="rounded-full bg-red-600 px-6 py-4 text-sm font-bold text-white shadow-[0_14px_36px_rgba(220,38,38,0.45)]">
                        Preview
                      </div>
                    </div>
                  </div> */}

                  <div className=" flex flex-wrap gap-3">
                    <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-3 py-1.5 text-sm font-semibold text-accent">
                      {feature.eyebrow}
                    </span>
                    <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-3 py-1.5 text-sm font-semibold text-accent">
                      StoreGram Exclusive
                    </span>
                  </div>

                  <h3 className="mt-6 text-4xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-[var(--soft-text)]">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-10">
                    <div>
                      <div className="text-5xl font-semibold text-accent">
                        {feature.statA}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                        {feature.statALabel}
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-semibold text-accent">
                        {feature.statB}
                      </div>
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

        <section className="border-t border-border bg-[var(--deep-section-bg)] px-3 py-24">
          <div className="container text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
              How it works
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Upload, Share & Monetize
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
              Creators upload through the dashboard or upload bot, audiences
              access content smoothly, and revenue visibility starts
              immediately.
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {workflow.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(0,160,254,0.16)] bg-[rgba(0,160,254,0.08)] text-accent">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-3xl font-semibold text-foreground mt-4">
                      {item.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-base leading-7 text-[var(--soft-text)]">
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
              <h3 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
                Monetize from Day One
              </h3>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
                Unlike generic hosting products, StoreGram is framed around
                creator earnings, low thresholds, and transparent growth signals
                from the first view.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-background/70 px-4 py-2 text-sm font-semibold text-foreground">
                  Low Minimum Payout
                </span>
                <span className="rounded-full border border-[rgba(0,160,254,0.2)] bg-background/70 px-4 py-2 text-sm font-semibold text-foreground">
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
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Choose whatever suits your workflow
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {uploadMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="rounded-[2rem] border border-border bg-surface p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
                  >
                    <div className="mx-auto inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold text-foreground">
                      {method.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[var(--soft-text)]">
                      {method.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {audienceColumns.map((column, index) => (
                <div
                  key={column.title}
                  className="rounded-[2rem] border border-border p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] [background:var(--panel-gradient)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                    {column.eyebrow}
                  </p>
                  <h3 className="mt-4 text-4xl font-semibold text-foreground">
                    {column.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-[var(--soft-text)]">
                    {column.description}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {column.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-base text-foreground"
                      >
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
                        ? "bg-accent text-white shadow-[0_12px_32px_rgba(0,160,254,0.34)] hover:bg-accent-hover"
                        : "border border-[rgba(0,160,254,0.2)] bg-surface text-foreground hover:border-accent"
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

        <section
          id="app"
          className="border-t border-border bg-[var(--deep-section-bg)] px-3 py-24"
        >
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,160,254,0.2)] bg-[rgba(0,160,254,0.08)] px-4 py-2 text-sm font-semibold text-accent">
              <Smartphone size={16} />
              Free on Android & iOS
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Get the StoreGram App
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-text)]">
              Stream videos, download files, and access your content on the go.
              One app designed around a faster viewer experience.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-[2rem] border border-border bg-surface px-6 py-8"
                  >
                    <div className="mx-auto inline-flex rounded-2xl bg-[rgba(0,160,254,0.12)] p-4 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[var(--soft-text)]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              {appLinks.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="items-center justify-center border rounded-[7px] bg-surface overflow-hidden text-sm font-semibold transition hover:border-accent"
                  >
                    <img src={item.img} className="h-14" />
                  </a>
                );
              })}
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
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Common Questions
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="rounded-[1.8rem] border border-border bg-surface p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
                >
                  <h3 className="text-2xl font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[var(--soft-text)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
