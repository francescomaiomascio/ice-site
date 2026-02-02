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
    },
    {
      href: "/writing",
      title: "Writing",
      description: "Thinking",
      detail: "Notes, essays, and governance thinking.",
    },
    {
      href: "/status",
      title: "Status",
      description: "Now",
      detail: "What is active, blocked, or evolving now.",
    },
    {
      href: "/about",
      title: "About",
      description: "Identity",
      detail: "Background, approach, and research orientation.",
    },
  ];

  return (
    <>
      <Section id="hero" variant="hero">
        <header>
          <h1>Francesco Maiomascio</h1>
          <p>
            I build governable software systems: identity, authority, traceability.
            This site is a routing surface for projects and writing.
          </p>
        </header>
      </Section>

      <Section id="paths" width="narrow">
        <h2>What you can explore</h2>
        <nav className="nav-cards" aria-label="Primary navigation">
          {primaryPaths.map((item) => (
            <Link key={item.href} href={item.href} className="nav-card">
              <span>{item.title}</span>
              <span>{item.description}</span>
              <span>{item.detail}</span>
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
