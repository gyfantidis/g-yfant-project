"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/work", label: "work" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
  { href: "/now", label: "now" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Main">
      <div className="sheet nav-inner">
        <Link href="/" className="nav-home">
          g.yfantidis<span className="c-line">_</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              data-active={pathname === l.href || pathname.startsWith(`${l.href}/`)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a href="/os" className="nav-os" title="The same site as a desktop OS (opens in a new tab)" target="_blank" rel="noopener">
          [ launch os ]
        </a>
      </div>
    </nav>
  );
}
