"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AppId, useWindowManager } from "@/lib/window-manager";

interface AppEntry {
  id: AppId;
  emoji: string;
  label: string;
}

interface SpotlightProps {
  apps: AppEntry[];
  isOpen: boolean;
  onClose: () => void;
  onMobileOpen?: (id: AppId) => void;
}

export default function Spotlight({ apps, isOpen, onClose, onMobileOpen }: SpotlightProps) {
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = apps.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const select = useCallback(
    (id: AppId) => {
      openWindow(id);
      onMobileOpen?.(id);
      onClose();
    },
    [openWindow, onMobileOpen, onClose]
  );

  // ESC intercepted with capture so it doesn't close windows
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [isOpen, onClose]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      select(filtered[selected].id);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "18vh",
        paddingInline: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 500,
          maxWidth: "100%",
          background: "rgba(13,13,20,0.97)",
          border: "1px solid rgba(0,255,136,0.18)",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,255,136,0.06), 0 0 40px rgba(0,255,136,0.04)",
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderBottom: "1px solid var(--os-border)",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--os-muted)"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search apps..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 14,
              color: "var(--os-text)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 10,
              color: "var(--os-muted)",
              background: "var(--os-surface-2)",
              padding: "2px 7px",
              borderRadius: 4,
              border: "1px solid var(--os-border)",
              flexShrink: 0,
            }}
          >
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 12,
                color: "var(--os-muted)",
                textAlign: "center",
              }}
            >
              No apps found
            </div>
          ) : (
            filtered.map((app, i) => (
              <button
                key={app.id}
                onClick={() => select(app.id)}
                onMouseEnter={() => setSelected(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  background: i === selected ? "rgba(0,255,136,0.07)" : "none",
                  borderLeft: `2px solid ${i === selected ? "var(--os-accent)" : "transparent"}`,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.1s",
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{app.emoji}</span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 13,
                    color: i === selected ? "var(--os-text)" : "var(--os-muted)",
                    transition: "color 0.1s",
                  }}
                >
                  {app.label}
                </span>
                {i === selected && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 10,
                      color: "var(--os-accent)",
                      opacity: 0.7,
                    }}
                  >
                    ↵ open
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid var(--os-border)",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          {[
            ["↑↓", "navigate"],
            ["↵", "open"],
            ["esc", "close"],
          ].map(([key, label]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 10,
                color: "var(--os-muted)",
              }}
            >
              <span
                style={{
                  background: "var(--os-surface-2)",
                  border: "1px solid var(--os-border)",
                  padding: "1px 6px",
                  borderRadius: 3,
                }}
              >
                {key}
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
