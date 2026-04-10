"use client";

const NOW_DATA = {
  updated: "April 2026",
  working: [
    {
      title: "Gendox — AI Agent Platform",
      sub: "Ctrl+Space Labs · Full-time",
      detail:
        "Building and expanding Gendox — a no-code platform for AI chat agents. Currently working on new integrations and improving the RAG pipeline.",
      accent: "green" as const,
    },
    {
      title: "oneprompt.gr",
      sub: "Side project",
      detail:
        "Greek-language AI content platform. Running on Hetzner + Coolify. Iterating on UX and content generation quality.",
      accent: "blue" as const,
    },
  ],
  studying: [
    {
      label: "MSc DAMA",
      detail: "Data Science & Machine Learning — Hellenic Open University. 2nd year in progress.",
    },
    {
      label: "LLM internals",
      detail: "Going deeper into transformer architectures, attention mechanisms, and fine-tuning techniques.",
    },
  ],
  lately: [
    { emoji: "🇫🇷", text: "Took a few days in Paris — wandered around Montmartre, saw the Eiffel Tower at night. One of those trips that clears your head." },
    { emoji: "🌐", text: "Attended NGI Forum in Europe — conversations about open internet, digital sovereignty, and where the web is actually going." },
    { emoji: "☕", text: "Coding late at night with two monitors, bad coffee, and playlists I'd be embarrassed to share publicly." },
    { emoji: "🤔", text: "Thinking a lot about whether AI makes developers irrelevant. Current conclusion: no — but the job changes completely, and most people aren't ready for that." },
    { emoji: "🏙️", text: "Athens is underrated. The light here is different. The chaos is part of it." },
  ],
};

const ACCENT_COLORS = {
  green: { color: "var(--os-accent)", bg: "rgba(0,255,136,0.07)", border: "rgba(0,255,136,0.15)" },
  blue:  { color: "var(--os-blue)",   bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.15)" },
};

export default function NowApp() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid var(--os-border)",
          background: "var(--os-surface-2)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
          display: "flex",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span>~/now</span>
        <span>last updated: {NOW_DATA.updated}</span>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Working on */}
        <section>
          <SectionLabel icon="⚡" label="Working on" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NOW_DATA.working.map((item) => {
              const c = ACCENT_COLORS[item.accent];
              return (
                <div
                  key={item.title}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 4,
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--os-text)",
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: 10,
                        color: c.color,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.sub}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--os-muted)", lineHeight: 1.6 }}>
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Studying */}
        <section>
          <SectionLabel icon="📚" label="Studying" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NOW_DATA.studying.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  background: "var(--os-surface-2)",
                  border: "1px solid var(--os-border)",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    width: 3,
                    alignSelf: "stretch",
                    borderRadius: 2,
                    background: "var(--os-accent)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--os-accent)",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--os-muted)", lineHeight: 1.6 }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lately */}
        <section>
          <SectionLabel icon="🗓️" label="Lately" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NOW_DATA.lately.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  fontSize: 13,
                  color: "var(--os-muted)",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.emoji}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            color: "var(--os-border)",
            textAlign: "center",
            paddingTop: 8,
          }}
        >
          inspired by nownownow.com
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 10,
          fontWeight: 700,
          color: "var(--os-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--os-border)", marginLeft: 4 }} />
    </div>
  );
}
