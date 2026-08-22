export const NOW_DATA = {
  updated: "April 2026",
  working: [
    {
      title: "Gendox — AI Agent Platform",
      sub: "Ctrl+Space Labs · Full-time",
      detail:
        "Building and expanding Gendox — a no-code platform for AI chat agents. Currently working on new integrations and improving the RAG pipeline.",
      accent: "green" as const,
    },
    {
      title: "oneprompt.gr",
      sub: "Side project",
      detail:
        "Greek-language AI content platform. Running on Hetzner + Coolify. Iterating on UX and content generation quality.",
      accent: "blue" as const,
    },
  ],
  studying: [
    {
      label: "MSc DAMA",
      detail: "Data Science & Machine Learning — Hellenic Open University. 2nd year in progress.",
    },
    {
      label: "LLM internals",
      detail: "Going deeper into transformer architectures, attention mechanisms, and fine-tuning techniques.",
    },
  ],
  lately: [
    { emoji: "🇫🇷", text: "Took a few days in Paris — wandered around Montmartre, saw the Eiffel Tower at night. One of those trips that clears your head." },
    { emoji: "🌐", text: "Attended NGI Forum in Europe — conversations about open internet, digital sovereignty, and where the web is actually going." },
    { emoji: "☕", text: "Coding late at night with two monitors, bad coffee, and playlists I'd be embarrassed to share publicly." },
    { emoji: "🤔", text: "Thinking a lot about whether AI makes developers irrelevant. Current conclusion: no — but the job changes completely, and most people aren't ready for that." },
    { emoji: "🏙️", text: "Athens is underrated. The light here is different. The chaos is part of it." },
  ],
};

export const ACCENT_COLORS = {
  green: { color: "var(--os-accent)", bg: "rgba(0,255,136,0.07)", border: "rgba(0,255,136,0.15)" },
  blue:  { color: "var(--os-blue)",   bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.15)" },
};
