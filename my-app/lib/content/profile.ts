/**
 * Core identity — single source of truth for both the marketing site and the OS.
 */

export const PROFILE = {
  name: "Giannis Yfantidis",
  firstName: "Giannis",
  lastName: "Yfantidis",
  role: "AI Engineer",
  location: "Thessaloniki metropolitan area, Greece",
  locationShort: "Thessaloniki metropolitan area · GR",
  email: "giannis@g-yfantidis.gr",
  available: true,
  availableLabel: "Open to work",

  /** Hero positioning line — what the site is actually about. */
  intro:
    "I build AI systems that run in production: retrieval over company documents, extraction from scanned archives, fine-tuned models that run locally. Developer at Ctrl+Space Labs since 2023.",

  /** Secondary line, one notch more specific. */
  subIntro:
    "Java and Spring underneath, Python for the data work, an MSc in Data Science & Machine Learning on top.",

  /** Rendered as a slash-separated line under the name. */
  focus: ["RAG", "Fine-tuning", "Document extraction", "Spring Boot"],
} as const;

export const SOCIALS = {
  github: "https://github.com/gyfantidis",
  linkedin: "https://linkedin.com/in/giannis-yfantidis",
  email: `mailto:${PROFILE.email}`,
} as const;

/** Headline figures for the homepage index. */
export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "3", label: "AI platforms in production" },
  { value: "1", label: "EU-funded research project" },
  { value: "R² 0.81", label: "ML hackathon model" },
  { value: "9", label: "certifications" },
];

/** Names shown in the homepage credibility line. */
export const TRUST_BAR = [
  "Ctrl+Space Labs",
  "NGI TrustChain",
  "AWS Certified",
  "Hellenic Open University",
] as const;
