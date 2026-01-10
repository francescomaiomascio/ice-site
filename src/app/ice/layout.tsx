// src/app/ice/layout.tsx
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Link from "next/link";
import "@/theme/site.css";

const iceTitleFont = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-ice-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICE Lab — Integrated Cognitive Systems",
  description:
    "ICE Lab is a research and engineering laboratory focused on integrated cognitive systems, environments, engines, and protocols.",
};

export default function IceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={iceTitleFont.variable}>
      <header className="site-header">
        <nav className="nav">
          <div className="nav-left">
            <strong>ICE Lab</strong>
          </div>

          <div className="nav-right">
            <Link href="/ice">Overview</Link>
            <Link href="/ice/projects">Projects</Link>
            <Link href="/ice/docs">Docs</Link>
            <Link href="/ice/status">Status</Link>
            <a
              href="https://github.com/francescomaiomascio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} ICE Lab</p>
      </footer>
    </section>
  );
}
