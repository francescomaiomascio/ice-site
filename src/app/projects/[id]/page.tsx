import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    blocked?: string | null;
    risk?: string | null;
    next?: string | null;
  };
};

type ProjectsIndex = {
  projects: Array<{ id: string }>; 
};

const indexData = projectsIndex as ProjectsIndex;

function getProjectData(id: string): ProjectData | null {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "generated",
    `projects.${id}.json`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as ProjectData;
}

export function generateStaticParams() {
  return (indexData.projects || []).map((project) => ({ id: project.id }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);
  if (!project) return notFound();

  return (
    <>
      <Section id={`project-${project.id}`} className="section--projects">
        <div className="preview-section">
          <header className="preview-header">
            <h1>{project.name}</h1>
            <p className="muted">{project.tagline}</p>
            <p className="muted">Status: {project.status}</p>
          </header>

          <div className="preview-body">
            <h2>What it is</h2>
            <p className="muted">
              This is a stable description stub. Replace with a concise statement of intent,
              scope, and what makes this project essential.
            </p>
          </div>

          <div className="preview-body">
            <h2>Highlights</h2>
            {project.highlights && project.highlights.length > 0 ? (
              <ul>
                {project.highlights.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                    {item.summary ? ` — ${item.summary}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No highlights published yet.</p>
            )}
          </div>

          <div className="preview-body">
            <h2>Deep links</h2>
            <p>
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
            </p>
          </div>

          <footer className="preview-footer">
            <Link href="/projects">Back to projects →</Link>
          </footer>
        </div>
      </Section>
    </>
  );
}
