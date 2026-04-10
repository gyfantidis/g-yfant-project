"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { processCommand } from "@/lib/terminal-commands";
import { useWindowManager } from "@/lib/window-manager";

interface HistoryEntry {
  type: "input" | "output" | "error";
  content: string[];
}

const WELCOME: HistoryEntry = {
  type: "output",
  content: [
    "GY-OS v1.0.0 — Athens Edition",
    "Type 'help' for available commands.",
    "",
  ],
};

export default function TerminalApp() {
  const { openWindow } = useWindowManager();
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleContainerClick() {
    inputRef.current?.focus();
  }

  function submit(cmd: string) {
    if (!cmd.trim()) return;

    const trimmed = cmd.trim();
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const result = processCommand(trimmed);

    if (result.action === "clear") {
      setHistory([WELCOME]);
      setInput("");
      return;
    }

    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", content: [trimmed] },
      {
        type: result.isError ? "error" : "output",
        content: result.lines,
      },
    ];

    if (result.action === "open_contact") {
      setTimeout(() => openWindow("contact"), 800);
    }

    if (result.openApp) {
      const id = result.openApp;
      setTimeout(() => openWindow(id as Parameters<typeof openWindow>[0]), 500);
    }

    setHistory(newHistory);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? "" : (cmdHistory[newIdx] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic tab completion
      const commands = [
        "whoami","skills","projects","blog","contact","ls","help",
        "clear","cat about.txt","uname -a","sudo hire-me","easter-egg",
        "pwd","date","echo",
      ];
      const match = commands.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  }

  const promptParts = (
    <span style={{ userSelect: "none", flexShrink: 0 }}>
      <span style={{ color: "var(--os-accent)" }}>visitor</span>
      <span style={{ color: "var(--os-muted)" }}>@</span>
      <span style={{ color: "var(--os-blue)" }}>gy-os</span>
      <span style={{ color: "var(--os-muted)" }}>:~$ </span>
    </span>
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#050508",
        height: "100%",
        overflow: "hidden",
      }}
      onClick={handleContainerClick}
    >
      <div
        className="terminal-content"
        style={{
          flex: 1,
          overflow: "auto",
          padding: "14px 18px",
          fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--os-text)",
          userSelect: "text",
        }}
      >
        {history.map((entry, i) => {
          if (entry.type === "input") {
            return (
              <div key={i} style={{ display: "flex", alignItems: "baseline" }}>
                {promptParts}
                <span>{entry.content[0]}</span>
              </div>
            );
          }
          return (
            <div
              key={i}
              style={{
                paddingLeft: 0,
                marginBottom: 2,
                color: entry.type === "error" ? "#ff6b6b" : "var(--os-text)",
              }}
            >
              {entry.content.map((line, j) =>
                line === "" ? (
                  <div key={j} style={{ height: "0.5em" }} />
                ) : (
                  <div key={j} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {line}
                  </div>
                )
              )}
            </div>
          );
        })}

        {/* Active input line */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {promptParts}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--os-text)",
              fontFamily: "inherit",
              fontSize: "inherit",
              flex: 1,
              cursor: "text",
              caretColor: "var(--os-accent)",
            }}
          />
          <span className="terminal-cursor" />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
