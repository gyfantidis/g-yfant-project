"use client";

export default function Menubar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        backgroundColor: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(30, 32, 48, 0.8)",
        display: "flex",
        alignItems: "center",
        paddingInline: 16,
        zIndex: 5000,
        userSelect: "none",
      }}
    >
      {/* Left: branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--os-accent)",
            textShadow: "0 0 8px rgba(0,255,136,0.4)",
          }}
        >
          GY OS
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "var(--os-muted)",
          }}
        >
          v1.0
        </span>
      </div>

      {/* Right: spacer */}
      <div style={{ flex: 1 }} />

      {/* Right: location badge */}
      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ color: "var(--os-accent)" }}>●</span>
        Athens, GR
      </div>
    </div>
  );
}
