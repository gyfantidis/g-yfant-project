"use client";

interface TagPillProps {
  label: string;
  variant?: "green" | "blue" | "muted" | "surface";
}

const variants = {
  green: {
    background: "rgba(0, 255, 136, 0.1)",
    color: "#00ff88",
    border: "1px solid rgba(0, 255, 136, 0.2)",
  },
  blue: {
    background: "rgba(14, 165, 233, 0.1)",
    color: "#0ea5e9",
    border: "1px solid rgba(14, 165, 233, 0.2)",
  },
  muted: {
    background: "rgba(74, 85, 104, 0.15)",
    color: "#8892a4",
    border: "1px solid rgba(74, 85, 104, 0.25)",
  },
  surface: {
    background: "rgba(255, 255, 255, 0.04)",
    color: "#e2e8f0",
    border: "1px solid rgba(255,255,255,0.08)",
  },
};

export default function TagPill({ label, variant = "muted" }: TagPillProps) {
  const s = variants[variant];
  return (
    <span
      className="tag-pill"
      style={{ background: s.background, color: s.color, border: s.border }}
    >
      {label}
    </span>
  );
}
