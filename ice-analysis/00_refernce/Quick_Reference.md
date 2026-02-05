
# ICE — Quick Reference Card

**Stratification Cheat Sheet**  
Print this. Keep it visible during analysis.

---

## The 3-Layer Model (One-Liner Each)

|Layer|Role|Repos|Status|
|---|---|---|---|
|**1. Core Execution**|Authority chain: strap → engine → runtime|3 repos|Partial (active work)|
|**2. Cognition & IO**|Decisions + memory + contracts + integration|5 repos|Active (structured)|
|**3. Proof Surfaces**|Axioms + tests + telemetry + docs + UI|5 repos|Mixed (foundation stable, rest varies)|

---

## Layer 1: Core Execution

### Repos

1. **ice-strap** (Partial) — Bootstrap + preboot + handoff → engine
2. **ice-engine** (Active) — Orchestration + agents + storage coordination
3. **ice-runtime** (Partial) — State machine + lifecycle + events + enforcement

### Boundary

- Does NOT decide "what to do" (that's Layer 2)
- Does NOT expose UI/tooling directly (that's Layer 3)

### Public Proof

- Lifecycle diagram (strap → engine → runtime)
- State transitions (runtime: init → ready → executing → done/error)
- Event taxonomy
- Merged PR/issues/milestones (activity feed)

---

## Layer 2: Cognition & IO

### Repos

1. **ice-ai** (Active) — Planner + task graph + agent catalog + LLM adapter
2. **ice-consciousness** (Active) — Memory (working/episodic/semantic) + knowledge graph + RAG
3. **ice-providers** (Minimal) — Embeddings adapters (openai/ollama/llamacpp/gguf)
4. **ice-protocols** (Partial/Legacy) — Security (identity/tokens/pairing) + transport (UDP/wireguard)
5. **ice-api** (Active) — Domains + actions + IPC + schema + types (contract layer)

### Boundary

- Does NOT execute side-effects (that's Runtime in Layer 1)
- Does NOT bootstrap system (that's Strap in Layer 1)
- Does NOT expose final UI (that's Studio in Layer 3)

### Public Proof

- Agent catalog + capabilities
- Memory model diagram
- Knowledge graph schema
- Provider matrix (embeddings)
- Protocol semantics (identity/pairing)
- API schema (domains + IPC)

---

## Layer 3: Proof Surfaces

### Repos

1. **ice-foundation** (Stable) — Axioms + invariants + boundaries (only autonomous domain)
2. **ice-docs** (Legacy) — Narrative + reference docs (needs realignment)
3. **ice-tests** (Refactor pending) — Test harness + regression + compliance
4. **ice-observability** (Empty placeholder) — Event taxonomy + telemetry (TBD)
5. **ice-studio** (Semi-legacy) — UI/IDE (graph + timeline + plugins; frozen post-extraction)

### Boundary

- Does NOT implement core execution (Layer 1)
- Does NOT make decisions (Layer 2)
- Does NOT replace product (it's proof + interface)

### Public Proof

- Axioms index (foundation)
- Test matrix (tests)
- Event taxonomy + dashboard (observability)
- Documentation index (docs)
- Visual execution proof (studio)

---

## Authority Chain (Core Execution)

```
User invokes → ice-strap validates → ice-engine coordinates → ice-runtime executes
                     ↓                        ↓                        ↓
              authority token          execution commands         events + state
```

**Handoff Points:**

1. Strap → Engine: Validated context + authority token + `bootstrap.completed` event
2. Engine → Runtime: Execution commands + workflow state + orchestration signals
3. Runtime → Observability: Events + state transitions + audit trail

---

## Repo Analysis Speed Workflow (55 min/repo)

1. **Read README** (5 min) → Extract role, promise, status
2. **Read FOUNDATION.md + GOVERNANCE.md** (10 min) → Extract axioms, boundaries
3. **Inspect tree** (5 min) → Map code structure to capabilities
4. **Check activity** (5 min) → GitHub PR/issues/milestones
5. **Fill template** (20 min) → All 8 blocks, cite evidence
6. **Generate site content** (10 min) → Copy-paste snippets

**Total:** ~55 minutes per repo

---

## Site Content Generation (Fast Path)

### Homepage (3 sections)

1. **Hero:** Problem + solution + CTA (15s scan)
2. **Stratification widget:** 3 layers preview
3. **Activity feed:** Recent PR/issues (dynamic)

### Stratification Page (3 layer sections)

- Each layer: Role + boundary + promise + proof + repos
- Authority flow diagram
- Clickable drill-down to repos

### Repo Detail Page (5 sections)

1. **Identity:** Role + boundary
2. **Promise:** Capabilities (with code/test/doc checks)
3. **Proof surface:** Docs + code + tests + events
4. **MVP status:** What works / what's missing / next
5. **Activity timeline:** Recent PR/issues

---

## Status Labels (Maturity)

|Label|Meaning|Example|
|---|---|---|
|**Stable**|Autonomous, coherent, complete|ice-foundation|
|**Active**|Under active development, structured|ice-engine, ice-ai|
|**Partial**|Structure present, incomplete features|ice-strap, ice-runtime|
|**Placeholder**|Minimal or empty, future work|ice-observability|
|**Legacy**|Needs realignment or refactor|ice-docs, ice-protocols (partial)|
|**Semi-legacy**|Was working, frozen post-extraction|ice-studio|

---

## Activity Signal (Traffic Light)

|Color|Meaning|Calculation|
|---|---|---|
|🟢 Green|Active|Updated in last 7 days|
|🟡 Yellow|Stale|Updated in last 30 days|
|🔴 Red|Blocked/Inactive|No updates in 30+ days|

**Data source:** Most recent PR/commit/issue activity (GitHub API)

---

## Key Terminology (One-Liners)

|Term|Definition|
|---|---|
|**Authority chain**|Explicit handoff: strap → engine → runtime|
|**Boundary**|Anti-scope: what a domain does NOT do|
|**Proof surface**|Visible evidence (tests/docs/events/UI), not claims|
|**State machine**|Deterministic transitions (e.g., init → ready → executing)|
|**Event taxonomy**|Structured catalog of system signals|
|**Cognition vs Execution**|Cognition decides, Execution makes it happen|
|**Observable vs Auditable**|Observable = see now, Auditable = reconstruct later|

---

## Dependencies (High-Level)

### Layer 1 (Core Execution)

- **Consumes:** Config, environment (external)
- **Provides:** Authority handoffs, execution substrate, events
- **Depends on:** Layer 2 (contracts from ice-api)

### Layer 2 (Cognition & IO)

- **Consumes:** Contracts (ice-api), providers (embeddings/LLM)
- **Provides:** Decisions, memory, integration adapters
- **Depends on:** Layer 1 (runtime for execution), external services (LLM/storage)

### Layer 3 (Proof Surfaces)

- **Consumes:** Events (from runtime), artifacts (from all layers)
- **Provides:** Validation, telemetry, documentation, UI
- **Depends on:** Layers 1 & 2 (observes, does not control)

---

## Quality Checklist (Minimum Viable Proof)

### Per Repo

- [ ] Role is 1 clear sentence
- [ ] Boundary states what it does NOT do
- [ ] Promise lists 3-5 concrete capabilities
- [ ] Each capability has code/test/doc evidence (or marked missing)
- [ ] Status badge matches reality (not aspirational)

### Per Page

- [ ] No dead links (all proofs point to real artifacts)
- [ ] No TBD placeholders (honest "missing" is better)
- [ ] Activity feed shows real data (GitHub API, not mocked)
- [ ] Status signals accurate (green/yellow/red calculated)

### Site-Wide

- [ ] Homepage scan < 15 seconds (timed)
- [ ] Navigation clear (layer → repo drill-down)
- [ ] Authority chain matches reality
- [ ] Event names match codebase

---

## When to Use Which Document

|Document|Use When|
|---|---|
|**Stratification Reference**|Need full context (layers/roles/boundaries/proof)|
|**Repo Analysis Template**|Analyzing a specific repo (systematic extraction)|
|**Site Content Generator**|Converting analysis to web pages (HTML/structure)|
|**Quick Reference (this)**|Fast lookup during work (print/keep visible)|

---

## GitHub API Quick Reference (Activity Feed)

### Recent PRs (merged, last 30 days)

```
GET /repos/[org]/[repo]/pulls?state=closed&per_page=10
Filter: merged_at within 30 days
```

### Recent Issues (closed, labeled)

```
GET /repos/[org]/[repo]/issues?state=closed&labels=highlight,public&per_page=10
Filter: closed_at within 30 days
```

### Milestones

```
GET /repos/[org]/[repo]/milestones?state=all
Filter: updated_at within 30 days
```

### Releases

```
GET /repos/[org]/[repo]/releases?per_page=5
Filter: published_at within 30 days
```

---

## Common Pitfalls (Avoid These)

### Analysis Pitfalls

❌ Vague role ("handles stuff") → ✅ Specific role (1 sentence, cite code)  
❌ Missing boundary (scope creep) → ✅ Explicit anti-scope (what it's NOT)  
❌ Marketing promises ("revolutionary") → ✅ Concrete capabilities (link to code)  
❌ Aspirational status ("production-ready") → ✅ Honest status (partial, blocked)

### Content Pitfalls

❌ Dead links (proof points to TBD) → ✅ Real artifacts or marked "missing"  
❌ Generic text ("coming soon") → ✅ Concrete delta ("needs X + tests")  
❌ Mocked activity feed → ✅ Real GitHub data (API)  
❌ Buzzwords ("game-changing") → ✅ Technical terms (state machine, authority)

### Site Pitfalls

❌ Homepage too wordy (30s+ scan) → ✅ 15-second comprehension  
❌ Repo-first navigation (flat list) → ✅ Layer-first (stratification)  
❌ Static content (stale dates) → ✅ Dynamic activity feed (hourly)  
❌ No status signals (unknown health) → ✅ Traffic lights (green/yellow/red)

---

## Next Actions (Start Here)

1. **Print this card** → Keep visible during analysis
2. **Pick Layer 1 repo** (ice-strap, ice-engine, or ice-runtime)
3. **Open Repo Analysis Template** → Fill all 8 blocks (~55 min)
4. **Extract site content** → Use Content Generator guide
5. **Validate proofs** → Every link points to real artifact
6. **Repeat** for next repo

**Goal:** 1 repo/day → 13 repos = 2 weeks → Full site content ready

---

**End of Quick Reference**