/**
 * Content that only the site uses: case studies, services, the /now page.
 * Facts come from the repos themselves (commit counts as of Oct 2026).
 */

export interface CaseStudy {
  slug: string;
  sheet: string;
  title: string;
  /** One line, shown in lists. */
  summary: string;
  context: string;
  role: string;
  period: string;
  stack: string[];
  /** Short figures that are true and checkable. */
  figures: { value: string; label: string }[];
  /** Body, in sections. Each paragraph is a string. */
  sections: { heading: string; body: string[] }[];
  links?: { label: string; href: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "gendox",
    sheet: "02.1",
    title: "Gendox",
    summary:
      "Open-source platform for AI agents on your own documents. I build most of what happens after the upload button.",
    context: "Ctrl+Space Labs · open source",
    role: "Developer. Architecture by Chris Sekas, implementation largely mine.",
    period: "Sep 2023 — now",
    stack: ["Java 25", "Spring Boot 3", "Spring AI", "Spring Batch", "PostgreSQL + pgvector", "Keycloak", "Next.js", "Redux Toolkit"],
    figures: [
      { value: "680+", label: "commits in gendox-core" },
      { value: "600+", label: "commits in gendox-devops" },
      { value: "8", label: "LLM providers behind one interface" },
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "You upload documents, Gendox splits and embeds them into pgvector, and an agent answers from that knowledge base with retrieval and tool calls. The agent drops into any website with one script tag.",
          "It is open source and self-hostable, with a live instance at app.gendox.dev.",
        ],
      },
      {
        heading: "Ingestion: splitting and training",
        body: [
          "Documents go through Spring Batch jobs: a splitter step that cuts them into sections, then a training step that creates the embeddings. Uploads trigger the split automatically, and long jobs report their progress back to the UI instead of blocking a request.",
        ],
      },
      {
        heading: "Integrations",
        body: [
          "Content can also arrive on its own: from a Git repository, an S3 bucket, an external API, or a web scrape. Each integration runs on a schedule with its own permissions and a run lock, so two runs never write the same documents at once.",
        ],
      },
      {
        heading: "Document Insights",
        body: [
          "Ask the same set of questions across a whole batch of documents. Each document × question pair is a node in a task graph; the nodes run in parallel and asynchronously, and the result is a matrix with short answers, explanations, status flags and CSV export.",
          "Getting this right meant making task execution truly async (no blocking joins), keeping answer nodes from being treated as documents, and letting supporting documents and a global prompt feed every question.",
        ],
      },
      {
        heading: "Document Digitization",
        body: [
          "Scanned PDFs and office files are turned into text or JSON page by page with vision-capable models, with an optional JSON schema to extract structured data in one pass. No classic OCR step.",
        ],
      },
      {
        heading: "SeaScope",
        body: [
          "An Earth Observation workspace: the agent writes a Google Earth Engine script from a question, the script runs in a browser sandbox, and the result appears as layers on a map. I built the auth flow, multi-layer support and the area-of-interest tools.",
        ],
      },
      {
        heading: "Around it",
        body: [
          "Keycloak login and themes, subscription plans and validation, per-organization provider keys, attachments in chat, a Python SDK, and the CI/CD that deploys the whole thing to Hetzner. I am now rebuilding the frontend from scratch.",
        ],
      },
    ],
    links: [
      { label: "app.gendox.dev", href: "https://app.gendox.dev" },
      { label: "docs.gendox.dev", href: "https://docs.gendox.dev" },
      { label: "GitHub", href: "https://github.com/ctrl-space-labs/gendox-core" },
    ],
  },
  {
    slug: "historical-records-extraction",
    sheet: "02.2",
    title: "Structured extraction from historical registers",
    summary:
      "Two centuries of scanned printed registers turned into validated datasets, with a fine-tuned vision model that runs locally.",
    context: "Client project · name withheld",
    role: "Main developer. Pipeline, fine-tunes and evaluation.",
    period: "Aug 2025 — now",
    stack: ["Python", "Qwen3-VL 8B", "LoRA", "Vertex AI", "Ollama", "GGUF", "Gendox"],
    figures: [
      { value: "98.9%", label: "field accuracy on unseen pages" },
      { value: "0.31%", label: "hallucination rate on blank fields" },
      { value: "1,270+", label: "commits" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Printed registers from the 18th to the early 20th century: dense tables, abbreviations, changing layouts across periods, and roughly half of all fields legitimately blank. The goal was clean, structured records that a researcher can trust.",
        ],
      },
      {
        heading: "The pipeline",
        body: [
          "Two stages. OCR turns a page image into a Markdown table. Structuring turns that table into canonical records, which are validated, normalised against reference lists (places, vocabulary) and exported as the delivered dataset.",
          "Everything that differs between register periods (prompts, JSON schema, column count, per-book exceptions) lives in a profile file per period. No code enumerates the periods, so adding a period means adding a folder.",
        ],
      },
      {
        heading: "Models",
        body: [
          "The first fine-tunes ran on Vertex AI. Later I trained a LoRA on Qwen3-VL 8B, exported it to GGUF and serve it with Ollama, so the extraction can run on local hardware. Gendox is the model service in the middle, so models and settings are switched from its UI.",
        ],
      },
      {
        heading: "Measuring it honestly",
        body: [
          "I wrote the evaluation harness. Every report has the same layout: what was measured, a fixed headline, the worst pages first, then a per-field breakdown.",
          "Blank fields are scored separately from content fields. If they are not, a sparse register looks better than a better model. Blanks the model fills anyway are reported as a hallucination rate.",
          "On ten hand-corrected pages the model had never seen, the delivered pipeline scored 98.9% on the primary metric, 95.1% exact on content fields, and filled 13 of 4,254 blank fields. No records missed, none invented.",
        ],
      },
    ],
  },
  {
    slug: "infrastructure",
    sheet: "02.3",
    title: "Gendox infrastructure",
    summary: "The CI/CD and production setup behind Gendox. About 95% of the commits in that repo are mine.",
    context: "Ctrl+Space Labs",
    role: "Main contributor.",
    period: "Oct 2023 — 2026",
    stack: ["GitHub Actions", "Docker Compose", "Hetzner", "PostgreSQL", "Flyway", "Keycloak"],
    figures: [
      { value: "604", label: "of ~640 commits" },
      { value: "JDK 25", label: "production runtime" },
    ],
    sections: [
      {
        heading: "What's in it",
        body: [
          "GitHub Actions workflows that build and deploy the backend and frontend to Hetzner, Docker Compose setups for production and local development, production database scripts, and the environment wiring for every new feature (Earth Engine, maps, providers).",
          "It also holds a full application security review of Gendox Core, and the packaging of the Python SDK for the Digitization API.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Smaller things, listed without their own page. */
export interface SideProject {
  title: string;
  note: string;
  stack: string;
  href?: string;
}

export const SIDE_PROJECTS: SideProject[] = [
  {
    title: "ProvenAI",
    note: "NGI TrustChain research project on data provenance in AI: verifiable credentials, ISCC tagging, traceable contributions. I worked on parts of the implementation.",
    stack: "Spring Boot · React · SSI",
    href: "https://trustchain.ngi.eu/provenai/",
  },
  {
    title: "oneprompt.gr",
    note: "An automated content brand in Greek about AI tools and prompts. A pipeline turned a topic into an article, a video script and images with the Claude API, published to a Next.js site, rendered short videos with Remotion and posted them to TikTok and Reels. Ran Mar–Sep 2026.",
    stack: "Claude API · Next.js · MDX · Remotion · GitHub Actions",
    href: "https://oneprompt.gr",
  },
  {
    title: "Personal agents",
    note: "Claude Code agents I use myself: one that reconciles invoices against bank exports, one that helps with paperwork for public subsidies, one for planning decisions. Knowledge lives in files in a private repo, synced by hooks.",
    stack: "Claude Code · hooks · Markdown",
  },
  {
    title: "MyMera",
    note: "Scores how productive a day was, 0 to 100, from rules you define. Core, bonus and penalty metrics, trend scoring, Apple Health import. Early.",
    stack: "Next.js · TypeScript",
  },
  {
    title: "Player market value",
    note: "MSc hackathon. Ensemble models predicting football players' market value, R² 0.81 on hold-out, SHAP for explanations.",
    stack: "Python · XGBoost · SHAP",
  },
];

export interface Service {
  title: string;
  body: string;
  /** What the client ends up with. */
  output: string;
}

export const SERVICES: Service[] = [
  {
    title: "RAG on your documents",
    body: "An assistant or internal search that answers from your own files and cites them. Chunking, embeddings, retrieval and evaluation done properly, on infrastructure you control.",
    output: "Working system, deployed, with a test set that shows how often it's right.",
  },
  {
    title: "Document extraction",
    body: "Scanned PDFs, forms or archives into structured data. Vision models with a schema, validation rules, and a clear accuracy number per field.",
    output: "Pipeline plus dataset, and an evaluation report you can read.",
  },
  {
    title: "Fine-tuning and model choice",
    body: "When a prompt isn't enough: a fine-tuned or local model for a narrow task, chosen by measurement rather than by the newest release.",
    output: "Model, eval harness, and the comparison that justified it.",
  },
  {
    title: "Agents with tools",
    body: "Agents that act: call your APIs, fill forms, run scheduled jobs. Small and specific beats general.",
    output: "Agent, its tools, and the logs to see what it did.",
  },
];

export const NOW = {
  updated: "October 2026",
  items: [
    { label: "Gendox", text: "One screen and one schedule for all integrations, with page selection for web scraping." },
    { label: "Gendox", text: "Rebuilding the frontend from scratch, without the paid template and without MUI." },
    { label: "Extraction", text: "Comparing models and tightening the evaluation harness for structured extraction." },
    { label: "Side", text: "MyMera, and this site." },
  ],
};
