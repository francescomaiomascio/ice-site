# Rive Domain Assets

This folder hosts `.riv` assets for the domains grid runtime.

## Naming convention

Put files in `public/rive/domains/` using these names:

- `yai_physical.riv`
- `yai_digital.riv`
- `yai_biological.riv`
- `yai_economic.riv`
- `yai_operational.riv`
- `yai_institutional.riv`
- `yai_scientific.riv`

## Rive file contract

Each domain file must include:

- Artboard: `Main`
- State Machine: `Hover`
- Input: boolean `active` (default `false`)

Behavior contract:

- `active = false` -> idle/static frame
- `active = true` -> hover loop playback

## Runtime expectations

- Canvas is mounted lazily when card enters viewport.
- Playback is controlled from the parent card hover/focus state.
- `prefers-reduced-motion: reduce` keeps assets static.

## Palette guidance

Keep each domain mostly mono-hue with strong highlights/shadows inside the asset.
Avoid relying on page CSS for material/lighting; encode that in Rive.
