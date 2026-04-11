"use client";

import { useRef, useState } from "react";
import { AppId, useWindowManager } from "@/lib/window-manager";

const DOCK_APPS: { id: AppId; emoji: string; label: string }[] = [
  { id: "about",          emoji: "👤",  label: "About"         },
  { id: "projects",       emoji: "💼",  label: "Projects"      },
  { id: "skills",         emoji: "🛠️",  label: "Stack"         },
  { id: "certifications", emoji: "🏆",  label: "Certs"         },
  { id: "contact",        emoji: "📬",  label: "Contact"       },
  { id: "terminal",       emoji: ">_",  label: "Terminal"      },
  { id: "now",            emoji: "📍",  label: "Now"           },
  { id: "blog",           emoji: "✍️",  label: "Blog"          },
  { id: "books",          emoji: "📖",  label: "Books"         },
  { id: "photos",         emoji: "📷",  label: "Photos"        },
];

const BASE = 42;   // px — resting icon size
const PEAK = 66;   // px — icon size directly under cursor
const RANGE = 96;  // px — magnification radius

export default function Taskbar() {
  const { windows, openWindow, focusWindow, minimizeWindow } = useWindowManager();
  const [mouseX, setMouseX]     = useState<number | null>(null);
  const [tooltip, setTooltip]   = useState<string | null>(null);
  const [bouncing, setBouncing] = useState<AppId | null>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getSize(i: number): number {
    if (mouseX === null) return BASE;
    const btn = iconRefs.current[i];
    if (!btn) return BASE;
    const { left, width } = btn.getBoundingClientRect();
    const center = left + width / 2;
    const dist = Math.abs(mouseX - center);
    if (dist >= RANGE) return BASE;
    const t = 1 - dist / RANGE;
    return BASE + (PEAK - BASE) * t * t;
  }

  function handleClick(id: AppId) {
    const win = windows[id];
    if (!win.isOpen) {
      setBouncing(id);
      setTimeout(() => setBouncing(null), 700);
      openWindow(id);
    } else if (win.isMinimized) {
      focusWindow(id);
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 8,
        zIndex: 5000,
        pointerEvents: "none",
      }}
    >
      {/* Dock pill — hidden on mobile via taskbar-windows class */}
      <div
        className="taskbar-windows"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => { setMouseX(null); setTooltip(null); }}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 5,
          padding: "6px 10px",
          background: "rgba(10,10,18,0.72)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)",
          pointerEvents: "auto",
        }}
      >
        {DOCK_APPS.map((app, i) => {
          const win    = windows[app.id];
          const isOpen = win.isOpen && !win.isMinimized;
          const isMini = win.isOpen && win.isMinimized;
          const size   = getSize(i);
          const radius = size * 0.22;

          return (
            <div
              key={app.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              {/* Tooltip */}
              {tooltip === app.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 6px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(13,13,20,0.96)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 6,
                    padding: "3px 9px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: "var(--os-text)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.55)",
                    zIndex: 1,
                  }}
                >
                  {app.label}
                </div>
              )}

              {/* Icon button */}
              <button
                ref={(el) => { iconRefs.current[i] = el; }}
                onClick={() => handleClick(app.id)}
                onMouseEnter={() => setTooltip(app.id)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  width: size,
                  height: size,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isOpen
                    ? "rgba(0,255,136,0.1)"
                    : "rgba(255,255,255,0.06)",
                  border: isOpen
                    ? "1px solid rgba(0,255,136,0.22)"
                    : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: radius,
                  cursor: "pointer",
                  fontSize: size * 0.45,
                  lineHeight: 1,
                  transition:
                    "width 0.1s ease, height 0.1s ease, border-radius 0.1s ease, font-size 0.1s ease",
                  animation:
                    bouncing === app.id ? "dockBounce 0.65s ease" : "none",
                }}
              >
                {app.emoji}
              </button>

              {/* Active / minimized dot */}
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundColor: isOpen
                    ? "var(--os-accent)"
                    : isMini
                    ? "rgba(255,255,255,0.25)"
                    : "transparent",
                  transition: "background-color 0.2s",
                }}
              />
            </div>
          );
        })}

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 32,
            background: "rgba(255,255,255,0.1)",
            marginInline: 4,
            alignSelf: "center",
            flexShrink: 0,
          }}
        />

        {/* GitHub */}
        <DockLink
          href="https://github.com/gyfantidis"
          label="GitHub"
          tooltip={tooltip}
          onTooltip={setTooltip}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </DockLink>

        {/* LinkedIn */}
        <DockLink
          href="https://linkedin.com/in/giannis-yfantidis"
          label="LinkedIn"
          tooltip={tooltip}
          onTooltip={setTooltip}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </DockLink>
      </div>
    </div>
  );
}

// ── External link dock item ────────────────────────────────────
function DockLink({
  href,
  label,
  tooltip,
  onTooltip,
  children,
}: {
  href: string;
  label: string;
  tooltip: string | null;
  onTooltip: (v: string | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {tooltip === label && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(13,13,20,0.96)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 6,
            padding: "3px 9px",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "var(--os-text)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.55)",
            zIndex: 1,
          }}
        >
          {label}
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => onTooltip(label)}
        onMouseLeave={() => onTooltip(null)}
        style={{
          width: 42,
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 42 * 0.22,
          color: "var(--os-muted)",
          transition: "color 0.15s, background 0.15s, border-color 0.15s",
          flexShrink: 0,
          textDecoration: "none",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--os-text)";
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--os-muted)";
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
        }}
      >
        {children}
      </a>
      {/* Spacer to align with app dots */}
      <div style={{ width: 4, height: 4 }} />
    </div>
  );
}
