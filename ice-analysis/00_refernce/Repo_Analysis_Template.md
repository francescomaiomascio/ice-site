
**Systematic Extraction Workflow**  
Version: 1.0 | Use for: Every repository in ICE ecosystem

---

## Purpose

This template ensures **consistent, proof-based analysis** of every ICE repository. Follow this workflow to extract role, boundary, promise, and proof surface for each domain.

---

## Pre-Analysis Checklist

Before starting analysis, gather:

- [ ] Repository URL
- [ ] README.md content
- [ ] FOUNDATION.md (if present)
- [ ] GOVERNANCE.md (if present)
- [ ] Tree structure (`view` tool or `tree -L 3`)
- [ ] Recent activity (PR/issues/milestones from last 30 days)

---

## Analysis Framework (7 Blocks)

### Block 1: Identity

**Repo Name:** [e.g., ice-strap]  
**GitHub URL:** [full link]  
**Layer:** [Core Execution / Cognition & IO / Proof Surfaces]  
**Status:** [Stable / Active / Partial / Placeholder / Legacy]

---

### Block 2: Role (Ontology in 1 Sentence)

**Template:**

> [Repo] is the [layer] component responsible for [core capability].

**Example (ice-strap):**

> ice-strap is the Core Execution bootstrap layer responsible for validating system prerequisites and performing the initial authority handoff to ice-engine.

**Your Answer:**

> [Fill in based on README + tree analysis]

---

### Block 3: Boundary (Anti-Scope)

**Template:**

> [Repo] does NOT [X], [Y], or [Z] — those belong to [other layer/repo].

**Example (ice-strap):**

> ice-strap does NOT coordinate workflows (ice-engine), execute state transitions (ice-runtime), or make decisions (ice-ai). It bootstraps once and exits.

**Your Answer:**

> [Fill in — be explicit about what this repo should NOT do]

---

### Block 4: Promise (Concrete Capabilities)

List 3-5 specific things this repo enables (not vague marketing):

1. **[Capability 1]:** [e.g., Validates environment variables and config files before handoff]
2. **[Capability 2]:** [e.g., Performs preboot checks (disk space, network, dependencies)]
3. **[Capability 3]:** [e.g., Emits bootstrap events (started, completed, failed)]
4. **[Capability 4]:** [Optional]
5. **[Capability 5]:** [Optional]

**Validation Check:**

- Can you point to code that implements this? (Yes/No)
- Is there a test that validates this? (Yes/No)
- Is this documented anywhere? (Yes/No)

---

### Block 5: Inputs/Outputs (Contract)

#### Inputs (What This Repo Receives)

|Input|Type|Source|Example|
|---|---|---|---|
|Config file|File|User/deployment|`config.yaml`|
|Environment vars|Env|System|`ICE_ENV=production`|
|Previous authority|Token|ice-strap (if not first)|`bootstrap_token`|

#### Outputs (What This Repo Emits)

|Output|Type|Consumer|Example|
|---|---|---|---|
|Events|Event stream|ice-observability|`bootstrap.started`|
|Authority token|Token|ice-engine|`execution_authority`|
|Logs|Structured logs|Logging system|`{level: info, msg: "..."}`|

---

### Block 6: Authority Chain

**Where authority starts:**

- [e.g., User invokes `ice start` → strap receives control]

**What this repo does with authority:**

- [e.g., Validates environment, loads config, performs checks]

**Where authority ends:**

- [e.g., Hands off to ice-engine with validated context + authority token, then exits]

**Authority artifacts (proof):**

- [e.g., `bootstrap/handoff.py` contains handoff logic]
- [e.g., `events/bootstrap.completed` event emitted before handoff]

---

### Block 7: State Model (if applicable)

**Does this repo manage state?** [Yes / No]

**If YES, describe state model:**

|State|Description|Entry Condition|Exit Condition|Next State(s)|
|---|---|---|---|---|
|Init|[Description]|[How entered]|[How exited]|[Where next]|
|Ready|[Description]|[How entered]|[How exited]|[Where next]|
|...|...|...|...|...|

**State diagram location:**

- [e.g., `docs/state_machine.md` or needs to be created]

**If NO:**

- [Explain why: stateless bootstrap, pure function layer, etc.]

---

### Block 8: Evidence Hooks (Public Proof Surface)

#### Documentation

- [ ] README.md exists and is current (Yes/No, Last updated: [date])
- [ ] FOUNDATION.md exists (Yes/No)
- [ ] GOVERNANCE.md exists (Yes/No)
- [ ] Architecture diagrams exist (Yes/No, Location: [path])
- [ ] API/contract docs exist (Yes/No, Location: [path])

#### Code Artifacts

