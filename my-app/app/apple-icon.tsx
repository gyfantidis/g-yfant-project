import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as icon.svg: a box (the system) with an amber line leaving it (the output). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b1220" }}>
        <div style={{ width: 70, height: 70, border: "6px solid #5cc8ff", marginLeft: -24 }} />
        <div style={{ width: 44, height: 6, background: "#ffb547" }} />
      </div>
    ),
    size,
  );
}
