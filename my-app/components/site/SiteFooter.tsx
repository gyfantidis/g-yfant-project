import { PROFILE, SOCIALS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px 32px",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingBlock: 34,
        }}
      >
        <span className="meta">
          © {new Date().getFullYear()} {PROFILE.name} — {PROFILE.locationShort}
        </span>

        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <a className="nav-link" href={SOCIALS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="nav-link" href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="nav-link" href={SOCIALS.email}>
            Email
          </a>
          <a className="nav-link" href="/os" target="_blank" rel="noopener">
            OS ⧉
          </a>
        </div>
      </div>
    </footer>
  );
}
