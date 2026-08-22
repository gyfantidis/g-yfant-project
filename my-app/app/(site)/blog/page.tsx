import type { Metadata } from "next";
import Link from "next/link";
import Marker from "@/components/site/Marker";
import { POSTS_BY_DATE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on DevOps, self-hosting, machine learning and using AI tooling in day-to-day engineering work.",
};

export default function BlogPage() {
  return (
    <>
      <header className="wrap" style={{ paddingBlock: "clamp(40px, 5vw, 76px)" }}>
        <h1 className="display">Writing</h1>
        <p className="lede" style={{ marginTop: 28, maxWidth: "52ch" }}>
          Things I worked out the hard way and wrote down so the next person
          does not have to.
        </p>
      </header>

      <section className="band">
        <div className="wrap">
          <Marker num="01" label="Archive" rest={`${POSTS_BY_DATE.length} posts`} />
          <div className="manifest">
            {POSTS_BY_DATE.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="row">
                <span className="row-idx">{String(i + 1).padStart(3, "0")}</span>
                <span>
                  <span className="row-title">{post.title}</span>
                  <span className="row-sub" style={{ display: "block" }}>
                    {post.excerpt}
                  </span>
                  <span style={{ display: "block" }}>
                    {post.tags.map((t) => (
                      <span key={t} className="row-tech">
                        {t}
                      </span>
                    ))}
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
    </>
  );
}
