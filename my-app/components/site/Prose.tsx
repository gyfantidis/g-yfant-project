import { Fragment, type ReactNode } from "react";

/**
 * Minimal markdown renderer for blog post bodies.
 *
 * Supports exactly what the posts use — fenced code blocks, **bold**, `code`,
 * bullet and numbered lists, and paragraphs. Deliberately dependency-free; if
 * posts ever need more, swap this for a real markdown pipeline.
 * Presentation comes from the `.prose` rules in globals.css.
 */

/** Handles `**bold**` and `` `code` `` inside a single line. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      out.push(<strong key={`${keyPrefix}-b${i}`}>{token.slice(2, -2)}</strong>);
    } else {
      out.push(<code key={`${keyPrefix}-c${i}`}>{token.slice(1, -1)}</code>);
    }
    last = match.index + token.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderBlock(block: string, key: string): ReactNode {
  const lines = block.split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return null;

  const listStyle: React.CSSProperties = {
    paddingLeft: 20,
    display: "grid",
    gap: 7,
    marginBottom: 22,
  };

  if (lines.every((l) => /^\s*-\s+/.test(l))) {
    return (
      <ul key={key} style={listStyle}>
        {lines.map((l, i) => (
          <li key={i}>{inline(l.replace(/^\s*-\s+/, ""), `${key}-${i}`)}</li>
        ))}
      </ul>
    );
  }

  if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
    return (
      <ol key={key} style={listStyle}>
        {lines.map((l, i) => (
          <li key={i}>{inline(l.replace(/^\s*\d+\.\s+/, ""), `${key}-${i}`)}</li>
        ))}
      </ol>
    );
  }

  return (
    <p key={key} style={{ marginBottom: 22 }}>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {inline(l, `${key}-${i}`)}
        </Fragment>
      ))}
    </p>
  );
}

export default function Prose({ content }: { content: string }) {
  // Odd indices of a ``` split are code blocks.
  const chunks = content.split(/```/);

  return (
    <div className="prose">
      {chunks.map((chunk, ci) => {
        if (ci % 2 === 1) {
          const body = chunk.replace(/^[a-zA-Z]*\n/, "").replace(/\n$/, "");
          return (
            <pre key={`code-${ci}`}>
              <code>{body}</code>
            </pre>
          );
        }
        return chunk
          .split(/\n{2,}/)
          .map((block, bi) => renderBlock(block, `b-${ci}-${bi}`));
      })}
    </div>
  );
}
