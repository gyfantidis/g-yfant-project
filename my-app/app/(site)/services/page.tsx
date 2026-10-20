import type { Metadata } from "next";
import Marker from "@/components/site/Marker";
import TitleBlock from "@/components/site/TitleBlock";
import { PROFILE, SERVICES, SOCIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "RAG on your documents, document extraction, fine-tuning and agents. Built and measured.",
};

const STEPS = [
  { n: "1", t: "Call", d: "30 minutes. What you have, what you need, whether I'm the right person." },
  { n: "2", t: "Test set first", d: "We pick 20–50 real examples and agree what a right answer looks like. That's how we'll know it works." },
  { n: "3", t: "Build", d: "Small steps, each one scored against the test set. You see the numbers as they move." },
  { n: "4", t: "Hand over", d: "Running system, the code, the evaluation, and notes your team can follow." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="sheet sec">
        <p className="label">sheet 03</p>
        <h1 className="h1" style={{ marginTop: 12 }}>
          AI that works on <span className="c-line">your</span> data,
          <br />
          and a number that says how well.
        </h1>
        <p className="lede" style={{ marginTop: 16 }}>
          I take on a small number of projects alongside my full-time work at Ctrl+Space Labs. Remote, in English or
          Greek.
        </p>
      </section>

      <section className="sheet sec">
        <Marker n="01">What I build</Marker>
        <div className="grid-cells">
          {SERVICES.map((s) => (
            <div key={s.title} className="cell">
              <h2 className="h3">{s.title}</h2>
              <p className="body" style={{ marginTop: 8, fontSize: 15 }}>{s.body}</p>
              <p className="label" style={{ marginTop: 14 }}>
                <span className="c-out">→</span> {s.output}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sheet sec">
        <Marker n="02">How a project runs</Marker>
        <ol className="grid-cells" style={{ listStyle: "none" }}>
          {STEPS.map((s) => (
            <li key={s.n} className="cell">
              <span className="label c-line">step {s.n}</span>
              <h3 className="h3" style={{ marginTop: 6 }}>{s.t}</h3>
              <p className="body" style={{ marginTop: 8, fontSize: 15 }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sheet sec">
        <Marker n="03">Not a fit</Marker>
        <p className="body">
          Chatbots that only need a system prompt, AI features that exist for a press release, or work that needs
          someone on-site full time.
        </p>
      </section>

      <section className="sheet sec" id="contact">
        <Marker n="04">Contact</Marker>
        <p className="h2" style={{ maxWidth: "26ch" }}>
          Tell me what you&apos;re working with and what should come out the other end.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <a href={`${SOCIALS.email}?subject=Project`} className="btn btn-solid">{PROFILE.email}</a>
          <a href={SOCIALS.linkedin} className="btn btn-line" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div style={{ marginTop: 64 }}>
          <TitleBlock sheet="03 / 05" title="services" />
        </div>
      </section>
    </>
  );
}
