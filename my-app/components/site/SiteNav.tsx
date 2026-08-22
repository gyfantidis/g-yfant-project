"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { href: "/projects", label: "work" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "writing" },
  { href: "/now", label: "now" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <div
        className="site-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          height: 60,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--os-text)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.name.split(" ")[0].toLowerCase()}
          <span style={{ color: "var(--os-accent)" }}>.</span>
          {PROFILE.name.split(" ")[1].toLowerCase()}
        </Link>

        {/* Scrolls horizontally on narrow screens rather than disappearing */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginLeft: 4,
            alignItems: "center",
            overflowX: "auto",
            scrollbarWidth: "none",
            minWidth: 0,
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="site-nav-link"
              data-active={pathname.startsWith(l.href)}
              style={{ whiteSpace: "nowrap" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div className="site-mode-toggle">
          <Link href="/" data-active={true}>
            Site
          </Link>
          <Link href="/os" data-active={false}>
            OS
          </Link>
        </div>
      </div>
    </nav>
  );
}
