"use client";

import { useEffect } from "react";

/**
 * Locks the document to viewport-sized, non-scrolling, crosshair-cursor mode for
 * the duration of the OS route. The styles live under `html.os-mode` in
 * globals.css so the marketing site is unaffected.
 */
export default function OsModeLock() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("os-mode");
    return () => root.classList.remove("os-mode");
  }, []);

  return null;
}
