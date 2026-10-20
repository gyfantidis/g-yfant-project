import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/content";

export const alt = `${PROFILE.name} — AI engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b1220";
const GRID = "#16233a";
const RULE = "#253752";
const INK = "#dce6f2";
const DIM = "#6f84a1";
const LINE = "#5cc8ff";
const OUT = "#ffb547";

function Node({ label, color = RULE, text = INK }: { label: string; color?: string; text?: string }) {
  return (
    <div style={{ display: "flex", padding: "12px 18px", border: `2px solid ${color}`, background: BG, color: text, fontSize: 24 }}>
      {label}
    </div>
  );
}

function Wire({ color = LINE }: { color?: string }) {
  return <div style={{ width: 44, height: 2, background: color }} />;
}

/** The share card: the site's title block and a one-line version of the homepage drawing. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: BG,
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          color: INK,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: DIM }}>g-yfantidis.gr</div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, marginTop: 28, letterSpacing: -2 }}>{PROFILE.name}</div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, color: LINE, letterSpacing: -2 }}>AI engineer.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Node label="your data" />
          <Wire />
          <Node label="retrieval · extraction · fine-tuning" color={LINE} />
          <Wire color={OUT} />
          <Node label="something you can use" color={OUT} text={OUT} />
        </div>

        <div style={{ display: "flex", border: `2px solid ${RULE}`, fontSize: 20, color: INK }}>
          {[
            ["drawn by", "G. Yfantidis"],
            ["based in", "Thessaloniki, GR"],
            ["status", "available for AI projects"],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px 16px", borderLeft: i ? `2px solid ${RULE}` : "none" }}>
              <span style={{ color: DIM, fontSize: 16 }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
