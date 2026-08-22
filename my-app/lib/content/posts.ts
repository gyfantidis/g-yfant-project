export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "deploying-nextjs-hetzner-coolify",
    title: "Deploying Next.js on Hetzner with Coolify: A Complete Guide",
    date: "2025-11-10",
    readingTime: "8 min",
    excerpt:
      "A practical walkthrough of setting up a production-grade Next.js deployment on a Hetzner VPS using Coolify as the deployment platform — zero-downtime, with automatic HTTPS.",
    tags: ["DevOps", "Next.js", "Coolify", "Hetzner"],
    content: `Coolify is an open-source Heroku/Netlify alternative you can self-host. Paired with a Hetzner CX22 instance, you get a production-ready pipeline for around €4/month.

**The stack:**
- Hetzner CX22 (2 vCPU, 4 GB RAM)
- Ubuntu 22.04 LTS
- Coolify v4 (Docker-based)
- Let's Encrypt via Traefik

**Key steps:**
1. Provision the VPS and install Coolify via the official script
2. Connect your GitHub repository
3. Set environment variables in Coolify's dashboard
4. Configure the build command: \`yarn build\`
5. Set the publish directory and port (3000 for Next.js)
6. Enable automatic HTTPS — Coolify handles Traefik config for you

Zero-downtime deploys happen via Docker container swaps. Rolling back is a single click.`,
  },
  {
    slug: "claude-code-devops-workflows",
    title: "Claude Code in Production: Real DevOps Workflows",
    date: "2026-01-22",
    readingTime: "6 min",
    excerpt:
      "How I integrated Claude Code into my daily DevOps work — from writing Dockerfiles and GitHub Actions workflows to debugging production issues at 2am.",
    tags: ["AI", "DevOps", "Claude", "Automation"],
    content: `Claude Code changed how I work. Not by replacing judgment, but by removing the friction of switching between thinking and writing.

**Where it actually helps:**
- Dockerfile optimisation: asking for multi-stage build improvements
- GitHub Actions: generating matrix test configs
- Debugging: pasting logs and getting targeted hypotheses
- Documentation: turning inline comments into readable docs

The key insight: treat it as a senior colleague who's always available, not as an autocomplete engine. Give context, get useful output.

**One real example:** I was debugging a flaky test in CI at midnight. Pasted the GitHub Actions log + the test file + the Docker Compose config. Claude identified that the health check timeout was too aggressive for slow CI runners. Fixed in 2 minutes.`,
  },
  {
    slug: "dama-hackathon-ml-journey",
    title: "From Raw Data to ML Model: My DAMA Hackathon Journey",
    date: "2026-02-14",
    readingTime: "10 min",
    excerpt:
      "How our team went from a messy CSV of football transfers to a market value predictor with R²=0.81, using XGBoost, feature engineering, and SHAP interpretability.",
    tags: ["ML", "Python", "XGBoost", "Data Science"],
    content: `The DAMA MSc hackathon gave us 48 hours and a dataset of 15,000 professional football player transfers.

**The problem:** predict current market value from player attributes, historical performance, and contract data.

**Our pipeline:**
1. Data cleaning — 23% missing values, handled with median imputation + indicator flags
2. Feature engineering — age^2 term, position encoding, rolling average goals/assists
3. Model selection — compared Random Forest, XGBoost, LightGBM
4. Final model — XGBoost with Optuna hyperparameter tuning
5. Interpretability — SHAP values revealed "age × position" as the dominant interaction

**Result:** R²=0.81 on the hold-out test set. The model correctly identified that defensive midfielders depreciate faster than attackers after 28.

Key lesson: 60% of the work was feature engineering, 10% was model selection.`,
  },
  {
    slug: "docker-compose-patterns",
    title: "Docker Compose Patterns I Use Every Day",
    date: "2026-03-05",
    readingTime: "5 min",
    excerpt:
      "Four Compose patterns that made my local dev and staging environments dramatically more reliable — including the one that finally fixed 'it works on my machine'.",
    tags: ["Docker", "DevOps", "Containers"],
    content: `After two years of Docker Compose in production-ish environments, these patterns stuck.

**1. Health checks on every service**
\`\`\`yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
\`\`\`

**2. depends_on with condition**
\`\`\`yaml
depends_on:
  postgres:
    condition: service_healthy
\`\`\`

**3. env_file + .env.example**
Never commit secrets. Keep \`.env.example\` in git, \`.env\` in \`.gitignore\`.

**4. Named volumes over bind mounts for databases**
Bind mounts on Mac have significant I/O overhead. Named volumes are 5-10x faster for Postgres data.

These four changes eliminated 80% of my "why won't it start" debugging sessions.`,
  },
];

/** Newest first — what both the blog listing and the homepage teaser use. */
export const POSTS_BY_DATE = [...POSTS].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const RECENT_POSTS = POSTS_BY_DATE.slice(0, 3);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
