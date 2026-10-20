import Link from "next/link";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { WhatIBuildDiagram } from "@/components/site/Diagrams";
import { CASE_STUDIES, NOW, PROFILE, SERVICES, SOCIALS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="sheet sec">
        <p className="label" style={{ marginBottom: 20 }}>
          <span className="status-dot" />
          {PROFILE.locationShort} · available for AI projects
        </p>
        <h1 className="h-display">
          {PROFILE.name}
          <br />
          <span className="c-line">AI engineer.</span>
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          {PROFILE.intro}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          <Link href="/services" className="btn btn-solid">
            Work with me →
          </Link>
          <Link href="/work" className="btn btn-line">
            See the work
          </Link>
        </div>

        <div style={{ marginTop: 56 }}>
          <WhatIBuildDiagram />
        </div>
      </section>

      <section className="sheet sec">
        <Marker n="01">Selected work</Marker>
        <div className="rows">
          {CASE_STUDIES.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className="row">
              <span className="row-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="row-title">{c.title}</span>
              <span className="row-tail">{c.period}</span>
              <span className="row-sub">{c.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sheet sec">
        <Marker n="02">What I can build for you</Marker>
        <div className="grid-cells">
          {SERVICES.map((s) => (
            <div key={s.title} className="cell">
              <h3 className="h3">{s.title}</h3>
              <p className="body" style={{ marginTop: 8, fontSize: 15 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          <Link href="/services" className="link">
            How a project works, and how to reach me →
          </Link>
        </p>
      </section>

      <section className="sheet sec">
        <div className="grid-2">
          <div>
            <Marker n="03">Now</Marker>
            <ul style={{ listStyle: "none", display: "grid", gap: 10 }}>
              {NOW.items.map((i) => (
                <li key={i.text} className="body" style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 12 }}>
                  <span className="label" style={{ paddingTop: 3 }}>{i.label}</span>
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Marker n="04">Hiring?</Marker>
            <p className="body">
              I work full-time at Ctrl+Space Labs. If you have an AI engineering role that fits what&apos;s on this
              site, I&apos;m happy to talk.{" "}
              <Link href="/about" className="link">Background</Link> ·{" "}
              <a href={SOCIALS.linkedin} className="link" target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </div>
        </div>
        <div style={{ marginTop: 64 }}>
          <TitleBlock sheet="01 / 05" title="index" />
        </div>
      </section>
    </>
  );
}