**Key modules/entry points:**

1. [e.g., `src/ice_strap/__main__.py` — entrypoint]
2. [e.g., `src/ice_strap/bootstrap/sequence.py` — handoff logic]
3. [e.g., `src/ice_strap/preboot/checks.py` — validation]

**Tree structure (top 3 levels):**

```
[Paste tree output or summarize key directories]
```

#### Tests

- [ ] Test suite exists (Yes/No, Location: [path])
- [ ] Tests are passing (Yes/No, Last run: [date or CI link])
- [ ] Coverage metrics available (Yes/No, Coverage: [%])
- [ ] Compliance tests exist (Yes/No — tests for invariants/boundaries)

#### Telemetry/Events

**Events emitted by this repo:**

1. [e.g., `bootstrap.started` — emitted when strap begins]
2. [e.g., `bootstrap.preboot_check_passed` — emitted after validation]
3. [e.g., `bootstrap.completed` — emitted before handoff]
4. [e.g., `bootstrap.failed` — emitted on error]

**Event taxonomy location:**

- [e.g., `events/taxonomy.yaml` or needs to be defined]

#### Activity (Recent 30 Days)

**PR Merged:**

- [List PR titles + dates, or "None"]

**Issues Closed:**

- [List issue titles + dates, or "None"]

**Milestones Reached:**

- [List milestone names + dates, or "None"]

**Releases:**

- [List version tags + dates, or "None"]

---

## MVP Status (Operational Reality)

### Maturity Label

[Select one: Stable / Active / Partial / Placeholder / Legacy]

**Justification:**

- [Explain why you chose this label based on code/tests/docs/activity]

---

### What Works (Concrete Features Implemented)

1. [Feature/capability that is implemented and functional]
2. [Feature/capability that is implemented and functional]
3. [Feature/capability that is implemented and functional]

**Evidence:**

- [Link to code, tests, or docs proving this works]

---

### What's Missing (Delta to MVP)

1. [Specific gap: e.g., "Handoff logic incomplete — no authority token passed"]
2. [Specific gap: e.g., "No tests for preboot checks"]
3. [Specific gap: e.g., "Events taxonomy not formalized"]

**Blockers:**

- [List dependencies or decisions needed before progress]

---

### Next Milestone (Concrete)

**Target:** [e.g., "Complete handoff logic + tests"]  
**Delta:** [e.g., "Implement `bootstrap/handoff.py` + write 5 unit tests"]  
**ETA:** [Date or "Blocked on X"]

---

## Dependencies (Incoming/Outgoing)

### This Repo Depends On (Incoming)

|Dependency|Type|Why|Status|
|---|---|---|---|
|[e.g., ice-api]|Contract|[e.g., Event schema]|[Active/Blocked]|
|[e.g., ice-runtime]|Handoff target|[e.g., Receives authority]|[Partial]|

### Other Repos Depend On This (Outgoing)

|Dependent Repo|Why|Status|
|---|---|---|
|[e.g., ice-engine]|[e.g., Receives handoff from strap]|[Active]|

---

## Site Content Output (Ready for Copy-Paste)

### Project Page Snippet (Markdown)

```markdown
## [Repo Name]

**Role:** [1-sentence description]

**Promise:** [List 3-5 capabilities]

**Status:** [Maturity badge]

**Public Proof:**
- [Link to docs]
- [Link to entry points]
- [Link to tests]
- [Link to events taxonomy]

**Activity:**
- [Recent PR/issues/milestones]

**Next:** [Concrete next milestone]
```

---

### Activity Feed Entry (JSON Structure)

```json
{
  "repo": "[repo-name]",
  "layer": "[Core Execution / Cognition & IO / Proof Surfaces]",
  "status": "[Stable/Active/Partial/Placeholder/Legacy]",
  "recent_activity": [
    {"type": "pr_merged", "title": "[PR title]", "date": "[YYYY-MM-DD]"},
    {"type": "issue_closed", "title": "[Issue title]", "date": "[YYYY-MM-DD]"},
    {"type": "milestone", "title": "[Milestone name]", "date": "[YYYY-MM-DD]"}
  ],
  "signal": "[green/yellow/red]"
}
```

---

### Diagram Input (For Stratification Visualization)

**Position in Layer:** [Layer 1/2/3]  
**Visual Grouping:** [e.g., "Core Execution" box]  
**Arrow Connections:** [e.g., "ice-strap → ice-engine"]  
**Status Badge:** [Green/Yellow/Red dot]

---

## Analysis Workflow (Step-by-Step)

1. **Read README** (5 min)
    
    - Extract: role, promise, status
    - Note: what's explicitly stated vs what's missing
