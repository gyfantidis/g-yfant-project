import Link from "next/link";

/**
 * Decorative teaser for the OS route — a miniature desktop rendered in CSS
 * (no screenshot to keep in sync). Purely presentational; the whole tile links
 * through to /os.
 */
export default function OsPreview() {
  return (
    <Link
      href="/os"
      aria-label="Open the interactive OS"
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--os-border)",
        background: "var(--os-bg)",
        position: "relative",
        aspectRatio: "16 / 10",
      }}
      className="site-card"
    >
      {/* Menubar */}
      <div
        style={{
          height: 22,
          background: "var(--os-titlebar)",
          borderBottom: "1px solid var(--os-border)",
          display: "flex",
          alignItems: "center",
          paddingInline: 10,
          gap: 6,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 9,
          color: "var(--os-muted)",
        }}
      >
        <span style={{ color: "var(--os-accent)" }}>●</span>
        <span>gy-os</span>
      </div>

      {/* Desktop surface */}
      <div
        className="particle-grid"
        style={{
          position: "absolute",
          inset: "22px 0 0 0",
          padding: 14,
          display: "flex",
          gap: 14,
        }}
      >
        {/* Icon column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["👤", "💼", "🛠️", ">_"].map((e) => (
            <span key={e} style={{ fontSize: 15, lineHeight: 1 }}>
              {e}
            </span>
          ))}
        </div>

        {/* Floating window */}
        <div
          style={{
            flex: 1,
            marginTop: 8,
            marginRight: 6,
            borderRadius: 6,
            border: "1px solid var(--os-border)",
            background: "var(--os-surface)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 8px",
              background: "var(--os-titlebar)",
              borderBottom: "1px solid var(--os-border)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--os-red)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--os-yellow)" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--os-green-btn)" }} />
            <span
              style={{
                marginLeft: 6,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 8,
                color: "var(--os-muted)",
              }}
            >
              terminal.app
            </span>
          </div>
          <div
            style={{
              padding: 10,
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 9,
              lineHeight: 1.9,
              color: "var(--os-text)",
            }}
          >
            <div>
              <span style={{ color: "var(--os-accent)" }}>$</span> whoami
            </div>
            <div style={{ color: "var(--os-muted)" }}>giannis yfantidis</div>
            <div>
              <span style={{ color: "var(--os-accent)" }}>$</span> open projects
              <span className="terminal-cursor" style={{ width: 5, height: "0.9em" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Hover affordance */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 12,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 10,
          color: "var(--os-accent)",
          background: "rgba(10,10,15,0.85)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: 6,
          padding: "4px 9px",
        }}
      >
        launch ↗
      </div>
    </Link>
  );
}
