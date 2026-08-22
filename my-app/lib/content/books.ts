export type Status = "reading" | "read" | "next";

export interface Book {
  title: string;
  author: string;
  year?: number;
  category: string;
  status: Status;
  note?: string;
}

export const BOOKS: Book[] = [
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

export const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  reading: { label: "Reading",  color: "var(--os-accent)", bg: "rgba(0,255,136,0.1)" },
  read:    { label: "Read",     color: "var(--os-blue)",   bg: "rgba(14,165,233,0.1)" },
  next:    { label: "Up next",  color: "var(--os-muted)",  bg: "rgba(255,255,255,0.04)" },
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Engineering": "#a78bfa",
  "Personal":    "#f59e0b",
  "Psychology":  "#f472b6",
  "History":     "#fb923c",
  "ML / AI":     "#00ff88",
  "Business":    "#38bdf8",
};

export const STATUS_ORDER: Status[] = ["reading", "read", "next"];
