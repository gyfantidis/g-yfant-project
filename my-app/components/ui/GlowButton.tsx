"use client";

import { ReactNode, MouseEventHandler } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  variant?: "green" | "blue" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

const styles = {
  green: {
    background: "rgba(0, 255, 136, 0.12)",
    color: "#00ff88",
    border: "1px solid rgba(0, 255, 136, 0.3)",
    hoverShadow: "0 0 16px rgba(0, 255, 136, 0.25)",
  },
  blue: {
    background: "rgba(14, 165, 233, 0.12)",
    color: "#0ea5e9",
    border: "1px solid rgba(14, 165, 233, 0.3)",
    hoverShadow: "0 0 16px rgba(14, 165, 233, 0.25)",
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    border: "1px solid rgba(255,255,255,0.1)",
    hoverShadow: "none",
  },
};

export default function GlowButton({
  children,
  onClick,
  href,
  variant = "green",
  className = "",
  type = "button",
}: GlowButtonProps) {
  const s = styles[variant];

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    borderRadius: "8px",
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.18s ease",
    background: s.background,
    color: s.color,
    border: s.border,
    textDecoration: "none",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={baseStyle}
        className={className}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = s.hoverShadow;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={baseStyle}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = s.hoverShadow;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </button>
  );
}
