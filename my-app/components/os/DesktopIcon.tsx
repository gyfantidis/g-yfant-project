"use client";

import { AppId, useWindowManager } from "@/lib/window-manager";

interface DesktopIconProps {
  id: AppId;
  emoji: string;
  label: string;
}

export default function DesktopIcon({ id, emoji, label }: DesktopIconProps) {
  const { toggleWindow, windows } = useWindowManager();
  const isOpen = windows[id].isOpen && !windows[id].isMinimized;

  return (
    <button
      className="desktop-icon"
      onClick={() => toggleWindow(id)}
      aria-label={`Open ${label}`}
      style={{
        background: "none",
        border: "none",
        outline: "none",
        position: "relative",
      }}
    >
      <span className="desktop-icon-emoji">{emoji}</span>
      <span className="desktop-icon-label">{label}</span>

      {/* Open indicator dot */}
      {isOpen && (
        <span
          style={{
            position: "absolute",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "var(--os-accent)",
            boxShadow: "0 0 6px var(--os-accent)",
          }}
        />
      )}
    </button>
  );
}
