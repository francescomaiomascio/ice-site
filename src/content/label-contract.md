# Label Contract (Projects Feed)

## Purpose
These labels define what the Project Feed Compiler can export to the public site.
Only items labeled `public` are eligible for export.
If an item has `internal`, it must never be exported.

## Exportable Evidence Labels
- `highlight` — must show as a highlight
- `milestone` — important milestone issue
- `breakthrough` — major result
- `release-note` — changelog-worthy update

## Operational State Labels
- `blocked` — delivery blocked
- `risk` — active risk
- `needs-review` — review required before progression

## Visibility Rules
- `public` — eligible for export
- `internal` — never export

## Notes
- PRs are exported if `public` and contain at least one evidence label.
- For MVP, a limited number of recent `public` PRs may be included even without evidence labels.
- Issues are exported only if `public` + `highlight`/`milestone`/`breakthrough`.
