import type { Metadata } from "next";
import Image from "next/image";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { PathDiagram } from "@/components/site/Diagrams";
import { EDUCATION, EXPERIENCE, PROFILE, SOCIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "AI engineer at Ctrl+Space Labs since 2023. Background, experience and education.",
};

const STACK: { group: string; items: string }[] = [
  { group: "AI", items: "RAG, embeddings, pgvector, tool calling, LoRA fine-tuning, vision LLMs, Ollama, Vertex AI, evaluation design" },
  { group: "Backend", items: "Java 25, Spring Boot 3, Spring AI, Spring Batch, PostgreSQL, Flyway, Keycloak" },
  { group: "Data", items: "Python, pandas, scikit-learn, XGBoost, SHAP" },
  { group: "Frontend", items: "Next.js, React, Redux Toolkit, TypeScript" },
  { group: "Ops", items: "Docker, GitHub Actions, Hetzner, Coolify, Linux" },
];

export default function AboutPage() {
  return (
    <>
      <section className="sheet sec">
        <p className="label">sheet 04</p>
        <div className="grid-2" style={{ marginTop: 12, alignItems: "start" }}>
          <div>
            <h1 className="h1">About</h1>
            <div className="body" style={{ marginTop: 20, fontSize: 17 }}>
              <p>
                I&apos;m an AI engineer based in the Thessaloniki metropolitan area, in northern Greece. Since 2023 I&apos;ve been a developer at
                Ctrl+Space Labs, where we build Gendox, an open-source platform for AI agents on your own documents.
                I implement most of its document pipeline: splitting and embedding jobs, integrations, Document
                Insights, Digitization.
              </p>
              <p>
                Since 2025 I&apos;ve also been the main developer on a large extraction project: scanned historical
                registers in, validated datasets out, with a vision model I fine-tuned to run locally and an
                evaluation harness that keeps everyone honest about the numbers.
              </p>
              <p>
                I came to software late, studying computer science at the Hellenic Open University. I&apos;m now finishing an MSc in Data
                Science and Machine Learning there.
              </p>
            </div>
          </div>
          <figure className="drawing" style={{ maxWidth: 420, justifySelf: "end", width: "100%" }}>
            <Image
              src="/portrait-wad-2026.jpg"
              alt={`${PROFILE.name}`}
              width={880}
              height={1100}
              style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(1) contrast(1.05)" }}
              priority
            />
            <figcaption className="drawing-cap">
              <span>fig. a — WeAreDevelopers World Congress, 2026</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sheet sec">
        <Marker n="01">Experience</Marker>
        <div style={{ marginBottom: 32 }}>
          <PathDiagram />
        </div>
        <dl className="spec">
          {EXPERIENCE.map((e) => (
            <div key={e.company} style={{ display: "contents" }}>
              <dt>{e.period}</dt>
              <dd>
                <span style={{ color: "var(--bp-ink)" }}>
                  {e.title} · {e.company}
                </span>
                <br />
                {e.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sheet sec">
        <Marker n="02">Education</Marker>
        <dl className="spec">
          {EDUCATION.map((e) => (
            <div key={e.degree} style={{ display: "contents" }}>
              <dt>{e.period}</dt>
              <dd>
                <span style={{ color: "var(--bp-ink)" }}>{e.degree}</span>
                <br />
                {e.school}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sheet sec">
        <Marker n="03">Tools I use daily</Marker>
        <dl className="spec">
          {STACK.map((s) => (
            <div key={s.group} style={{ display: "contents" }}>
              <dt>{s.group.toLowerCase()}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sheet sec">
        <Marker n="04">Roles</Marker>
        <p className="body">
          I&apos;m not actively looking, but I&apos;ll always read a message about an AI engineering role that involves
          real systems and real evaluation. <a href={SOCIALS.email} className="link">{PROFILE.email}</a> or{" "}
          <a href={SOCIALS.linkedin} className="link" target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
        <div style={{ marginTop: 64 }}>
          <TitleBlock sheet="04 / 05" title="about" />
        </div>
      </section>
    </>
  );
}
