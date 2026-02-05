# ICE Engine — Repo Analysis (Completed)

**Layer 1: Core Execution**  
Analysis Date: February 5, 2026  
Based on: GitHub README + Repository structure

---

## Block 1: Identity

**Repo Name:** ice-engine  
**GitHub URL:** https://github.com/francescomaiomascio/ice-engine  
**Layer:** Core Execution  
**Status:** Partial (36 commits, 3 open issues, structured codebase)

---

## Block 2: Role (Ontology)

> ice-engine is the Core Execution coordination layer responsible for defining how execution is composed, how flows are ordered, and how subsystems interact under explicit constraints — without executing actions directly or inferring intent.

---

## Block 3: Boundary (Anti-Scope)

> ice-engine does NOT execute low-level actions (ice-runtime), infer intent (ice-ai/consciousness), hold authority over execution, or act as a runtime executor, AI system, agent framework, business logic layer, workflow UI, or infrastructure abstraction. Execution belongs to Runtime. Intent belongs to Intelligence. ice-engine coordinates between them.

**What ice-engine is NOT:**

- A runtime executor
- An AI system
- An agent framework
- A business logic layer
- A workflow UI
- An infrastructure abstraction

**Governance constraints (non-negotiable):**

- Cannot bypass Runtime authority
- Cannot self-authorize execution
- Cannot redefine invariants
- Cannot hide or reorder execution implicitly

---

## Block 4: Promise (Concrete Capabilities)

1. **Execution Flow Semantics:** Defines how execution is structured and sequenced (causality, ordering)
2. **Subsystem Coordination:** Coordinates orchestration between Runtime, Intelligence, and other ICE components
3. **Contract Enforcement:** Enforces explicit contracts and boundaries between layers
4. **Ingestion & Persistence Flows:** Governs how data flows into and persists within ICE (per Tavola: `ingest/` module)
5. **Causal Relationship Management:** Manages dependencies and ordering between actions (deterministic)
6. **Deterministic Orchestration:** Preserves reproducible behavior at scale (no hidden state, explicit traces)

**Additional capabilities (from Tavola di Mosè code structure):** 7. **Agent Runtime Coordination:** Manages agent executors via `agents_runtime/` (runner, scheduler, events, errors) 8. **Storage Backend Coordination:** Coordinates relational, vector, cache backends via `storage/` (migrations, repositories, schema) 9. **Orchestrator Layer:** Router, dispatcher, middleware, tracing, logging via `orchestrator/`

**Validation Check:**

- **Code exists:** ✓ (`src/ice_engine/` with orchestrator, agents_runtime, ingest, storage modules per Tavola)
- **Tests exist:** ⚠️ (structure unknown, no mention in README)
- **Docs exist:** ✓ (README, FOUNDATION.md, GOVERNANCE.md, CHANGELOG.md, SECURITY.md)

---

## Block 5: Inputs/Outputs (Contract)

### Inputs (What ice-engine Receives)

|Input|Type|Source|Example|
|---|---|---|---|
|Bootstrap context|Immutable object|ice-strap|`{env, workspace, topology, validated: true}`|
|Authority handoff|Control transfer|ice-strap|Engine receives execution authority|
|Execution requests|Commands/events|ice-ai / Intelligence|`{agent_id, workflow_id, params}`|
|Runtime state|State snapshots|ice-runtime|Current execution state for coordination|
|Ingestion jobs (inferred)|Data pipelines|External/workspace|Files, events to process|

### Outputs (What ice-engine Emits)

|Output|Type|Consumer|Example|
|---|---|---|---|
|Execution commands|Structured directives|ice-runtime|`{action, target, constraints}`|
|Orchestration signals|Events|ice-observability|`{flow.started, flow.completed, flow.failed}`|
|Storage operations|CRUD commands|Storage backends|Relational/vector/cache writes|
|Agent dispatch|Executor invocations|agents_runtime|`{agent, task, context}`|
|Workflow state|Flow snapshots|ice-runtime / UI|Current orchestration state|
|Causal trace|Dependency graph|ice-observability|Execution ordering evidence|
**Clarification:**  
ice-engine emits _coordination directives_, not executable actions.  
All side-effects are performed exclusively by ice-runtime.


