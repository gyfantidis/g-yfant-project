export interface CommandResult {
  lines: string[];
  isError?: boolean;
  action?: "clear" | "open_contact";
  openApp?: string;
}

const OPEN_ALIASES: Record<string, string> = {
  about:         "about",
  projects:      "projects",
  terminal:      "terminal",
  blog:          "blog",
  skills:        "skills",
  stack:         "skills",
  contact:       "contact",
  certs:         "certifications",
  certifications:"certifications",
  now:           "now",
  books:         "books",
};

export function processCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim();
  const lower   = trimmed.toLowerCase();

  // ── clear ──────────────────────────────────────────────────────
  if (lower === "clear") {
    return { lines: [], action: "clear" };
  }

  // ── sudo hire-me ───────────────────────────────────────────────
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

  // ── open <app> ─────────────────────────────────────────────────
  if (lower.startsWith("open ")) {
    const arg = lower.slice(5).trim();
    const appId = OPEN_ALIASES[arg];
    if (appId) {
      return {
        lines: [`→ opening ${arg}...`],
        openApp: appId,
      };
    }
    return {
      lines: [`open: unknown app '${arg}'. Try: about, projects, blog, skills, contact, certs, now, books, terminal`],
      isError: true,
    };
  }

  // ── echo ───────────────────────────────────────────────────────
  if (lower.startsWith("echo ")) {
    return { lines: [trimmed.slice(5)] };
  }

  // ── date (fresh each call) ─────────────────────────────────────
  if (lower === "date") {
    return {
      lines: [
        new Date().toLocaleString("en-GB", { timeZone: "Europe/Athens" }) +
          " (Athens time)",
      ],
    };
  }

  // ── whoami variants ────────────────────────────────────────────
  if (lower === "whoami") {
    return {
      lines: [
        "Name:     Giannis Yfantidis",
        "Title:    DevOps & Full-Stack Engineer",
        "Location: Athens, Greece",
        "Status:   🟢 Open to opportunities",
        "",
        "→ Try 'whoami --human' for the full story.",
      ],
    };
  }

  if (lower === "whoami --human") {
    return {
      lines: [
        "Giannis. Developer, builder, overthinker.",
        "",
        "I spent 9 years in agricultural IT before pivoting",
        "to software full-time. Best decision I ever made.",
        "",
        "Currently: building AI agents at Ctrl+Space Labs,",
        "finishing an MSc in Data Science, and running a",
        "Greek-language AI content platform on the side.",
        "",
        "I code with two monitors, bad coffee, and playlists",
        "I'd be embarrassed to share publicly.",
        "",
        "Athens is home. Paris was a good detour.",
        "",
        "→ Open to roles where the problems are hard",
        "  and the team actually cares.",
      ],
    };
  }

  // ── static commands ────────────────────────────────────────────
  const COMMANDS: Record<string, string[]> = {
    skills: [
      "[ DevOps ]    Docker · GitHub Actions · Coolify · Hetzner · Linux · Nginx",
      "[ Frontend ]  React · Next.js · TypeScript · Tailwind CSS · MUI · Redux",
      "[ Backend ]   Java · Spring Boot · REST APIs · PostgreSQL · Node.js",
      "[ ML & Data ] Python · XGBoost · scikit-learn · Pandas · SHAP",
      "[ Tools ]     Git · Claude AI · Cursor IDE · ZenHub · Figma",
    ],
    projects: [
      "1. Gendox               → No-code AI agent platform (live at ctrlspace.dev)",
      "2. oneprompt.gr         → Greek-language AI content platform",
      "3. Maritime Pipeline    → Historical Lloyd's Register OCR, 1764–1935",
      "4. Football Predictor   → DAMA Hackathon · XGBoost · R²=0.81",
      "5. DermaVibes           → Digital marketing platform for dermatology clinic",
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
    ls: [
      "about.txt    projects/    blog/    skills.json",
      "contact.txt  certs/       now.md   books.txt",
    ],
    help: [
      "┌─ Available commands ──────────────────────────────┐",
      "│                                                   │",
      "│  whoami           — identity & status             │",
      "│  whoami --human   — the actual story              │",
      "│  skills           — tech stack by category        │",
      "│  projects         — project list                  │",
      "│  blog             — recent posts                  │",
      "│  contact          — get in touch                  │",
      "│  open <app>       — open about/projects/blog/     │",
      "│                     skills/contact/certs/         │",
      "│                     now/books/terminal            │",
      "│  ls               — list filesystem               │",
      "│  cat about.txt    — read bio file                 │",
      "│  uname -a         — system info                   │",
      "│  date             — current Athens time           │",
      "│  sudo hire-me     — make an offer                 │",
      "│  easter-egg       — ???                           │",
      "│  clear            — clear terminal                │",
      "│                                                   │",
      "└───────────────────────────────────────────────────┘",
    ],
    "cat about.txt": [
      "I build systems that scale and interfaces that matter.",
      "Currently pursuing MSc in Data Science & ML (DAMA).",
      "Based in Athens, Greece.",
      "",
      "9 years in agricultural IT → full-time software engineer.",
      "The long way around turned out to be the right way.",
      "",
      "→ Type 'whoami --human' for the full story.",
    ],
    "uname -a": [
      "GY-OS 1.0.0 Athens/GR Next.js/16.0 #DevOps #FullStack #ML 2026",
    ],
    "easter-egg": [
      "🥚  You found it.",
      "",
      "This OS was designed and built from scratch:",
      "boot sequence, draggable windows, terminal, 9 apps.",
      "",
      "The stack: Next.js · TypeScript · Framer Motion · CSS vars.",
      "No UI library. Every pixel intentional.",
      "",
      "→ Still curious? sudo hire-me 😉",
    ],
    pwd: ["/home/visitor"],
    "cat /etc/os-release": [
      'NAME="GY-OS"',
      'VERSION="1.0.0"',
      'ID=gy-os',
      'PRETTY_NAME="GY-OS 1.0.0 (Athens Edition)"',
      'ENGINEER="Giannis Yfantidis"',
    ],
  };

  if (lower in COMMANDS) {
    return { lines: COMMANDS[lower] };
  }

  return {
    lines: [`command not found: ${trimmed}. Type 'help' for available commands.`],
    isError: true,
  };
}
