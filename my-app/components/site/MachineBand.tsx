import { PROFILE } from "@/lib/content";

/**
 * The single dark band on an otherwise paper-white site — the door into the OS.
 * Opens in a new tab so the document stays where the visitor left it.
 */
export default function MachineBand() {
  return (
    <section className="machine">
      <div className="particle-grid" />
      <div
        className="wrap"
        style={{
          position: "relative",
          paddingBlock: "clamp(56px, 8vw, 108px)",
          display: "grid",
          gap: 34,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--os-muted)",
          }}
        >
          § 06 — The other version
        </span>

        <h2
          className="headline"
          style={{ color: "var(--os-text)", maxWidth: "16ch" }}
        >
          This CV is
          <br />
          also an <span style={{ color: "var(--os-accent)" }}>operating system</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-dmsans), sans-serif",
            fontSize: 17,
            lineHeight: 1.6,
            color: "#8fa0b0",
            maxWidth: "56ch",
          }}
        >
          Draggable windows, a working terminal, a photo library, a bookshelf
          and a few things I left in there for whoever goes looking. Built with
          the same stack I ship at work.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <a href="/os" target="_blank" rel="noopener" className="machine-cta">
            <span>$ ./launch-os.sh</span>
            <span className="terminal-cursor" style={{ width: 7 }} />
          </a>
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--os-muted)" }}
          >
            Opens in a new tab · best on desktop
          </span>
        </div>

        <span
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.14em",
            color: "var(--os-muted)",
            textTransform: "uppercase",
          }}
        >
          GY-OS v1.0 — {PROFILE.locationShort}
        </span>
      </div>
    </section>
  );
}
