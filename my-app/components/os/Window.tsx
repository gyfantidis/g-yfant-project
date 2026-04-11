"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useDragControls, useMotionValue, AnimatePresence, animate } from "framer-motion";
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

const SNAP_THRESHOLD = 48;
const MENUBAR_H = 28;
const TASKBAR_H = 72;

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
  const sizeRef = useRef(size);
  const resizeStart = useRef(defaultSize);
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const preMaxSnapshot = useRef<{ px: number; py: number; width: number; height: number } | null>(null);

  // Keep sizeRef in sync with state
  useEffect(() => { sizeRef.current = size; }, [size]);

  // Load saved position/size from localStorage on first open
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`gy-os-win-${id}`);
      if (saved) {
        const { px, py, width, height } = JSON.parse(saved);
        x.set(px);
        y.set(py);
        setSize({ width, height });
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save position/size to localStorage
  function saveToStorage(overrides?: { px?: number; py?: number; width?: number; height?: number }) {
    try {
      localStorage.setItem(
        `gy-os-win-${id}`,
        JSON.stringify({
          px: Math.round(overrides?.px ?? x.get()),
          py: Math.round(overrides?.py ?? y.get()),
          width: overrides?.width ?? sizeRef.current.width,
          height: overrides?.height ?? sizeRef.current.height,
        })
      );
    } catch {}
  }

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

  function toggleMaximize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (isMaximized) {
      if (preMaxSnapshot.current) {
        const { px, py, width, height } = preMaxSnapshot.current;
        animate(x, px, { type: "spring", stiffness: 300, damping: 30 });
        animate(y, py, { type: "spring", stiffness: 300, damping: 30 });
        setSize({ width, height });
      }
      setIsMaximized(false);
    } else {
      preMaxSnapshot.current = {
        px: x.get(),
        py: y.get(),
        width: sizeRef.current.width,
        height: sizeRef.current.height,
      };
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      animate(y, MENUBAR_H, { type: "spring", stiffness: 300, damping: 30 });
      setSize({ width: vw, height: vh - MENUBAR_H - TASKBAR_H });
      setIsMaximized(true);
    }
  }

  function startDrag(e: ReactPointerEvent<HTMLDivElement>) {
    if (isMaximized) return;
    dragControls.start(e as unknown as Parameters<typeof dragControls.start>[0]);
  }

  function handleDrag() {
    const currentX = x.get();
    const vw = window.innerWidth;
    if (currentX < SNAP_THRESHOLD) {
      setSnapPreview("left");
    } else if (currentX + sizeRef.current.width > vw - SNAP_THRESHOLD) {
      setSnapPreview("right");
    } else {
      setSnapPreview(null);
    }
  }

  function handleDragEnd() {
    const currentX = x.get();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const snapHeight = vh - MENUBAR_H - TASKBAR_H;

    if (currentX < SNAP_THRESHOLD) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      animate(y, MENUBAR_H, { type: "spring", stiffness: 300, damping: 30 });
      const newSize = { width: Math.floor(vw / 2), height: snapHeight };
      setSize(newSize);
      saveToStorage({ px: 0, py: MENUBAR_H, ...newSize });
    } else if (currentX + sizeRef.current.width > vw - SNAP_THRESHOLD) {
      const newX = Math.ceil(vw / 2);
      animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
      animate(y, MENUBAR_H, { type: "spring", stiffness: 300, damping: 30 });
      const newSize = { width: Math.floor(vw / 2), height: snapHeight };
      setSize(newSize);
      saveToStorage({ px: newX, py: MENUBAR_H, ...newSize });
    } else {
      saveToStorage();
    }
    setSnapPreview(null);
  }

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <>
      {/* Snap preview overlay */}
      <AnimatePresence>
        {snapPreview && (
          <motion.div
            key={snapPreview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: MENUBAR_H,
              left: snapPreview === "left" ? 0 : "50%",
              width: "50%",
              bottom: TASKBAR_H,
              background: "rgba(0,255,136,0.06)",
              border: "2px solid rgba(0,255,136,0.25)",
              borderRadius: 10,
              pointerEvents: "none",
              zIndex: win.zIndex - 1,
            }}
          />
        )}
      </AnimatePresence>

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
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="os-window"
        role="dialog"
        aria-label={title}
        tabIndex={-1}
      >
        {/* ── Title Bar (drag handle) ── */}
        <div
          className={`os-titlebar select-none ${isMaximized ? "" : "cursor-grab"}`}
          onPointerDown={startDrag}
          onDoubleClick={toggleMaximize}
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
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <span>{isMaximized ? "⤡" : "+"}</span>
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

        {/* ── Resize handle (hidden when maximized) ── */}
        {!isMaximized && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
              resizeStart.current = sizeRef.current;
            }}
            onDrag={(_, info) => {
              setSize({
                width: Math.max(320, resizeStart.current.width + info.offset.x),
                height: Math.max(200, resizeStart.current.height + info.offset.y),
              });
            }}
            onDragEnd={() => {
              saveToStorage();
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
        )}
      </motion.div>
    </>
  );
}
