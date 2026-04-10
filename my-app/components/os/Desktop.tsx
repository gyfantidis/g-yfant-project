"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WindowManagerProvider, AppId, useWindowManager } from "@/lib/window-manager";
import Window, { WindowConfig } from "@/components/os/Window";
import DesktopIcon from "@/components/os/DesktopIcon";
import Menubar from "@/components/os/Menubar";
import Taskbar from "@/components/os/Taskbar";

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
];

// ── Mobile app drawer ──────────────────────────────────────────
function MobileDrawer() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  function openApp(id: AppId) {
    setActiveApp(id);
  }

  const activeAppDef = APPS.find((a) => a.id === activeApp);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
              onClick={() => openApp(app.id)}
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
                onClick={() => setActiveApp(null)}
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

// ── Desktop content (windows + icons) ─────────────────────────
function DesktopContent() {
  const { windows } = useWindowManager();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Menubar */}
      <Menubar />

      {/* Desktop area */}
      <div
        className="particle-grid scanlines"
        style={{
          flex: 1,
          position: "relative",
          marginTop: 28,
          marginBottom: 48,
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
          <MobileDrawer />
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
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
