import Link from "next/link";
import { Send, Headphones, Play } from "lucide-react";
import ThemeLogo from "./ThemeLogo";

const YoutubeIcon = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 7.1c.3-1.5 1.5-2.7 3-3C8.4 3.7 12 3.7 12 3.7s3.6 0 6.5.4c1.5.3 2.7 1.5 3 3 .4 2.1.4 4.9.4 4.9s0 2.8-.4 4.9c-.3 1.5-1.5 2.7-3 3-2.9.4-6.5.4-6.5.4s-3.6 0-6.5-.4c-1.5-.3-2.7-1.5-3-3-.4-2.1-.4-4.9-.4-4.9s0-2.8.4-4.9z" />
    <path d="m10 15 5-3-5-3v6z" />
  </svg>
);

const platformLinks = [
  { label: "Dashboard", href: "/publisher" },
  { label: "Download App", href: "/#app" },
  { label: "Publisher Rates", href: "/publisher/progress" },
  { label: "Payout Records", href: "/publisher/billing" },
];

const resourceLinks = [
  { label: "Features", href: "/#features" },
  { label: "Why StoreGram?", href: "/#why-storegram" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { icon: YoutubeIcon, href: "#" },
  { icon: Send, href: "#" },
  { icon: Headphones, href: "/contact" },
];

const linksArray = [
  {
    name: "playstore",
    img: "/dashboard/playstore.svg",
  },
  {
    name: "appStore",
    img: "/dashboard/appstore.svg",
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 text-muted">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground block mb-6"
            >
              <ThemeLogo
                width={168}
                height={42}
                priority
                className="h-13 w-auto"
              />
            </Link>
            <p className="leading-relaxed mb-6 text-sm">
              Upload, share, and monetize your content with unlimited cloud
              storage. Built for creators and consumers.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-accent hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-[1px] uppercase mb-6">
              Platform
            </h4>

            <ul className="flex flex-col gap-4">
              {platformLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-[1px] uppercase mb-6">
              Resources
            </h4>

            <ul className="flex flex-col gap-4">
              {resourceLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get The App */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-[1px] uppercase mb-6">
              Get The App
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {linksArray.map((item, index) => {
                return (
                  <a
                    href="#app"
                    key={index}
                    className="flex items-center gap-2 border border-border  text-white transition-colors duration-200 hover:border-accent group"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-10 block"
                    />
                  </a>
                );
              })}
            </div>
            {/* <div>
              <p className="text-muted text-xs leading-relaxed">
                STOREGRAM LLC
                <br />
                30 N Gould St, STE R, Sheridan, WY 82801, USA
              </p>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-6 text-sm gap-4">
          <p>
            © {new Date().getFullYear()} STOREGRAM LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Terms of Service
            </Link>
            <span>·</span>
            <Link
              href="/dmca"
              className="transition-colors duration-200 hover:text-foreground"
            >
              DMCA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
