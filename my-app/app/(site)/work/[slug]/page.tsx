import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { DeployDiagram, ExtractionDiagram, GendoxDiagram, InsightsDiagram } from "@/components/site/Diagrams";
import { CASE_STUDIES, getCaseStudy } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Which drawings go with which case study, and after which section heading. */
const DRAWINGS: Record<string, Record<string, React.ReactNode>> = {
  gendox: { "What it is": <GendoxDiagram />, "Document Insights": <InsightsDiagram /> },
  "historical-records-extraction": { "The pipeline": <ExtractionDiagram /> },
  infrastructure: { "What's in it": <DeployDiagram /> },
};

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return { title: c.title, description: c.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const drawings = DRAWINGS[c.slug] ?? {};
  const i = CASE_STUDIES.indexOf(c);
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];

  return (
    <article>
      <section className="sheet sec">
        <Link href="/work" className="nav-link">← work</Link>
        <p className="label" style={{ marginTop: 32 }}>sheet {c.sheet} · {c.context}</p>
        <h1 className="h1" style={{ marginTop: 12 }}>{c.title}</h1>
        <p className="lede" style={{ marginTop: 16 }}>{c.summary}</p>

        <dl className="spec" style={{ marginTop: 40 }}>
          <dt>role</dt>
          <dd>{c.role}</dd>
          <dt>period</dt>
          <dd>{c.period}</dd>
          <dt>stack</dt>
          <dd>
            <div className="tags">
              {c.stack.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </dd>
          {c.links && (
            <>
              <dt>links</dt>
              <dd style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                {c.links.map((l) => (
                  <a key={l.href} href={l.href} className="link" target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
              </dd>
            </>
          )}
        </dl>

        <div className="figs" style={{ marginTop: 40 }}>
          {c.figures.map((f) => (
            <div key={f.label} className="fig">
              <div className="fig-v">{f.value}</div>
              <div className="fig-l">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {c.sections.map((s, n) => (
        <section key={s.heading} className="sheet sec-tight">
          <Marker n={String(n + 1).padStart(2, "0")}>{s.heading}</Marker>
          <div className="body" style={{ fontSize: 17 }}>
            {s.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          {drawings[s.heading] && <div style={{ marginTop: 36 }}>{drawings[s.heading]}</div>}
        </section>
      ))}

      <section className="sheet sec">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "baseline" }}>
          <Link href={`/work/${next.slug}`} className="link">Next: {next.title} →</Link>
          <Link href="/services" className="btn btn-line">Need something like this?</Link>
        </div>
        <div style={{ marginTop: 48 }}>
          <TitleBlock sheet={c.sheet} title={c.slug} />
        </div>
      </section>
    </article>
  );
}
