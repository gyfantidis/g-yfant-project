"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PHOTOS } from "@/lib/content";

export default function PhotosApp() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);

  const next = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % PHOTOS.length)), []);

  // Intercept ESC before Window.tsx sees it
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setLightbox(null);
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [lightbox, prev, next]);

  const photo = lightbox !== null ? PHOTOS[lightbox] : null;

  return (
    <div
      style={{
        padding: 16,
        height: "100%",
        overflow: "auto",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* ── Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {PHOTOS.map((p, i) => (
          <div
            key={p.src}
            onClick={() => setLightbox(i)}
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--os-border)",
              cursor: "pointer",
              transition: "border-color 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--os-accent)";
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--os-border)";
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <Image
              src={p.src}
              alt={p.label || "Photo"}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 200px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {(p.label || p.location) && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "18px 8px 6px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {p.location || p.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {photo !== null && lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 22,
              width: 42,
              height: 42,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            ‹
          </button>

          {/* Image + info panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              maxWidth: "80vw",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.label || "Photo"}
              style={{
                maxWidth: "100%",
                maxHeight: "65vh",
                objectFit: "contain",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            {/* Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textAlign: "center",
              }}
            >
              {photo.location && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: "var(--os-accent)",
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    padding: "2px 10px",
                    borderRadius: 20,
                  }}
                >
                  📍 {photo.location}
                </div>
              )}
              {photo.description && (
                <p
                  style={{
                    fontFamily: "var(--font-dmsans), sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: 420,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {photo.description}
                </p>
              )}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 2,
                }}
              >
                {lightbox + 1} / {PHOTOS.length} · ← → to navigate · esc to close
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 22,
              width: 42,
              height: 42,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11,
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
