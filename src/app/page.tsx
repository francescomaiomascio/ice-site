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
          <div className="hero-layout">
            <header className="hero-statement">
              <h1>Governable software systems, built in public.</h1>
              <p>
                A public workspace connecting artifacts, thinking, and live system status
                across platforms.
              </p>
            </header>

            <div className="hero-presence" aria-hidden="true" />
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
