// src/app/page.tsx
import { Section } from "@/components/layout/Section";
import Link from "next/link";

import { currentFocus } from "@/content/focus";
import { projects } from "@/content/projects";
import { writing } from "@/content/writing";

export default function HomePage() {
  // Optional “preview” signals (no deep content; just routing hints)
  const primaryProjects = Array.isArray(projects) ? projects.slice(0, 1) : [];
  const primaryWriting = Array.isArray(writing) ? writing.slice(0, 1) : [];
  const focusItem = Array.isArray(currentFocus) ? currentFocus[0] : undefined;
  const primaryPaths = [
    {
      href: "/projects",
      title: "Projects",
      description: "Artifacts",
      detail: "Executable systems, standards, and artifacts.",
      tone: "projects",
    },
    {
      href: "/writing",
      title: "Writing",
      description: "Thinking",
      detail: "Notes, essays, and governance thinking.",
      tone: "writing",
    },
    {
      href: "/status",
      title: "Status",
      description: "Now",
      detail: "What is active, blocked, or evolving now.",
      tone: "status",
    },
    {
      href: "/about",
      title: "About",
      description: "Identity",
      detail: "Background, approach, and research orientation.",
      tone: "about",
    },
  ];

  return (
    <>
      <section id="hero" className="hero-surface">
        <div className="hero-content">
          <div className="hero-header">
            <h1>Governable software systems, built in public.</h1>
            <h2 className="hero-subhead">
              A public workspace for designing, operating, and evolving software systems with
              explicit authority, identity, and traceability.
            </h2>
          </div>

          <div className="hero-layout">
            <div className="hero-text">
              <div className="hero-body">
                <p>
                  Software systems are not just code: they are systems of authority, boundaries,
                  and responsibility. If you cannot define who owns what, how decisions are made,
                  and how changes flow, you don’t have governance — you have chaos.
                </p>
                <p>
                  This site is not a portfolio. It is an open routing surface connecting live
                  projects, technical writing, and operational signals — all treated as
                  first-class artifacts, not marketing material.
                </p>
                <p>
                  Here you can explore executable systems, surface design decisions, and ongoing
                  work across platforms. Everything is built in the open, with a focus on clarity
                  over abstraction and control over opacity.
                </p>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-visual-stack">
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
        </div>
      </section>

      <Section id="paths" width="narrow">
        <h2>What you can explore</h2>
        <nav className="nav-cards" aria-label="Primary navigation">
          {primaryPaths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-card nav-card--${item.tone}`}
            >
              <span className="nav-card-bg" aria-hidden="true" />
              <span className="nav-card-content">
                <span className="nav-card-meta">{item.description}</span>
                <span className="nav-card-title">{item.title}</span>
                <span className="nav-card-detail">{item.detail}</span>
              </span>
            </Link>
          ))}
        </nav>
      </Section>

      <Section id="focus" width="narrow">
        <h2>Current focus</h2>
        {focusItem ? (
          <div>
            <p>
              <strong>{focusItem.title}</strong>
              {focusItem.description ? ` — ${focusItem.description}` : null}
            </p>
            {Array.isArray(focusItem.highlights) &&
              focusItem.highlights.length > 0 && (
                <ul>
                  {focusItem.highlights.slice(0, 3).map((b, i) => (
                    <li key={`${focusItem.title}-${i}`}>{b}</li>
                  ))}
                </ul>
              )}
          </div>
        ) : (
          <p>Focus areas are being updated.</p>
        )}
      </Section>

      {(primaryProjects.length > 0 || primaryWriting.length > 0) && (
        <Section id="signals" width="narrow">
          <h2>Signals</h2>
          <ul className="signals-list">
            {primaryProjects.map((p) => (
              <li key={p.id ?? p.name} className="signals-item">
                <span className="signals-label">Project</span>
                <span className="signals-value">
                  {p.name}
                  {p.description ? ` — ${p.description}` : null}
                </span>
              </li>
            ))}
            {primaryWriting.map((w) => (
              <li key={w.id ?? w.title} className="signals-item">
                <span className="signals-label">Writing</span>
                <span className="signals-value">
                  {w.title}
                  {w.series ? ` — ${w.series}` : null}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
