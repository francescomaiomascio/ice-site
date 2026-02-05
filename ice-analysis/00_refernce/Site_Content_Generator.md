
**From Repo Analysis to Web Pages**  
Version: 1.0 | Transforms analysis templates into production-ready site content

---

## Purpose

This guide converts completed **Repo Analysis Templates** into structured content for:

1. Homepage (15-second scan)
2. Stratification page (architecture overview)
3. Project pages (per-layer or per-repo)
4. Activity feed (dynamic GitHub data)

---

## Content Architecture (Site Structure)

```
Homepage (/)
├── Hero (problem/solution/CTA)
├── Stratification Overview (3 layers visual)
├── Activity Feed Widget (live)
└── Quick Links (foundation/docs/github)

Stratification (/architecture)
├── Layer 1: Core Execution
│   ├── ice-strap
│   ├── ice-engine
│   └── ice-runtime
├── Layer 2: Cognition & IO
│   ├── ice-ai
│   ├── ice-consciousness
│   ├── ice-providers
│   ├── ice-protocols
│   └── ice-api
└── Layer 3: Proof Surfaces
    ├── ice-foundation
    ├── ice-docs
    ├── ice-tests
    ├── ice-observability
    └── ice-studio

Project Pages (/projects/[layer])
├── Overview (layer role/boundary)
├── Repos in Layer (cards)
├── Authority Flow (diagram)
└── Activity Feed (filtered)

Repo Detail Pages (/projects/[layer]/[repo])
├── Identity (role/boundary/promise)
├── Public Proof Surface
├── Entry Points (code navigation)
├── Activity Timeline
└── Next Milestone
```

---

## 1. Homepage Content

### Hero Section

**Goal:** 15-second comprehension. Visitor understands problem + solution immediately.

```html
<!-- Hero -->
<section class="hero">
  <h1>ICE: Execution Governance for AI Agents</h1>
  <p class="tagline">Auditable. Deterministic. Governable.</p>
  
  <div class="problem-solution">
    <div class="problem">
      <strong>The Problem:</strong>
      Production AI fails without clear authority, memory, or audit trails.
    </div>
    <div class="solution">
      <strong>ICE's Answer:</strong>
      Stratified architecture with explicit boundaries, contracts, and proof at every layer.
    </div>
  </div>
  
  <div class="cta">
    <a href="/architecture" class="btn-primary">Explore Architecture</a>
    <a href="/projects" class="btn-secondary">See Activity</a>
  </div>
</section>
```

**Content Source:**

- Problem: From "Market Problem" in Stratification Reference Doc
- Solution: From "ICE's Answer" in Stratification Reference Doc
- Tagline: Core promise (auditable/deterministic/governable)

---

### Stratification Overview Widget

**Goal:** Show 3 layers visually with click-to-explore.

```html
<section class="stratification-preview">
  <h2>Three-Layer Architecture</h2>
  
  <div class="layers">
    <div class="layer layer-1">
      <h3>Core Execution</h3>
      <p>Authority chain: strap → engine → runtime</p>
      <span class="repo-count">3 repos</span>
      <a href="/architecture#layer-1">Explore →</a>
    </div>
    
    <div class="layer layer-2">
      <h3>Cognition & IO</h3>
      <p>Decisions, memory, contracts, integration</p>
      <span class="repo-count">5 repos</span>
      <a href="/architecture#layer-2">Explore →</a>
    </div>
    
    <div class="layer layer-3">
      <h3>Proof Surfaces</h3>
      <p>Axioms, tests, telemetry, documentation, UI</p>
      <span class="repo-count">5 repos</span>
      <a href="/architecture#layer-3">Explore →</a>
    </div>
  </div>
</section>
```

**Content Source:**

- Layer names: From Stratification Reference Doc
- Taglines: Layer "Role" sections
- Repo counts: Calculated from inventory

---

### Activity Feed Widget (Homepage)

**Goal:** Prove ICE is alive (not vaporware).

