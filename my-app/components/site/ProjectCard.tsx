import { type Project, highlightColors } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  const hl = project.highlight ? highlightColors[project.highlight] : undefined;

  const inner = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-dmsans), sans-serif",
            fontSize: 21,
            fontWeight: 600,
            color: "var(--os-text)",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>
        {project.highlight && hl && (
          <span
            className="tag-pill"
            style={{ background: hl.bg, color: hl.color }}
          >
            {project.highlight}
          </span>
        )}
        {project.url && (
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 12,
              color: "var(--os-muted)",
            }}
          >
            ↗
          </span>
        )}
      </div>

      <p className="site-body" style={{ marginBottom: 16 }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="tag-pill"
            style={{
              background: "rgba(255,255,255,0.035)",
              color: "var(--os-muted)",
              border: "1px solid var(--os-border)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  const style: React.CSSProperties = {
    display: "block",
    padding: "26px 26px 28px",
    textDecoration: "none",
    height: "100%",
  };

  return project.url ? (
    <a
      className="site-card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      style={style}
    >
      {inner}
    </a>
  ) : (
    <div className="site-card" style={style}>
      {inner}
    </div>
  );
}
