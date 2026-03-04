# Domains Art Grammar v1 (Rive-first)

This document is the source of truth for domain card illustrations.

## 1) Camera and composition

- Camera style: isometric/axono with diamond-like top faces (~45deg feel).
- Primary crop direction: bottom/right.
- Never crop on a strong vertical edge at card boundary.
- Keep text safe-area clear; illustration mass lives in the non-text area.

## 2) Material system

- Max 2–3 materials per asset.
- Single dominant hue per domain, with:
  - base tone
  - shadow tone
  - highlight tone
- No pure black shadows; tint shadows with the domain hue.
- Edge hierarchy:
  - near edges stronger
  - far edges softer

## 3) Motion grammar

- Each card uses:
  - 1 hero object
  - 1 dominant motion
  - 1 secondary detail motion
- Hover narrative sequence: signal -> response -> confirmation.
- Motion is subtle and readable, never spinner-like.
- Idle frame must remain visually complete.

## 4) Interaction contract

- Playback starts only on card `:hover` and `:focus-within`.
- Mouse leave / blur returns to idle.
- `prefers-reduced-motion: reduce` disables playback.
- Only one card should be active at a time.

## 5) Rive technical contract

- Artboard: `Main`
- State machine: `Hover`
- Boolean input: `active`
- `active=false`: idle poster
- `active=true`: play hover loop

## 6) Runtime and fallback

- Runtime is lazy-loaded by viewport visibility.
- If a `.riv` file is missing/invalid, render fallback surface (legacy SVG or placeholder) and log a dev warning.
- Fallback should be static and visually de-emphasized.
