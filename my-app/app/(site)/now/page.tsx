import type { Metadata } from "next";
import Marker from "@/components/site/Marker";
import { NOW_DATA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
  description: `What Giannis Yfantidis is working on, studying and thinking about — updated ${NOW_DATA.updated}.`,
};

export default function NowPage() {
  return (
    <>
      <header className="wrap" style={{ paddingBlock: "clamp(40px, 5vw, 76px)" }}>
        <h1 className="display">Now</h1>
        <p className="meta" style={{ marginTop: 22 }}>
          Last updated {NOW_DATA.updated}
        </p>
        <p className="lede" style={{ marginTop: 24, maxWidth: "50ch" }}>
          A snapshot of what has my attention — work, study, and whatever else
          is taking up head space.
        </p>
      </header>

      {/* Working on */}
      <section className="band">
        <div className="wrap">
          <Marker num="01" label="Working on" />
          <div className="manifest">
            {NOW_DATA.working.map((item, i) => (
              <div key={item.title} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span className="row-title">{item.title}</span>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--mark)",
                      marginTop: 8,
                    }}
                  >
                    {item.sub}
                  </span>
                  <span className="row-sub" style={{ display: "block" }}>
                    {item.detail}
                  </span>
                </span>
                <span className="row-tail" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studying */}
      <section className="band">
        <div className="wrap">
          <Marker num="02" label="Studying" />
          <div className="manifest">
            {NOW_DATA.studying.map((item, i) => (
              <div key={item.label} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span
                    className="mono"
                    style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase" }}
                  >
                    {item.label}
                  </span>
                  <span className="row-sub" style={{ display: "block" }}>
                    {item.detail}
                  </span>
                </span>
                <span className="row-tail" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lately */}
      <section className="band">
        <div className="wrap">
          <Marker num="03" label="Lately" rest="Off the clock" />
          <ul style={{ listStyle: "none", display: "grid", gap: 22, maxWidth: 700 }}>
            {NOW_DATA.lately.map((item) => (
              <li key={item.text} style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 19, lineHeight: 1.4, flexShrink: 0 }}>
                  {item.emoji}
                </span>
                <p className="copy">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
