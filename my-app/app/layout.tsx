import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Giannis Yfantidis — DevOps & Full-Stack Engineer",
  description:
    "Personal OS of Giannis Yfantidis — DevOps & Full-Stack Engineer, MSc Data Science & ML candidate. Based in Kilkis, Central Macedonia, Greece.",
  keywords: [
    "DevOps",
    "Full-Stack",
    "React",
    "Next.js",
    "Docker",
    "Kilkis",
    "Central Macedonia",
    "GR",
    "Athens",
    "Thessaloniki",
    "Patras",
    "Larissa",
    "Greece",
  ],
  authors: [{ name: "Giannis Yfantidis" }],
  openGraph: {
    title: "Giannis Yfantidis — DevOps & Full-Stack Engineer",
    description:
      "Interactive personal OS portfolio. Boot in, explore the stack, open a terminal.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giannis Yfantidis — DevOps & Full-Stack Engineer",
    description: "Interactive personal OS portfolio.",
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
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