```html
<section class="activity-feed-preview">
  <h2>Recent Activity</h2>
  <p>Real progress across all layers (last 30 days)</p>
  
  <div class="activity-items">
    <!-- Generated dynamically from GitHub API -->
    <div class="activity-item">
      <span class="badge layer-1">Core Execution</span>
      <span class="type">PR Merged</span>
      <a href="[github-link]">ice-engine: Implement orchestrator middleware</a>
      <span class="date">2 days ago</span>
    </div>
    
    <div class="activity-item">
      <span class="badge layer-2">Cognition & IO</span>
      <span class="type">Milestone</span>
      <a href="[github-link]">ice-consciousness: Memory model v1.0 complete</a>
      <span class="date">5 days ago</span>
    </div>
    
    <!-- ... more items ... -->
  </div>
  
  <a href="/activity" class="view-all">View All Activity →</a>
</section>
```

**Data Source:**

- GitHub API (per-repo PR/issues/milestones)
- Filter: Last 30 days, labels: `highlight` or `public`
- Sort: Newest first

---

## 2. Stratification Page Content

### Page Structure

```html
<main class="stratification-page">
  <header>
    <h1>ICE Architecture: Three-Layer Stratification</h1>
    <p class="intro">
      ICE separates execution, cognition, and proof into distinct layers with explicit boundaries and contracts. This prevents scope creep, enables independent evolution, and makes the system auditable at every level.
    </p>
  </header>
  
  <section id="layer-1">
    <!-- Layer 1 content -->
  </section>
  
  <section id="layer-2">
    <!-- Layer 2 content -->
  </section>
  
  <section id="layer-3">
    <!-- Layer 3 content -->
  </section>
  
  <aside class="authority-flow">
    <!-- Authority chain diagram -->
  </aside>
</main>
```

---

### Layer Section Template

```html
<section id="layer-[N]" class="layer-section">
  <div class="layer-header">
    <h2>Layer [N]: [Layer Name]</h2>
    <p class="tagline">[Layer tagline from Role]</p>
  </div>
  
  <div class="layer-content">
    <div class="role">
      <h3>Role</h3>
      <p>[Role text from Stratification Reference]</p>
    </div>
    
    <div class="boundary">
      <h3>Boundary (What It's NOT)</h3>
      <ul>
        <li>[Boundary point 1]</li>
        <li>[Boundary point 2]</li>
        <li>[Boundary point 3]</li>
      </ul>
    </div>
    
    <div class="promise">
      <h3>Promise (Capabilities)</h3>
      <ul>
        <li>[Capability 1]</li>
        <li>[Capability 2]</li>
        <li>[Capability 3]</li>
      </ul>
    </div>
    
    <div class="proof-surface">
      <h3>Public Proof Surface</h3>
      <ul>
        <li><a href="#">[Proof artifact 1]</a></li>
        <li><a href="#">[Proof artifact 2]</a></li>
        <li><a href="#">[Proof artifact 3]</a></li>
      </ul>
    </div>
  </div>
  
  <div class="repos-in-layer">
    <h3>Repositories</h3>
    <div class="repo-cards">
      <!-- Repo card components (see below) -->
    </div>
  </div>
</section>
```

**Content Source:**

- All text from Stratification Reference Doc → Layer [N] sections
- Repos: Inventory table from reference doc

---

### Repo Card Component

```html
<div class="repo-card" data-status="[active/partial/stable/legacy]">
  <div class="repo-header">
    <h4><a href="/projects/[layer]/[repo]">[repo-name]</a></h4>
    <span class="status-badge [status-class]">[Status]</span>
  </div>
  
  <p class="repo-role">[1-sentence role from analysis]</p>
  
  <div class="repo-meta">
    <span class="activity-signal [green/yellow/red]">●</span>
    <span class="last-updated">[X] days ago</span>
    <a href="[github-url]" class="github-link">GitHub →</a>
  </div>
</div>
```

**Content Source:**

- Role: From completed Repo Analysis Template → Block 2
- Status: From Repo Analysis Template → MVP Status block
- Activity signal: Calculated from GitHub API (active=green, stale=yellow, blocked=red)
- Last updated: Most recent PR/commit date

