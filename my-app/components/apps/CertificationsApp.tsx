"use client";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  url?: string;
  badge?: "aws" | "coursera" | "udemy" | "linkedin" | "ctrlspace";
}

const CERTS: Cert[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Apr 2023",
    expires: "Apr 2026",
    url: "https://www.credly.com/badges/25672be6-eca7-43a1-bd27-1c618ab1df56/linked_in_profile",
    badge: "aws",
  },
  {
    name: "Prompt Engineering Specialization",
    issuer: "Vanderbilt University · Coursera",
    date: "Feb 2024",
    url: "https://www.coursera.org/account/accomplishments/specialization/9Y2H76PAVM7F",
    badge: "coursera",
  },
  {
    name: "GitHub Actions",
    issuer: "Udemy",
    date: "2023",
    url: "https://www.udemy.com/certificate/UC-ca368bc5-bc1a-45a5-8532-65a158efb474",
    badge: "udemy",
  },
  {
    name: "Java Programming Masterclass (Java 17)",
    issuer: "Udemy",
    date: "Jan 2023",
    url: "https://www.udemy.com/certificate/UC-ba0025fc-7321-4851-86e6-f0b243ee8119",
    badge: "udemy",
  },
  {
    name: "The Linux Command Line Bootcamp",
    issuer: "Udemy",
    date: "2023",
    url: "https://www.udemy.com/certificate/UC-05357cd0-f7fd-426c-80cd-2379d16ad579",
    badge: "udemy",
  },
  {
    name: "Web Development Bootcamp",
    issuer: "Ctrl+Space Labs",
    date: "Jun – Aug 2023",
    url: "https://www.ctrlspace.dev/certifications/wqviduxmha",
    badge: "ctrlspace",
  },
  {
    name: "The Complete JavaScript Course 2023",
    issuer: "Udemy",
    date: "Dec 2022",
    url: "https://www.udemy.com/certificate/UC-f0cac582-b6c8-4b28-b249-79bc352b10ec",
    badge: "udemy",
  },
  {
    name: "The Complete SQL Bootcamp 2022",
    issuer: "Udemy",
    date: "Nov 2022",
    url: "https://www.udemy.com/certificate/UC-fa57dd8a-c8d9-4a98-b1b9-e66ba691e2f8",
    badge: "udemy",
  },
  {
    name: "Agile Foundations",
    issuer: "LinkedIn Learning",
    date: "Aug 2023",
    badge: "linkedin",
  },
];

const BADGE_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  aws: { bg: "rgba(255,153,0,0.12)", color: "#ff9900", label: "AWS" },
  coursera: { bg: "rgba(0,86,210,0.12)", color: "#0056d2", label: "Coursera" },
  udemy: { bg: "rgba(167,97,234,0.12)", color: "#a761ea", label: "Udemy" },
  linkedin: { bg: "rgba(14,118,168,0.12)", color: "#0e76a8", label: "LinkedIn" },
  ctrlspace: { bg: "rgba(0,255,136,0.1)", color: "#00ff88", label: "Ctrl+Space" },
};

export default function CertificationsApp() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "var(--font-dmsans), sans-serif",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid var(--os-border)",
          background: "var(--os-surface-2)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 11,
          color: "var(--os-muted)",
          userSelect: "none",
        }}
      >
        ~/certifications — {CERTS.length} certificates
      </div>

      {/* List */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {CERTS.map((cert, i) => {
          const badge = cert.badge ? BADGE_COLORS[cert.badge] : BADGE_COLORS.udemy;
          return (
            <div
              key={i}
              style={{
                background: "var(--os-surface-2)",
                border: "1px solid var(--os-border)",
                borderRadius: 8,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,136,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--os-border)")
              }
            >
              {/* Issuer badge */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: badge.bg,
                  border: `1px solid ${badge.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 9,
                  fontWeight: 700,
                  color: badge.color,
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: 2,
                }}
              >
                {badge.label}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--os-text)",
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 11,
                    color: "var(--os-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{cert.issuer}</span>
                  <span>·</span>
                  <span>{cert.date}</span>
                  {cert.expires && (
                    <>
                      <span>·</span>
                      <span style={{ color: "var(--os-accent)" }}>
                        valid until {cert.expires}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Link */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="View certificate"
                  style={{
                    color: "var(--os-muted)",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--os-accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--os-muted)")
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
