"use client";

import { CATEGORIES, levelOpacity } from "@/lib/content";

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
