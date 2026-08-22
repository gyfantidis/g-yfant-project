/**
 * Core identity — single source of truth for both the marketing site and the OS.
 */

export const PROFILE = {
  name: "Giannis Yfantidis",
  firstName: "Giannis",
  lastName: "Yfantidis",
  role: "AI Platform & Full-Stack Engineer",
  location: "Kilkis, Central Macedonia, Greece",
  locationShort: "Kilkis · GR",
  email: "ggyfantidis@gmail.com",
  available: true,
  availableLabel: "Open to work",

  /** Hero positioning line — what the site is actually about. */
  intro:
    "I build AI platforms. No-code agent systems at Ctrl+Space Labs, an EU-funded research project on data provenance, and a Greek-language AI product I run end to end on my own infrastructure.",

  /** Secondary line, one notch more specific. */
  subIntro:
    "Spring Boot and React in production, Docker and CI/CD underneath, and an MSc in Data Science & Machine Learning in progress.",

  /** Rendered as a slash-separated line under the name. */
  focus: ["AI Platforms", "Full-Stack", "DevOps", "Machine Learning"],
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
