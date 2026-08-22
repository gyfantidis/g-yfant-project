import Link from "next/link";
import Marker from "@/components/site/Marker";
import WorkRow from "@/components/site/WorkRow";
import Marquee from "@/components/site/Marquee";
import MachineBand from "@/components/site/MachineBand";
import {
  PROFILE,
  SOCIALS,
  STATS,
  TRUST_BAR,
  FEATURED_PROJECTS,
  PROJECTS,
  CATEGORIES,
  RECENT_POSTS,
} from "@/lib/content";

const STACK_TICKER = CATEGORIES.flatMap((c) => c.skills.map((s) => s.name));

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 88px)" }}>
        <h1 className="display">
          {PROFILE.firstName}
          <br />
          {PROFILE.lastName}
        </h1>

        <div
          className="mono"
          style={{
            marginTop: "clamp(20px, 3vw, 34px)",
            paddingTop: 14,
            borderTop: "1px solid var(--rule)",
            fontSize: "clamp(10px, 1.25vw, 12.5px)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ink)",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 14px",
          }}
        >
          {PROFILE.focus.map((f, i) => (
            <span key={f}>
              {f}
              {i < PROFILE.focus.length - 1 && (
                <span style={{ color: "var(--mark)", marginLeft: 14 }}>/</span>
              )}
            </span>
          ))}
        </div>

        <div className="hero-grid" style={{ marginTop: "clamp(30px, 4vw, 54px)" }}>
          <div style={{ maxWidth: "62ch" }}>
            <p className="lede">{PROFILE.intro}</p>
            <p className="copy" style={{ marginTop: 18 }}>
              {PROFILE.subIntro}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 32,
              }}
            >
              <Link href="/projects" className="ink-btn">
                View the work <span aria-hidden>→</span>
              </Link>
              <a href={SOCIALS.email} className="ghost-btn">
                Get in touch
              </a>
            </div>
          </div>

          {/* Right-hand register */}
          <dl
            style={{
              display: "grid",
              gap: 16,
              alignContent: "start",
              borderTop: "1px solid var(--rule)",
              paddingTop: 18,
              minWidth: 0,
            }}
          >
            {PROFILE.available && (
              <div>
                <dt className="meta">Status</dt>
                <dd
                  className="mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 13,
                    color: "var(--mark)",
                    marginTop: 5,
                  }}
                >
                  <span className="blip" />
                  {PROFILE.availableLabel}
                </dd>
              </div>
            )}
            <div>
              <dt className="meta">Based in</dt>
              <dd className="mono" style={{ fontSize: 13, marginTop: 5 }}>
                {PROFILE.location}
              </dd>
            </div>
            <div>
              <dt className="meta">Currently</dt>
              <dd className="mono" style={{ fontSize: 13, marginTop: 5 }}>
                Ctrl+Space Labs — Gendox
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── Stack ticker ──────────────────────────────────────── */}
      <Marquee items={STACK_TICKER} />

      {/* ── 01 Index ──────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap">
          <Marker num="01" label="Index" rest={TRUST_BAR.join("  ·  ")} />
          <div
            style={{
              display: "grid",
              gap: "clamp(24px, 4vw, 40px)",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Selected work ──────────────────────────────────── */}
      <section className="band">
        <div className="wrap">
          <Marker
            num="02"
            label="Selected work"
            rest={`${PROJECTS.length} entries`}
          />
          <div className="manifest">
            {FEATURED_PROJECTS.map((p, i) => (
              <WorkRow key={p.title} project={p} index={i} />
            ))}
          </div>
          <Link
            href="/projects"
            className="mono"
            style={{
              display: "inline-block",
              marginTop: 26,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mark)",
              textDecoration: "underline",
              textUnderlineOffset: 5,
            }}
          >
            All {PROJECTS.length} projects →
          </Link>
        </div>
      </section>

      {/* ── 03 Stack ──────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap">
          <Marker num="03" label="Stack" rest="What I reach for" />
          <div
            style={{
              display: "grid",
              gap: "clamp(26px, 4vw, 44px)",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--mark)",
                    paddingBottom: 10,
                    marginBottom: 14,
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  {cat.label}
                </div>
                <ul style={{ listStyle: "none", display: "grid", gap: 9 }}>
                  {cat.skills.map((s) => (
                    <li
                      key={s.name}
                      className="mono"
                      style={{
                        fontSize: 14,
                        color: s.level === "core" ? "var(--ink)" : "var(--ink-3)",
                      }}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Writing ────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap">
          <Marker num="04" label="Writing" rest="Notes from the work" />
          <div className="manifest">
            {RECENT_POSTS.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span className="row-title">{post.title}</span>
                  <span className="row-sub" style={{ display: "block" }}>
                    {post.excerpt}
                  </span>
                </span>
                <span className="row-tail">
                  {post.date} · {post.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Contact ────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap">
          <Marker num="05" label="Contact" rest={PROFILE.locationShort} />
          <h2 className="headline" style={{ maxWidth: "14ch", marginBottom: 26 }}>
            Building something with AI?
          </h2>
          <p className="lede" style={{ maxWidth: "48ch", marginBottom: 32 }}>
            Open to remote roles in AI and platform engineering. Email is the
            fastest way to reach me.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={SOCIALS.email} className="ink-btn">
              {PROFILE.email}
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="ghost-btn">
              LinkedIn ↗
            </a>
            <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="ghost-btn">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── 06 The machine ────────────────────────────────────── */}
      <MachineBand />
    </>
  );
}
