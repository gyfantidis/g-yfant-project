"use client";

import GlowButton from "@/components/ui/GlowButton";

const EXPERIENCE = [
  {
    company: "Ctrl+Space Labs",
    title: "Software Engineer",
    period: "Sep 2023 — Present",
    location: "Athens, Greece",
    description:
      "Implementing Gendox — a no-code platform for building AI chat agents powered by Generative AI. Full-stack: Spring Boot REST APIs, React frontend, AWS deployments, CI/CD pipelines.",
    current: true,
  },
  {
    company: "EASTH",
    title: "IT & Agricultural Management Consultant",
    period: "Apr 2014 — Jan 2023",
    location: "Kilkis, Greece",
    description:
      "9-year tenure managing IT infrastructure, GIS field digitalization, IACS agricultural subsidy systems, and web solutions for one of Thessaloniki's largest agricultural partnerships.",
    current: false,
  },
];

const EDUCATION = [
  {
    school: "Hellenic Open University",
    degree: "MSc — Data Science & Machine Learning (DAMA)",
    period: "2024 — 2026",
    active: true,
  },
  {
    school: "Hellenic Open University",
    degree: "Bachelor's — Computer Science & Informatics",
    period: "2017 — 2022",
    active: false,
  },
];

function SectionTitle({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--os-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--os-border)",
          marginLeft: 6,
        }}
      />
    </div>
  );
}

export default function AboutApp() {
  return (
    <div
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 26,
        fontFamily: "var(--font-dmsans), sans-serif",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* ── Profile ── */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "2px solid var(--os-accent)",
            boxShadow:
              "0 0 20px rgba(0,255,136,0.2), 0 0 40px rgba(0,255,136,0.08)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt="Giannis Yfantidis"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--os-text)",
              marginBottom: 3,
            }}
          >
            Giannis Yfantidis
          </h1>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
              color: "var(--os-accent)",
              marginBottom: 10,
            }}
          >
            DevOps &amp; Full-Stack Engineer
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              fontSize: 11,
              color: "var(--os-accent)",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--os-accent)",
              }}
            />
            Open to opportunities
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <div
        style={{
          borderLeft: "2px solid var(--os-accent)",
          paddingLeft: 14,
          color: "var(--os-text)",
          fontSize: 13,
          lineHeight: 1.75,
          opacity: 0.88,
        }}
      >
        I build systems that scale and interfaces that matter. Currently
        pursuing an MSc in Data Science &amp; Machine Learning (DAMA). Based in
        Athens, Greece.
      </div>

      {/* ── Quick stats ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {[
          { label: "Location", value: "Athens, GR" },
          { label: "Degree", value: "MSc DAMA" },
          { label: "Status", value: "Open" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: "var(--os-surface-2)",
              border: "1px solid var(--os-border)",
              borderRadius: 8,
              padding: "9px 12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 10,
                color: "var(--os-muted)",
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--os-text)",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Work Experience ── */}
      <div>
        <SectionTitle icon="💼" label="Experience" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCE.map((job, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                paddingBottom: i < EXPERIENCE.length - 1 ? 20 : 0,
              }}
            >
              {/* Timeline */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                  width: 14,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: job.current
                      ? "var(--os-accent)"
                      : "var(--os-border)",
                    border: `2px solid ${job.current ? "rgba(0,255,136,0.3)" : "var(--os-surface-2)"}`,
                    boxShadow: job.current
                      ? "0 0 8px rgba(0,255,136,0.4)"
                      : "none",
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                />
                {i < EXPERIENCE.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      width: 1,
                      background: "var(--os-border)",
                      marginTop: 4,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "var(--os-text)",
                    marginBottom: 1,
                  }}
                >
                  {job.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: job.current ? "var(--os-accent)" : "var(--os-blue)",
                    marginBottom: 2,
                  }}
                >
                  {job.company}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 10,
                    color: "var(--os-muted)",
                    marginBottom: 5,
                  }}
                >
                  {job.period} · {job.location}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--os-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div>
        <SectionTitle icon="🎓" label="Education" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              style={{
                background: "var(--os-surface-2)",
                border: `1px solid ${edu.active ? "rgba(0,255,136,0.2)" : "var(--os-border)"}`,
                borderRadius: 8,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--os-text)",
                    marginBottom: 3,
                  }}
                >
                  {edu.school}
                </div>
                <div style={{ fontSize: 12, color: "var(--os-muted)" }}>
                  {edu.degree}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 10,
                    color: "var(--os-muted)",
                  }}
                >
                  {edu.period}
                </span>
                {edu.active && (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 9,
                      color: "var(--os-accent)",
                      background: "rgba(0,255,136,0.08)",
                      border: "1px solid rgba(0,255,136,0.2)",
                      padding: "1px 6px",
                      borderRadius: 10,
                    }}
                  >
                    In Progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Photos ── */}
      <div>
        <SectionTitle icon="📸" label="In the wild" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { src: "/profile2.jpg",        alt: "Giannis Yfantidis",  label: null,             pos: "center 35%" },
            { src: "/profile-ngi.jpg",     alt: "NGI Forum",          label: "NGI Forum · EU", pos: "center 25%" },
            { src: "/event-ngi.jpg",       alt: "NGI event hall",     label: "NGI Summit",     pos: "center center" },
            { src: "/portrait-outdoor.jpg",alt: "Athens outdoors",    label: "Athens",         pos: "center 55%" },
            { src: "/portrait-casual.jpg", alt: "Giannis Yfantidis",  label: null,             pos: "center 20%" },
          ].map(({ src, alt, label, pos }) => (
            <div
              key={src}
              style={{
                flex: "1 1 140px",
                minWidth: 120,
                height: 150,
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--os-border)",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: pos,
                }}
              />
              {label && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 8,
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.9)",
                    background: "rgba(0,0,0,0.55)",
                    padding: "2px 7px",
                    borderRadius: 4,
                  }}
                >
                  {label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Links ── */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <GlowButton href="https://github.com/g-yfant" variant="ghost">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
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
        <GlowButton href="mailto:giannis@yfantidis.gr" variant="green">
          ✉ Email
        </GlowButton>
      </div>
    </div>
  );
}
