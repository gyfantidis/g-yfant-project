import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/site/Prose";
import { POSTS, getPostBySlug } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: [...post.tags],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="site-section">
      <div className="site-container" style={{ maxWidth: 760 }}>
        <Link
          href="/blog"
          className="site-nav-link"
          style={{ display: "inline-block", marginBottom: 32 }}
        >
          ← writing
        </Link>

        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 12,
            color: "var(--os-muted)",
            marginBottom: 14,
          }}
        >
          {post.date} · {post.readingTime} read
        </div>

        <h1
          className="site-h1"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 20 }}
        >
          {post.title}
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 40 }}>
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

        <Prose content={post.content} />
      </div>
    </article>
  );
}
