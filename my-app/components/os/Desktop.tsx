"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WindowManagerProvider, AppId, useWindowManager } from "@/lib/window-manager";
import Window, { WindowConfig } from "@/components/os/Window";
import DesktopIcon from "@/components/os/DesktopIcon";
import Menubar from "@/components/os/Menubar";
import Taskbar from "@/components/os/Taskbar";
import Spotlight from "@/components/os/Spotlight";

// App components
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import TerminalApp from "@/components/apps/TerminalApp";
import BlogApp from "@/components/apps/BlogApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";
import CertificationsApp from "@/components/apps/CertificationsApp";
import NowApp from "@/components/apps/NowApp";
import BooksApp from "@/components/apps/BooksApp";
import PhotosApp from "@/components/apps/PhotosApp";

// ── App registry ──────────────────────────────────────────────
interface AppDef {
  id: AppId;
  emoji: string;
  label: string;
  component: React.ComponentType;
  window: Omit<WindowConfig, "id">;
}

const APPS: AppDef[] = [
  {
    id: "about",
    emoji: "👤",
    label: "About",
    component: AboutApp,
    window: {
      title: "about.app",
      defaultPosition: { x: 80, y: 56 },
      defaultSize: { width: 480, height: 510 },
    },
  },
  {
    id: "projects",
    emoji: "💼",
    label: "Projects",
    component: ProjectsApp,
    window: {
      title: "projects.app",
      defaultPosition: { x: 200, y: 72 },
      defaultSize: { width: 700, height: 540 },
    },
  },
  {
    id: "skills",
    emoji: "🛠️",
    label: "Stack",
    component: SkillsApp,
    window: {
      title: "skills.app",
      defaultPosition: { x: 120, y: 80 },
      defaultSize: { width: 660, height: 520 },
    },
  },
  {
    id: "certifications",
    emoji: "🏆",
    label: "Certs",
    component: CertificationsApp,
    window: {
      title: "certifications.app",
      defaultPosition: { x: 220, y: 76 },
      defaultSize: { width: 620, height: 520 },
    },
  },
  {
    id: "contact",
    emoji: "📬",
    label: "Contact",
    component: ContactApp,
    window: {
      title: "contact.app",
      defaultPosition: { x: 300, y: 88 },
      defaultSize: { width: 480, height: 500 },
    },
  },
  {
    id: "terminal",
    emoji: ">_",
    label: "Terminal",
    component: TerminalApp,
    window: {
      title: "terminal.app",
      defaultPosition: { x: 160, y: 96 },
      defaultSize: { width: 680, height: 440 },
    },
  },
  {
    id: "now",
    emoji: "📍",
    label: "Now",
    component: NowApp,
    window: {
      title: "now.app",
      defaultPosition: { x: 260, y: 60 },
      defaultSize: { width: 480, height: 520 },
    },
  },
  {
    id: "blog",
    emoji: "✍️",
    label: "Blog",
    component: BlogApp,
    window: {
      title: "blog.app",
      defaultPosition: { x: 240, y: 64 },
      defaultSize: { width: 660, height: 540 },
    },
  },
  {
    id: "books",
    emoji: "📖",
    label: "Books",
    component: BooksApp,
    window: {
      title: "books.app",
      defaultPosition: { x: 300, y: 70 },
      defaultSize: { width: 520, height: 560 },
    },
  },
  {
    id: "photos",
    emoji: "📷",
    label: "Photos",
    component: PhotosApp,
    window: {
      title: "photos.app",
      defaultPosition: { x: 180, y: 60 },
      defaultSize: { width: 620, height: 540 },
    },
  },
];

// ── Context menu ───────────────────────────────────────────────
interface ContextMenuState {
  x: number;
  y: number;
}

