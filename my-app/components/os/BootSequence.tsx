"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  color?: string;
  speed?: number; // ms per char
}

const BOOT_LINES: BootLine[] = [
  { text: "BIOS v2.0 — GY-OS Boot Manager", color: "#4a5568", speed: 28 },
  { text: "", speed: 0 },
  { text: "Initializing g-yfantidis.gr...", color: "#00ff88", speed: 32 },
  {
    text: "Loading kernel modules: [react] [nextjs] [docker] [spring-boot]",
    speed: 22,
  },
  { text: "Mounting /projects.......................... OK", speed: 18 },
  { text: "Mounting /blog.............................. OK", speed: 18 },
  { text: "Mounting /skills............................ OK", speed: 18 },
  { text: "Starting network services................... OK", speed: 18 },
  { text: "Checking system integrity................... PASS", speed: 18 },
  { text: "", speed: 0 },
  {
    text: "Welcome, visitor. Login successful.",
    color: "#00ff88",
    speed: 40,
  },
  { text: "", speed: 0 },
  { text: "Starting desktop environment...", color: "#0ea5e9", speed: 30 },
];

// Cumulative delay before each line starts (after previous line finishes)
const LINE_GAPS = [0, 0, 180, 120, 80, 60, 60, 60, 60, 0, 220, 0, 280];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<{ text: string; color?: string }[]>([]);
  const [currentTyping, setCurrentTyping] = useState<{
    text: string;
    displayed: string;
    color?: string;
  } | null>(null);
  const [done, setDone] = useState(false);
  const lineIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    function typeLine(lineIdx: number) {
      if (cancelled || lineIdx >= BOOT_LINES.length) {
        if (!cancelled) {
          setCurrentTyping(null);
          setDone(true);
          setTimeout(() => {
            if (!cancelled) onComplete();
          }, 600);
        }
        return;
      }

      const line = BOOT_LINES[lineIdx];
      const gap = LINE_GAPS[lineIdx] ?? 60;

      timerRef.current = setTimeout(() => {
        if (cancelled) return;

        if (line.text === "") {
          setLines((prev) => [...prev, { text: "" }]);
          typeLine(lineIdx + 1);
          return;
        }

        // Typewriter for this line
        let charIdx = 0;
        setCurrentTyping({ text: line.text, displayed: "", color: line.color });

        const speed = line.speed ?? 25;

        function addChar() {
          if (cancelled) return;
          charIdx++;
          const displayed = line.text.slice(0, charIdx);
          setCurrentTyping({ text: line.text, displayed, color: line.color });

          if (charIdx < line.text.length) {
            timerRef.current = setTimeout(addChar, speed);
          } else {
            // Line complete
            setLines((prev) => [
              ...prev,
              { text: line.text, color: line.color },
            ]);
            setCurrentTyping(null);
            typeLine(lineIdx + 1);
          }
        }

        timerRef.current = setTimeout(addChar, speed);
      }, gap);
    }

    typeLine(0);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "10vw",
            fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
            fontSize: "clamp(11px, 1.5vw, 14px)",
            lineHeight: 1.8,
            zIndex: 9999,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{ color: line.color ?? "#e2e8f0", whiteSpace: "pre" }}
            >
              {line.text}
            </div>
          ))}

          {currentTyping && (
            <div
              style={{
                color: currentTyping.color ?? "#e2e8f0",
                whiteSpace: "pre",
              }}
            >
              {currentTyping.displayed}
              <span className="terminal-cursor" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
