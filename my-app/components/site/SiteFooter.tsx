import { PROFILE, SOCIALS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="sheet foot-inner">
        <span>
          {PROFILE.name} · {PROFILE.locationShort}
        </span>
        <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href={SOCIALS.email}>{PROFILE.email}</a>
          <a href={SOCIALS.github} target="_blank" rel="noreferrer">github</a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        </span>
      </div>
    </footer>
  );
}
