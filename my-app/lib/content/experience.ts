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
      "14-year tenure managing IT infrastructure, GIS field digitalization, IACS agricultural subsidy systems, and web solutions for one of Thessaloniki's largest agricultural partnerships.",
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

/** Condensed career arc for the homepage story section. */
export interface TimelineEntry {
  year: string;
  label: string;
  detail: string;
}

export const TIMELINE: TimelineEntry[] = [
  { year: "2009", label: "EASTH", detail: "IT & agricultural consulting in Kilkis." },
  { year: "2017", label: "Back to school", detail: "Started a CS degree while working full-time." },
  { year: "2022", label: "BSc Computer Science", detail: "Graduated from Hellenic Open University." },
  { year: "2023", label: "Ctrl+Space Labs", detail: "Career switch to software engineering." },
  { year: "2024", label: "MSc DAMA", detail: "Data Science & Machine Learning." },
  { year: "2026", label: "Today", detail: "Building AI agent platforms and shipping side projects." },
];
