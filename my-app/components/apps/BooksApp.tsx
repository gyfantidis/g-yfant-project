"use client";

type Status = "reading" | "read" | "next";

interface Book {
  title: string;
  author: string;
  year?: number;
  category: string;
  status: Status;
  note?: string;
}

const BOOKS: Book[] = [
  // ── Currently reading ──
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: 2017,
    category: "Engineering",
    status: "reading",
    note: "The bible of distributed systems. Dense but every page is worth it.",
  },
  // ── Read ──
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    year: 1999,
    category: "Engineering",
    status: "read",
    note: "Changed how I think about craft. Every developer should read this early.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    category: "Personal",
    status: "read",
    note: "Simple framework, real results. The 1% better every day idea stuck with me.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    category: "Psychology",
    status: "read",
    note: "Makes you question every decision you thought was rational.",
  },
  {
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    year: 2013,
    category: "Engineering",
    status: "read",
    note: "DevOps as a novel. Surprisingly gripping — read it in two days.",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2011,
    category: "History",
    status: "read",
    note: "Reframes everything. One of those books that changes your perspective permanently.",
  },
  {
    title: "Deep Learning",
    author: "Goodfellow, Bengio & Courville",
    year: 2016,
    category: "ML / AI",
    status: "read",
    note: "The textbook. Not casual reading — kept it on the desk during DAMA.",
  },
  // ── Up next ──
  {
    title: "The Hundred-Page Machine Learning Book",
    author: "Andriy Burkov",
    year: 2019,
    category: "ML / AI",
    status: "next",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    year: 2017,
    category: "Engineering",
    status: "next",
  },
  {
    title: "Noise: A Flaw in Human Judgment",
    author: "Kahneman, Sibony & Sunstein",
    year: 2021,
    category: "Psychology",
    status: "next",
  },
];

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  reading: { label: "Reading",  color: "var(--os-accent)", bg: "rgba(0,255,136,0.1)" },
  read:    { label: "Read",     color: "var(--os-blue)",   bg: "rgba(14,165,233,0.1)" },
  next:    { label: "Up next",  color: "var(--os-muted)",  bg: "rgba(255,255,255,0.04)" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering": "#a78bfa",
  "Personal":    "#f59e0b",
  "Psychology":  "#f472b6",
  "History":     "#fb923c",
  "ML / AI":     "#00ff88",
};

const STATUS_ORDER: Status[] = ["reading", "read", "next"];

export default function BooksApp() {
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    books: BOOKS.filter((b) => b.status === status),
  }));

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
          display: "flex",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span>~/books</span>
        <span>{BOOKS.filter((b) => b.status === "read").length} read · {BOOKS.length} total</span>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {grouped.map(({ status, books }) => {
          if (books.length === 0) return null;
          const cfg = STATUS_CONFIG[status];
          return (
            <section key={status}>
              {/* Section header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    color: cfg.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "2px 8px",
                    background: cfg.bg,
                    borderRadius: 20,
                  }}
                >
                  {cfg.label}
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--os-border)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: 10,
                    color: "var(--os-border)",
                  }}
                >
                  {books.length}
                </span>
              </div>

              {/* Book list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {books.map((book) => {
                  const catColor = CATEGORY_COLORS[book.category] ?? "var(--os-muted)";
                  return (
                    <div
                      key={book.title}
                      style={{
                        background: "var(--os-surface-2)",
                        border: "1px solid var(--os-border)",
                        borderRadius: 8,
                        padding: "11px 14px",
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        transition: "border-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = `${catColor}40`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "var(--os-border)")
                      }
                    >
                      {/* Spine color */}
                      <div
                        style={{
                          width: 3,
                          alignSelf: "stretch",
                          borderRadius: 2,
                          background: catColor,
                          flexShrink: 0,
                          opacity: status === "next" ? 0.35 : 1,
                        }}
                      />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Title + category */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 8,
                            marginBottom: 3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: status === "next" ? "var(--os-muted)" : "var(--os-text)",
                              lineHeight: 1.35,
                            }}
                          >
                            {book.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-jetbrains), monospace",
                              fontSize: 9,
                              color: catColor,
                              background: `${catColor}18`,
                              padding: "2px 7px",
                              borderRadius: 10,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              opacity: status === "next" ? 0.5 : 1,
                            }}
                          >
                            {book.category}
                          </span>
                        </div>

                        {/* Author */}
                        <div
                          style={{
                            fontFamily: "var(--font-jetbrains), monospace",
                            fontSize: 10,
                            color: "var(--os-muted)",
                            marginBottom: book.note ? 6 : 0,
                          }}
                        >
                          {book.author}{book.year ? ` · ${book.year}` : ""}
                        </div>

                        {/* Personal note */}
                        {book.note && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--os-muted)",
                              lineHeight: 1.55,
                              fontStyle: "italic",
                              opacity: 0.8,
                            }}
                          >
                            "{book.note}"
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
