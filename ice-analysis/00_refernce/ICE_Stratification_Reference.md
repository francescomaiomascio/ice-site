**Project Documentation Framework**  
Version: 1.0 | Date: February 2026

---

## Executive Summary

### What ICE Is (The Core Promise)

ICE is an **execution governance system** that makes AI agent behavior **auditable, governable, and deterministic**. Unlike traditional agentic frameworks that rely on implicit LLM decision-making, ICE separates:

- **Execution authority** (bootstrap → engine → runtime: where decisions become actions)
- **Cognition** (AI/consciousness: what to decide, with memory/continuity)
- **Verification** (foundation/tests/observability: proof that promises hold)

### The Market Problem

Current agentic systems fail at production scale because:

- **No clear authority chain**: who decides? who executes? who audits?
- **No memory/continuity**: agents restart from zero, no learning
- **No verifiable behavior**: blackbox LLM calls, no audit trail
- **No safe handoffs**: context loss between tools/agents/sessions

### ICE's Answer

A **stratified architecture** where each layer has explicit boundaries, contracts, and proof surfaces:

1. **Core Execution** (strap/engine/runtime): makes decisions _executable_ and _auditable_
2. **Cognition & IO** (ai/consciousness/providers/protocols/api): produces decisions and manages memory/integration
3. **Proof Surfaces** (foundation/docs/tests/observability/studio): renders the system _credible_ and _navigable_

---

## Stratification Map (3 Layers)

### Layer 1: Core Execution

**Strap → Engine → Runtime**

#### Role

The **authority chain**: from system birth (strap) to coordination (engine) to deterministic execution (runtime).

#### Boundary (What It's NOT)

