export interface CommandResult {
  lines: string[];
  isError?: boolean;
  action?: "open_contact" | "clear";
}

const COMMANDS: Record<string, string[]> = {
  whoami: [
    "Name:     Giannis Yfantidis",
    "Title:    DevOps & Full-Stack Engineer",
    "Location: Athens, Greece",
    "Status:   🟢 Open to opportunities",
  ],
  skills: [
    "[ DevOps ]    Docker · GitHub Actions · Coolify · Hetzner · Linux · Nginx · Plesk",
    "[ Frontend ]  React · Next.js · TypeScript · Tailwind CSS · MUI · Redux",
    "[ Backend ]   Java · Spring Boot · REST APIs",
    "[ ML & Data ] Python · XGBoost · scikit-learn · Pandas · SHAP",
    "[ Tools ]     Git · Claude AI · Cursor IDE · ZenHub",
  ],
  projects: [
    "1. oneprompt.gr          → Greek-language AI content platform",
    "2. Maritime Data Pipeline → Historical Lloyd's Register books 1764–1935",
    "3. Football Market Value  → DAMA Hackathon, XGBoost/RF, R²=0.81",
    "4. DermaVibes Marketing  → Digital marketing for dermatology clinic",
  ],
  blog: [
    "1. Deploying Next.js on Hetzner with Coolify: A Complete Guide",
    "2. Claude Code in Production: Real DevOps Workflows",
    "3. From Raw Data to ML Model: My DAMA Hackathon Journey",
    "4. Docker Compose Patterns I Use Every Day",
  ],
  contact: [
    "Email:    giannis@yfantidis.gr",
    "GitHub:   github.com/g-yfant",
    "LinkedIn: linkedin.com/in/giannis-yfantidis",
  ],
  ls: ["about.txt    projects/    blog/    contact.txt    skills.json"],
  help: [
    "┌─ Available commands ─────────────────────────┐",
    "│                                              │",
    "│  whoami        — identity and status         │",
    "│  skills        — tech stack by category      │",
    "│  projects      — project list                │",
    "│  blog          — recent blog posts           │",
    "│  contact       — get in touch                │",
    "│  ls            — list filesystem             │",
    "│  cat about.txt — read bio file               │",
    "│  uname -a      — system info                 │",
    "│  sudo hire-me  — make an offer               │",
    "│  easter-egg    — ???                         │",
    "│  clear         — clear terminal              │",
    "│  help          — this message                │",
    "│                                              │",
    "└──────────────────────────────────────────────┘",
  ],
  "cat about.txt": [
    "I build systems that scale and interfaces that matter.",
    "Currently pursuing MSc in Data Science & ML (DAMA).",
    "Based in Athens, Greece.",
    "",
    "→ Type 'skills' for the stack, 'projects' for the work.",
  ],
  "uname -a": [
    "GY-OS 1.0.0 Athens/GR Next.js/16.0 #DevOps #FullStack #ML 2026",
  ],
  "sudo hire-me": ["__HIRE_ME__"],
  "easter-egg": [
    "🥚  You found it.",
    "",
    "This entire OS was designed and built in a single session.",
    "The terminal you're typing in? Pure React + Framer Motion.",
    "The windows? Draggable, resizable, z-index managed.",
    "",
    '→ Still curious? sudo hire-me 😉',
  ],
  pwd: ["/home/visitor"],
  date: [new Date().toLocaleString("en-GB", { timeZone: "Europe/Athens" }) + " (Athens time)"],
  echo: ["Usage: echo <text>"],
  "cat /etc/os-release": [
    'NAME="GY-OS"',
    'VERSION="1.0.0"',
    'ID=gy-os',
    'PRETTY_NAME="GY-OS 1.0.0 (Athens Edition)"',
    'ENGINEER="Giannis Yfantidis"',
  ],
};

export function processCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "clear") {
    return { lines: [], action: "clear" };
  }

  if (lower === "sudo hire-me") {
    return {
      lines: [
        "✅ Permission granted.",
        "   Contact: giannis@yfantidis.gr",
        "   Opening contact app...",
      ],
      action: "open_contact",
    };
  }

  // Handle echo <text>
  if (lower.startsWith("echo ")) {
    return { lines: [trimmed.slice(5)] };
  }

  // Handle date fresh each time
  if (lower === "date") {
    return {
      lines: [
        new Date().toLocaleString("en-GB", { timeZone: "Europe/Athens" }) +
          " (Athens time)",
      ],
    };
  }

  if (lower in COMMANDS) {
    return { lines: COMMANDS[lower] };
  }

  return {
    lines: [`command not found: ${trimmed}. Type 'help' for commands.`],
    isError: true,
  };
}
