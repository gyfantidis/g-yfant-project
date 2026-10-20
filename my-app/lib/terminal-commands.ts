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
  photos:        "photos",
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
        "   Contact: giannis@g-yfantidis.gr",
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
      lines: [
        `open: unknown app '${arg}'.`,
        `Try: about, projects, blog, skills, contact, certs, now, books, photos, terminal`,
      ],
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
        "Location: Thessaloniki metropolitan area, Greece",
        "Focus:    🟢 AI-powered products · Full-stack · Cloud",
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
        "→ Type 'sudo hire-me' if you want to work together.",
      ],
    };
  }

  // ── neofetch ───────────────────────────────────────────────────
  if (lower === "neofetch") {
    return {
      lines: [
        "       ██████╗ ██╗   ██╗      Giannis@GY-OS",
        "      ██╔════╝ ╚██╗ ██╔╝      ────────────────────────────",
        "      ██║  ███╗ ╚████╔╝       OS:      GY-OS v1.0 Athens Edition",
        "      ██║   ██║  ╚██╔╝        Kernel:  Next.js 16 + React 19",
        "      ╚██████╔╝   ██║         Shell:   TypeScript",
        "       ╚═════╝    ╚═╝         DE:      Framer Motion",
        "                              WM:      Custom Window Manager",
        "                              Font:    JetBrains Mono",
        "                              CPU:     Brain @ 2.4GHz (variable)",
        "                              Memory:  Enough to ship",
        "                              Uptime:  9 years in tech",
        "",
        "                              ████  ████  ████  ████",
      ],
    };
  }

  // ── uptime ─────────────────────────────────────────────────────
  if (lower === "uptime") {
    const now = new Date();
    const hours = now.getHours();
    const mins  = now.getMinutes();
    return {
      lines: [
        `${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")} up 9 years, 0 burnouts,`,
        "  load average: focused, building, shipping",
      ],
    };
  }

  // ── history ────────────────────────────────────────────────────
  if (lower === "history") {
    return {
      lines: [
        "  1  learned to code (agricultural IT, 2015)",
        "  2  built first production app (2018)",
        "  3  went full-time software (2023)",
        "  4  joined Ctrl+Space Labs (2024)",
        "  5  started MSc in Data Science (2024)",
        "  6  launched oneprompt.gr (2025)",
        "  7  built this OS portfolio (2026)",
        "  8  ???",
      ],
    };
  }

  // ── coffee ─────────────────────────────────────────────────────
  if (lower === "coffee" || lower === "make coffee") {
    return {
      lines: [
        "  ( (",
        "   ) )",
        " ........",
        " |      |]",
        " \\      /",
        "  `----'",
        "",
        "☕ Bad coffee brewed. Ready to ship.",
      ],
    };
  }

  // ── matrix ─────────────────────────────────────────────────────
  if (lower === "matrix") {
    return {
      lines: [
        "Wake up, Neo...",
        "The Matrix has you.",
        "",
        "01001000 01100101 01101100 01101100 01101111",
        "01000111 01101001 01100001 01101110 01101110 01101001 01110011",
        "",
        "→ You are already inside the OS.",
      ],
    };
  }

  // ── tree ───────────────────────────────────────────────────────
  if (lower === "tree") {
    return {
      lines: [
        "~/gy-os",
        "├── about.txt",
        "├── projects/",
        "│   ├── gendox.md",
        "│   ├── oneprompt.md",
        "│   └── maritime-pipeline.md",
        "├── blog/",
        "│   └── 4 posts",
        "├── skills.json",
        "├── contact.txt",
        "├── certs/",
        "├── now.md",
        "├── books.txt",
        "└── photos/",
        "    └── 43 photos",
      ],
    };
  }

  // ── ping ───────────────────────────────────────────────────────
  if (lower === "ping giannis.gr" || lower === "ping yfantidis.gr") {
    return {
      lines: [
        "PING giannis.gr: 56 data bytes",
        "64 bytes from giannis.gr: icmp_seq=0 ttl=64 time=0.42 ms",
        "64 bytes from giannis.gr: icmp_seq=1 ttl=64 time=0.38 ms",
        "64 bytes from giannis.gr: icmp_seq=2 ttl=64 time=0.41 ms",
        "",
        "--- giannis.gr ping statistics ---",
        "3 packets transmitted, 3 received, 0% packet loss",
        "round-trip min/avg/max = 0.38/0.40/0.42 ms",
        "",
        "→ Always online. 😄",
      ],
    };
  }

  // ── ls -la ─────────────────────────────────────────────────────
  if (lower === "ls -la" || lower === "ls -l") {
    return {
      lines: [
        "total 10",
        "drwxr-xr-x  about.txt        2.1K  Jan 2026",
        "drwxr-xr-x  projects/        --    Jan 2026",
        "drwxr-xr-x  blog/            --    Mar 2026",
        "-rw-r--r--  skills.json      4.2K  Feb 2026",
        "-rw-r--r--  contact.txt      512B  Jan 2026",
        "drwxr-xr-x  certs/           --    Jan 2026",
        "-rw-r--r--  now.md           1.8K  Apr 2026",
        "-rw-r--r--  books.txt        3.1K  Feb 2026",
        "drwxr-xr-x  photos/          9.6M  Mar 2026",
      ],
    };
  }

  // ── man ────────────────────────────────────────────────────────
  if (lower.startsWith("man ")) {
    const topic = lower.slice(4).trim();
    return {
      lines: [
        `No manual entry for '${topic}'.`,
        "",
        "This is a portfolio OS, not a real Unix system.",
        "Try 'help' instead.",
      ],
      isError: true,
    };
  }

  // ── static commands ────────────────────────────────────────────
  const COMMANDS: Record<string, string[]> = {
    skills: [
      "[ DevOps ]    Docker · GitHub Actions · Coolify · Hetzner · Linux · AWS",
      "[ Frontend ]  React · Next.js · JavaScript · MUI · Redux",
      "[ Backend ]   Java · Spring Boot · REST APIs · PostgreSQL",
      "[ Tools ]     Git · Claude AI · Cursor IDE · ZenHub",
    ],
    projects: [
      "1. Gendox               → No-code AI agent platform (live at ctrlspace.dev)",
      "2. oneprompt.gr         → Greek-language AI content platform",
      "3. ProvenAI             → NGI TrustChain project redefining AI data provenance", 
      "4. Records Extraction   → Scanned historical registers → datasets",
      "5. Football Predictor   → DAMA Hackathon · XGBoost · R²=0.81",
    ],
    blog: [
      "1. Deploying Next.js on Hetzner with Coolify: A Complete Guide",
      "2. Claude Code in Production: Real DevOps Workflows",
      "3. From Raw Data to ML Model: My DAMA Hackathon Journey",
      "4. Docker Compose Patterns I Use Every Day",
    ],
    contact: [
      "Email:    giannis@g-yfantidis.gr",
      "GitHub:   github.com/gyfantidis",
      "LinkedIn: linkedin.com/in/giannis-yfantidis",
    ],
    ls: [
      "about.txt    projects/    blog/    skills.json",
      "contact.txt  certs/       now.md   books.txt    photos/",
    ],
    help: [
      "┌─ Available commands ──────────────────────────────┐",
      "│                                                   │",
      "│  whoami           — identity & focus              │",
      "│  whoami --human   — the actual story              │",
      "│  neofetch         — system info (fancy)           │",
      "│  skills           — tech stack by category        │",
      "│  projects         — project list                  │",
      "│  blog             — recent posts                  │",
      "│  contact          — get in touch                  │",
      "│  open <app>       — open about/projects/blog/     │",
      "│                     skills/contact/certs/         │",
      "│                     now/books/photos/terminal     │",
      "│  ls / ls -la      — list filesystem               │",
      "│  tree             — directory tree                │",
      "│  cat about.txt    — read bio file                 │",
      "│  uname -a         — system info                   │",
      "│  date             — current Athens time           │",
      "│  uptime           — system uptime                 │",
      "│  history          — command history               │",
      "│  coffee           — essential utility             │",
      "│  matrix           — go deeper                     │",
      "│  ping giannis.gr  — latency test                  │",
      "│  sudo hire-me     — make an offer                 │",
      "│  easter-egg       — ???                           │",
      "│  clear            — clear terminal                │",
      "│                                                   │",
      "│  OS shortcuts: ⌘K spotlight · ? keyboard help    │",
      "│                                                   │",
      "└───────────────────────────────────────────────────┘",
    ],
    "cat about.txt": [
      "I build systems that scale and interfaces that matter.",
      "Currently pursuing MSc in Data Science & ML (DAMA).",
      "Based in the Thessaloniki metropolitan area, Greece.",
      "",
      "9 years in agricultural IT → full-time software engineer.",
      "The long way around turned out to be the right way.",
      "",
      "→ Type 'whoami --human' for the full story.",
    ],
    "uname -a": [
      "GY-OS 1.0.0 Kilkis/GR Next.js/16.0 #DevOps #FullStack 2026",
    ],
    "easter-egg": [
      "🥚  You found it.",
      "",
      "This OS was designed and built from scratch:",
      "boot sequence, draggable windows, terminal, 10 apps.",
      "",
      "The stack: Next.js · JavaScript · CSS vars.",
      "No UI library. Every pixel intentional.",
      "",
      "→ Still curious? sudo hire-me 😉",
    ],
    pwd: ["/home/visitor"],
    "cat /etc/os-release": [
      'NAME="GY-OS"',
      'VERSION="1.0.0"',
      'ID=gy-os',
      'PRETTY_NAME="GY-OS 1.0.0 (Kilkis Edition)"',
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
