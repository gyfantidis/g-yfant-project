import type { Metadata } from "next";
import Marker from "@/components/site/Marker";
import MachineBand from "@/components/site/MachineBand";
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  TIMELINE,
  CERTS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: PROFILE.intro,
};

export default function AboutPage() {
  const current = EXPERIENCE.filter((e) => e.current);
  const earlier = EXPERIENCE.filter((e) => !e.current);

  return (
    <>
      <header className="wrap" style={{ paddingBlock: "clamp(40px, 5vw, 76px)" }}>
        <h1 className="display">About</h1>
        <div style={{ marginTop: 30, maxWidth: "60ch", display: "grid", gap: 18 }}>
          <p className="lede">{PROFILE.intro}</p>
          <p className="copy">
            Day to day that means Spring Boot services and React frontends,
            RAG pipelines and agent integrations, and the Docker, GitHub
            Actions and Coolify plumbing that gets them into production. I run
            my own infrastructure for side projects, which is the fastest way I
            know to stay honest about how systems actually break.
          </p>
          <p className="copy">
            Alongside the job I am finishing an MSc in Data Science and Machine
            Learning at the Hellenic Open University — mostly so the ML half of
            what I build rests on something firmer than intuition.
          </p>
        </div>
      </header>

      {/* ── Current work ── */}
      <section className="band">
        <div className="wrap">
          <Marker num="01" label="Current" rest="Where I am now" />
          <div className="manifest">
            {current.map((job, i) => (
              <div key={job.company} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span className="row-title">{job.title}</span>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--mark)",
                      marginTop: 8,
                    }}
                  >
                    {job.company} — {job.location}
                  </span>
                  <span className="row-sub" style={{ display: "block" }}>
                    {job.description}
                  </span>
                </span>
                <span className="row-tail">{job.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Track ── */}
      <section className="band">
        <div className="wrap">
          <Marker num="02" label="Track" rest="2022 → today" />
          <ol
            style={{
              listStyle: "none",
              display: "grid",
              gap: 0,
              maxWidth: 720,
            }}
          >
            {TIMELINE.map((t, i) => (
              <li
                key={`${t.year}-${t.label}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px minmax(0, 1fr)",
                  gap: 18,
                  paddingBlock: 16,
                  borderBottom:
                    i === TIMELINE.length - 1 ? "none" : "1px solid var(--rule)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === TIMELINE.length - 1 ? "var(--mark)" : "var(--ink-3)",
                  }}
                >
                  {t.year}
                </span>
                <span>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.label}
                  </span>
                  <span className="copy" style={{ display: "block", marginTop: 4 }}>
                    {t.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="band">
        <div className="wrap">
          <Marker num="03" label="Education" />
          <div className="manifest">
            {EDUCATION.map((ed, i) => (
              <div key={ed.degree} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span
                    className="mono"
                    style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}
                  >
                    {ed.degree}
                  </span>
                  <span className="row-sub" style={{ display: "block", marginTop: 6 }}>
                    {ed.school}
                  </span>
                </span>
                <span
                  className="row-tail"
                  style={{ color: ed.active ? "var(--mark)" : undefined }}
                >
                  {ed.period}
                  {ed.active && " · in progress"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="band">
        <div className="wrap">
          <Marker num="04" label="Certifications" rest={`${CERTS.length} total`} />
          <div className="manifest">
            {CERTS.map((cert, i) => {
              const body = (
                <>
                  <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                  <span>
                    <span
                      className="mono"
                      style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.005em" }}
                    >
                      {cert.name}
                    </span>
                    <span className="row-sub" style={{ display: "block", marginTop: 5 }}>
                      {cert.issuer}
                    </span>
                  </span>
                  <span className="row-tail">
                    {cert.date}
                    {cert.url && " ↗"}
                  </span>
                </>
              );
              return cert.url ? (
                <a
                  key={cert.name}
                  className="row"
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {body}
                </a>
              ) : (
                <div key={cert.name} className="row">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Earlier ── */}
      {earlier.length > 0 && (
        <section className="band">
          <div className="wrap">
            <Marker num="05" label="Earlier" rest="Before engineering" />
            {earlier.map((job) => (
              <div
                key={job.company}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: 20,
                  alignItems: "baseline",
                  maxWidth: 820,
                }}
              >
                <div>
                  <span
                    className="mono"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {job.title} — {job.company}
                  </span>
                  <p className="copy" style={{ marginTop: 6, fontSize: 15 }}>
                    {job.description}
                  </p>
                </div>
                <span className="row-tail">{job.period}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <MachineBand />
    </>
  );
}
