"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppId, useWindowManager } from "@/lib/window-manager";

// ── Types ──────────────────────────────────────────────────────
interface MenuItemDef {
  label?: string;
  shortcut?: string;
  action?: () => void;
  external?: string;
  disabled?: boolean;
  separator?: boolean;
}

// ── App display names ──────────────────────────────────────────
const APP_NAMES: Record<AppId, string> = {
  about: "About",
  projects: "Projects",
  terminal: "Terminal",
  blog: "Blog",
  skills: "Stack",
  contact: "Contact",
  certifications: "Certifications",
  now: "Now",
  books: "Books",
  photos: "Photos",
};

// ── Dropdown menu ──────────────────────────────────────────────
function Dropdown({
  items,
  onClose,
}: {
  items: MenuItemDef[];
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        background: "rgba(13,13,20,0.98)",
        border: "1px solid rgba(0,255,136,0.15)",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        minWidth: 220,
        boxShadow: "0 16px 48px rgba(0,0,0,0.85)",
        zIndex: 5100,
        overflow: "hidden",
        paddingBlock: 4,
      }}
    >
      {items.map((item, i) => {
        if (item.separator) {
          return (
            <div
              key={`sep-${i}`}
              style={{ height: 1, background: "var(--os-border)", marginBlock: 3 }}
            />
          );
        }
        return (
          <button
            key={item.label}
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              if (item.action) item.action();
              if (item.external)
                window.open(item.external, "_blank", "noopener,noreferrer");
              onClose();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 16px",
              background: "none",
              border: "none",
              cursor: item.disabled ? "default" : "pointer",
              textAlign: "left",
              gap: 24,
            }}
            onMouseEnter={(e) => {
              if (!item.disabled)
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(0,255,136,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 12,
                color: item.disabled ? "rgba(74,85,104,0.4)" : "var(--os-text)",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
            {item.shortcut && (
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  color: item.disabled ? "rgba(74,85,104,0.3)" : "var(--os-muted)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Menu button (with dropdown) ────────────────────────────────
function MenuButton({
  id,
  label,
  items,
  openMenu,
  onToggle,
  onClose,
  bold,
}: {
  id: string;
  label: string;
  items: MenuItemDef[];
  openMenu: string | null;
  onToggle: (id: string) => void;
  onClose: () => void;
  bold?: boolean;
}) {
  const isOpen = openMenu === id;

  return (
    <div style={{ position: "relative" }}>
      <button
        onMouseDown={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        style={{
          background: isOpen ? "rgba(0,255,136,0.1)" : "none",
          border: "none",
          borderRadius: isOpen ? "4px 4px 0 0" : 4,
          padding: "3px 8px",
          cursor: "pointer",
          color: isOpen ? "var(--os-text)" : "var(--os-text)",
          display: "flex",
          alignItems: "center",
          gap: 3,
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => {
          if (!isOpen)
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen)
            (e.currentTarget as HTMLButtonElement).style.background = "none";
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            fontWeight: bold ? 700 : 400,
            color: bold ? "var(--os-text)" : "var(--os-muted)",
            letterSpacing: bold ? "0.01em" : "0",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 7, color: "var(--os-muted)", lineHeight: 1 }}>
          ▾
        </span>
      </button>

      {isOpen && <Dropdown items={items} onClose={onClose} />}
    </div>
  );
}

// ── Clock ──────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/Athens",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-GB", {
          timeZone: "Europe/Athens",
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 11,
        color: "var(--os-text)",
        letterSpacing: "0.04em",
        display: "flex",
        gap: 6,
      }}
    >
      <span style={{ color: "var(--os-muted)" }}>{date}</span>
      <span>{time}</span>
    </span>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
      <path d="M12 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="var(--os-text)" />
      <path d="M12 14c1.7 0 3.2.7 4.3 1.8l1.5-1.5A8.5 8.5 0 0 0 12 12a8.5 8.5 0 0 0-5.8 2.3l1.5 1.5A6.5 6.5 0 0 1 12 14z" fill="var(--os-text)" />
      <path d="M12 9.5c2.9 0 5.5 1.2 7.4 3.1l1.5-1.5A13 13 0 0 0 12 7.5a13 13 0 0 0-8.9 3.6l1.5 1.5A11 11 0 0 1 12 9.5z" fill="var(--os-text)" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, opacity: 0.55 }}>
      <div
        style={{
          width: 22,
          height: 11,
          border: "1px solid var(--os-text)",
          borderRadius: 3,
          padding: 1.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "82%",
            height: "100%",
            background: "var(--os-accent)",
            borderRadius: 1.5,
          }}
        />
      </div>
      <div
        style={{
          width: 2,
          height: 5,
          background: "var(--os-text)",
          borderRadius: "0 1px 1px 0",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 10,
          color: "var(--os-text)",
          marginLeft: 2,
        }}
      >
        82%
      </span>
    </div>
  );
}

// ── Menubar ────────────────────────────────────────────────────
interface MenubarProps {
  onSpotlightOpen: () => void;
  onShortcutsOpen: () => void;
}

export default function Menubar({ onSpotlightOpen, onShortcutsOpen }: MenubarProps) {
  const { windows, closeWindow, minimizeWindow, openWindow } = useWindowManager();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "amber">("dark");
  const menubarRef = useRef<HTMLDivElement>(null);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("gy-os-theme");
    if (saved === "amber") setTheme("amber");
  }, []);

  // Apply theme
  useEffect(() => {
    if (theme === "amber") {
      document.documentElement.setAttribute("data-theme", "amber");
      localStorage.setItem("gy-os-theme", "amber");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("gy-os-theme");
    }
  }, [theme]);

  // Close menu on outside click
  useEffect(() => {
    if (!openMenu) return;
    function onDown(e: MouseEvent) {
      if (!menubarRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [openMenu]);

  function toggleMenu(id: string) {
    setOpenMenu((m) => (m === id ? null : id));
  }

  function closeMenu() {
    setOpenMenu(null);
  }

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "amber" : "dark"));
  }

  function closeAll() {
    Object.keys(windows).forEach((id) => closeWindow(id as AppId));
  }

  // Derive focused app (highest zIndex among open, non-minimized windows)
  const focusedApp = useMemo<AppId | null>(() => {
    let maxZ = -1;
    let focused: AppId | null = null;
    for (const [id, win] of Object.entries(windows) as [AppId, (typeof windows)[AppId]][]) {
      if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
        maxZ = win.zIndex;
        focused = id as AppId;
      }
    }
    return focused;
  }, [windows]);

  // ── GY-OS system menu ──
  const gyOsItems: MenuItemDef[] = [
    { label: "About GY-OS", action: () => openWindow("about") },
    { separator: true },
    {
      label: theme === "dark" ? "Switch to Amber Theme  ☽" : "Switch to Dark Theme  ☀",
      action: toggleTheme,
    },
    { separator: true },
    {
      label: "Spotlight Search",
      shortcut: "⌘K",
      action: onSpotlightOpen,
    },
    {
      label: "Keyboard Shortcuts",
      shortcut: "?",
      action: onShortcutsOpen,
    },
    { separator: true },
    { label: "Close All Windows", action: closeAll },
  ];

  // ── App name menu (window operations) ──
  const appNameItems: MenuItemDef[] = focusedApp
    ? [
        { label: APP_NAMES[focusedApp], disabled: true },
        { separator: true },
        {
          label: "Close Window",
          shortcut: "ESC",
          action: () => closeWindow(focusedApp),
        },
        {
          label: "Minimize",
          action: () => minimizeWindow(focusedApp),
        },
      ]
    : [
        { label: "No window focused", disabled: true },
      ];

  // ── App-specific menus ──
  const appSpecificMenus = useMemo<{ label: string; items: MenuItemDef[] }[]>(() => {
    if (!focusedApp) return [];

    const menus: Partial<Record<AppId, { label: string; items: MenuItemDef[] }[]>> = {
      about: [
        {
          label: "About",
          items: [
            {
              label: "Connect on LinkedIn",
              external: "https://linkedin.com/in/giannis-yfantidis",
            },
            { label: "View GitHub", external: "https://github.com/gyfantidis" },
            { separator: true },
            { label: "Download Resume", disabled: true },
          ],
        },
      ],
      projects: [
        {
          label: "Projects",
          items: [
            { label: "Open GitHub", external: "https://github.com/gyfantidis" },
            {
              label: "Gendox (live)",
              external: "https://ctrlspace.dev",
            },
            { separator: true },
            { label: "Filter by Type", disabled: true },
            { label: "Sort by Date", disabled: true },
          ],
        },
      ],
      terminal: [
        {
          label: "Terminal",
          items: [
            {
              label: "Clear",
              shortcut: "⌘L",
              action: () =>
                window.dispatchEvent(new CustomEvent("gy-os:terminal-clear")),
            },
            { separator: true },
            { label: "New Session", disabled: true },
            { label: "Export History", disabled: true },
          ],
        },
        {
          label: "View",
          items: [
            { label: "Increase Font Size", shortcut: "⌘+", disabled: true },
            { label: "Decrease Font Size", shortcut: "⌘−", disabled: true },
          ],
        },
      ],
      blog: [
        {
          label: "Blog",
          items: [
            { label: "All Posts", disabled: true },
            { label: "Latest First", disabled: true },
            { separator: true },
            { label: "RSS Feed", disabled: true },
          ],
        },
      ],
      skills: [
        {
          label: "View",
          items: [
            { label: "By Category", disabled: true },
            { label: "Alphabetical", disabled: true },
            { separator: true },
            { label: "Export as JSON", disabled: true },
          ],
        },
      ],
      contact: [
        {
          label: "Contact",
          items: [
            {
              label: "Send Email",
              shortcut: "✉",
              external: "mailto:giannis@g-yfantidis.gr",
            },
            {
              label: "LinkedIn",
              external: "https://linkedin.com/in/giannis-yfantidis",
            },
            { label: "GitHub", external: "https://github.com/gyfantidis" },
          ],
        },
      ],
      certifications: [
        {
          label: "View",
          items: [
            { label: "Sort by Date", disabled: true },
            { label: "Sort by Provider", disabled: true },
            { separator: true },
            { label: "Export List", disabled: true },
          ],
        },
      ],
      now: [
        {
          label: "View",
          items: [
            { label: "Scroll to Top", disabled: true },
            { separator: true },
            {
              label: "What is /now?",
              external: "https://nownownow.com",
            },
          ],
        },
      ],
      books: [
        {
          label: "Books",
          items: [
            { label: "Currently Reading", disabled: true },
            { label: "All Books", disabled: true },
            { separator: true },
            { label: "Goodreads Profile", disabled: true },
          ],
        },
      ],
      photos: [
        {
          label: "Photos",
          items: [
            { label: "Grid View", disabled: true },
            { separator: true },
            { label: "Previous Photo", shortcut: "←", disabled: true },
            { label: "Next Photo", shortcut: "→", disabled: true },
            { separator: true },
            { label: "Slideshow", disabled: true },
          ],
        },
      ],
    };

    return menus[focusedApp] ?? [];
  }, [focusedApp]);

  return (
    <div
      ref={menubarRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        backgroundColor: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(30, 32, 48, 0.8)",
        display: "flex",
        alignItems: "center",
        paddingInline: 8,
        zIndex: 5000,
        userSelect: "none",
        gap: 0,
      }}
    >
      {/* ── Left: menus ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {/* GY-OS system menu */}
        <MenuButton
          id="gy-os"
          label="GY-OS"
          items={gyOsItems}
          openMenu={openMenu}
          onToggle={toggleMenu}
          onClose={closeMenu}
          bold
        />

        {/* App name menu */}
        <MenuButton
          id="app-name"
          label={focusedApp ? APP_NAMES[focusedApp] : "Desktop"}
          items={appNameItems}
          openMenu={openMenu}
          onToggle={toggleMenu}
          onClose={closeMenu}
          bold
        />

        {/* App-specific menus */}
        {appSpecificMenus.map((menu) => (
          <MenuButton
            key={menu.label}
            id={`app-${menu.label}`}
            label={menu.label}
            items={menu.items}
            openMenu={openMenu}
            onToggle={toggleMenu}
            onClose={closeMenu}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* ── Right: system status ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Spotlight button */}
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
            closeMenu();
            onSpotlightOpen();
          }}
          title="Spotlight Search (⌘K)"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--os-border)",
            borderRadius: 5,
            padding: "2px 7px",
            cursor: "pointer",
            color: "var(--os-muted)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--os-text)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(0,255,136,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--os-muted)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--os-border)";
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span
            className="hidden md:inline"
            style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 10 }}
          >
            ⌘K
          </span>
        </button>

        <div style={{ width: 1, height: 14, background: "var(--os-border)" }} />

        {/* WiFi */}
        <span className="hidden sm:flex" style={{ alignItems: "center" }}>
          <WifiIcon />
        </span>

        {/* Battery */}
        <span className="hidden sm:flex" style={{ alignItems: "center" }}>
          <BatteryIcon />
        </span>

        <div style={{ width: 1, height: 14, background: "var(--os-border)" }} />

        <Clock />

        <div style={{ width: 1, height: 14, background: "var(--os-border)" }} />

        {/* Location */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "var(--os-muted)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ color: "var(--os-accent)" }}>●</span>
          <span className="hidden sm:inline">Thessaloniki, GR</span>
        </div>
      </div>
    </div>
  );
}
