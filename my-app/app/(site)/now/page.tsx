import type { Metadata } from "next";
import Section from "@/components/site/Section";
import { NOW_DATA, ACCENT_COLORS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
  description: `What Giannis Yfantidis is working on, studying and thinking about — updated ${NOW_DATA.updated}.`,
};

export default function NowPage() {
  return (
    <>
      <Section num="01" label={`now · updated ${NOW_DATA.updated}`}>
        <h1
          className="site-h1"
          style={{ fontSize: "clamp(32px, 4.5vw, 50px)", marginBottom: 16 }}
        >
          What I&apos;m doing now
        </h1>
        <p className="site-lead" style={{ marginBottom: 44, maxWidth: 620 }}>
          A snapshot of current focus — work, study, and whatever else is
          taking up head space.
        </p>

        {/* Working on */}
        <h2
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--os-muted)",
            marginBottom: 16,
          }}
        >
          Working on
        </h2>
        <div style={{ display: "grid", gap: 14, marginBottom: 48 }}>
          {NOW_DATA.working.map((item) => {
            const accent = ACCENT_COLORS[item.accent];
            return (
              <div
                key={item.title}
                className="site-card"
                style={{
                  padding: "22px 24px",
                  borderLeft: `2px solid ${accent.color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--os-text)",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 12,
                    color: accent.color,
                    marginBottom: 12,
                  }}
                >
                  {item.sub}
                </div>
                <p className="site-body">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Studying */}
        <h2
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--os-muted)",
            marginBottom: 16,
          }}
        >
          Studying
        </h2>
        <div style={{ display: "grid", gap: 14, marginBottom: 48 }}>
          {NOW_DATA.studying.map((item) => (
            <div key={item.label} className="site-card" style={{ padding: "20px 24px" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--os-text)",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <p className="site-body">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Lately */}
        <h2
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--os-muted)",
            marginBottom: 16,
          }}
        >
          Lately
        </h2>
        <ul style={{ listStyle: "none", display: "grid", gap: 16, maxWidth: 680 }}>
          {NOW_DATA.lately.map((item) => (
            <li
              key={item.text}
              style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
            >
              <span style={{ fontSize: 20, lineHeight: 1.3, flexShrink: 0 }}>
                {item.emoji}
              </span>
              <p className="site-body">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
