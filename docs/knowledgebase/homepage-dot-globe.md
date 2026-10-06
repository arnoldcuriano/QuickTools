# Homepage Dot Globe

Last reviewed: 2026-10-06

## Overview

The QuickTools homepage hero includes a decorative dotted globe beside the product summary on desktop. Below 860 px, the hero becomes a single column and places the globe under the text with a maximum width of 340 px.

The globe is rendered on a canvas by the dependency-free `client/public/dot-globe.js` asset. `client/src/pages/Home.tsx` initializes the globe when the homepage mounts and destroys its observers and animation frame when the page unmounts. Other routes do not initialize it.

## Theme Behavior

The globe reads the global `--text` token for land and `--border` for the ocean grid. It observes changes to the root `data-theme` attribute, so switching between light and dark redraws the existing canvas without reloading the page.

No separate globe colors, shadows, or gradients are defined. Its appearance remains governed by the existing design tokens.

## Motion And Accessibility

The canvas is decorative and uses `aria-hidden="true"`. It does not add a keyboard stop or alter the page's heading structure.

When `prefers-reduced-motion: reduce` is active, the globe renders but does not rotate. Animation also pauses while the page is hidden or the globe is outside the viewport.

## Validation

Playwright verifies:

- Homepage layout without horizontal overflow at 360 px, 768 px, and 1280 px in both themes.
- Nonblank canvas output and animation under normal motion settings.
- Immediate redraw after theme selection changes.
- Static rendering when reduced motion is enabled.
- Existing keyboard navigation and all-route accessibility behavior.

Tool processing logic and routes are outside this feature and remain unchanged.
