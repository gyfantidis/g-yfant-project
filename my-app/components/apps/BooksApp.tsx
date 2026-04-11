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
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    category: "Personal",
    status: "reading",
    note: "Simple framework, real results. The 1% better every day idea stuck with me.",
  },
  // ── Read ──
  {
    title: "TED Talks",
    author: "Chris Anderson",
    year: 2016,
    category: "Personal",
    status: "read",
  },
  {
    title: "Mafia Manager",
    author: "V",
    year: 1994,
    category: "Business",
    status: "read",
  },
  {
    title: "Who Moved My Cheese?",
    author: "Spencer Johnson",
    year: 1998,
    category: "Personal",
    status: "read",
  },
  {
    title: "How to Fit All of Ancient Greece in an Elevator",
    author: "Theodoros Papakostas",
    year: 2021,
    category: "History",
    status: "read",
  },
  {
    title: "Computer Networking: A Top-Down Approach",
    author: "Kurose & Ross",
    year: 2016,
    category: "Engineering",
    status: "read",
    note: "The textbook that makes you actually understand the internet.",
  },
  {
    title: "Introduction to the Theory of Computation",
    author: "Michael Sipser",
    year: 2012,
    category: "Engineering",
    status: "read",
  },
  {
    title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    author: "Aurélien Géron",
    year: 2019,
    category: "ML / AI",
    status: "read",
    note: "The practical ML bible. End-to-end from pipelines to deep learning.",
  },
  {
    title: "Algorithms to Live By",
    author: "Brian Christian & Tom Griffiths",
    year: 2016,
    category: "Engineering",
    status: "read",
    note: "CS theory applied to everyday decisions. Surprisingly life-changing.",
  },
  {
    title: "The Success Principles",
    author: "Jack Canfield",
    year: 2005,
    category: "Personal",
    status: "read",
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    year: 2009,
    category: "Business",
    status: "read",
    note: "The golden circle model reframes how to think about leadership and purpose.",
  },
  {
    title: "Daily Rituals",
    author: "Mason Currey",
    year: 2013,
    category: "Personal",
    status: "read",
    note: "How great creators structured their days. Quietly motivating.",
  },
  {
    title: "Optimal",
    author: "Daniel Goleman",
    year: 2023,
    category: "Psychology",
    status: "read",
  },
  // ── Up next ──
  {
    title: "The 4-Hour Work Week",
    author: "Tim Ferriss",
    year: 2007,
    category: "Business",
    status: "next",
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    year: 2001,
    category: "Personal",
    status: "next",
  },
  {
    title: "The Alter Ego Effect",
    author: "Todd Herman",
    year: 2019,
    category: "Personal",
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
  "Business":    "#38bdf8",
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
