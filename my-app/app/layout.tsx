import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, DM_Sans, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { PROFILE } from "@/lib/content";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "greek"],
  variable: "--font-plex",
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1220",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://g-yfantidis.gr"),
  title: {
    default: `${PROFILE.name} — ${PROFILE.role}`,
    template: `%s — ${PROFILE.name}`,
  },
  description:
    "AI engineer in Greece. RAG over company documents, structured extraction from scanned archives, fine-tuned models that run locally. Developer at Ctrl+Space Labs.",
  keywords: [
    "AI engineer",
    "RAG",
    "fine-tuning",
    "document extraction",
    "LLM",
    "Spring Boot",
    "Gendox",
    "Greece",
    "Thessaloniki",
    "Kilkis",
  ],
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description:
      "AI engineer. RAG, document extraction, fine-tuning. Selected work and how it was built.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: "AI engineer. RAG, document extraction, fine-tuning.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
