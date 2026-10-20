/**
 * System drawings. Hand-placed SVG, styled by the .d-* classes in site.css.
 * Each one follows the real code path, simplified; if the system changes, redraw it.
 */

function Arrow({ id, cls = "d-dot" }: { id: string; cls?: string }) {
  return (
    <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" className={cls} />
    </marker>
  );
}

function Box({
  x, y, w, h, title, sub, kind = "box",
}: {
  x: number; y: number; w: number; h: number; title: string; sub?: string;
  kind?: "box" | "line" | "out";
}) {
  const cls = kind === "line" ? "d-box-line" : kind === "out" ? "d-box-out" : "d-box";
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className={cls} />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" className={kind === "out" ? "d-to" : "d-t"}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={cy + 14} textAnchor="middle" className="d-ts">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Horizontal dimension line with end ticks and a centred label. */
function Dim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <path d={`M${x1},${y} H${x2} M${x1},${y - 5} V${y + 5} M${x2},${y - 5} V${y + 5}`} className="d-dim" />
      <text x={(x1 + x2) / 2} y={y + 18} textAnchor="middle" className="d-ts">
        {label}
      </text>
    </g>
  );
}

function Frame({
  children, caption, scale, viewBox, label, maxWidth,
}: {
  children: React.ReactNode; caption: string; scale: string; viewBox: string; label: string; maxWidth?: number;
}) {
  return (
    <figure className="drawing" style={maxWidth ? { maxWidth } : undefined}>
      <div className="drawing-scroll">
        <svg viewBox={viewBox} role="img" aria-label={label}>
          {children}
        </svg>
      </div>
      <figcaption className="drawing-cap">
        <span>{caption}</span>
        <span>{scale}</span>
      </figcaption>
    </figure>
  );
}

/** Gendox: from a document arriving to an answer leaving. */
export function GendoxDiagram() {
  const sources = ["upload", "git repo", "s3 bucket", "api", "web scrape"];
  const outputs = ["chat widget", "insights", "digitization"];
  return (
    <Frame
      viewBox="0 0 960 320"
      label="Gendox data flow: five sources feed a Spring Batch splitter, embeddings are stored in pgvector, retrieval with tool calls serves a chat widget, document insights and digitization."
      caption="fig. 1 — gendox, ingest to answer (simplified)"
      scale="not to scale"
    >
      <defs>
        <Arrow id="ga" />
        <Arrow id="gb" cls="d-to" />
      </defs>

      <rect x="16" y="36" width="150" height="232" className="d-group" />
      <text x="24" y="28" className="d-ts">sources · scheduled, run-locked</text>
      {sources.map((s, i) => (
        <g key={s}>
          <Box x={28} y={56 + i * 42} w={126} h={30} title={s} />
          <path d={`M154,${71 + i * 42} H186`} className="d-wire" />
        </g>
      ))}
      <path d="M186,71 V239 M186,150 H204" className="d-wire" markerEnd="url(#ga)" />

      <Box x={206} y={120} w={130} h={60} title="split" sub="spring batch" kind="line" />
      <path d="M336,150 H364" className="d-wire" markerEnd="url(#ga)" />
      <Box x={366} y={120} w={120} h={60} title="embed" sub="8 providers" />
      <path d="M486,150 H514" className="d-wire" markerEnd="url(#ga)" />
      <Box x={516} y={120} w={120} h={60} title="pgvector" sub="postgres 18" />
      <path d="M636,150 H664" className="d-wire" markerEnd="url(#ga)" />
      <Box x={666} y={120} w={120} h={60} title="retrieve" sub="+ tool calls" kind="line" />

      <path d="M786,150 H806 M806,71 V229" className="d-wire-out" />
      {outputs.map((o, i) => (
        <g key={o}>
          <path d={`M806,${71 + i * 79} H824`} className="d-wire-out" markerEnd="url(#gb)" />
          <Box x={826} y={51 + i * 79} w={118} h={40} title={o} kind="out" />
        </g>
      ))}

      <Dim x1={206} x2={636} y={292} label="ingest · async jobs" />
      <Dim x1={666} x2={944} y={292} label="serve" />
    </Frame>
  );
}

