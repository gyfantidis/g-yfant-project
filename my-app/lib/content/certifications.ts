export interface Cert {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  url?: string;
  badge?: "aws" | "coursera" | "udemy" | "linkedin" | "ctrlspace";
}

export const CERTS: Cert[] = [
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

export const BADGE_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  aws: { bg: "rgba(255,153,0,0.12)", color: "#ff9900", label: "AWS" },
  coursera: { bg: "rgba(0,86,210,0.12)", color: "#0056d2", label: "Coursera" },
  udemy: { bg: "rgba(167,97,234,0.12)", color: "#a761ea", label: "Udemy" },
  linkedin: { bg: "rgba(14,118,168,0.12)", color: "#0e76a8", label: "LinkedIn" },
  ctrlspace: { bg: "rgba(0,255,136,0.1)", color: "#00ff88", label: "Ctrl+Space" },
};