- Does NOT decide "what to do" (that's Layer 2: Cognition)
- Does NOT expose UI/tooling directly (that's Layer 3: Proof Surfaces)
- Does NOT integrate external services (that's providers/protocols in Layer 2)

#### Promise (Concrete Capabilities)

1. **Strap**: Validates environment, loads config, performs preboot checks, then **hands off authority once** and exits
2. **Engine**: Coordinates workflows (orchestration/routing/middleware), dispatches to agents, manages storage (relational/vector/cache)
3. **Runtime**: Enforces execution semantics (state machine, lifecycle, capabilities, events), produces audit trail

#### Public Proof Surface (What Must Be Visible on Site)

- **Lifecycle diagram**: strap → engine → runtime handoff with authority transfer points
- **State model**: runtime state transitions (init → ready → executing → done/error)
- **Event taxonomy**: what signals runtime emits (for observability)
- **API contracts**: engine/runtime public interfaces (even if internal for now)
- **Activity feed**: merged PR/issues/milestones from all 3 repos (strap/engine/runtime)

#### Maturity Status

- **ice-strap**: Partial (preboot + bootstrap structure present, handoff semantics incomplete)
- **ice-engine**: Active (orchestrator + agents_runtime working, ingest semi-complete, storage backends exist)
- **ice-runtime**: Partial (state machine + events/kernel present, capabilities + sessions incomplete)

#### Entry Points (Code Navigation)

- **Strap**: `src/ice_strap/__main__.py` (entrypoint), `bootstrap/` (handoff logic)
- **Engine**: `orchestrator/` (coordination), `agents_runtime/` (execution), `storage/` (backends)
- **Runtime**: `runtime/state_machine.py` (core), `events/kernel/` (authority/emitter), `sessions/` (workspace management)

---

### Layer 2: Cognition & IO

**AI → Consciousness → Providers → Protocols → API**

#### Role

Produces **intent/decisions**, manages **memory/continuity**, and defines **contracts for external integration** (LLM, embeddings, services).

#### Boundary (What It's NOT)

- Does NOT execute side-effects (writes, actions, state transitions: that's Runtime in Layer 1)
- Does NOT bootstrap the system (that's Strap in Layer 1)
- Does NOT expose final UI/tools (that's Studio/CLI in Layer 3)

#### Promise (Concrete Capabilities)

1. **ice-ai**: Decision pipelines, task graphs, agent catalog, LLM adapter abstraction
2. **ice-consciousness**: Memory model (working/episodic/semantic), knowledge graph, RAG pipeline, continuity/awareness lifecycle
3. **ice-providers**: Adapter registry for embeddings (OpenAI, Ollama, LlamaCpp, GGUF, mock, openai-compatible)
4. **ice-protocols**: Security semantics (identity, tokens, pairing), transport semantics (UDP discovery, WireGuard tooling)
5. **ice-api**: Contract layer (domains, actions, IPC events/messages, schema validation, types)

#### Public Proof Surface

- **Agent catalog**: list of agents + capabilities (from ice-ai)
- **Memory model diagram**: working → episodic → semantic flow (from ice-consciousness)
- **Knowledge graph schema**: entities + relationships (from ice-consciousness)
- **Provider matrix**: supported embeddings/LLM providers + config (from ice-providers)
- **Protocol semantics**: identity/pairing/handshake flows (from ice-protocols)
- **API schema**: domains + actions + IPC taxonomy (from ice-api)
- **Activity feed**: merged highlights from all 5 repos

#### Maturity Status

- **ice-ai**: Active (core/reasoning/agents/llm present, memory contracts defined)
- **ice-consciousness**: Active (memory model + knowledge graph + RAG working, storage repositories exist)
- **ice-protocols**: Partial/Legacy (security semantics present, transport incomplete, Snowball agent prototype exists)
- **ice-providers**: Minimal but functional (embeddings adapters working, no LLM adapters yet)
- **ice-api**: Active (domains + actions + IPC + schema + types structured)

#### Entry Points (Code Navigation)

- **ice-ai**: `core/planner.py`, `reasoning/task_graph.py`, `agents/catalog.py`
- **ice-consciousness**: `memory/` (working/episodic/semantic), `knowledge/graph.py`, `rag/pipeline.py`
- **ice-providers**: `embeddings/` (base + provider implementations)
- **ice-protocols**: `protocols/security/` (identity/tokens/pairing), `protocols/transport/` (UDP/wireguard)
- **ice-api**: `domains/`, `actions/`, `ipc/`, `schema/`, `types/`

---

### Layer 3: Proof Surfaces

**Foundation → Docs → Tests → Observability → Studio**

#### Role

Makes ICE **credible** and **navigable**: axioms, proof, telemetry, documentation, and UI that visualizes state.

#### Boundary (What It's NOT)

- Does NOT implement core execution (that's Layer 1)
- Does NOT make decisions (that's Layer 2)
- Does NOT replace the product itself (it's the _proof_ and _interface_ to the product)

#### Promise (Concrete Capabilities)

1. **ice-foundation**: Defines axioms, invariants, boundaries (constitutional layer)
2. **ice-docs**: Narrative + reference documentation (legacy, needs realignment)
3. **ice-tests**: Test harness, regression suite, compliance checks (refactor pending)
4. **ice-observability**: Event taxonomy, sinks/transports, telemetry (currently empty placeholder)
5. **ice-studio**: UI for visualizing execution graph, timeline, agent orchestration, plugins (former monorepo, needs reconnection to Layer 1/2)

#### Public Proof Surface

- **Axioms index**: navigable list of invariants (from ice-foundation)
- **Test matrix**: cross-domain test coverage (from ice-tests when ready)
- **Event taxonomy**: what runtime emits (from ice-observability)
- **Dashboard/timeline**: visual proof of execution (from ice-studio)
- **Documentation index**: concept + reference (from ice-docs post-realignment)
- **Activity feed**: merged highlights from all 5 repos

#### Maturity Status

- **ice-foundation**: Stable (only autonomous domain, semantics already coherent)
- **ice-docs**: Legacy (needs realignment to 3-layer stratification)
- **ice-tests**: Refactor pending (structure exists, needs update)
- **ice-observability**: Empty placeholder (taxonomy defined conceptually, no code)
- **ice-studio**: Semi-legacy (was monorepo ICE, frozen post-domain extraction, needs Layer 1/2 reconnection)

#### Entry Points (Code Navigation)

- **ice-foundation**: `FOUNDATION.md`, axioms/, boundaries/
- **ice-docs**: (to be restructured: concepts/, reference/, runbooks/)
- **ice-tests**: (pending refactor: domains/, compliance/)
- **ice-observability**: (TBD: events/taxonomy.py, sinks/, transports/)
- **ice-studio**: UI surfaces (graph, timeline, session explorer), plugins/

---

## Repository Inventory (Complete)

### Core Execution (Layer 1)

|Repo|Status|Links|
|---|---|---|
|ice-strap|Partial|[GitHub](https://github.com/francescomaiomascio/ice-strap)|
|ice-engine|Active|[GitHub](https://github.com/francescomaiomascio/ice-engine)|
|ice-runtime|Partial|[GitHub](https://github.com/francescomaiomascio/ice-runtime)|

### Cognition & IO (Layer 2)

|Repo|Status|Links|
|---|---|---|
|ice-ai|Active|-|
|ice-consciousness|Active|-|
|ice-providers|Minimal|-|
|ice-protocols|Partial/Legacy|-|
|ice-api|Active|-|

### Proof Surfaces (Layer 3)

|Repo|Status|Links|
|---|---|---|
|ice-foundation|Stable|-|
|ice-docs|Legacy|-|
|ice-tests|Refactor pending|-|
|ice-observability|Empty placeholder|-|
|ice-studio|Semi-legacy|-|

### Excluded from Current Analysis

- **ice-cli**: Final phase tooling (not core to stratification)
- **ice-assets**: Support files (not a domain)
- **ice-dev-tools**: Development utilities (not core)
- **ice-themes**: UI theming (not architecture)
- **icestudio-legacy**: Historical artifact (evolutionary context only)
- **site**: Public front-end (proof surface but not prefixed `ice-*`)

---

## Standard Repo Analysis Workflow

For each repository, extract the following:

### 1. Role (Ontology)

**Template:** "[Repo] is the [layer] component responsible for [core capability]"

**Example (ice-strap):**

> ice-strap is the Core Execution bootstrap layer responsible for validating system prerequisites and performing the initial authority handoff to ice-engine.

### 2. Boundary (Anti-Scope)

**Template:** "[Repo] does NOT [X], [Y], or [Z] — those belong to [other layer/repo]"

**Example (ice-strap):**

> ice-strap does NOT coordinate workflows (ice-engine), execute state transitions (ice-runtime), or make decisions (ice-ai). It bootstraps once and exits.

### 3. Inputs/Outputs (Contracts)

**What it receives:**

- Config files, environment variables, preboot checks

**What it emits:**

- Events (bootstrap.started, bootstrap.completed, bootstrap.failed)
- Authority token (passed to ice-engine)
- Log/trace data

### 4. Authority Chain

**Where authority starts:** (e.g., user invocation, daemon startup)  
**Where authority ends:** (e.g., handoff to ice-engine, exit)  
**What it passes:** (e.g., validated context, authority token)

### 5. State Model (if applicable)

- **ice-strap**: No persistent state (stateless bootstrap)
- **ice-runtime**: Full state machine (init → ready → executing → paused → done/error)
- **ice-consciousness**: Memory states (working → episodic → semantic)

### 6. Evidence Hooks (Public Proof)

- **Documentation:** README, FOUNDATION.md, GOVERNANCE.md
- **Code artifacts:** Key modules, entry points
- **Tests:** Test suites, compliance checks
- **Telemetry:** Event types emitted
- **Activity:** PR merged, issues closed, milestones

### 7. MVP Status (Operational Reality)

**Maturity Label:** Stable / Active / Partial / Placeholder / Legacy

**What works:**

- (list concrete features that are implemented and functional)

**What's missing (delta to MVP):**

- (specific gaps: missing handoff logic, incomplete state machine, etc.)

**Blockers:**

- (dependencies or decisions needed before progress)

---

## Content Brief for Site Pages

### Homepage (15-Second Scan)

**Goal:** Visitor understands "what ICE is" and "why it matters" in under 15 seconds.

**Structure:**

1. **Hero (5s):** "ICE: Execution Governance for AI Agents"
    - Subhead: "Auditable. Deterministic. Governable."
2. **Problem (5s):** "Production AI fails without clear authority, memory, or audit trails"
3. **Solution (5s):** "ICE separates execution, cognition, and proof — with contracts at every layer"
4. **Entry Points:**
    - "Explore Architecture" → Stratification page
    - "See Activity" → Live feed
    - "Read Foundation" → ice-foundation

### Project Page Template (Per-Repo or Per-Layer)

**Goal:** Show operational status, not marketing fluff. Visitor can see what's real.

**Structure:**

1. **Overview (1 paragraph)**
    - Role, boundary, promise
2. **Public Proof Surface**
    - Artifacts (docs, diagrams, contracts)
    - Entry points (code modules)
    - Tests/validation status
3. **Activity Feed (Dynamic)**
    - PR merged (last 30 days)
    - Issues closed (highlight-labeled)
    - Milestones (public only)
    - Signal: green (active) / yellow (partial) / red (blocked)
4. **Maturity Badge**
    - Stable / Active / Partial / Placeholder / Legacy
    - What's next (concrete delta, not vague "coming soon")

### Stratification Page (Architecture Overview)

**Goal:** Render the 3-layer model with clear boundaries and authority flow.

**Structure:**

1. **Diagram:** Visual stratification (Layer 1 → Layer 2 → Layer 3)
2. **Layer Cards:**
    - Layer name + tagline
    - Repos in layer (with status badges)
    - Boundary statement ("What it's NOT")
    - Public proof surface (what's visible)
3. **Authority Flow:** Strap → Engine → Runtime (animated or static)
4. **Navigation:** Click layer → drill into repos

### Activity Feed (Cross-Repo)

**Goal:** Show ICE is alive, not a whitepaper project.

**Data Sources (via GitHub API):**

- PR merged (all repos, last 30 days)
- Issues closed (with `highlight` or `public` labels)
- Milestones reached (public only)
- Releases (semver tags)

**Display:**

- Timeline (newest first)
- Filter by layer (Core / Cognition / Proof)
- Filter by repo
- Signal indicator (activity/stale/blocked)

---

## Narrative Strategy (The "Why" Behind ICE)

### Opening Hook (Problem Framing)

> Modern agentic systems fail at production scale because they confuse **LLM capability** with **system architecture**. An agent that can "write code" or "answer questions" is not the same as a **governable execution system** with audit trails, state management, and safe handoffs.

### ICE's Differentiation

> ICE doesn't compete with LangChain or AutoGPT at the "agent framework" level. ICE is the **execution governance layer** underneath — the substrate that makes agentic behavior **auditable, deterministic, and safe** at enterprise scale.

### Target Audience

1. **Engineering leaders** evaluating agentic systems for production (need: governance, audit, safety)
2. **AI engineers** building on top of LLMs (need: contracts, state management, composability)
3. **Open-source contributors** interested in agent architecture (need: clear domains, boundaries, contribution paths)

### Tone & Voice

- **Technical, not marketing:** Use specific terms (state machine, authority chain, event taxonomy), not buzzwords (revolutionary, game-changing)
- **Honest about maturity:** Show real status (partial, blocked, refactor pending), not fake "production-ready"
- **Problem-first:** Lead with failure modes (context loss, implicit authority, no audit trail), then show how ICE solves them
- **Proof over claims:** Link to code, tests, events, not just text

---

## Next Steps (Operational Workflow)

### Phase 1: Core Execution Analysis (In Progress)

- [x] Define stratification framework (this document)
- [ ] Analyze ice-strap (README + tree → role/boundary/proof)
- [ ] Analyze ice-engine (README + tree → role/boundary/proof)
- [ ] Analyze ice-runtime (README + tree → role/boundary/proof)
- [ ] Create Layer 1 project page content

### Phase 2: Cognition & IO Analysis

- [ ] Analyze ice-ai (catalog + decision model)
- [ ] Analyze ice-consciousness (memory + knowledge graph)
- [ ] Analyze ice-providers (adapter matrix)
- [ ] Analyze ice-protocols (security + transport)
- [ ] Analyze ice-api (domain map + IPC taxonomy)
- [ ] Create Layer 2 project page content

### Phase 3: Proof Surfaces Analysis

- [ ] Analyze ice-foundation (axioms + boundaries)
- [ ] Analyze ice-docs (legacy audit + realignment plan)
- [ ] Analyze ice-tests (refactor plan + current coverage)
- [ ] Analyze ice-observability (taxonomy + MVP plan)
- [ ] Analyze ice-studio (UI surfaces + reconnection plan)
- [ ] Create Layer 3 project page content

### Phase 4: Site Implementation

- [ ] Homepage (15s scan version)
- [ ] Stratification page (3-layer visual)
- [ ] Project pages (per-layer or per-repo)
- [ ] Activity feed (GitHub API integration)
- [ ] Navigation (layer-first, not repo-first)

---

## Appendix: Key Terminology

### Authority Chain

The explicit handoff of execution control: strap validates → engine coordinates → runtime executes.

### Boundary

Explicit anti-scope: what a domain does NOT do (prevents scope creep and implicit dependencies).

### Proof Surface

Publicly visible evidence that a promise is kept (tests, docs, events, UI, not just claims).

### State Machine

Deterministic model of execution transitions (e.g., runtime: init → ready → executing → done/error).

### Event Taxonomy

Structured catalog of signals emitted by the system (e.g., bootstrap.started, agent.executed, session.closed).

### Cognition vs Execution

- **Cognition (Layer 2):** Decides "what to do" (planning, memory, reasoning)
- **Execution (Layer 1):** Makes decisions actionable and auditable (state, lifecycle, enforcement)

### Observable vs Auditable

- **Observable:** Can see what's happening in real-time (logs, telemetry)
- **Auditable:** Can reconstruct what happened after the fact (immutable event log, state transitions)

---

## Document Metadata

- **Version:** 1.0
- **Last Updated:** February 2026
- **Maintained By:** ICE Project Team
- **Source:** Stratification Map (Tavola di Mosè)
- **Status:** Living document (update as domains evolve)

---

**End of Reference Document**



