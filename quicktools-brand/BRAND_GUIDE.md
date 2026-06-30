# Quicktools Brand Guide — "Socket"

This document is the source of truth for Quicktools' visual identity. It is written to be machine-followable: every value below is final, not a suggestion. If you are an AI coding agent implementing this in the app, use the literal values in `tokens/tokens.css` / `tokens/tokens.json` — do not approximate or re-derive colors.

---

## 1. Brand concept

Quicktools is an all-in-one dev/converter/file toolkit that runs entirely client-side in a sandboxed browser. The identity concept is **modularity**: every tool is a self-contained module that snaps into one frame. The logomark is literally a socket with a tail — read as half "Q," half plug/connector.

Tone: practical, technical, unfussy. Not playful, not corporate. Built-by-developers-for-developers but approachable to designers and general users.

---

## 2. Logo

### Files (in `/logo`)
| File | Purpose |
|---|---|
| `mark.svg` | Icon only, uses `currentColor` — for inline UI (navbar, loading states, empty states). Inherits text color automatically in both themes. |
| `lockup-dark.svg` | Icon + wordmark, fixed colors for dark surfaces. |
| `lockup-light.svg` | Icon + wordmark, fixed colors for light surfaces. |
| `icon-512-master.svg` | Square app icon source (dark bg baked in). Use for app-icons/favicons, not in-page UI. |
| `icon-maskable-master.svg` | Same mark with larger safe-zone padding, for Android adaptive icons. |

### Construction
- ViewBox `0 0 64 64`. Outer frame: rounded square, `x10 y10`, `40×40`, `rx14`, stroke width `4`.
- Tail: diagonal line from `(42,42)` to `(54,54)`, same stroke width, round linecap. This is what reads as the "Q."
- Center dot: filled circle, `cx30 cy30 r6`. Always solid, never outlined.
- The three elements (frame, tail, dot) always appear together. Never use the dot or tail alone as a standalone mark.

### Clearspace & minimum size
- Clearspace around the mark = the width of the frame's stroke (4px at native 64px size) × 4, on all sides. Don't let other UI elements, text, or the viewport edge enter this zone.
- Minimum size: 20px for the icon alone (e.g. favicon), 96px wide for the full lockup (icon + wordmark) before the wordmark becomes illegible.

### Do
- Use `mark.svg` with `currentColor` anywhere the mark sits on a surface that switches between themes (it will inherit `--color-text` or `--color-accent` depending on context).
- Use the amber accent version only on dark or neutral surfaces with sufficient contrast (see §3).

### Don't
- Don't recolor the mark to anything outside the accent tokens.
- Don't rotate, skew, or add a drop shadow to the mark.
- Don't place the mark on busy photographic backgrounds.
- Don't recreate the wordmark in a different typeface — it must always be Space Grotesk, weight 600, lowercase.

---

## 3. Color

Full token definitions live in `tokens/tokens.css` (CSS custom properties, theme-switched via `data-theme="dark" | "light"` on `<html>`) and `tokens/tokens.json` (same values, for non-CSS consumers e.g. Tailwind config, design tools, native apps).

**Implementation rule: never hardcode hex values in components.** Always reference the CSS variable (`var(--color-accent)`, etc.) so theme switching works for free.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--color-bg` | `#15171C` | `#F5F6F8` | App background |
| `--color-surface` | `#1E2128` | `#FFFFFF` | Cards, panels, modals |
| `--color-surface-raised` | `#262A33` | `#FFFFFF` | Popovers, dropdowns (add `--shadow-md`) |
| `--color-border` | `#2A2D34` | `#DCDFE3` | Default dividers/borders |
| `--color-text` | `#ECEDEE` | `#16181C` | Primary text |
| `--color-text-muted` | `#9A9DA3` | `#5B5E66` | Secondary text, labels |
| `--color-accent` | `#F2A93B` | `#C97E1E` | Primary actions, active states, links |
| `--color-accent-text` | `#15171C` | `#FFFFFF` | Text/icons placed on top of an accent-filled element |

Note the accent is **darkened in light mode** (`#C97E1E` vs `#F2A93B`) — this isn't a mistake, raw `#F2A93B` fails AA contrast on white. Don't "fix" this back to one shared accent value across themes.

Semantic colors (`--color-success`, `--color-danger`, `--color-warning`, `--color-info`) are defined per-theme in tokens.css — use these for toasts, validation states, and status indicators rather than inventing new colors.

---

## 4. Typography

| Role | Typeface | Weight | Token |
|---|---|---|---|
| Display / headings | Space Grotesk | 600–700 | `var(--font-display)` |
| Body / UI text | Plus Jakarta Sans | 400–500 | `var(--font-body)` |
| Code / data / technical labels | JetBrains Mono | 400–500 | `var(--font-mono)` |

Load via:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Type scale is in `tokens.css` (`--text-xs` through `--text-2xl`). Headings use `--font-display` + `--leading-tight`; body copy uses `--font-body` + `--leading-normal`; code blocks and tool I/O panels use `--font-mono`.

Wordmark is always **lowercase** ("quicktools"), Space Grotesk 600, regardless of how surrounding headings are cased.

---

## 5. Shape & spacing

- Radius scale: `--radius-sm` (8px, inputs/buttons) → `--radius-md` (12px, cards) → `--radius-lg` (16px, modals) → `--radius-pill` (badges/pills). This mirrors the logomark's own corner ratio — don't introduce sharper or fully-square corners elsewhere in the UI, it'll conflict with the mark.
- Spacing is on a 4px base scale (`--space-1` = 4px through `--space-8` = 64px). Use these tokens for padding/margin/gap rather than arbitrary values.
- Shadows (`--shadow-sm/md/lg`) are intentionally subtle — this is a lightweight-feeling product, avoid heavy elevation/glassmorphism.

---

## 6. Motion

Keep it minimal and functional, not decorative. Use `--duration-fast` (120ms) for hover/press states, `--duration-base` (200ms) for panel/modal transitions, easing `--ease-standard`. No bouncy/elastic easing — it doesn't match the "practical toolbox" tone.

---

## 7. App icons

Generated set lives in `/app-icons`, all derived from `icon-512-master.svg`:

`icon-16.png` `icon-32.png` `icon-48.png` `icon-64.png` `icon-96.png` `icon-128.png` `icon-144.png` `icon-152.png` `icon-180.png` `icon-192.png` `icon-256.png` `icon-512.png` `apple-touch-icon.png` `favicon.ico` `maskable-icon-512.png`

Drop into your `public/` or `static/` root and reference in `index.html` / `manifest.json`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/logo/mark.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

```json
{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/maskable-icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

---

## 8. Quick reference for agents

When implementing UI:
1. Import `tokens/tokens.css` globally; set `data-theme` on `<html>` (default `dark`, toggle to `light`).
2. Never hardcode brand colors — always use the CSS variables.
3. Use `Space Grotesk` for headings/wordmark only, `Plus Jakarta Sans` for everything else readable, `JetBrains Mono` for code/data.
4. Corner radii and spacing must come from the scale in §5, not arbitrary pixel values.
5. The mark (`logo/mark.svg`) goes in the navbar/header using `currentColor`, sized no smaller than 20px.
6. Favicon and app icons are pre-rendered in `/app-icons` — don't regenerate from the mark at build time, just reference the static files.
