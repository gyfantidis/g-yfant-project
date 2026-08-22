"use client";

import { useState } from "react";
import ProjectCard from "@/components/site/ProjectCard";
import { PROJECTS, ALL_TECH } from "@/lib/content";

const ALL = "All";

export default function ProjectFilter() {
  const [active, setActive] = useState<string>(ALL);

  const visible =
    active === ALL ? PROJECTS : PROJECTS.filter((p) => p.tech.includes(active));

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 32,
        }}
      >
        {[ALL, ...ALL_TECH].map((tech) => {
          const isActive = tech === active;
          return (
            <button
              key={tech}
              onClick={() => setActive(tech)}
              className="tag-pill"
              style={{
                background: isActive ? "rgba(0,255,136,0.1)" : "transparent",
                color: isActive ? "var(--os-accent)" : "var(--os-muted)",
                border: `1px solid ${isActive ? "rgba(0,255,136,0.3)" : "var(--os-border)"}`,
              }}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 18 }}>
        {visible.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="site-body">No projects use {active} yet.</p>
      )}
    </>
  );
}