/** The extraction pipeline, with its evaluation loop underneath. */
export function ExtractionDiagram() {
  return (
    <Frame
      viewBox="0 0 960 336"
      label="Extraction pipeline: a scanned page goes through OCR with a vision model to a Markdown table, a fine-tuned Qwen3-VL model structures it, records are validated and become the dataset. A period profile configures each stage. An evaluation harness scores the dataset against hand-corrected unseen pages."
      caption="fig. 2 — scanned page to validated record"
      scale="not to scale"
    >
      <defs>
        <Arrow id="ea" />
        <Arrow id="eb" cls="d-to" />
        <Arrow id="ec" cls="d-ts" />
      </defs>

      <Box x={380} y={30} w={230} h={44} title="period profile" sub="prompts · schema · exceptions" />
      <path d="M380,52 H231 V128" className="d-wire-dim" strokeDasharray="4 4" markerEnd="url(#ec)" />
      <path d="M571,74 V128" className="d-wire-dim" strokeDasharray="4 4" markerEnd="url(#ec)" />
      <path d="M610,52 H751 V128" className="d-wire-dim" strokeDasharray="4 4" markerEnd="url(#ec)" />

      <g>
        <rect x="16" y="130" width="110" height="60" className="d-box" />
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M28,${144 + r * 10} H114`} className="d-dim" />
        ))}
        <path d="M54,140 V180 M84,140 V180" className="d-dim" />
        <text x="71" y="208" textAnchor="middle" className="d-ts">scanned page</text>
      </g>
      <path d="M126,160 H164" className="d-wire" markerEnd="url(#ea)" />
      <Box x={166} y={130} w={130} h={60} title="ocr" sub="vision llm" kind="line" />
      <path d="M296,160 H334" className="d-wire" markerEnd="url(#ea)" />
      <Box x={336} y={130} w={120} h={60} title="markdown" sub="table per page" />
      <path d="M456,160 H494" className="d-wire" markerEnd="url(#ea)" />
      <Box x={496} y={130} w={150} h={60} title="structure" sub="qwen3-vl 8b · lora" kind="line" />
      <text x="571" y="210" textAnchor="middle" className="d-ts">gguf · ollama · local</text>
      <path d="M646,160 H684" className="d-wire" markerEnd="url(#ea)" />
      <Box x={686} y={130} w={130} h={60} title="validate" sub="normalise to lists" />
      <path d="M816,160 H854" className="d-wire-out" markerEnd="url(#eb)" />
      <Box x={856} y={130} w={90} h={60} title="dataset" kind="out" />

      <Box x={496} y={250} w={150} h={44} title="gold pages" sub="hand-corrected, unseen" />
      <path d="M646,272 H684" className="d-wire-dim" markerEnd="url(#ec)" />
      <path d="M901,190 V272 H818" className="d-wire-dim" markerEnd="url(#ec)" />
      <Box x={686} y={250} w={130} h={44} title="eval harness" />
      <text x="751" y="318" textAnchor="middle" className="d-to" style={{ fontSize: 12 }}>
        98.9% fields · 0.31% hallucinated
      </text>
    </Frame>
  );
}

/** Document Insights: documents × questions, each cell its own task node. */
export function InsightsDiagram() {
  const docs = ["contract_a.pdf", "contract_b.pdf", "invoice_07.pdf", "report_q3.docx"];
  const qs = ["q1", "q2", "q3", "q4"];
  // 0 done, 1 running, 2 flagged
  const state = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
  ];
  const x0 = 170, y0 = 50, cw = 70, ch = 36;
  return (
    <Frame
      viewBox="0 0 640 260"
      maxWidth={720}
      label="Document Insights: a matrix with one row per document and one column per question. Every cell is a task node that runs in parallel; finished cells are exported to CSV."
      caption="fig. 3 — document insights, one node per cell"
      scale="not to scale"
    >
      <defs>
        <Arrow id="ia" cls="d-to" />
      </defs>
      {qs.map((q, j) => (
        <text key={q} x={x0 + j * cw + cw / 2} y={y0 - 12} textAnchor="middle" className="d-tl">{q}</text>
      ))}
      {docs.map((d, i) => (
        <g key={d}>
          <text x={x0 - 12} y={y0 + i * ch + ch / 2 + 4} textAnchor="end" className="d-ts">{d}</text>
          {qs.map((q, j) => {
            const s = state[i][j];
            const cx = x0 + j * cw + cw / 2;
            const cy = y0 + i * ch + ch / 2;
            return (
              <g key={q}>
                <rect x={x0 + j * cw} y={y0 + i * ch} width={cw} height={ch} className="d-box" />
                {s === 0 && <circle cx={cx} cy={cy} r="4" className="d-dot" />}
                {s === 1 && <circle cx={cx} cy={cy} r="4" className="d-wire" strokeDasharray="2 2" />}
                {s === 2 && <text x={cx} y={cy + 4} textAnchor="middle" className="d-to">!</text>}
              </g>
            );
          })}
        </g>
      ))}
      <path d={`M${x0 + 4 * cw},${y0 + 2 * ch} H${x0 + 4 * cw + 46}`} className="d-wire-out" markerEnd="url(#ia)" />
      <Box x={x0 + 4 * cw + 48} y={y0 + 2 * ch - 20} w={70} h={40} title="csv" kind="out" />
      <g transform={`translate(${x0}, ${y0 + 4 * ch + 30})`}>
        <circle cx="4" cy="-4" r="4" className="d-dot" />
        <text x="14" y="0" className="d-ts">done</text>
        <circle cx="74" cy="-4" r="4" className="d-wire" strokeDasharray="2 2" />
        <text x="84" y="0" className="d-ts">running</text>
        <text x="160" y="0" className="d-to">!</text>
        <text x="172" y="0" className="d-ts">flagged for review</text>
      </g>
    </Frame>
  );
}

/** Push to production for Gendox. */
export function DeployDiagram() {
  return (
    <Frame
      viewBox="0 0 960 150"
      label="Deployment: a push to GitHub runs GitHub Actions, which builds Docker images and deploys them to Hetzner, where Docker Compose runs the API, frontend, PostgreSQL and Keycloak."
      caption="fig. 4 — push to production"
      scale="not to scale"
    >
      <defs>
        <Arrow id="da" />
      </defs>
      <Box x={16} y={50} w={120} h={50} title="git push" sub="dev → main" />
      <path d="M136,75 H174" className="d-wire" markerEnd="url(#da)" />
      <Box x={176} y={50} w={150} h={50} title="github actions" sub="build · test" kind="line" />
      <path d="M326,75 H364" className="d-wire" markerEnd="url(#da)" />
      <Box x={366} y={50} w={130} h={50} title="docker images" sub="jdk 25 · next" />
      <path d="M496,75 H534" className="d-wire" markerEnd="url(#da)" />
      <rect x="536" y="20" width="408" height="110" className="d-group" />
      <text x="544" y="14" className="d-ts">hetzner · docker compose</text>
      {["api", "frontend", "postgres + pgvector", "keycloak"].map((s, i) => (
        <Box key={s} x={548 + i * 99} y={50} w={91} h={50} title={s.split(" ")[0]} sub={s.includes("+") ? "+ pgvector" : undefined} />
      ))}
    </Frame>
  );
}

/** Homepage: what a client brings, what I build, what comes out, and the loop that measures it. */
export function WhatIBuildDiagram() {
  const inputs = [
    { t: "documents", s: "pdf · docx · web pages" },
    { t: "scanned archives", s: "images · printed tables" },
    { t: "your systems", s: "apis · databases" },
  ];
  const outputs = ["answers with sources", "clean datasets", "actions in your tools"];
  return (
    <Frame
      viewBox="0 0 960 384"
      label="What I build: documents, scanned archives and existing systems go into one of four kinds of system I build: retrieval, extraction, fine-tuned models and agents. They produce answers with sources, clean datasets and actions. An evaluation loop scores every change against a test set."
      caption="fig. 1 — what I build, from your data to something you can use"
      scale="not to scale"
    >
      <defs>
        <Arrow id="wa" />
        <Arrow id="wb" cls="d-to" />
        <Arrow id="wc" cls="d-ts" />
      </defs>

      <text x="16" y="38" className="d-ts">you bring</text>
      {inputs.map((b, i) => (
        <g key={b.t}>
          <Box x={16} y={50 + i * 90} w={160} h={50} title={b.t} sub={b.s} />
          <path d={`M176,${75 + i * 90} H200`} className="d-wire" />
        </g>
      ))}
      <path d="M200,75 V255 M200,165 H226" className="d-wire" markerEnd="url(#wa)" />

      <rect x="228" y="44" width="440" height="242" className="d-group" />
      <text x="236" y="38" className="d-ts">i build</text>
      <Box x={244} y={60} w={200} h={96} title="retrieval" sub="rag · pgvector · citations" kind="line" />
      <Box x={452} y={60} w={200} h={96} title="extraction" sub="vision llm · json schema" kind="line" />
      <Box x={244} y={174} w={200} h={96} title="fine-tuned models" sub="lora · runs locally" kind="line" />
      <Box x={452} y={174} w={200} h={96} title="agents" sub="tool calls · schedules" kind="line" />

      <path d="M668,165 H716 M716,75 V255" className="d-wire-out" />
      <text x="760" y="38" className="d-ts">you get</text>
      {outputs.map((o, i) => (
        <g key={o}>
          <path d={`M716,${75 + i * 90} H758`} className="d-wire-out" markerEnd="url(#wb)" />
          <Box x={760} y={50 + i * 90} w={184} h={50} title={o} kind="out" />
        </g>
      ))}

      <path d="M852,280 V334 H570" className="d-wire-dim" markerEnd="url(#wc)" />
      <Box x={370} y={314} w={198} h={40} title="evaluation" sub="test set before code" />
      <path d="M370,334 H300 V290" className="d-wire-dim" markerEnd="url(#wc)" />
      <text x="470" y="376" textAnchor="middle" className="d-ts">every change is scored, then kept or thrown away</text>
    </Frame>
  );
}

/** About page: the path so far, drawn as a schedule. */
export function PathDiagram() {
  const y0 = 2009, y1 = 2027, x0 = 24, x1 = 936;
  const x = (year: number) => x0 + ((year - y0) / (y1 - y0)) * (x1 - x0);
  const rows: { label: string; from: number; to: number; kind: "box" | "line" | "out"; note?: string }[] = [
    { label: "EASTH", from: 2009.5, to: 2023.05, kind: "box" },
    { label: "BSc computer science", from: 2017, to: 2022.5, kind: "box" },
    { label: "Ctrl+Space Labs · Gendox", from: 2023.7, to: 2026.9, kind: "line", note: "now" },
    { label: "MSc data science & ML", from: 2024, to: 2026.9, kind: "box" },
    { label: "historical records extraction", from: 2025.6, to: 2026.9, kind: "line", note: "now" },
  ];
  const ticks = [2009, 2011, 2013, 2015, 2017, 2019, 2021, 2023, 2025, 2027];
  return (
    <Frame
      viewBox="0 0 960 250"
      label="Timeline: EASTH from 2009 to 2023, a BSc in computer science from 2017 to 2022, Ctrl+Space Labs since 2023, an MSc in data science and machine learning since 2024, and the historical records extraction project since 2025."
      caption="fig. b — the path so far"
      scale="1 col = 2 years"
    >
      {ticks.map((t) => (
        <g key={t}>
          <path d={`M${x(t)},24 V214`} className="d-dim" strokeDasharray="2 4" />
          <text x={x(t)} y="236" textAnchor="middle" className="d-ts">{t}</text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 34 + i * 36;
        const cls = r.kind === "line" ? "d-box-line" : "d-box";
        return (
          <g key={r.label}>
            <rect x={x(r.from)} y={y} width={x(r.to) - x(r.from)} height={24} className={cls} />
            <text
              x={r.to - r.from > 6 ? x(r.from) + 8 : x(r.from) - 8}
              y={y + 16}
              textAnchor={r.to - r.from > 6 ? "start" : "end"}
              className="d-t"
              style={{ fontSize: 12 }}
            >
              {r.label}
            </text>
            {r.note && <text x={x(r.to) + 6} y={y + 16} className="d-tl">{r.note}</text>}
          </g>
        );
      })}
    </Frame>
  );
}
