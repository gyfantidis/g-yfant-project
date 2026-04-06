"use client";

import { useState, FormEvent } from "react";
import GlowButton from "@/components/ui/GlowButton";

export default function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Mailto fallback
    const subject = encodeURIComponent(
      `[Portfolio Contact] Message from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:giannis@yfantidis.gr?subject=${subject}&body=${body}`);
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "var(--os-surface-2)",
    border: "1px solid var(--os-border)",
    borderRadius: 8,
    color: "var(--os-text)",
    fontFamily: "var(--font-dmsans), sans-serif",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: 11,
    color: "var(--os-muted)",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  return (
    <div
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        height: "100%",
        overflow: "auto",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Header */}
      <div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--os-text)",
            marginBottom: 6,
          }}
        >
          Get in touch
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "var(--os-muted)",
            fontFamily: "var(--font-jetbrains), monospace",
          }}
        >
          No bots please. Unless you&apos;re Claude.
        </p>
      </div>

      {/* Quick links */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <GlowButton href="mailto:giannis@yfantidis.gr" variant="green">
          ✉ giannis@yfantidis.gr
        </GlowButton>
        <GlowButton
          href="https://linkedin.com/in/giannis-yfantidis"
          variant="blue"
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </GlowButton>
        <GlowButton href="https://github.com/g-yfant" variant="ghost">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </GlowButton>
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "var(--os-muted)",
        }}
      >
        <div
          style={{ flex: 1, height: 1, background: "var(--os-border)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
          }}
        >
          or send a message
        </span>
        <div
          style={{ flex: 1, height: 1, background: "var(--os-border)" }}
        />
      </div>

      {/* Form */}
      {sent ? (
        <div
          style={{
            padding: 20,
            background: "rgba(0,255,136,0.07)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 10,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 13,
            color: "var(--os-accent)",
            textAlign: "center",
          }}
        >
          ✅ Mail client opened. Talk soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--os-border)")
              }
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--os-border)")
              }
            />
          </div>
          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "var(--font-dmsans), sans-serif",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--os-border)")
              }
            />
          </div>
          <GlowButton type="submit" variant="green">
            Send message →
          </GlowButton>
        </form>
      )}
    </div>
  );
}