---

## Block 6: Authority Chain

**Where authority starts:**

- ice-strap hands off validated bootstrap context + authority
- ice-engine receives authority to coordinate execution flows

**What ice-engine does with authority:**

1. Defines execution structure (flows, causality, contracts)
2. Coordinates between Runtime (executor) and Intelligence (decision-maker)
3. Enforces constraints (no implicit reordering, explicit contracts)
4. Dispatches to agents/workflows via Runtime
5. Does NOT execute directly (delegates to Runtime)

**Where authority ends:**

- ice-engine passes execution commands to ice-runtime
- Runtime has final execution authority (engine only coordinates)

**Authority flow:**

- **Strap → Engine → Runtime**
- Engine is coordination authority, NOT execution authority

**Authority artifacts (proof):**

- Orchestrator: `src/ice_engine/orchestrator/` (router, dispatcher, middleware)
- Agents runtime: `src/ice_engine/agents_runtime/` (executor coordination)
- Foundation: References ICE Foundation v1.0.0 (derives invariants)

**Authority constraints (from README):**

- Cannot bypass Runtime authority
- Cannot self-authorize execution
- Cannot redefine Foundation invariants
- Must remain explicit, traceable, reproducible

---

## Block 7: State Model

**Does ice-engine manage state?** Yes (coordination state, not execution state)

**State types managed:**

1. **Flow state:** Orchestration progress (workflow phases, causal ordering)
2. **Agent dispatch state:** Which agents are scheduled/running (via `agents_runtime/`)
3. **Ingestion state:** Data pipeline progress (jobs, classification, indexing per `ingest/`)
4. **Storage state coordination:** Backend status (migrations, schema versions per `storage/`)

**NOT managed by engine:**

- Execution state (belongs to ice-runtime)
- Decision state (belongs to ice-ai/consciousness)
- Long-term memory (belongs to ice-consciousness)

**State transitions (inferred):**

|State|Description|Entry Condition|Exit Condition|
|---|---|---|---|
|Idle|No active flows|Bootstrap complete|Flow requested|
|Coordinating|Active orchestration|Flow started|Flow completes or fails|
|Dispatching|Agent invocation|Agent task ready|Agent accepts task|
|Persisting|Storage operations|Data ready|Write confirmed|

**State diagram location:** Not documented (needs formalization)

---

## Block 8: Evidence Hooks (Public Proof Surface)

### Documentation

- [x] README.md exists and is current ✓ (comprehensive role/boundary)
- [x] FOUNDATION.md exists ✓ (derives from ICE Foundation v1.0.0)
- [x] GOVERNANCE.md exists ✓ (governance constraints)
- [x] CHANGELOG.md exists ✓ (change tracking)
- [x] SECURITY.md exists ✓ (security policy)
- [ ] Architecture diagrams ⚠️ (not visible in README)
- [ ] API/contract docs ⚠️ (inferred from code, not formalized)

### Code Artifacts

**Key modules/entry points (from Tavola di Mosè):**

1. `orchestrator/` — Router, dispatcher, middleware, tracing, logging
2. `agents_runtime/` — Runner, scheduler, events, errors (agent execution coordination)
3. `ingest/` — Jobs, classifier, models, workspace_index_service
4. `storage/` — Relational + vector + cache backends, migrations, repositories, schema

**Tree structure (from Tavola):**

```
src/ice_engine/
├── orchestrator/
│   ├── router.py
│   ├── dispatcher.py
│   ├── middleware.py
│   ├── tracing.py
│   └── logging.py
├── agents_runtime/
│   ├── runner.py
│   ├── scheduler.py
│   ├── events.py
│   └── errors.py
├── ingest/
│   ├── jobs.py
│   ├── classifier.py
│   ├── models.py
│   └── workspace_index_service.py
└── storage/
    ├── relational/
    ├── vector/
    ├── cache/
    ├── migrations/
    ├── repositories/
    └── schema/
```

### Tests

- [ ] Test suite exists ⚠️ (not mentioned in README, no CI badge)
- [ ] Tests are passing ⚠️ (no visible CI results)
- [ ] Coverage metrics ⚠️ (not reported)
- [ ] Compliance tests ⚠️ (contract enforcement validation — unknown)

