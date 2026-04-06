"use client";

import GlowButton from "@/components/ui/GlowButton";

export default function AboutApp() {
  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Profile section */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            backgroundColor: "var(--os-surface-2)",
            border: "2px solid var(--os-accent)",
            boxShadow: "0 0 20px rgba(0,255,136,0.2), 0 0 40px rgba(0,255,136,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 28,
            fontWeight: 600,
            color: "var(--os-accent)",
          }}
        >
          GY
        </div>

        {/* Name + title */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--os-text)",
              marginBottom: 4,
            }}
          >
            Giannis Yfantidis
          </h1>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 13,
              color: "var(--os-accent)",
              marginBottom: 12,
            }}
          >
            DevOps &amp; Full-Stack Engineer
          </p>

          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              borderRadius: 20,
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              fontSize: 12,
              color: "var(--os-accent)",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--os-accent)",
                animation: "cursorBlink 2s ease-in-out infinite",
              }}
            />
            Open to opportunities
          </div>
        </div>
      </div>

      {/* Bio */}
      <div
        style={{
          borderLeft: "2px solid var(--os-accent)",
          paddingLeft: 16,
          color: "var(--os-text)",
          fontSize: 14,
          lineHeight: 1.75,
          opacity: 0.9,
        }}
      >
        I build systems that scale and interfaces that matter. Currently
        pursuing an MSc in Data Science &amp; Machine Learning (DAMA). Based in
        Athens, Greece.
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {[
          { label: "Location", value: "Athens, GR" },
          { label: "Degree", value: "MSc DAMA" },
          { label: "Status", value: "Open" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: "var(--os-surface-2)",
              border: "1px solid var(--os-border)",
              borderRadius: 8,
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 10,
                color: "var(--os-muted)",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--os-text)" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <GlowButton href="https://github.com/g-yfant" variant="ghost">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </GlowButton>
        <GlowButton
          href="https://linkedin.com/in/giannis-yfantidis"
          variant="blue"
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </GlowButton>
        <GlowButton href="mailto:giannis@yfantidis.gr" variant="green">
          ✉ Email
        </GlowButton>
      </div>
    </div>
  );
}
