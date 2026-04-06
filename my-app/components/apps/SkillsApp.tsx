"use client";

interface Skill {
  name: string;
  level?: "core" | "proficient" | "learning";
}

interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
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
      { name: "Nginx", level: "proficient" },
      { name: "Plesk", level: "proficient" },
      { name: "Traefik", level: "proficient" },
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
      { name: "TypeScript", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "Framer Motion", level: "proficient" },
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
      { name: "Node.js", level: "proficient" },
    ],
  },
  {
    id: "ml",
    label: "ML & Data",
    icon: "🤖",
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.07)",
    skills: [
      { name: "Python", level: "core" },
      { name: "XGBoost", level: "proficient" },
      { name: "scikit-learn", level: "proficient" },
      { name: "Pandas", level: "proficient" },
      { name: "SHAP", level: "proficient" },
      { name: "R", level: "learning" },
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
      { name: "Figma", level: "learning" },
    ],
  },
];

const levelOpacity: Record<string, number> = {
  core: 1,
  proficient: 0.75,
  learning: 0.45,
};

export default function SkillsApp() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
        overflow: "auto",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
        }}
      >
        <span>Opacity indicates depth:</span>
        {[
          { level: "core", label: "Core" },
          { level: "proficient", label: "Proficient" },
          { level: "learning", label: "Learning" },
        ].map(({ level, label }) => (
          <span
            key={level}
            style={{ opacity: levelOpacity[level], color: "var(--os-text)" }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          style={{
            background: cat.bgColor,
            border: `1px solid ${cat.color}22`,
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          {/* Category header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 16 }}>{cat.icon}</span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 12,
                fontWeight: 600,
                color: cat.color,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {cat.label}
            </span>
          </div>

          {/* Skill pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {cat.skills.map((skill) => (
              <span
                key={skill.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                  color: cat.color,
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  opacity: skill.level ? levelOpacity[skill.level] : 1,
                  transition: "opacity 0.15s, transform 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = String(
                    skill.level ? levelOpacity[skill.level] : 1
                  );
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