**Action needed:** Inspect repo for tests/ or CI configuration

### Telemetry/Events

**Events emitted (inferred from coordination role):**

1. `flow.started` — Orchestration flow begins
2. `flow.step_completed` — Individual step finishes
3. `flow.completed` — Entire flow succeeds
4. `flow.failed` — Flow terminates with error
5. `agent.dispatched` — Agent task assigned
6. `agent.completed` — Agent task finishes
7. `storage.operation` — Storage backend interaction
8. `ingestion.job_started` — Data pipeline begins
9. `ingestion.job_completed` — Data pipeline finishes

**Event taxonomy location:** Not documented (needs formalization)

### Activity (Recent 30 Days)

**Commit count:** 36 commits total (recent activity unknown)

**Open Issues:** 3 (visible in GitHub page)

**PR Merged:** Not visible (0 open PRs shown)

**Milestones Reached:** None visible

**Releases:** No releases published

**Activity Signal:** 🟢 Green (recent issue activity; commit recency not yet verified)

**Last Updated:** Unknown (commit dates not in README)

---

## MVP Status (Operational Reality)

### Maturity Label

**Active** (structured codebase, ongoing issues, clear architecture, pre-stable)

**Justification:**

- 36 commits + 3 open issues = active development
- Comprehensive documentation (README, FOUNDATION, GOVERNANCE, CHANGELOG)
- Complex module structure (orchestrator, agents_runtime, ingest, storage)
- Clear position in ecosystem (coordination core between Strap/Runtime/Intelligence)
- No releases yet (pre-stable development)

---

### What Works (Concrete Features Implemented)

Based on documentation and Tavola structure:

1. **Foundation compliance:** Derives from ICE Foundation v1.0.0 (axioms/invariants)
2. **Orchestrator layer exists:** Router, dispatcher, middleware for flow coordination
3. **Agent runtime coordination:** Runner, scheduler for agent execution management
4. **Ingestion pipeline structure:** Jobs, classifier, workspace indexing
5. **Storage backend coordination:** Relational, vector, cache backends with migrations/schema
6. **Governance boundaries enforced:** Explicit constraints (no self-authorization, no implicit behavior)

**Evidence:**

- README: Clear role, boundary, responsibilities
- FOUNDATION.md: References ICE Foundation v1.0.0
- Code structure: Modular layout per Tavola (orchestrator/, agents_runtime/, etc.)

---

### What's Missing (Delta to MVP)

1. **Contract formalization:** Engine ↔ Runtime interface not documented (execution commands schema)
2. **Event schema undefined:** Orchestration events mentioned but not formalized
3. **Test coverage unknown:** No visible test suite or CI badges
4. **No releases:** Pre-stable (no semver tags, no published packages)
5. **Ingestion pipeline incomplete:** Structure exists but functionality unclear
6. **Storage backends status unclear:** Migrations/schema present but operational status unknown
7. **Agent dispatch contract unclear:** How agents_runtime/ interacts with ice-ai not documented

**Critical gaps for MVP:**

- Define Engine → Runtime contract (execution commands schema)
- Formalize orchestration event taxonomy
- Add integration tests (strap → engine → runtime flow)
- Document storage backend status (which backends work, which are stubs)
- Publish first alpha release (0.1.0-alpha)

---

### Next Milestone (Concrete)

**Target:** Engine ↔ Runtime Contract Definition + Orchestration Event Schema v1

**Delta:**

1. Define execution commands schema (Engine → Runtime interface)
2. Formalize orchestration event taxonomy (flow._, agent._, storage._, ingestion._)
3. Implement integration test: strap → engine → runtime (mock runtime)
4. Document storage backend status (which work, which are placeholders)
5. Add CI workflow: lint + type check + tests

**ETA:** Blocked on ice-runtime contract exposure (Runtime must define what it accepts)

**Dependency:** ice-runtime must expose execution command interface

---

## Dependencies (Incoming/Outgoing)

### This Repo Depends On (Incoming)