---

### Authority Flow Diagram

```html
<aside class="authority-flow">
  <h3>Authority Chain</h3>
  <div class="flow-diagram">
    <div class="flow-step" data-repo="ice-strap">
      <div class="step-name">ice-strap</div>
      <div class="step-action">Validates & bootstraps</div>
      <div class="step-output">→ Authority token</div>
    </div>
    
    <div class="flow-arrow">↓</div>
    
    <div class="flow-step" data-repo="ice-engine">
      <div class="step-name">ice-engine</div>
      <div class="step-action">Coordinates workflows</div>
      <div class="step-output">→ Execution commands</div>
    </div>
    
    <div class="flow-arrow">↓</div>
    
    <div class="flow-step" data-repo="ice-runtime">
      <div class="step-name">ice-runtime</div>
      <div class="step-action">Executes & enforces</div>
      <div class="step-output">→ Events + state</div>
    </div>
  </div>
  
  <p class="flow-note">
    Each handoff is explicit: validated context + authority token + event emission.
  </p>
</aside>
```

**Content Source:**

- Authority chain: From Stratification Reference → Layer 1 section
- Step actions: From each repo's Repo Analysis Template → Block 6 (Authority Chain)

---

## 3. Project Page Content (Per-Layer)

### Page Template

```html
<main class="project-page" data-layer="[layer-name]">
  <header>
    <h1>Layer [N]: [Layer Name]</h1>
    <p class="layer-summary">[Role from Stratification Reference]</p>
  </header>
  
  <section class="layer-details">
    <div class="detail-block">
      <h2>Boundary</h2>
      <p>[Boundary text]</p>
    </div>
    
    <div class="detail-block">
      <h2>Promise</h2>
      <ul>
        <li>[Capability 1]</li>
        <li>[Capability 2]</li>
        <li>[Capability 3]</li>
      </ul>
    </div>
    
    <div class="detail-block">
      <h2>Public Proof Surface</h2>
      <ul>
        <li><a href="#">[Proof 1]</a></li>
        <li><a href="#">[Proof 2]</a></li>
      </ul>
    </div>
  </section>
  
  <section class="repos">
    <h2>Repositories in This Layer</h2>
    <div class="repo-detail-cards">
      <!-- Extended repo cards with more detail -->
    </div>
  </section>
  
  <section class="activity-feed">
    <h2>Recent Activity (This Layer)</h2>
    <!-- Filtered activity feed for repos in this layer -->
  </section>
</main>
```

---

## 4. Repo Detail Page Content (Per-Repo)

### Page Template

