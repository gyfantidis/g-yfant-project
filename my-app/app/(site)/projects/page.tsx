import type { Metadata } from "next";
import Marker from "@/components/site/Marker";
import ProjectFilter from "@/components/site/ProjectFilter";
import MachineBand from "@/components/site/MachineBand";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI agent platforms, an EU-funded data provenance research project, ML pipelines and self-hosted products.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="wrap" style={{ paddingBlock: "clamp(40px, 5vw, 76px)" }}>
        <h1 className="display">Work</h1>
        <p className="lede" style={{ marginTop: 28, maxWidth: "54ch" }}>
          Production AI platforms, EU-funded research, and things I built to
          find out whether they could be built.
        </p>
      </header>

      <section className="band">
        <div className="wrap">
          <Marker num="01" label="Manifest" rest={`${PROJECTS.length} entries`} />
          <ProjectFilter />
        </div>
      </section>

      <MachineBand />
    </>
  );
}
