"use client";

import { useState } from "react";
import WorkRow from "@/components/site/WorkRow";
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
          gap: 7,
          marginBottom: 34,
        }}
      >
        {[ALL, ...ALL_TECH].map((tech) => {
          const isActive = tech === active;
          return (
            <button
              key={tech}
              onClick={() => setActive(tech)}
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "5px 10px",
                border: `1px solid ${isActive ? "var(--ink)" : "var(--rule)"}`,
                background: isActive ? "var(--ink)" : "transparent",
                color: isActive ? "var(--paper)" : "var(--ink-2)",
                transition: "all 0.12s",
              }}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <div className="manifest">
        {visible.map((p, i) => (
          <WorkRow key={p.title} project={p} index={i} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="copy" style={{ paddingTop: 20 }}>
          No projects use {active}.
        </p>
      )}
    </>
  );
}
