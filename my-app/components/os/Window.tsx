"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useDragControls, useMotionValue, AnimatePresence } from "framer-motion";
import { AppId, useWindowManager } from "@/lib/window-manager";

export interface WindowConfig {
  id: AppId;
  title: string;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

interface WindowProps extends WindowConfig {
  children: ReactNode;
}

export default function Window({
  id,
  title,
  defaultPosition,
  defaultSize,
  children,
}: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow } =
    useWindowManager();
  const win = windows[id];
  const dragControls = useDragControls();

  const x = useMotionValue(defaultPosition.x);
  const y = useMotionValue(defaultPosition.y);

  const [size, setSize] = useState(defaultSize);
  const resizeStart = useRef(defaultSize);

  // Handle Escape key to close
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape" && win.isOpen && !win.isMinimized) {
        closeWindow(id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id, win.isOpen, win.isMinimized, closeWindow]);

  function startDrag(e: ReactPointerEvent<HTMLDivElement>) {
    dragControls.start(e as unknown as Parameters<typeof dragControls.start>[0]);
  }

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      style={{
        x,
        y,
        width: size.width,
        height: size.height,
        zIndex: win.zIndex,
        position: "absolute",
        top: 0,
        left: 0,
      }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      onPointerDown={() => focusWindow(id)}
      className="os-window"
      role="dialog"
      aria-label={title}
      tabIndex={-1}
    >
      {/* ── Title Bar (drag handle) ── */}
      <div
        className="os-titlebar cursor-grab select-none"
        onPointerDown={startDrag}
      >
        {/* Traffic lights */}
        <button
          className="traffic-light"
          style={{ backgroundColor: "var(--os-red)" }}
          onClick={(e) => {
            e.stopPropagation();
            closeWindow(id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Close window"
          title="Close"
        >
          <span>✕</span>
        </button>
        <button
          className="traffic-light"
          style={{ backgroundColor: "var(--os-yellow)" }}
          onClick={(e) => {
            e.stopPropagation();
            minimizeWindow(id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Minimize window"
          title="Minimize"
        >
          <span>–</span>
        </button>
        <button
          className="traffic-light"
          style={{ backgroundColor: "var(--os-green-btn)" }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Maximize window"
          title="Maximize"
        >
          <span>+</span>
        </button>

        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "12px",
            color: "var(--os-muted)",
            flex: 1,
            textAlign: "center",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {title}
        </span>

        {/* Right spacer to balance traffic lights */}
        <div style={{ width: "52px" }} />
      </div>

      {/* ── Content ── */}
      <div className="os-window-content" style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>

      {/* ── Resize handle (bottom-right corner) ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => {
          resizeStart.current = size;
        }}
        onDrag={(_, info) => {
          setSize({
            width: Math.max(320, resizeStart.current.width + info.offset.x),
            height: Math.max(200, resizeStart.current.height + info.offset.y),
          });
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          focusWindow(id);
        }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 16,
          height: 16,
          cursor: "se-resize",
          zIndex: 10,
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            opacity: 0.3,
          }}
        >
          <path
            d="M2 10 L10 2 M5 10 L10 5 M8 10 L10 8"
            stroke="var(--os-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
