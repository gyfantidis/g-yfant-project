import type { Metadata } from "next";
import Link from "next/link";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { CASE_STUDIES, SIDE_PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Gendox, structured extraction from historical registers, and the infrastructure behind them.",
};

export default function WorkPage() {
  return (
    <>
      <section className="sheet sec">
        <p className="label">sheet 02</p>
        <h1 className="h1" style={{ marginTop: 12 }}>Work</h1>
        <p className="lede" style={{ marginTop: 16 }}>
          Most of it happens at Ctrl+Space Labs, where I&apos;m one of two main developers. Architecture is Chris
          Sekas&apos;s; the implementation below is largely mine.
        </p>
      </section>

      <section className="sheet sec">
        <Marker n="01">Case studies</Marker>
        <div className="rows">
          {CASE_STUDIES.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className="row">
              <span className="row-idx">{c.sheet}</span>
              <span className="row-title">{c.title}</span>
              <span className="row-tail">{c.context}</span>
              <span className="row-sub">{c.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sheet sec">
        <Marker n="02">Smaller things</Marker>
        <div className="grid-cells">
          {SIDE_PROJECTS.map((p) => (
            <div key={p.title} className="cell">
              <h3 className="h3">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="link">{p.title} ↗</a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="body" style={{ marginTop: 8, fontSize: 15 }}>{p.note}</p>
              <p className="label" style={{ marginTop: 12 }}>{p.stack}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64 }}>
          <TitleBlock sheet="02 / 05" title="work" />
        </div>
      </section>
    </>
  );
}
