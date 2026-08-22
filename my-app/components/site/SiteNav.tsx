"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/now", label: "Now" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          minHeight: 58,
          paddingBlock: 10,
        }}
      >
        <Link
          href="/"
          className="mono"
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.lastName}
          <span style={{ color: "var(--mark)" }}>*</span>
        </Link>

        <div
          style={{
            display: "flex",
            gap: 20,
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
              className="nav-link"
              data-active={pathname.startsWith(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ flex: 1, minWidth: 8 }} />

        {/* The OS opens in its own tab — it is a separate world, not a page. */}
        <a
          href="/os"
          target="_blank"
          rel="noopener"
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "8px 13px",
            background: "var(--ink)",
            color: "var(--paper)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Launch OS <span aria-hidden>⧉</span>
        </a>
      </div>
    </nav>
  );
}
