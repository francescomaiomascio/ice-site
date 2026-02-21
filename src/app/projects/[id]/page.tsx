import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Section } from "@/components/layout/Section";
import projectsIndex from "@/content/generated/projects.index.json";

type Highlight = {
  type: string;
  title: string;
  summary?: string;
  url: string;
  date: string;
  labels?: string[];
  repo?: string;
  kind?: string;
};

type ProjectData = {
  id: string;
  name: string;
  tagline: string;
  status: "active" | "stable" | "archived";
  category?: string;
  repos?: string[];
  hero?: {
    image?: string;
    tone?: "ice" | "psc" | string;
  };
  copy?: {
    what?: string;
    not?: string[];
    pillars?: string[];
  };
  github: {
    owner: string;
    repo: string;
    url: string;
    default_branch: string;
  };
  links?: {
    docs?: string;
    homepage?: string;
    gumroad?: string;
  };
  highlights: Highlight[];
  operational?: {
    signal?: string;
    phase?: string;
    surfaces?: string;
    priority?: string;
    blocked?: string | null;
    risk?: string | null;
    next?: string | null;
  };
  diagnostics?: {
    repos_scanned?: number;
    highlights_found?: number;
  };
};

type ProjectsIndex = {
  projects: Array<{
    id: string;
    name: string;
    tagline: string;
    status: "active" | "stable" | "archived";
    category?: string;
    github: {
      owner: string;
      repo: string;
      url: string;
      default_branch: string;
    };
    links?: {
      docs?: string;
      homepage?: string;
      gumroad?: string;
    };
  }>;
};

const indexData = projectsIndex as ProjectsIndex;

const DEFAULT_STRAPLINE =
  "Execution systems with explicit authority and observable state.";

const HIGHLIGHT_TYPE_LABELS: Record<string, string> = {
  milestone_closed: "Milestone",
  pr_merged: "Merged PR",
  issue_highlight: "Highlight",
};

const HIGHLIGHT_TYPE_TONES: Record<string, string> = {
  milestone_closed: "milestone",
  pr_merged: "pr",
  issue_highlight: "issue",
};

function formatStatus(status: ProjectData["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function getCopyLines(text?: string) {
  if (!text) return [];
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

function getRepoChips(repos: string[] | undefined, max = 6) {
  if (!repos || repos.length === 0) return [];
  return repos.slice(0, max);
}

function getProjectData(id: string): ProjectData | null {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "generated",
    `projects.${id}.json`
  );
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as ProjectData;
  }

  const fallback = (indexData.projects || []).find((item) => item.id === id);
  if (!fallback) return null;

  return {
    id: fallback.id,
    name: fallback.name,
    tagline: fallback.tagline,
    status: fallback.status,
    category: fallback.category,
    github: fallback.github,
    links: fallback.links,
    highlights: [],
    operational: {
      signal: "steady",
      blocked: null,
      risk: null,
      next: "Milestone definition",
    },
  };
}

