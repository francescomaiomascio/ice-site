# ICE — Label Contract
Version: 1.1  
Status: Canonical  
Scope: GitHub → Analysis Docs → JSON → ICE Website  

---

## Purpose

This document defines the **authoritative labeling and status contract** for the ICE ecosystem.

It governs:

- what is **exportable** to the public ICE website
- how repositories, issues, and pull requests are **classified**
- how **dynamic activity signals** are computed
- how **consistency** is enforced across GitHub, analysis documents, and site output

This contract is consumed by:

- humans (governance, analysis, review)
- the Project Feed Compiler
- the ICE website (via generated JSON)

This is a **closed-world contract**:  
labels, statuses, or values not defined here are **non-semantic** and ignored by the site.

---

## 1. Visibility Labels (Export Gate)

Visibility labels define **whether an item may ever appear publicly**.

### Allowed Values

- `public`  
  Eligible for export and rendering on the ICE site.

- `internal`  
  Must **never** be exported or rendered publicly.

### Rules

- `internal` always overrides `public`
- Items without `public` are ignored by the site
- Default visibility is `internal`
- Visibility labels do **not** imply importance or activity

---

## 2. Evidence Labels (Why This Matters)

Evidence labels explain **why** an item is worth showing publicly.

### Allowed Values

- `highlight`  
  Meaningful progress or noteworthy step forward.

- `milestone`  
  Completion of a defined milestone or phase.

- `breakthrough`  
  Major architectural, conceptual, or systemic result.

- `release-note`  
  Changelog-worthy update.

### Rules

- Evidence labels are **additive**
- Evidence labels have **no effect without `public`**
- At least one evidence label is required for **guaranteed export**
- Evidence labels describe *significance*, not status

---

## 3. Operational State Labels (Warnings & Signals)

Operational labels describe **current blocking or risk conditions**.

### Allowed Values

- `blocked`  
  Progress cannot continue due to a dependency or missing decision.

- `risk`  
  Known technical, architectural, or scheduling risk exists.

- `needs-review`  
  Explicit review is required before progression.

### Rules

- These labels may appear on public items
- They affect **visual warnings**, not visibility
- They never imply export by themselves
- They are allowed on issues and PRs only

---

## 4. Repository Status (Static, Human-Assigned)

Repository status describes **what the repository is**, structurally.

Status is **not activity** and **not maturity**.

### Allowed Values

- `stable`  
  Feature-complete, released, governed by maintenance rules.

- `active`  
  Core functionality present and actively developed.

- `partial`  
  Architecture exists, but key behaviors or contracts are missing or unvalidated.

- `placeholder`  
  Declared domain with minimal or no implementation.

- `legacy`  
  Historical, frozen, or deprecated repository.

### Rules

- Status is **manually assigned** in analysis documents
- Status changes are **rare and explicit**
- Status is rendered as a **badge** on the site
- Status must never be inferred from activity

---

## 5. Maturity Lifecycle (Conceptual Phase)

Maturity describes **where the repository sits in its lifecycle**.

It is orthogonal to status.

### Allowed Values

- `experimental`
- `pre-stable`
- `stable`
- `deprecated`

### Rules

- Maturity may change independently of status
- Used for expectation-setting, not governance
- Displayed as contextual metadata (not a badge)

---

## 6. Activity Signal (Dynamic, Computed)

Activity signal reflects **recent observable movement**.

### Computation (Default)

- `green` — activity within last **7 days**
- `yellow` — activity within last **30 days**
- `red` — no activity in last **30+ days**

### Source of Truth

- GitHub API:
  - commits
  - merged PRs
  - issue activity
  - releases

### Rules

- Activity signal is **never manually edited**
- Rendered as a colored dot on the site
- Used for perception, not governance
- Activity does **not** affect export eligibility

---

## 7. Allowed Combinations (Consistency Rules)

The system must tolerate real-world combinations.

### Valid Examples

- `status=stable` + `activity=red`  
  → Allowed (maintenance mode)

- `status=partial` + `activity=green`  
  → Expected (active development)

- `status=legacy` + `activity=green`  
  → Allowed, but flagged

- `maturity=deprecated` + `activity=green`  
  → Allowed (cleanup or migration work)

### Rule

Invalid or surprising combinations must be **flagged**, not hidden.

---

## 8. Export Rules (Project Feed Compiler)

### Pull Requests

Exported if:

- labeled `public`
- AND contains **at least one evidence label**

**MVP Exception:**

- A limited number of recent `public` PRs may be exported without evidence labels
- This exception must be removed post-MVP

---

### Issues

Exported only if:

- labeled `public`
- AND labeled `highlight`, `milestone`, or `breakthrough`

---

### Repositories

Exported if:

- present in the stratification inventory
- have a completed analysis document
- status ≠ `placeholder`  
  (unless explicitly whitelisted)

---

## 9. Naming & Format Rules

- All labels are lowercase
- Kebab-case only
- Enum values are closed (no custom variants)
- JSON output must match this contract exactly

---

## 10. Source of Truth Hierarchy

Conflicts are resolved **upwards**, never downstream.

1. Label Contract (this document)
2. Repository Analysis Markdown
3. GitHub labels & metadata
4. Generated site JSON
5. Website rendering

---

## Final Principle

This contract is intentionally strict.

Consistency > completeness  
Automation > manual correction  
Proof > narrative  

---

**End of ICE Label Contract v1.1**
