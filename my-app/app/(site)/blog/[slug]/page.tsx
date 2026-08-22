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
    <article className="wrap" style={{ paddingBlock: "clamp(34px, 4vw, 64px)" }}>
      <div style={{ maxWidth: 760 }}>
        <Link href="/blog" className="nav-link" style={{ display: "inline-block" }}>
          ← Writing
        </Link>

        <div
          className="meta"
          style={{ marginTop: 34, paddingBottom: 12, borderBottom: "1px solid var(--rule)" }}
        >
          {post.date} — {post.readingTime} read
        </div>

        <h1
          className="headline"
          style={{ marginTop: 26, marginBottom: 22, letterSpacing: "-0.035em" }}
        >
          {post.title}
        </h1>

        <div style={{ marginBottom: 40 }}>
          {post.tags.map((t) => (
            <span key={t} className="row-tech">
              {t}
            </span>
          ))}
        </div>

        <Prose content={post.content} />
      </div>
    </article>
  );
}
