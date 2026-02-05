#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const CONFIG_PATH = path.join(process.cwd(), "scripts", "projects.config.json");
const OUTPUT_DIR = path.join(process.cwd(), "src", "content", "generated");
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error("GITHUB_TOKEN is required to compile project feeds.");
  process.exit(1);
}

function parseLinkHeader(linkHeader) {
  // GitHub Link header: <url>; rel="next", <url>; rel="last"
  if (!linkHeader) return {};
  const parts = linkHeader.split(",").map((p) => p.trim());
  const links = {};
  for (const part of parts) {
    const match = part.match(/^<([^>]+)>;\s*rel="([^"]+)"$/);
    if (match) links[match[2]] = match[1];
  }
  return links;
}

function extractPathFromUrl(url) {
  // https://api.github.com/repos/OWNER/REPO/pulls?... -> /repos/OWNER/REPO/pulls?...
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return null;
  }
}

function ghRequestJson(endpoint) {
  const options = {
    hostname: "api.github.com",
    path: endpoint,
    method: "GET",
    headers: {
      "User-Agent": "ice-project-feed-compiler",
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 300) {
          return reject(
            new Error(`GitHub API ${endpoint} failed: ${res.statusCode} ${data}`)
          );
        }
        try {
          const json = JSON.parse(data || "null");
          const link = res.headers?.link ? String(res.headers.link) : "";
          resolve({ json, link });
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function ghGetAllPages(initialEndpoint, { maxPages = 3 } = {}) {
  // maxPages: sufficiente per MVP e evita di scaricare il mondo
  const all = [];
  let endpoint = initialEndpoint;
  let pages = 0;

  while (endpoint && pages < maxPages) {
    pages += 1;
    const { json, link } = await ghRequestJson(endpoint);

    if (Array.isArray(json)) all.push(...json);
    else if (json) all.push(json);

    const links = parseLinkHeader(link);
    const nextPath = links.next ? extractPathFromUrl(links.next) : null;
    endpoint = nextPath;
  }

  return all;
}

function summarize(text, limit = 220) {
  if (!text) return "";
  const cleaned = String(text).replace(/\s+/g, " ").trim();
  if (cleaned.length <= limit) return cleaned;
  return `${cleaned.slice(0, limit - 1)}…`;
}

function labelNames(item) {
  if (!Array.isArray(item.labels)) return [];
  return item.labels.map((label) => label.name).filter(Boolean);
}

function hasAny(labels, targets) {
  return targets.some((t) => labels.includes(t));
}

function isPublic(labels) {
  return labels.includes("public") && !labels.includes("internal");
}

function normalizeHighlight({ type, title, summary, url, date, labels, repo, kind }) {
  return { type, title, summary, url, date, labels, repo, kind };
}

function stableSortHighlights(items) {
  items.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    if (db !== da) return db - da;
    // tie-breaker deterministico
    return String(a.url).localeCompare(String(b.url));
  });
}

function dedupeByUrl(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    if (!it?.url) continue;
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    out.push(it);
  }
  return out;
}

