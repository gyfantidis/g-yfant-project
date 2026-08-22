import type { Metadata } from "next";
import OsModeLock from "@/components/os/OsModeLock";

export const metadata: Metadata = {
  title: "OS — Giannis Yfantidis",
  description:
    "The interactive version of the portfolio: a simulated desktop with draggable windows, a terminal, and every app.",
  // The OS is a client-rendered experience; the site routes carry the SEO weight.
  robots: { index: false, follow: true },
};

export default function OsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OsModeLock />
      {children}
    </>
  );
}
