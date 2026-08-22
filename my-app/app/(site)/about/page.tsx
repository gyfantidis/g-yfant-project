import type { Metadata } from "next";
import Section from "@/components/site/Section";
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  CERTS,
  BADGE_COLORS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: PROFILE.intro,
};

export default function AboutPage() {
  return (
    <>
      <Section num="01" label="about">
        <h1
          className="site-h1"
          style={{ fontSize: "clamp(32px, 4.5vw, 50px)", marginBottom: 22 }}
        >
          About
        </h1>
        <div style={{ maxWidth: 660, display: "grid", gap: 20 }}>
          <p className="site-lead">{PROFILE.intro}</p>
          <p className="site-lead">
            The fourteen years before software were not a detour. Managing GIS
            digitalization and IACS subsidy systems for hundreds of farmers
            meant owning uptime, data integrity and the phone call when
            something broke. That is the same job I do now, with a different
            stack.
          </p>
          <p className="site-lead">
            These days I build Gendox at Ctrl+Space Labs — a no-code platform
            for AI chat agents — and I am finishing an MSc in Data Science and
            Machine Learning at the Hellenic Open University.
          </p>
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section num="02" label="experience">
        <div style={{ display: "grid", gap: 18 }}>
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="site-card"
              style={{ padding: "24px 26px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 6,
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--os-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {job.title}
                </h2>
                {job.current && (
                  <span
                    className="tag-pill"
                    style={{
                      background: "rgba(0,255,136,0.12)",
                      color: "var(--os-accent)",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12.5,
                  color: "var(--os-muted)",
                  marginBottom: 14,
                }}
              >
                {job.company} · {job.period} · {job.location}
              </div>
              <p className="site-body">{job.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section num="03" label="education">
        <div style={{ display: "grid", gap: 14 }}>
          {EDUCATION.map((ed) => (
            <div
              key={ed.degree}
              className="site-card"
              style={{ padding: "20px 24px" }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--os-text)",
                  marginBottom: 5,
                }}
              >
                {ed.degree}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12.5,
                  color: ed.active ? "var(--os-accent)" : "var(--os-muted)",
                }}
              >
                {ed.school} · {ed.period}
                {ed.active && " · in progress"}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Certifications ── */}
      <Section num="04" label="certifications">
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {CERTS.map((cert) => {
            const badge = cert.badge ? BADGE_COLORS[cert.badge] : undefined;
            const body = (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  {badge && (
                    <span
                      className="tag-pill"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: 11.5,
                      color: "var(--os-muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {cert.date}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--os-text)",
                    lineHeight: 1.4,
                    marginBottom: 4,
                  }}
                >
                  {cert.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--os-muted)" }}>
                  {cert.issuer}
                </div>
              </>
            );

            return cert.url ? (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="site-card"
                style={{ padding: "18px 20px", textDecoration: "none", display: "block" }}
              >
                {body}
              </a>
            ) : (
              <div
                key={cert.name}
                className="site-card"
                style={{ padding: "18px 20px" }}
              >
                {body}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