|Dependency|Type|Why|Status|
|---|---|---|---|
|ICE Foundation|Conceptual|Derives axioms, invariants, boundaries|Active (v1.0.0 referenced)|
|ice-strap|Integration|Receives bootstrap context + authority|Partial (handoff contract unclear)|
|ice-runtime|Integration|Sends execution commands|Partial (contract undefined)|
|ice-ai|Integration|Receives execution requests from Intelligence|Partial (contract unclear)|

### Other Repos Depend On This (Outgoing)

|Dependent Repo|Why|Status|
|---|---|---|
|ice-runtime|Receives execution commands from engine|Partial (expects coordination)|
|ice-ai|Sends execution requests to engine|Partial (expects orchestration)|
|ice-strap|Hands off authority to engine|Partial (expects bootstrap acceptance)|

---

## Site Content Output (Ready for Copy-Paste)

### Project Page Snippet (Markdown)

```markdown
## ice-engine

**Role:** The coordination core that defines how execution is composed, how flows are ordered, and how ICE subsystems interact under explicit constraints — without executing actions or inferring intent.

**Promise:**
- Execution flow semantics (causality, ordering, structure)
- Subsystem coordination (Runtime ↔ Intelligence ↔ Engine)
- Contract enforcement (explicit boundaries, no implicit behavior)
- Ingestion & persistence flows (data pipeline governance)
- Causal relationship management (deterministic dependencies)
- Agent runtime coordination (dispatch, scheduling, events)
- Storage backend coordination (relational, vector, cache)

**Status:** Active (36 commits, 3 open issues, pre-stable)

**Public Proof:**
- [README.md](https://github.com/francescomaiomascio/ice-engine/blob/main/README.md) — Role, boundary, responsibilities
- [FOUNDATION.md](https://github.com/francescomaiomascio/ice-engine/blob/main/FOUNDATION.md) — Derives from ICE Foundation v1.0.0
- [CHANGELOG.md](https://github.com/francescomaiomascio/ice-engine/blob/main/CHANGELOG.md) — Change tracking
- Orchestrator: `src/ice_engine/orchestrator/`
- Agents runtime: `src/ice_engine/agents_runtime/`
- Ingestion: `src/ice_engine/ingest/`
- Storage: `src/ice_engine/storage/`

**Activity:**
- 36 commits total
- 3 open issues (active development)
- 0 open PRs
- No releases yet (pre-stable)

**Next:** Engine ↔ Runtime contract definition + orchestration event schema v1 (blocked on runtime contract)
```

---

### Activity Feed Entry (JSON Structure)

```json
{
  "repo": "ice-engine",
  "layer": "Core Execution",
  "status": "Active",
  "maturity": "Pre-stable",
  "recent_activity": [
    {"type": "commit_count", "value": 36, "note": "Total commits"},
    {"type": "issues_open", "value": 3, "note": "Active issues"}
  ],
  "signal": "green",
  "blocked_on": "ice-runtime execution command contract definition",
  "next_milestone": "Engine ↔ Runtime contract + event schema v1"
}
```

---

### Diagram Input (For Stratification Visualization)

**Position in Layer:** Layer 1 (Core Execution)  
**Visual Grouping:** Middle box in execution chain  
**Arrow Connections:** `ice-strap → ice-engine → ice-runtime` (authority + coordination flow)  
**Status Badge:** 🟢 Green dot (active development)  
**Label:** "Coordination Core"

---

## Quality Validation

- [x] Role is 1 clear sentence ✓
- [x] Boundary explicitly states what it does NOT do ✓
- [x] Promise lists concrete capabilities (9 capabilities, specific) ✓
- [⚠️] Each capability has code/test/doc evidence (code structure confirmed, tests unknown)
- [x] Status badge matches reality (Active/Pre-stable) ✓
- [⚠️] Inputs/outputs are specific (some inferred from design, not all explicit)
- [x] Authority chain is explicit (receives from strap, delegates to runtime) ✓
- [x] State model exists (coordination state types defined) ✓
- [x] Evidence hooks point to real artifacts (README, FOUNDATION confirmed, code structure from Tavola) ✓
- [x] MVP status is honest (pre-stable, gaps identified) ✓
- [x] Site content is copy-paste ready ✓

**Overall Quality:** Strong architecture, clear coordination role, needs contract formalization and test visibility.

---

**End of ice-engine Analysis**