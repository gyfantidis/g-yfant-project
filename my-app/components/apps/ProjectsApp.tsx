"use client";

import TagPill from "@/components/ui/TagPill";
import { PROJECTS, highlightColors } from "@/lib/content";

export default function ProjectsApp() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Explorer toolbar */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid var(--os-border)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
          background: "var(--os-surface-2)",
          userSelect: "none",
        }}
      >
        ~/projects — {PROJECTS.length} items
      </div>

      {/* File list */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            style={{
              background: "var(--os-surface-2)",
              border: "1px solid var(--os-border)",
              borderRadius: 8,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "border-color 0.15s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--os-border)")
            }
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 13,
                  color: "var(--os-text)",
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                📁 {p.title}
              </span>
              {p.highlight && highlightColors[p.highlight] && (
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-jetbrains), monospace",
                    padding: "2px 8px",
                    borderRadius: 12,
                    background: highlightColors[p.highlight].bg,
                    color: highlightColors[p.highlight].color,
                  }}
                >
                  {p.highlight}
                </span>
              )}
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: "var(--os-muted)",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
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

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                color: "var(--os-muted)",
                lineHeight: 1.6,
              }}
            >
              {p.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tech.map((t) => (
                <TagPill key={t} label={t} variant="muted" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
