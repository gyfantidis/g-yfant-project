export interface Project {
  title: string;
  url?: string;
  description: string;
  tech: string[];
  highlight?: string;
  /** Shown in the homepage "Selected work" section. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Gendox",
    url: "https://www.ctrlspace.dev/gendox",
    description:
      "No-code platform for building intelligent AI chat agents powered by Generative AI. Enables organizations to create expert-level conversational agents across diverse industries. Built at Ctrl+Space Labs.",
    tech: ["Spring Boot", "React", "AWS", "PostgreSQL", "REST APIs", "Java"],
    highlight: "Live",
    featured: true,
  },
  {
    title: "oneprompt.gr",
    url: "https://oneprompt.gr",
    description:
      "Greek-language AI content platform. Lets users generate, edit and publish AI-assisted content in Greek. Self-hosted on Hetzner via Coolify.",
    tech: ["Next.js", "Claude API", "Coolify", "Hetzner", "TypeScript"],
    highlight: "Live",
    featured: true,
  },
  {
    title: "ProvenAI",
    url: "https://trustchain.ngi.eu/provenai/",
    description:
      "NGI TrustChain project redefining AI data provenance. Contributors get decentralised identities, blockchain-backed traceability via Merkle trees, and tokenized fair-compensation models. Integrates SSI, Verifiable Credentials, and ISCC tagging for granular contribution attribution. Built at Ctrl+Space Labs.",
    tech: ["Spring Boot", "React", "Blockchain", "SSI", "Verifiable Credentials", "ISCC", "Java"],
    highlight: "NGI",
    featured: true,
  },
  {
    title: "Historical Records Extraction",
    description:
      "Structured extraction from two centuries of scanned printed registers for a client. Fine-tuned Qwen3-VL 8B (LoRA) served locally with Ollama; 98.9% field accuracy on unseen pages.",
    tech: ["Python", "Qwen3-VL", "LoRA", "Ollama", "Vertex AI"],
    highlight: "ML",
  },
  {
    title: "Football Market Value Predictor",
    description:
      "DAMA MSc Hackathon project. Predicts player market values using ensemble models. Achieved R²=0.81 on hold-out set with SHAP-based interpretability.",
    tech: ["Python", "XGBoost", "scikit-learn", "SHAP", "R"],
    highlight: "R²=0.81",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

/** Every distinct tech across all projects — used for the /projects filter bar. */
export const ALL_TECH = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tech))
).sort();

export const highlightColors: Record<string, { bg: string; color: string }> = {
  NGI: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
  Live: { bg: "rgba(0,255,136,0.12)", color: "var(--os-accent)" },
  ML: { bg: "rgba(14,165,233,0.12)", color: "var(--os-blue)" },
  "R²=0.81": { bg: "rgba(14,165,233,0.12)", color: "var(--os-blue)" },
};
