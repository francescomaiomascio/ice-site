# Rive Domain Assets Contract

This folder hosts `.riv` assets used by the domains cards runtime.

## Path and naming

Put files in `public/rive/domains/` with slug-based names:

- `physical-actuators.riv`
- `digital-egress.riv`
- `biological-custody.riv`
- `economic-transactions.riv`
- `operational-response.riv`
- `institutional-authority.riv`
- `scientific-reproducibility.riv`
- `cognitive-publishing.riv`
- `environmental-telemetry.riv`

## Required file contract

Every domain `.riv` file must contain:

- Artboard and state machine names as defined in `src/config/rive.domains.ts`.
- Input boolean:
  - default convention: `active`
  - physical gold contract: `hover` (state machine `DomainHover`, artboard `PhysicalActuators`)

Runtime behavior:

- `active = false` -> idle/poster state (must be presentation-ready)
- `active = true` -> hover loop

## Canvas and quality

- Runtime uses canvas with device-pixel-ratio support (retina-safe).
- Keep art optimized for 300 CSS px cards while looking crisp at higher DPR.

## Motion constraints

- No autoplay at page load.
- Motion starts only on card hover/focus.
- With `prefers-reduced-motion: reduce`, cards stay static.

## Palette and material

- Use 1 dominant hue per domain + 2 tonal steps + 1 highlight.
- Avoid pure black shadows; tint shadows with domain hue.
- Keep geometry and edge hierarchy inside the asset, not in page CSS.
