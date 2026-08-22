"use client";

import { useState } from "react";
import TagPill from "@/components/ui/TagPill";
import { POSTS, type BlogPost } from "@/lib/content";

export default function BlogApp() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  if (selected) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Back bar */}
        <div
          style={{
            padding: "8px 16px",
            borderBottom: "1px solid var(--os-border)",
            background: "var(--os-surface-2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              background: "none",
              border: "none",
              color: "var(--os-accent)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ← Blog
          </button>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              color: "var(--os-muted)",
            }}
          >
            / {selected.slug}
          </span>
        </div>

        {/* Post content */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "28px 32px",
            fontFamily: "var(--font-dmsans), sans-serif",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {selected.tags.map((t) => (
              <TagPill key={t} label={t} variant="blue" />
            ))}
          </div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--os-text)",
              marginBottom: 10,
              lineHeight: 1.4,
            }}
          >
            {selected.title}
          </h1>
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              color: "var(--os-muted)",
              marginBottom: 24,
            }}
          >
            {selected.date} · {selected.readingTime} read
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--os-text)",
              opacity: 0.85,
              whiteSpace: "pre-wrap",
            }}
          >
            {selected.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid var(--os-border)",
          background: "var(--os-surface-2)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
        }}
      >
        ~/blog — {POSTS.length} posts
      </div>

      {/* Post list */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {POSTS.map((post) => (
          <button
            key={post.slug}
            onClick={() => setSelected(post)}
            style={{
              background: "var(--os-surface-2)",
              border: "1px solid var(--os-border)",
              borderRadius: 8,
              padding: "16px 18px",
              textAlign: "left",
              cursor: "pointer",
              transition: "border-color 0.15s, background 0.15s",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)";
              e.currentTarget.style.background = "rgba(0,255,136,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--os-border)";
              e.currentTarget.style.background = "var(--os-surface-2)";
            }}
          >
            {/* Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 11,
                color: "var(--os-muted)",
              }}
            >
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime} read</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--os-text)",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              style={{
                fontSize: 13,
                color: "var(--os-muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {post.tags.map((t) => (
                <TagPill key={t} label={t} variant="muted" />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
