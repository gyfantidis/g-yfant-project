export interface Skill {
  name: string;
  level?: "core" | "proficient" | "learning";
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

export const CATEGORIES: SkillCategory[] = [
  {
    id: "devops",
    label: "DevOps",
    icon: "⚙️",
    color: "#00ff88",
    bgColor: "rgba(0,255,136,0.07)",
    skills: [
      { name: "Docker", level: "core" },
      { name: "GitHub Actions", level: "core" },
      { name: "Coolify", level: "core" },
      { name: "Hetzner", level: "proficient" },
      { name: "Linux", level: "core" },
      { name: "AWS", level: "core" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🖥️",
    color: "#0ea5e9",
    bgColor: "rgba(14,165,233,0.07)",
    skills: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "MUI", level: "proficient" },
      { name: "Redux", level: "proficient" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "🔧",
    color: "#a78bfa",
    bgColor: "rgba(167,139,250,0.07)",
    skills: [
      { name: "Java", level: "core" },
      { name: "Spring Boot", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "PostgreSQL", level: "proficient" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "🛠️",
    color: "#6ee7b7",
    bgColor: "rgba(110,231,183,0.07)",
    skills: [
      { name: "Git", level: "core" },
      { name: "Claude AI", level: "core" },
      { name: "Cursor IDE", level: "core" },
      { name: "ZenHub", level: "proficient" },
    ],
  },
];

export const levelOpacity: Record<string, number> = {
  core: 1,
  proficient: 0.75,
  learning: 0.45,
};