async function fetchRepoHighlights(owner, repo) {
  const highlights = [];

  // PRs: closed, include merged
  const prEndpoint =
    `/repos/${owner}/${repo}/pulls?state=closed&per_page=100&sort=updated&direction=desc`;
  // Issues: include closed, filter by labels=public (GitHub API supports this)
  const issueEndpoint =
    `/repos/${owner}/${repo}/issues?state=closed&per_page=100&sort=updated&direction=desc&labels=public`;

  const prs = await ghGetAllPages(prEndpoint, { maxPages: 2 });
  const mergedPrs = prs.filter((pr) => pr && pr.merged_at);
  const publicMerged = mergedPrs.filter((pr) => isPublic(labelNames(pr)));

  const strongLabels = ["highlight", "breakthrough", "release-note"];
  const labeled = publicMerged.filter((pr) => hasAny(labelNames(pr), strongLabels));
  const fallback = publicMerged.filter((pr) => !hasAny(labelNames(pr), strongLabels));

  labeled.slice(0, 8).forEach((pr) => {
    highlights.push(
      normalizeHighlight({
        type: "pr_merged",
        title: pr.title,
        summary: summarize(pr.body),
        url: pr.html_url,
        date: pr.merged_at,
        labels: labelNames(pr),
        repo,
        kind: "pull_request",
      })
    );
  });

  // MVP fallback: qualche PR merged pubblica anche senza label strong
  fallback.slice(0, 3).forEach((pr) => {
    highlights.push(
      normalizeHighlight({
        type: "pr_merged",
        title: pr.title,
        summary: summarize(pr.body),
        url: pr.html_url,
        date: pr.merged_at,
        labels: labelNames(pr),
        repo,
        kind: "pull_request",
      })
    );
  });

  const issues = await ghGetAllPages(issueEndpoint, { maxPages: 2 });
  const pureIssues = issues.filter((issue) => issue && !issue.pull_request);
  const issueLabels = ["highlight", "milestone", "breakthrough", "release-note"];

  pureIssues
    .filter((issue) => isPublic(labelNames(issue)) && hasAny(labelNames(issue), issueLabels))
    .slice(0, 12)
    .forEach((issue) => {
      highlights.push(
        normalizeHighlight({
          type: "issue_highlight",
          title: issue.title,
          summary: summarize(issue.body),
          url: issue.html_url,
          date: issue.closed_at || issue.updated_at,
          labels: labelNames(issue),
          repo,
          kind: "issue",
        })
      );
    });

  // Milestones closed (non hanno labels nativi; li trattiamo come “always public”)
  try {
    const milestones = await ghGetAllPages(
      `/repos/${owner}/${repo}/milestones?state=closed&per_page=100&sort=updated_at&direction=desc`,
      { maxPages: 1 }
    );

    milestones.slice(0, 5).forEach((milestone) => {
      highlights.push(
        normalizeHighlight({
          type: "milestone_closed",
          title: milestone.title,
          summary: summarize(milestone.description),
          url: milestone.html_url,
          date: milestone.closed_at || milestone.updated_at,
          labels: ["milestone"],
          repo,
          kind: "milestone",
        })
      );
    });
  } catch (err) {
    console.warn(`Milestone fetch failed for ${repo}: ${err.message}`);
  }

  const deduped = dedupeByUrl(highlights);
  stableSortHighlights(deduped);
  return deduped;
}

function writeIfChanged(filePath, nextObj) {
  const next = JSON.stringify(nextObj, null, 2) + "\n";
  if (fs.existsSync(filePath)) {
    const prev = fs.readFileSync(filePath, "utf8");
    if (prev === next) return false;
  }
  fs.writeFileSync(filePath, next);
  return true;
}

async function compile() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const projects = config.projects || [];

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const index = {
    // Se vuoi evitare commit inutili: commenta questa riga.
    generated_at: new Date().toISOString(),
    projects: [],
  };

  let wroteSomething = false;

  for (const project of projects) {
    const highlights = [];
    for (const repo of project.repos || []) {
      const repoHighlights = await fetchRepoHighlights(config.owner, repo);
      highlights.push(...repoHighlights);
    }

    const deduped = dedupeByUrl(highlights);
    stableSortHighlights(deduped);

    const operationalDefaults = {
      phase: "Bootstrap → Engine → Runtime",
      surfaces: "Governance, Execution, Observability",
      signal: "steady",
      priority: "System mapping",
      risk: "Interface drift",
      next: "Pipeline coverage expansion",
      blocked: null,
    };

    const projectOutput = {
      id: project.id,
      name: project.name,
      tagline: project.tagline,
      status: project.status,
      category: project.category,
      repos: project.repos || [],
      github: project.github,
      links: project.links || {},
      highlights: deduped.slice(0, 12),
      operational: {
        ...operationalDefaults,
        ...(project.operational || {}),
      },
      diagnostics: {
        repos_scanned: (project.repos || []).length,
        highlights_found: deduped.length,
      },
    };

    const projectPath = path.join(OUTPUT_DIR, `projects.${project.id}.json`);
    wroteSomething = writeIfChanged(projectPath, projectOutput) || wroteSomething;

    index.projects.push({
      id: project.id,
      name: project.name,
      tagline: project.tagline,
      status: project.status,
      category: project.category,
      repos: project.repos || [],
      github: project.github,
      links: project.links || {},
      highlights: projectOutput.highlights.slice(0, 3),
    });
  }

  const indexPath = path.join(OUTPUT_DIR, "projects.index.json");
  wroteSomething = writeIfChanged(indexPath, index) || wroteSomething;

  if (!wroteSomething) {
    console.log("No changes in generated feeds.");
  } else {
    console.log("Generated feeds updated.");
  }
}

compile().catch((err) => {
  console.error(err);
  process.exit(1);
});
