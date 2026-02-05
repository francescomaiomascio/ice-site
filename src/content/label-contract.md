# ICE — Label Contract
Version: 1.0  
Status: Canonical  
Scope: GitHub → Site → Activity Feed → Repo Pages  

---

## Purpose

This document defines the **authoritative label and status contract** used by ICE
to determine:

- what is **exportable** to the public site
- how repositories, issues, and PRs are **classified**
- how **dynamic activity signals** are computed
- how consistency is enforced across GitHub, analysis docs, and site output

This contract is consumed by:
- humans (analysis & governance)
- the Project Feed Compiler
- the public ICE website (via JSON)

This is a **closed-world contract**:  
labels and values not defined here are **non-semantic** and ignored by the site.

---

## 1. Visibility Labels (Export Gate)

These labels determine **whether an item may ever be exported**.

### Visibility

- `public`  
  Eligible for export and visibility on the ICE site.

- `internal`  
  Must **never** be exported or rendered publicly.

**Rules:**
- `internal` always overrides `public`
- Items without `public` are ignored by the site
- Default visibility is `internal`

---

## 2. Evidence Labels (What Is Worth Showing)

Evidence labels describe **why** something matters.

### Exportable Evidence

- `highlight`  
  Noteworthy progress or meaningful step forward.

- `milestone`  
  Completion of a defined milestone.

- `breakthrough`  
  Major architectural or conceptual result.

- `release-note`  
  Changelog-worthy update.

**Rules:**
- Evidence labels are **additive**
- At least one evidence label is required for guaranteed export
- Evidence labels have no effect without `public`

---

## 3. Operational State Labels (Internal Signals)

These labels indicate **current operational conditions**.

- `blocked`  
  Progress cannot continue due to a dependency or missing decision.

- `risk`  
  Known risk exists (technical, architectural, or scheduling).

- `needs-review`  
  Requires explicit review before progression.

**Rules:**
- These labels may appear on public items
- They affect **visual warnings**, not visibility
- They do not imply export by themselves

---

## 4. Repository Status (Static, Human-Assigned)

Repository status describes **what the repo is**, not its activity.

### Allowed Values

- `stable`  
  Feature-complete, released, governed by maintenance rules.

- `active`  
  Actively developed, core functionality present.

- `partial`  
  Architecture exists, but key behaviors are missing or unvalidated.

- `placeholder`  
  Declared domain with minimal or no implementation.

- `legacy`  
  Historical or deprecated repository.

**Rules:**
- Status is **manually assigned** in analysis docs
- Status changes are **rare and explicit**
- Status is rendered as a badge on the site

---

## 5. Maturity Lifecycle (Conceptual Phase)

Maturity describes **where the repo sits in its lifecycle**.

### Allowed Values

- `experimental`
- `pre-stable`
- `stable`
- `deprecated`

**Rules:**
- Maturity may change independently of status
- Used for expectation-setting, not activity signaling

---

## 6. Activity Signal (Dynamic, Computed)

Activity signal reflects **recent repository movement**.

### Computation (default)

- `green` — activity within last 7 days
- `yellow` — activity within last 30 days
- `red` — no activity in last 30+ days

**Source of truth:**
- GitHub API (PRs, issues, commits, releases)

**Rules:**
- Activity signal is **never manually edited**
- Rendered as a colored dot on the site
- Used only for perception, not governance

---

## 7. Allowed Combinations (Consistency Rules)

Examples of enforced constraints:

- `status=stable` + `activity=red` → allowed (maintenance mode)
- `status=partial` + `activity=green` → expected
- `status=legacy` + `activity=green` → allowed but flagged
- `maturity=deprecated` + `activity=green` → allowed

Invalid combinations must be **flagged**, not hidden.

---

## 8. Export Rules (Feed Compiler)

### Pull Requests

Exported if:
- labeled `public`
- AND contains at least one evidence label

Exception (MVP only):
- A small number of recent `public` PRs may be exported without evidence labels

### Issues

Exported only if:
- labeled `public`
- AND labeled `highlight`, `milestone`, or `breakthrough`

### Repositories

Always exported if:
- present in stratification inventory
- have an analysis document
- status ≠ `placeholder` (unless explicitly allowed)

---

## 9. Naming & Format Rules

- All labels are lowercase
- Kebab-case only
- Enum values are closed (no custom variants)
- JSON output must match this contract exactly

---

## 10. Source of Truth Hierarchy

1. Label Contract (this document)
2. Repo Analysis Markdown
3. GitHub labels & metadata
4. Site JSON output

Conflicts must be resolved **upwards**, never downstream.

---

## Final Note

This contract is intentionally strict.

Consistency > completeness.  
Automation > manual correction.  
Proof > narrative.
