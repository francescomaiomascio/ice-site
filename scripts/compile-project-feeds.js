#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const https = require("https");

const CONFIG_PATH = path.join(process.cwd(), "scripts", "projects.config.json");
const OUTPUT_DIR = path.join(process.cwd(), "src", "content", "generated");
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error("GITHUB_TOKEN is required to compile project feeds.");
  process.exit(1);
}

function ghGetJson(endpoint) {
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
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 300) {
          return reject(
            new Error(`GitHub API ${endpoint} failed: ${res.statusCode} ${data}`)
          );
        }
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
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

function normalizeHighlight({
  type,
  title,
  summary,
  url,
  date,
  labels,
  repo,
  kind,
}) {
  return {
    type,
    title,
    summary,
    url,
    date,
    labels,
    repo,
    kind,
  };
}

async function fetchRepoHighlights(owner, repo) {
  const highlights = [];
  const prEndpoint = `/repos/${owner}/${repo}/pulls?state=closed&per_page=20&sort=updated&direction=desc`;
  const issueEndpoint = `/repos/${owner}/${repo}/issues?state=closed&per_page=20&sort=updated&direction=desc&labels=public`;

  const prs = await ghGetJson(prEndpoint);
  const mergedPrs = prs.filter((pr) => pr.merged_at);
  const publicMerged = mergedPrs.filter((pr) => isPublic(labelNames(pr)));
  const strongLabels = ["highlight", "breakthrough", "release-note"];

  const labeled = publicMerged.filter((pr) => hasAny(labelNames(pr), strongLabels));
  const fallback = publicMerged.filter((pr) => !hasAny(labelNames(pr), strongLabels));

  labeled.slice(0, 5).forEach((pr) => {
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

  // MVP fallback: include a couple of public merged PRs even without highlight labels.
  fallback.slice(0, 2).forEach((pr) => {
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

  const issues = await ghGetJson(issueEndpoint);
  const pureIssues = issues.filter((issue) => !issue.pull_request);
  const issueLabels = ["highlight", "milestone", "breakthrough"];

  pureIssues
    .filter((issue) => isPublic(labelNames(issue)) && hasAny(labelNames(issue), issueLabels))
    .slice(0, 10)
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

  // TODO: Milestone export can be expanded later (labels/public rules not native to milestones).
  try {
    const milestones = await ghGetJson(
      `/repos/${owner}/${repo}/milestones?state=closed&per_page=5&sort=updated_at&direction=desc`
    );
    milestones.slice(0, 3).forEach((milestone) => {
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

  return highlights;
}

async function compile() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const projects = config.projects || [];

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const index = {
    generated_at: new Date().toISOString(),
    projects: [],
  };

  for (const project of projects) {
    const highlights = [];
    for (const repo of project.repos || []) {
      const repoHighlights = await fetchRepoHighlights(config.owner, repo);
      highlights.push(...repoHighlights);
    }

    highlights.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const projectOutput = {
      id: project.id,
      name: project.name,
      tagline: project.tagline,
      status: project.status,
      category: project.category,
      github: project.github,
      links: project.links || {},
      highlights: highlights.slice(0, 12),
      operational: project.operational || {
        signal: "steady",
        blocked: null,
        risk: null,
        next: "Pipeline coverage expansion",
      },
    };

    const projectPath = path.join(OUTPUT_DIR, `projects.${project.id}.json`);
    fs.writeFileSync(projectPath, JSON.stringify(projectOutput, null, 2));

    index.projects.push({
      id: project.id,
      name: project.name,
      tagline: project.tagline,
      status: project.status,
      category: project.category,
      github: project.github,
      links: project.links || {},
      highlights: projectOutput.highlights.slice(0, 3),
    });
  }

  const indexPath = path.join(OUTPUT_DIR, "projects.index.json");
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
}

compile().catch((err) => {
  console.error(err);
  process.exit(1);
});