export function generateStaticParams() {
  return (indexData.projects || []).map((project) => ({ id: project.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  if (!rawId) return notFound();
  const id = rawId.toLowerCase();
  if (rawId !== id) {
    redirect(`/projects/${id}`);
  }
  const project = getProjectData(id);
  if (!project) return notFound();
  const whatLines = getCopyLines(project.copy?.what);
  const whatItIs =
    whatLines.length > 0
      ? whatLines
      : [
        `${project.name} is a system architecture initiative.`,
        "It defines operational boundaries, invariants, and runtime signals as first-class.",
        "It exists to make complex systems governable under change.",
      ];
  const whatItIsNot =
    project.copy?.not?.length
      ? project.copy.not
      : [
        "Not a framework you drop into an app.",
        "Not a single library or SDK.",
        "Not a productized agent wrapper.",
        "Not a marketing layer over GitHub.",
      ];
  const pillars =
    project.copy?.pillars?.length
      ? project.copy.pillars
      : [
        "Authority boundaries.",
        "Explicit handoffs.",
        "Traceability surfaces.",
        "Deterministic execution constraints.",
        "Operational visibility.",
      ];
  const snapshot = {
    phase: project.operational?.phase || "Bootstrap → Engine → Runtime",
    surfaces: project.operational?.surfaces || "Governance, Execution, Observability",
    priority: project.operational?.priority || "System mapping",
    risk: project.operational?.risk ?? "interface drift",
    next: project.operational?.next ?? "milestone definition",
  };
  const highlights = (project.highlights || []).slice(0, 6);
  const strapline =
    project.id === "yai"
      ? "YAI treats execution as authority: runtime-centric, deterministic, verifiable."
      : DEFAULT_STRAPLINE;
  const repoChips = getRepoChips(project.repos);

  return (
    <>
      <Section
        id={`project-${project.id}-hero`}
        className="section--projects project-section"
        snap={false}
      >
        <section className="project-hero">
          <div className="project-hero-bg" aria-hidden="true" />
          <div className="project-hero-grid">
            <div className="project-hero-left">
              <span className="project-status">{formatStatus(project.status)}</span>
              <h1 className="project-title">{project.name}</h1>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-strapline">{strapline}</p>
              <div className="project-repos">
                <span className="project-repos-label">
                  Repos: {project.repos?.length ?? 0}
                </span>
                <div className="project-repo-chips">
                  {repoChips.map((repo) => (
                    <span key={repo} className="project-repo-chip">
                      {repo}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-hero-actions">
                <a href={project.github.url} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
                {project.links?.docs ? (
                  <>
                    {" "}·{" "}
                    <a href={project.links.docs} target="_blank" rel="noreferrer">
                      Documentation
                    </a>
                  </>
                ) : null}
              </div>
            </div>

            <aside className="project-hero-right">
              <div className="project-metrics">
                <div className="project-metric">
                  <div className="project-metric-label">Signal</div>
                  <div className="project-metric-value">
                    {project.operational?.signal ?? "steady"}
                  </div>
                </div>
                <div className="project-metric">
                  <div className="project-metric-label">Risk</div>
                  <div className="project-metric-value">
                    {project.operational?.risk ?? "interface drift"}
                  </div>
                </div>
                <div className="project-metric">
                  <div className="project-metric-label">Next</div>
                  <div className="project-metric-value">
                    {project.operational?.next ?? "milestone definition"}
                  </div>
                </div>
              </div>

              <div className="project-snapshot project-snapshot--hero">
                <div className="project-snapshot-title">System snapshot</div>
                <div className="project-snapshot-body">
                  <div className="project-snapshot-row">
                    <span>Phase</span>
                    <span>{snapshot.phase}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Surfaces</span>
                    <span>{snapshot.surfaces}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Current priority</span>
                    <span>{snapshot.priority}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </Section>

      <Section
        id={`project-${project.id}-panel`}
        className="section--projects project-section"
        snap={false}
      >
        <section className="project-panel">
          <div className="project-panel-grid">
            <div className="project-panel-left">
              <div className="project-block">
                <h2>What it is</h2>
                {whatItIs.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="project-block">
                <h3>What it is not</h3>
                <ul className="project-list">
                  {whatItIsNot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="project-block">
                <h3>Design pillars</h3>
                <ul className="project-list">
                  {pillars.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="project-panel-right">
              <div className="project-snapshot">
                <div className="project-snapshot-title">System snapshot</div>
                <div className="project-snapshot-body">
                  <div className="project-snapshot-row">
                    <span>Phase</span>
                    <span>{snapshot.phase}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Surfaces</span>
                    <span>{snapshot.surfaces}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Current priority</span>
                    <span>{snapshot.priority}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Risk</span>
                    <span>{snapshot.risk}</span>
                  </div>
                  <div className="project-snapshot-row">
                    <span>Next milestone</span>
                    <span>{snapshot.next}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Section>

      <Section
        id={`project-${project.id}-activity`}
        className="section--projects project-section"
        snap={false}
      >
        <section className="project-activity">
          <header className="project-activity-header">
            <h2>System activity</h2>
            <p className="muted">
              Only high-signal changes are published here (milestones, merged PRs, curated issues).
            </p>
          </header>

          <div className="project-activity-grid">
            {highlights.length > 0 ? (
              highlights.map((item) => {
                const label = HIGHLIGHT_TYPE_LABELS[item.type] ?? "Update";
                const tone = HIGHLIGHT_TYPE_TONES[item.type] ?? "update";
                const repoLabel = item.repo || project.github.repo;
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-activity-card project-activity-card--${tone}`}
                  >
                    <div className="project-activity-badge">
                      <span>{label}</span>
                      {repoLabel ? (
                        <span className="project-activity-repo">{repoLabel}</span>
                      ) : null}
                    </div>
                    <div className="project-activity-title">{item.title}</div>
                    {item.summary ? (
                      <div className="project-activity-summary">{item.summary}</div>
                    ) : null}
                    <div className="project-activity-meta">{formatDate(item.date)}</div>
                    <div className="project-activity-cta">Open on GitHub</div>
                  </a>
                );
              })
            ) : (
              <>
                <div className="project-activity-card project-activity-card--placeholder">
                  <div className="project-activity-badge">
                    <span>Merged PRs (public)</span>
                  </div>
                  <div className="project-activity-title">Awaiting public merges</div>
                  <div className="project-activity-summary">
                    This slot renders merged PRs labeled public.
                  </div>
                  <div className="project-activity-meta">Awaiting compiler output</div>
                </div>
                <div className="project-activity-card project-activity-card--placeholder">
                  <div className="project-activity-badge">
                    <span>Closed milestones</span>
                  </div>
                  <div className="project-activity-title">No milestones published</div>
                  <div className="project-activity-summary">
                    Closed milestones surface here when exported.
                  </div>
                  <div className="project-activity-meta">Awaiting compiler output</div>
                </div>
                <div className="project-activity-card project-activity-card--placeholder">
                  <div className="project-activity-badge">
                    <span>Curated issues</span>
                  </div>
                  <div className="project-activity-title">No highlights published</div>
                  <div className="project-activity-summary">
                    Curated issues require labels public + highlight/breakthrough.
                  </div>
                  <div className="project-activity-meta">Awaiting compiler output</div>
                </div>
                <div className="project-activity-empty-note">
                  Awaiting compiler output: requires label public + evidence labels.
                </div>
              </>
            )}
          </div>
        </section>
      </Section>

      <Section
        id={`project-${project.id}-footer`}
        className="section--projects project-section"
        withFooter
        snap={false}
      >
        <section className="project-footer">
          <div className="project-footer-links">
            <a href={project.github.url} target="_blank" rel="noreferrer">
              Repository
            </a>
            {project.links?.docs ? (
              <a href={project.links.docs} target="_blank" rel="noreferrer">
                Docs
              </a>
            ) : null}
            {project.links?.homepage ? (
              <a href={project.links.homepage} target="_blank" rel="noreferrer">
                Homepage
              </a>
            ) : null}
          </div>
          <Link href="/projects">Back to projects →</Link>
          <span className="project-footer-contract">
            Source of truth: GitHub. This page is a curated projection.
          </span>
        </section>
      </Section>
    </>
  );
}