```html
<main class="repo-detail-page" data-repo="[repo-name]">
  <header>
    <div class="repo-title">
      <h1>[repo-name]</h1>
      <span class="status-badge [status]">[Status]</span>
    </div>
    <p class="repo-role">[Role from Repo Analysis Template]</p>
    <div class="repo-links">
      <a href="[github-url]" class="btn-github">View on GitHub</a>
      <a href="[docs-url]" class="btn-docs">Documentation</a>
    </div>
  </header>
  
  <section class="identity">
    <h2>Identity</h2>
    <div class="identity-grid">
      <div class="identity-item">
        <strong>Layer:</strong> [Core Execution / Cognition & IO / Proof Surfaces]
      </div>
      <div class="identity-item">
        <strong>Role:</strong> [Role text]
      </div>
      <div class="identity-item">
        <strong>Boundary:</strong> [Boundary text]
      </div>
    </div>
  </section>
  
  <section class="promise">
    <h2>Promise (Capabilities)</h2>
    <ol>
      <li>
        <strong>[Capability 1 title]</strong>
        <p>[Description]</p>
        <div class="validation">
          <span class="check [yes/no]">Code: [✓/✗]</span>
          <span class="check [yes/no]">Tests: [✓/✗]</span>
          <span class="check [yes/no]">Docs: [✓/✗]</span>
        </div>
      </li>
      <!-- Repeat for each capability -->
    </ol>
  </section>
  
  <section class="proof-surface">
    <h2>Public Proof Surface</h2>
    
    <div class="proof-category">
      <h3>Documentation</h3>
      <ul>
        <li><a href="#">README.md</a> (Last updated: [date])</li>
        <li><a href="#">FOUNDATION.md</a></li>
        <li><a href="#">GOVERNANCE.md</a></li>
      </ul>
    </div>
    
    <div class="proof-category">
      <h3>Code Entry Points</h3>
      <ul>
        <li><a href="[github-file-url]">[file-path]</a> — [Description]</li>
        <li><a href="[github-file-url]">[file-path]</a> — [Description]</li>
      </ul>
    </div>
    
    <div class="proof-category">
      <h3>Tests</h3>
      <div class="test-status">
        <span class="badge [passing/failing]">[Status]</span>
        <span>Coverage: [%]</span>
        <a href="[ci-url]">CI Results →</a>
      </div>
    </div>
    
    <div class="proof-category">
      <h3>Events Emitted</h3>
      <ul>
        <li><code>[event-name-1]</code> — [Description]</li>
        <li><code>[event-name-2]</code> — [Description]</li>
      </ul>
    </div>
  </section>
  
  <section class="mvp-status">
    <h2>MVP Status</h2>
    <div class="status-grid">
      <div class="status-item">
        <h3>What Works</h3>
        <ul>
          <li>[Working feature 1]</li>
          <li>[Working feature 2]</li>
        </ul>
      </div>
      <div class="status-item">
        <h3>What's Missing</h3>
        <ul>
          <li>[Gap 1]</li>
          <li>[Gap 2]</li>
        </ul>
      </div>
      <div class="status-item">
        <h3>Next Milestone</h3>
        <p><strong>[Milestone name]</strong></p>
        <p>Delta: [Concrete delta]</p>
        <p>ETA: [Date or "Blocked on X"]</p>
      </div>
    </div>
  </section>
  
  <section class="activity-timeline">
    <h2>Activity Timeline</h2>
    <!-- Chronological list of PR/issues/milestones for this repo -->
  </section>
</main>
```

**Content Source:**

- All sections mapped directly from completed Repo Analysis Template
- Activity: GitHub API filtered by repo

---

## 5. Activity Feed (Standalone Page)

### Page Template

```html
<main class="activity-feed-page">
  <header>
    <h1>ICE Activity Feed</h1>
    <p>Real progress across all layers (updated hourly)</p>
  </header>
  
  <div class="filters">
    <button data-layer="all" class="active">All Layers</button>
    <button data-layer="layer-1">Core Execution</button>
    <button data-layer="layer-2">Cognition & IO</button>
    <button data-layer="layer-3">Proof Surfaces</button>
  </div>
  
  <div class="activity-timeline">
    <!-- Activity items (generated from GitHub API) -->
    <div class="activity-item" data-layer="layer-1" data-repo="ice-engine">
      <div class="item-header">
        <span class="badge layer-1">Core Execution</span>
        <span class="repo-name">ice-engine</span>
        <span class="type pr">PR Merged</span>
      </div>
      <div class="item-content">
        <a href="[github-pr-url]">[PR Title]</a>
        <p class="description">[Optional: first line of PR description]</p>
      </div>
      <div class="item-meta">
        <span class="author">by [github-username]</span>
        <span class="date">[X] days ago</span>
      </div>
    </div>
    
    <!-- Repeat for each activity item -->
  </div>
</main>
```

---

## 6. Data Sources & Integration

### GitHub API Queries (For Activity Feed)

#### Query 1: Recent Merged PRs (per repo)

```
GET /repos/[org]/[repo]/pulls?state=closed&per_page=10
Filter: merged_at within last 30 days
Extract: title, url, merged_at, user.login
```

#### Query 2: Recent Closed Issues (per repo, labeled)

```
GET /repos/[org]/[repo]/issues?state=closed&labels=highlight,public&per_page=10
Filter: closed_at within last 30 days
Extract: title, url, closed_at, user.login
```

