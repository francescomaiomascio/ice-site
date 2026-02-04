import Link from "next/link";
import { Section } from "@/components/layout/Section";
import projectsIndex from "@/content/generated/projects.index.json";

type ProjectSummary = {
  id: string;
  name: string;
  tagline: string;
  status: "active" | "stable" | "archived";
  category?: string;
  github: {
    url: string;
  };
  links?: {
    gumroad?: string;
  };
  highlights?: {
    title: string;
    url: string;
  }[];
};

type ProjectsIndex = {
  projects: ProjectSummary[];
};

const indexData = projectsIndex as ProjectsIndex;

const STATUS_ORDER: Array<ProjectSummary["status"]> = [
  "active",
  "stable",
  "archived",
];

const STATUS_META: Record<ProjectSummary["status"], { title: string; blurb: string; tone: string; sectionClass: string }>
  = {
    active: {
      title: "Active systems",
      blurb: "Projects with active development and visible momentum.",
      tone: "projects",
      sectionClass: "section--projects",
    },
    stable: {
      title: "Stable / maintained",
      blurb: "Systems that are steady, maintained, and evolving on schedule.",
      tone: "writing",
      sectionClass: "section--writing",
    },
    archived: {
      title: "Archived / frozen",
      blurb: "Projects that are paused or concluded, kept for reference.",
      tone: "about",
      sectionClass: "section--about",
    },
  };

function renderHighlights(project: ProjectSummary) {
  const highlights = project.highlights ?? [];
  if (!highlights.length) {
    return <p className="muted">No highlights published yet.</p>;
  }

  return (
    <ul>
      {highlights.slice(0, 3).map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsPage() {
  const projects = indexData.projects ?? [];

  return (
    <>
      {STATUS_ORDER.map((status) => {
        const meta = STATUS_META[status];
        const group = projects.filter((project) => project.status === status);

        return (
          <Section key={status} id={`projects-${status}`} className={meta.sectionClass}>
            <div className="preview-section">
              <header className="preview-header">
                <h2>{meta.title}</h2>
                <p className="muted">{meta.blurb}</p>
              </header>

              <div className="nav-cards">
                {group.length === 0 ? (
                  <p className="muted">No projects in this state yet.</p>
                ) : (
                  group.map((project) => (
                    <div
                      key={project.id}
                      className={`nav-card nav-card--${meta.tone}`}
                    >
                      <span className="nav-card-bg" aria-hidden="true" />
                      <span className="nav-card-content">
                        <span className="nav-card-meta">{project.status.toUpperCase()}</span>
                        <span className="nav-card-title">{project.name}</span>
                        <span className="nav-card-detail">{project.tagline}</span>
                        <span className="nav-card-detail">{renderHighlights(project)}</span>
                        <span className="nav-card-detail">
                          <Link href={`/projects/${project.id}`}>Open project page →</Link>
                          {" "}
                          ·{" "}
                          <a href={project.github.url} target="_blank" rel="noreferrer">
                            View on GitHub
                          </a>
                          {project.links?.gumroad ? (
                            <>
                              {" "}·{" "}
                              <a href={project.links.gumroad} target="_blank" rel="noreferrer">
                                Get on Gumroad
                              </a>
                            </>
                          ) : null}
                        </span>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
}