function ContextMenu({
  pos,
  onClose,
}: {
  pos: ContextMenuState;
  onClose: () => void;
}) {
  const { openWindow, windows, closeWindow } = useWindowManager();

  function openApp(id: AppId) {
    openWindow(id);
    onClose();
  }

  function closeAll() {
    Object.keys(windows).forEach((id) => closeWindow(id as AppId));
    onClose();
  }

  // Adjust position so menu doesn't go off-screen
  const menuWidth = 200;
  const menuHeight = APPS.length * 36 + 90;
  const x = pos.x + menuWidth > window.innerWidth ? pos.x - menuWidth : pos.x;
  const y = pos.y + menuHeight > window.innerHeight ? pos.y - menuHeight : pos.y;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        onContextMenu={(e) => { e.preventDefault(); onClose(); }}
        style={{ position: "fixed", inset: 0, zIndex: 7000 }}
      />
      {/* Menu */}
      <div
        style={{
          position: "fixed",
          top: y,
          left: x,
          zIndex: 7001,
          background: "rgba(13,13,20,0.97)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,255,136,0.05)",
          minWidth: menuWidth,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "8px 12px 6px",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            color: "var(--os-muted)",
            borderBottom: "1px solid var(--os-border)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          desktop.context
        </div>

        {/* App list */}
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--os-text)",
              textAlign: "left",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,255,136,0.07)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "none")
            }
          >
            <span style={{ fontSize: 14 }}>{app.emoji}</span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 12,
              }}
            >
              {app.label}
            </span>
          </button>
        ))}

        {/* Separator + Close All */}
        <div style={{ borderTop: "1px solid var(--os-border)", margin: "4px 0" }} />
        <button
          onClick={closeAll}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--os-muted)",
            textAlign: "left",
            transition: "background 0.1s, color 0.1s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,95,87,0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--os-red)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "none";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--os-muted)";
          }}
        >
          <span style={{ fontSize: 14 }}>✕</span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
            }}
          >
            Close All Windows
          </span>
        </button>
      </div>
    </>
  );
}

// ── Mobile app drawer ──────────────────────────────────────────
interface MobileDrawerProps {
  activeApp: AppId | null;
  onAppOpen: (id: AppId) => void;
  onBack: () => void;
  onLongPress: (x: number, y: number) => void;
}

