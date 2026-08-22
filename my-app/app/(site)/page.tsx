import Link from "next/link";
import Section from "@/components/site/Section";
import OsPreview from "@/components/site/OsPreview";
import ProjectCard from "@/components/site/ProjectCard";
import {
  PROFILE,
  SOCIALS,
  TRUST_BAR,
  FEATURED_PROJECTS,
  TIMELINE,
  CATEGORIES,
  levelOpacity,
  RECENT_POSTS,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* ── 00 · Hero ─────────────────────────────────────────── */}
      <section style={{ paddingBlock: "clamp(56px, 8vw, 104px)" }}>
        <div
          className="site-container"
          style={{
            display: "grid",
            gap: "clamp(40px, 5vw, 64px)",
            gridTemplateColumns: "minmax(0, 1fr)",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: 620 }}>
            {PROFILE.available && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 24,
                  padding: "6px 13px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,255,136,0.2)",
                  background: "rgba(0,255,136,0.06)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12,
                  color: "var(--os-accent)",
                }}
              >
                <span className="site-status-dot" />
                {PROFILE.availableLabel}
              </div>
            )}

            <h1 className="site-h1" style={{ marginBottom: 18 }}>
              {PROFILE.name}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                color: "var(--os-accent)",
                marginBottom: 22,
                letterSpacing: "0.01em",
              }}
            >
              {PROFILE.role} · {PROFILE.locationShort}
            </p>

            <p className="site-lead" style={{ marginBottom: 34, maxWidth: 560 }}>
              {PROFILE.intro}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href="/os"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 14,
                  padding: "12px 22px",
                  borderRadius: 9,
                  background: "rgba(0,255,136,0.1)",
                  border: "1px solid rgba(0,255,136,0.35)",
                  color: "var(--os-accent)",
                  textDecoration: "none",
                }}
                className="glow-green"
              >
                $ ./launch-os.sh
              </Link>
              <a
                href="#work"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 14,
                  padding: "12px 22px",
                  borderRadius: 9,
                  background: "var(--os-surface)",
                  border: "1px solid var(--os-border)",
                  color: "var(--os-text)",
                  textDecoration: "none",
                }}
              >
                See the work ↓
              </a>
            </div>

            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 11.5,
                color: "var(--os-muted)",
              }}
            >
              A portfolio built as an operating system. Best on desktop.
            </p>
          </div>

          <div style={{ maxWidth: 560, width: "100%" }}>
            <OsPreview />
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────── */}
      <div
        style={{
          borderBlock: "1px solid var(--os-border)",
          paddingBlock: 18,
          background: "var(--os-surface)",
        }}
      >
        <div
          className="site-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 32px",
            justifyContent: "center",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            color: "var(--os-muted)",
            letterSpacing: "0.04em",
          }}
        >
          {TRUST_BAR.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>

      {/* ── 01 · Selected work ────────────────────────────────── */}
      <Section num="01" label="selected work" id="work">
        <h2 className="site-h2" style={{ marginBottom: 14 }}>
          Things I&apos;ve built
        </h2>
        <p className="site-lead" style={{ marginBottom: 40, maxWidth: 620 }}>
          AI platforms at work, an EU research project, and a Greek-language
          product I run end to end on my own infrastructure.
        </p>

        <div style={{ display: "grid", gap: 18 }}>
          {FEATURED_PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <Link
          href="/projects"
          className="site-link"
          style={{
            display: "inline-block",
            marginTop: 28,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 13,
          }}
        >
          See all projects →
        </Link>
      </Section>

      {/* ── 02 · The story ────────────────────────────────────── */}
      <Section num="02" label="the story">
        <h2 className="site-h2" style={{ marginBottom: 14 }}>
          Fourteen years in agriculture, then a career rebuilt around code
        </h2>
        <p className="site-lead" style={{ marginBottom: 44, maxWidth: 660 }}>
          I did not come out of a bootcamp at 22. I ran IT infrastructure, GIS
          digitalization and IACS subsidy systems for a large agricultural
          partnership in Kilkis — real users, real deadlines, no room for
          things to be down. Then I went back to school while working full
          time, and rebuilt everything around software. What carried over is
          the part that matters most: shipping systems people actually depend on.
        </p>

        <ol
          style={{
            listStyle: "none",
            display: "grid",
            gap: 0,
            borderLeft: "1px solid var(--os-border)",
          }}
        >
          {TIMELINE.map((t, i) => (
            <li
              key={t.year}
              style={{
                position: "relative",
                paddingLeft: 26,
                paddingBottom: i === TIMELINE.length - 1 ? 0 : 26,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -4.5,
                  top: 6,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    i === TIMELINE.length - 1 ? "var(--os-accent)" : "var(--os-border)",
                  border: "2px solid var(--os-bg)",
                  boxSizing: "content-box",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12,
                  color: "var(--os-accent)",
                  marginBottom: 3,
                }}
              >
                {t.year}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--os-text)",
                  marginBottom: 3,
                }}
              >
                {t.label}
              </div>
              <div className="site-body" style={{ fontSize: 14.5 }}>
                {t.detail}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 03 · Stack ────────────────────────────────────────── */}
      <Section num="03" label="stack">
        <h2 className="site-h2" style={{ marginBottom: 40 }}>
          What I work with
        </h2>

        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12,
                  color: cat.color,
                  marginBottom: 14,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {cat.icon} {cat.label}
              </div>
              <ul style={{ listStyle: "none", display: "grid", gap: 8 }}>
                {cat.skills.map((s) => (
                  <li
                    key={s.name}
                    style={{
                      fontSize: 15,
                      color: "var(--os-text)",
                      opacity: levelOpacity[s.level ?? "proficient"],
                    }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 04 · Writing ──────────────────────────────────────── */}
      <Section num="04" label="writing">
        <h2 className="site-h2" style={{ marginBottom: 40 }}>
          Notes from the work
        </h2>

        <div style={{ display: "grid", gap: 14 }}>
          {RECENT_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="site-card"
              style={{ display: "block", padding: "22px 24px", textDecoration: "none" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 11.5,
                  color: "var(--os-muted)",
                  marginBottom: 8,
                }}
              >
                {post.date} · {post.readingTime}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--os-text)",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {post.title}
              </h3>
              <p className="site-body" style={{ fontSize: 14.5 }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="site-link"
          style={{
            display: "inline-block",
            marginTop: 28,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 13,
          }}
        >
          All posts →
        </Link>
      </Section>

      {/* ── 05 · Contact ──────────────────────────────────────── */}
      <Section num="05" label="contact">
        <h2 className="site-h2" style={{ marginBottom: 14 }}>
          Let&apos;s talk
        </h2>
        <p className="site-lead" style={{ marginBottom: 30, maxWidth: 560 }}>
          Open to remote roles in AI and platform engineering. The fastest way
          to reach me is email.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href={SOCIALS.email}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 14,
              padding: "12px 22px",
              borderRadius: 9,
              background: "rgba(0,255,136,0.1)",
              border: "1px solid rgba(0,255,136,0.35)",
              color: "var(--os-accent)",
              textDecoration: "none",
            }}
          >
            {PROFILE.email}
          </a>
          {[
            { href: SOCIALS.linkedin, label: "LinkedIn" },
            { href: SOCIALS.github, label: "GitHub" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 14,
                padding: "12px 22px",
                borderRadius: 9,
                background: "var(--os-surface)",
                border: "1px solid var(--os-border)",
                color: "var(--os-text)",
                textDecoration: "none",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
