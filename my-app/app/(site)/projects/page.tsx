import type { Metadata } from "next";
import Section from "@/components/site/Section";
import ProjectFilter from "@/components/site/ProjectFilter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI agent platforms, an EU-funded data provenance research project, ML pipelines, and self-hosted side products.",
};

export default function ProjectsPage() {
  return (
    <Section num="01" label="projects">
      <h1 className="site-h1" style={{ fontSize: "clamp(32px, 4.5vw, 50px)", marginBottom: 16 }}>
        Projects
      </h1>
      <p className="site-lead" style={{ marginBottom: 40, maxWidth: 620 }}>
        Everything from production AI platforms to weekend data pipelines.
        Filter by the technology you care about.
      </p>
      <ProjectFilter />
    </Section>
  );
}