function MobileDrawer({ activeApp, onAppOpen, onBack, onLongPress }: MobileDrawerProps) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeAppDef = APPS.find((a) => a.id === activeApp);

  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    longPressTimer.current = setTimeout(() => {
      onLongPress(touch.clientX, touch.clientY);
    }, 600);
  }

  function handleTouchEnd() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
    >
      {/* App drawer */}
      {!activeApp && (
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "28px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            alignContent: "start",
          }}
        >
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppOpen(app.id)}
              style={{
                background: "var(--os-surface-2)",
                border: "1px solid var(--os-border)",
                borderRadius: 12,
                padding: "20px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span style={{ fontSize: 34 }}>{app.emoji}</span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 11,
                  color: "var(--os-text)",
                }}
              >
                {app.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Active app full screen */}
      <AnimatePresence>
        {activeApp && activeAppDef && (
          <motion.div
            key={activeApp}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 6000,
              background: "var(--os-surface)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Mobile title bar */}
            <div
              style={{
                paddingTop: "max(14px, env(safe-area-inset-top))",
                paddingBottom: 14,
                paddingInline: 16,
                background: "var(--os-titlebar)",
                borderBottom: "1px solid var(--os-border)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                onClick={onBack}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--os-accent)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12,
                  color: "var(--os-muted)",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {activeAppDef.window.title}
              </span>
              <div style={{ width: 56 }} />
            </div>

            {/* App content */}
            <div style={{ flex: 1, overflow: "auto" }}>
              <activeAppDef.component />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Keyboard shortcuts modal ───────────────────────────────────
function ShortcutsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "?") {
        e.stopImmediatePropagation();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [onClose]);

  const sections: { label: string; rows: [string, string][] }[] = [
    {
      label: "Global",
      rows: [
        ["⌘K / Ctrl+K", "Open Spotlight search"],
        ["?", "Toggle this shortcuts panel"],
        ["Right-click", "Desktop context menu"],
      ],
    },
    {
      label: "Window",
      rows: [
        ["Drag title bar", "Move window"],
        ["Double-click title bar", "Maximize / Restore"],
        ["Green ● button", "Maximize / Restore"],
        ["Yellow ● button", "Minimize to taskbar"],
        ["Red ● button", "Close window"],
        ["Drag corner", "Resize window"],
        ["ESC", "Close focused window"],
        ["Drag to edge", "Snap window left / right"],
      ],
    },
    {
      label: "Terminal",
      rows: [
        ["help", "Show all commands"],
        ["neofetch", "System info"],
        ["open <app>", "Open any app by name"],
        ["sudo hire-me", "Make an offer 😄"],
      ],
    },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8500,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          maxWidth: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          background: "rgba(13,13,20,0.97)",
          border: "1px solid rgba(0,255,136,0.18)",
          borderRadius: 14,
          boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,255,136,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid var(--os-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
              color: "var(--os-accent)",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            keyboard.shortcuts
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--os-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              padding: "2px 6px",
            }}
          >
            ESC
          </button>
        </div>

        {/* Sections */}
        <div style={{ padding: "16px" }}>
          {sections.map((section) => (
            <div key={section.label} style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--os-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {section.label}
                <div style={{ flex: 1, height: 1, background: "var(--os-border)" }} />
              </div>
              {section.rows.map(([key, desc]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(30,32,48,0.5)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 11,
                      color: "var(--os-accent)",
                      background: "rgba(0,255,136,0.07)",
                      border: "1px solid rgba(0,255,136,0.15)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                      minWidth: 160,
                      textAlign: "center",
                    }}
                  >
                    {key}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--os-muted)",
                      fontFamily: "var(--font-dmsans), sans-serif",
                    }}
                  >
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Onboarding hint bar ────────────────────────────────────────
function OnboardingHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("gy-os-hint-seen");
    if (!seen) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("gy-os-hint-seen", "1");
    setVisible(false);
  }

  // Auto-dismiss after 12 seconds
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 12000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      style={{
        position: "fixed",
        bottom: 84,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 6500,
        background: "rgba(13,13,20,0.95)",
        border: "1px solid rgba(0,255,136,0.2)",
        borderRadius: 8,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        whiteSpace: "nowrap",
        pointerEvents: "auto",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
        }}
      >
        <span style={{ color: "var(--os-accent)" }}>Right-click</span>
        {" · "}
        <span style={{ color: "var(--os-accent)" }}>⌘K</span> search
        {" · "}
        <span style={{ color: "var(--os-accent)" }}>?</span> shortcuts
        {" · "}
        <span style={{ color: "var(--os-accent)" }}>ESC</span> close window
      </span>
      <button
        onClick={dismiss}
        style={{
          background: "none",
          border: "none",
          color: "var(--os-muted)",
          cursor: "pointer",
          fontSize: 12,
          padding: "0 2px",
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label="Dismiss hint"
      >
        ✕
      </button>
    </motion.div>
  );
}

// ── Desktop content (windows + icons) ─────────────────────────
function DesktopContent() {
  const { windows } = useWindowManager();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [mobileActiveApp, setMobileActiveApp] = useState<AppId | null>(null);

  // Cmd+K / Ctrl+K → Spotlight | ? → Shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((s) => !s);
        return;
      }
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "?" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setShortcutsOpen((s) => !s);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  // Mobile long-press context menu
  const handleMobileLongPress = useCallback((x: number, y: number) => {
    setContextMenu({ x, y });
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Menubar */}
        <Menubar
          onSpotlightOpen={() => setSpotlightOpen(true)}
          onShortcutsOpen={() => setShortcutsOpen(true)}
        />

        {/* Desktop area */}
        <div
          className="particle-grid scanlines"
          onContextMenu={handleContextMenu}
          style={{
            flex: 1,
            position: "relative",
            marginTop: 28,
            marginBottom: 72,
            backgroundColor: "var(--os-bg)",
            overflow: "hidden",
          }}
        >
          {/* Desktop icons — top-left grid */}
          <div
            className="hidden md:flex"
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              flexDirection: "column",
              gap: 8,
            }}
          >
            {APPS.map((app) => (
              <DesktopIcon
                key={app.id}
                id={app.id}
                emoji={app.emoji}
                label={app.label}
              />
            ))}
          </div>

          {/* Windows — desktop only */}
          <div className="hidden md:block">
            <AnimatePresence>
              {APPS.map((app) => {
                const win = windows[app.id];
                if (!win.isOpen || win.isMinimized) return null;
                return (
                  <Window
                    key={app.id}
                    id={app.id}
                    title={app.window.title}
                    defaultPosition={app.window.defaultPosition}
                    defaultSize={app.window.defaultSize}
                  >
                    <app.component />
                  </Window>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile drawer (hidden on md+) */}
          <div
            className="flex md:hidden"
            style={{ height: "100%", overflow: "auto" }}
          >
            <MobileDrawer
              activeApp={mobileActiveApp}
              onAppOpen={(id) => setMobileActiveApp(id)}
              onBack={() => setMobileActiveApp(null)}
              onLongPress={handleMobileLongPress}
            />
          </div>
        </div>

        {/* Taskbar */}
        <Taskbar />
      </div>

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          pos={contextMenu}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Spotlight */}
      <Spotlight
        apps={APPS}
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onMobileOpen={(id) => setMobileActiveApp(id)}
      />

      {/* Shortcuts modal */}
      {shortcutsOpen && (
        <ShortcutsModal onClose={() => setShortcutsOpen(false)} />
      )}

      {/* Onboarding hint */}
      <OnboardingHint />
    </>
  );
}

// ── Desktop root (provides WindowManager context) ──────────────
export default function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopContent />
    </WindowManagerProvider>
  );
}
