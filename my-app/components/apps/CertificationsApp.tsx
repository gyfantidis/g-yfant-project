"use client";

import { CERTS, BADGE_COLORS } from "@/lib/content";

export default function CertificationsApp() {
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
          userSelect: "none",
        }}
      >
        ~/certifications — {CERTS.length} certificates
      </div>

      {/* List */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {CERTS.map((cert, i) => {
          const badge = cert.badge ? BADGE_COLORS[cert.badge] : BADGE_COLORS.udemy;
          return (
            <div
              key={i}
              style={{
                background: "var(--os-surface-2)",
                border: "1px solid var(--os-border)",
                borderRadius: 8,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,136,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--os-border)")
              }
            >
              {/* Issuer badge */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: badge.bg,
                  border: `1px solid ${badge.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 9,
                  fontWeight: 700,
                  color: badge.color,
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: 2,
                }}
              >
                {badge.label}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--os-text)",
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: "var(--os-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{cert.issuer}</span>
                  <span>·</span>
                  <span>{cert.date}</span>
                  {cert.expires && (
                    <>
                      <span>·</span>
                      <span style={{ color: "var(--os-accent)" }}>
                        valid until {cert.expires}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Link */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="View certificate"
                  style={{
                    color: "var(--os-muted)",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--os-accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--os-muted)")
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
