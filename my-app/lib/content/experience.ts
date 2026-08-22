export interface ExperienceEntry {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  current: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Ctrl+Space Labs",
    title: "Software Engineer",
    period: "Sep 2023 — Present",
    location: "Athens, Greece - Remote",
    description:
      "Implementing Gendox — a no-code platform for building AI chat agents powered by Generative AI. Full-stack: Spring Boot REST APIs, React frontend, AWS deployments, CI/CD pipelines.",
    current: true,
  },
  {
    company: "EASTH",
    title: "IT & Agricultural Management Consultant",
    period: "Jun 2009 — Jan 2023",
    location: "Kilkis, Greece",
    description:
      "Managed IT infrastructure, data digitalization and internal web systems for a large partnership in Northern Greece.",
    current: false,
  },
];

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  active: boolean;
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "Hellenic Open University",
    degree: "MSc — Data Science & Machine Learning (DAMA)",
    period: "2024 — 2026",
    active: true,
  },
  {
    school: "Hellenic Open University",
    degree: "Bachelor's — Computer Science & Informatics",
    period: "2017 — 2022",
    active: false,
  },
];

/**
 * Career track. Only surfaced on /about — the site leads with current work,
 * not with the path that got here.
 */
export interface TimelineEntry {
  year: string;
  label: string;
  detail: string;
}

export const TIMELINE: TimelineEntry[] = [
  { year: "2022", label: "BSc Computer Science", detail: "Hellenic Open University." },
  { year: "2023", label: "Ctrl+Space Labs", detail: "Joined as a software engineer, building Gendox." },
  { year: "2024", label: "ProvenAI", detail: "Shipped an NGI TrustChain research project on AI data provenance." },
  { year: "2024", label: "MSc DAMA", detail: "Started Data Science & Machine Learning." },
  { year: "2025", label: "oneprompt.gr", detail: "Launched and self-hosted a Greek-language AI product." },
  { year: "2026", label: "Today", detail: "Expanding Gendox, finishing the MSc." },
];
