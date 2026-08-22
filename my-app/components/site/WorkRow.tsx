import { type Project } from "@/lib/content";

/**
 * One line of the work manifest. Inverts to ink-on-paper on hover, which is
 * the whole interaction language of the site.
 */
export default function WorkRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const idx = String(index + 1).padStart(3, "0");

  const body = (
    <>
      <span className="row-idx">{idx}</span>

      <span>
        <span className="row-title">{project.title}</span>
        <span className="row-sub" style={{ display: "block" }}>
          {project.description}
        </span>
        <span style={{ display: "block" }}>
          {project.tech.map((t) => (
            <span key={t} className="row-tech">
              {t}
            </span>
          ))}
        </span>
      </span>

      <span className="row-tail">
        {project.highlight ?? "—"}
        {project.url && " ↗"}
      </span>
    </>
  );

  return project.url ? (
    <a className="row" href={project.url} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <div className="row">{body}</div>
  );
}