#### Query 3: Milestones (per repo)

```
GET /repos/[org]/[repo]/milestones?state=all
Filter: updated_at within last 30 days
Extract: title, state, updated_at
```

#### Query 4: Releases (per repo)

```
GET /repos/[org]/[repo]/releases?per_page=5
Filter: published_at within last 30 days
Extract: tag_name, name, published_at
```

---

### Activity Signal Calculation

```javascript
function calculateActivitySignal(repo) {
  const now = Date.now();
  const lastActivity = getLastActivityDate(repo); // most recent PR/issue/commit
  const daysSinceActivity = (now - lastActivity) / (1000 * 60 * 60 * 24);
  
  if (daysSinceActivity < 7) return 'green'; // Active (updated in last week)
  if (daysSinceActivity < 30) return 'yellow'; // Stale (updated in last month)
  return 'red'; // Blocked/inactive (no updates in 30+ days)
}
```

---

## 7. Content Generation Workflow

### Step 1: Complete Repo Analysis

- For each repo, complete the **Repo Analysis Template**
- Validate: all blocks filled, evidence cited, status honest

### Step 2: Extract Content Snippets

- Copy relevant sections from analysis template
- Format as HTML/Markdown per templates above

### Step 3: Generate Dynamic Data

- Run GitHub API queries (PR/issues/milestones)
- Calculate activity signals (green/yellow/red)
- Generate JSON for activity feed

### Step 4: Assemble Pages

- Homepage: Hero + stratification widget + activity preview
- Stratification page: Layer sections + repo cards + authority diagram
- Project pages: Layer details + filtered activity
- Repo detail pages: Full analysis + timeline

### Step 5: Validate Links & Proofs

- Every "proof" link points to real artifact (code/docs/tests)
- No dead links, no TBD placeholders in production
- Activity feed updates automatically (hourly refresh)

---

## 8. Tone & Style Guide

### Voice Characteristics

- **Technical, not marketing:** Use precise terms (state machine, authority token), not buzzwords (revolutionary, game-changing)
- **Honest about maturity:** Show real status (partial, blocked), not fake "production-ready"
- **Proof over claims:** Every capability links to code/tests/docs, not just text
- **Problem-first:** Lead with failure modes (context loss, no audit trail), then show solution

### Writing Patterns

#### Good Examples

✅ "ice-strap validates environment and performs the initial authority handoff to ice-engine."  
✅ "Status: Partial — handoff logic incomplete, tests pending"  
✅ "Promise: Emits `bootstrap.started` event → [link to code]"

#### Bad Examples

❌ "ice-strap is a revolutionary bootstrap solution that changes everything"  
❌ "Coming soon!" (with no concrete delta or ETA)  
❌ "Supports advanced features" (vague, no links to proof)

---

### Formatting Rules

- **Headers:** Sentence case, not title case ("What's missing" not "What's Missing")
- **Code:** Inline `code` for events/files, fenced blocks for snippets
- **Lists:** Use bullets for unordered, numbers for sequential steps
- **Links:** Descriptive text ("View authority chain diagram"), not generic ("click here")
- **Badges:** Visual status (color-coded), not just text ("Active" with green dot)

---

## 9. Quality Checklist (Before Publishing)

### Content Quality

- [ ] Every repo has completed Analysis Template
- [ ] All "Role" statements are 1 clear sentence
- [ ] All "Promise" capabilities have code/test/doc evidence
- [ ] Status badges match reality (not aspirational)
- [ ] Activity feed shows real data (not mocked)

### Technical Accuracy

- [ ] Authority chain diagram matches actual handoffs
- [ ] Event names match codebase (not invented)
- [ ] Entry points link to actual files in GitHub
- [ ] Test status reflects current CI state

### User Experience

- [ ] Homepage scan < 15 seconds (timed test)
- [ ] Navigation clear (layer → repo drill-down)
- [ ] No dead links (automated link checker)
- [ ] Mobile responsive (tested)
- [ ] Activity feed updates automatically (hourly)

---

**End of Content Generator Guide**


