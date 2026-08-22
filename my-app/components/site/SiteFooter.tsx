import Link from "next/link";
import { PROFILE, SOCIALS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--os-border)", paddingBlock: 40 }}>
      <div
        className="site-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 12,
          color: "var(--os-muted)",
        }}
      >
        <span>
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.locationShort}
        </span>

        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a className="site-nav-link" href={SOCIALS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="site-nav-link" href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="site-nav-link" href={SOCIALS.email}>
            Email
          </a>
          <Link className="site-nav-link" href="/os">
            OS ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
