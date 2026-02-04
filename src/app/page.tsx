// src/app/page.tsx
import { Section } from "@/components/layout/Section";
import Link from "next/link";

import { projects } from "@/content/projects";
import { writing } from "@/content/writing";

function HeroSection() {
  return (
    <section id="hero" className="hero-surface snap-section">
      <div className="hero-content">
        <div className="hero-inner-wrap">
          <div className="hero-header">
            <div className="hero-title-row">
              <h1>Governable software systems, built in public.</h1>
              <div className="hero-logo-inline" aria-hidden="true">
                <iframe
                  className="hero-logo-frame"
                  src="/hero/hero-logo.html"
                  title="ICE curve"
                  scrolling="no"
                />
              </div>
            </div>
            <h2 className="hero-subhead">
              A public workspace for designing, operating, and evolving software systems
              with explicit authority, identity, and traceability.
            </h2>
            <p className="hero-orient">
              This space is for people who design, operate, and take responsibility for systems.
            </p>
          </div>

          <div className="hero-layout">
            <div className="hero-text">
              <div className="hero-copy">
                <p className="hero-lead">Software systems are structures of authority.</p>
                <p className="hero-friction">
                  Most system failures are not technical — they are failures of unclear authority,
                  ownership, and change propagation.
                </p>
                <p className="hero-body">
                  They define who can act, who decides, and how change propagates.
                  When these boundaries are unclear, systems drift, responsibility dissolves,
                  and failures become inevitable.
                </p>
                <p className="hero-quote">“Structure is the first form of safety.”</p>
                <p className="hero-body hero-body--soft hero-body--end">
                  This space documents the design, operation, and evolution of such systems —
                  where architecture, governance, and execution are treated as first-class concerns.
                </p>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-visual-stack">
                <div className="hero-visual-intro">What this space is built around</div>
                <div className="hero-visual-panel hero-visual-panel--1">
                  <div className="hero-visual-title">ARCHITECTURE</div>
                  <div className="hero-visual-sub">Boundaries · Authority · System Design</div>
                  <div className="hero-visual-sub">Governance · Interfaces · Constraints</div>
                  <div className="hero-visual-sub">Execution · State · Evolution</div>
                </div>
                <div className="hero-visual-panel hero-visual-panel--2">
                  <div className="hero-visual-title">GOVERNANCE</div>
                  <div className="hero-visual-sub">Policies · Interfaces · Constraints</div>
                </div>
                <div className="hero-visual-panel hero-visual-panel--3">
                  <div className="hero-visual-title">SIGNALS</div>
                  <div className="hero-visual-sub">State · Health · Evolution</div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-hint-wrap">
            <a href="#projects" className="hero-hint">
              ↓ Explore the workspace
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const primaryProjects = Array.isArray(projects) ? projects.slice(0, 1) : [];
  const primaryWriting = Array.isArray(writing) ? writing.slice(0, 1) : [];

  return (
    <>
      <HeroSection />

      <Section id="projects" className="section--projects">
        <div className="preview-section">
          <header className="preview-header">
            <h2>Projects</h2>
            <p className="muted">Executable systems, standards, and artifacts.</p>
          </header>
          <div className="preview-body">
            {primaryProjects.length > 0 ? (
              <p>{primaryProjects[0].description ?? primaryProjects[0].name}</p>
            ) : (
              <p className="muted">Project previews are being curated.</p>
            )}
          </div>
          <footer className="preview-footer">
            <Link href="/projects">Explore projects →</Link>
          </footer>
        </div>
      </Section>

      <Section id="writing" className="section--writing">
        <div className="preview-section">
          <header className="preview-header">
            <h2>Writing</h2>
            <p className="muted">Notes, essays, and governance thinking.</p>
          </header>
          <div className="preview-body">
            {primaryWriting.length > 0 ? (
              <p>{primaryWriting[0].series ?? primaryWriting[0].title}</p>
            ) : (
              <p className="muted">Writing previews are being curated.</p>
            )}
          </div>
          <footer className="preview-footer">
            <Link href="/writing">Explore writing →</Link>
          </footer>
        </div>
      </Section>

      <Section id="status" className="section--status">
        <div className="preview-section">
          <header className="preview-header">
            <h2>Status</h2>
            <p className="muted">What is active, blocked, or evolving now.</p>
          </header>
          <div className="preview-body">
            <p className="muted">Operational status and signals are published here.</p>
          </div>
          <footer className="preview-footer">
            <Link href="/status">Explore status →</Link>
          </footer>
        </div>
      </Section>

      <Section id="about" className="section--about" withFooter>
        <div className="preview-section">
          <header className="preview-header">
            <h2>About</h2>
            <p className="muted">Background, approach, and research orientation.</p>
          </header>
          <div className="preview-body">
            <p className="muted">Identity, intent, and operating principles.</p>
          </div>
          <footer className="preview-footer">
            <Link href="/about">Explore about →</Link>
          </footer>
        </div>
      </Section>
    </>
  );
}