2. **Read FOUNDATION.md + GOVERNANCE.md** (10 min)
    
    - Extract: axioms, boundaries, authority semantics
    - Note: any conflicts with README
3. **Inspect Tree Structure** (5 min)
    
    - Identify: key modules, entry points, test directories
    - Map: code structure to promised capabilities
4. **Check Activity** (5 min)
    
    - GitHub: recent PR, issues, milestones
    - Assess: active development vs stale
5. **Fill Template Blocks 1-8** (20 min)
    
    - Be specific, cite code/docs/tests
    - Mark "needs creation" where evidence missing
6. **Generate Site Content** (10 min)
    
    - Copy-paste ready snippets
    - JSON for activity feed

**Total Time:** ~55 minutes per repo

---

## Quality Checklist (Before Marking Complete)

- [ ] Role is 1 clear sentence (no jargon overload)
- [ ] Boundary explicitly states what this repo does NOT do
- [ ] Promise lists concrete capabilities (not vague claims)
- [ ] Each capability has code/test/doc evidence (or marked "missing")
- [ ] Inputs/outputs are specific (not generic "data")
- [ ] Authority chain is explicit (where starts/ends/hands off)
- [ ] State model exists or reason for statelessness given
- [ ] Evidence hooks point to real artifacts (not TBD)
- [ ] MVP status is honest (not aspirational)
- [ ] Site content is copy-paste ready

---

## Example: Completed Analysis (ice-strap)

### Block 1: Identity

**Repo Name:** ice-strap  
**GitHub URL:** https://github.com/francescomaiomascio/ice-strap  
**Layer:** Core Execution  
**Status:** Partial

### Block 2: Role

> ice-strap is the Core Execution bootstrap layer responsible for validating system prerequisites and performing the initial authority handoff to ice-engine.

### Block 3: Boundary

> ice-strap does NOT coordinate workflows (ice-engine), execute state transitions (ice-runtime), or make decisions (ice-ai). It bootstraps once and exits.

### Block 4: Promise

1. **Environment Validation:** Checks disk space, network connectivity, required dependencies
2. **Config Loading:** Parses and validates `config.yaml` before execution
3. **Preboot Checks:** Runs security checks, permission validation
4. **Authority Handoff:** Passes validated context + authority token to ice-engine
5. **Event Emission:** Emits `bootstrap.started`, `bootstrap.completed`, `bootstrap.failed`

**Validation:**

- Code exists: `src/ice_strap/preboot/checks.py`, `bootstrap/sequence.py`
- Tests: Partial (`tests/preboot/` exists, handoff tests missing)
- Docs: Mentioned in README, detailed in STRAP_LAYOUT.md

### Block 5: Inputs/Outputs

**Inputs:**

|Input|Type|Source|Example|
|---|---|---|---|
|config.yaml|File|User/deployment|`{env: prod, ...}`|
|ICE_ENV|Env var|System|`production`|

**Outputs:**

|Output|Type|Consumer|Example|
|---|---|---|---|
|bootstrap.started|Event|ice-observability|`{ts: ..., status: started}`|
|authority_token|Token|ice-engine|`{validated: true, ...}`|

### Block 6: Authority Chain

- **Starts:** User runs `ice start` (CLI invokes strap)
- **Authority:** Validates environment, loads config, runs checks
- **Ends:** Hands off to ice-engine with authority token, exits
- **Proof:** `bootstrap/handoff.py` (incomplete), event emission present

### Block 7: State Model

**Stateless:** ice-strap does not maintain persistent state. It runs validation checks and exits after handoff.

### Block 8: Evidence Hooks

**Documentation:**

- [x] README.md (current)
- [x] FOUNDATION.md (present)
- [x] GOVERNANCE.md (present)
- [x] STRAP_LAYOUT.md (detailed)
- [ ] State diagram (N/A — stateless)

**Code Artifacts:**

1. `src/ice_strap/__main__.py` — entrypoint
2. `src/ice_strap/preboot/checks.py` — validation logic
3. `src/ice_strap/bootstrap/sequence.py` — handoff (incomplete)

**Tests:**

- [x] Test suite exists (`tests/`)
- [ ] Handoff tests missing
- [ ] Coverage metrics not available

**Events:**

1. `bootstrap.started`
2. `bootstrap.completed`
3. `bootstrap.failed`

**Activity (Last 30 Days):**

- None (stale)

### MVP Status

**Maturity:** Partial  
**What Works:** Preboot checks, config loading, event emission  
**What's Missing:** Complete handoff logic, tests for handoff, authority token implementation  
**Next:** Implement `bootstrap/handoff.py` + write handoff tests (ETA: Blocked on ice-engine contract)

---

**End of Template**
