import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/site/Section";
import { POSTS_BY_DATE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on DevOps, self-hosting, machine learning, and using AI tooling in day-to-day engineering work.",
};

export default function BlogPage() {
  return (
    <Section num="01" label="writing">
      <h1
        className="site-h1"
        style={{ fontSize: "clamp(32px, 4.5vw, 50px)", marginBottom: 16 }}
      >
        Writing
      </h1>
      <p className="site-lead" style={{ marginBottom: 40, maxWidth: 620 }}>
        Things I figured out the hard way and wrote down so the next person
        does not have to.
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        {POSTS_BY_DATE.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="site-card"
            style={{ display: "block", padding: "24px 26px", textDecoration: "none" }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 11.5,
                color: "var(--os-muted)",
                marginBottom: 9,
              }}
            >
              {post.date} · {post.readingTime}
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "var(--os-text)",
                marginBottom: 9,
                letterSpacing: "-0.01em",
              }}
            >
              {post.title}
            </h2>
            <p className="site-body" style={{ marginBottom: 14 }}>
              {post.excerpt}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="tag-pill"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    color: "var(--os-muted)",
                    border: "1px solid var(--os-border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
