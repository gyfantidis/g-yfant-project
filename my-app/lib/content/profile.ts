/**
 * Core identity — single source of truth for both the marketing site and the OS.
 */

export const PROFILE = {
  name: "Giannis Yfantidis",
  role: "Full-Stack & DevOps Engineer",
  tagline: "Building AI platforms. MSc Data Science & ML candidate.",
  location: "Kilkis, Central Macedonia, Greece",
  locationShort: "Kilkis · GR",
  email: "ggyfantidis@gmail.com",
  available: true,
  availableLabel: "Available for opportunities",
  /** Short intro used in hero sections and meta descriptions. */
  intro:
    "I spent 14 years running IT and GIS infrastructure for one of Northern Greece's largest agricultural partnerships, then rebuilt my career around software. Today I build AI agent platforms at Ctrl+Space Labs while finishing an MSc in Data Science & Machine Learning.",
} as const;

export const SOCIALS = {
  github: "https://github.com/gyfantidis",
  linkedin: "https://linkedin.com/in/giannis-yfantidis",
  email: `mailto:${PROFILE.email}`,
} as const;

/** Names shown in the homepage trust bar. */
export const TRUST_BAR = [
  "Ctrl+Space Labs",
  "NGI TrustChain",
  "AWS Certified",
  "Hellenic Open University",
] as const;
