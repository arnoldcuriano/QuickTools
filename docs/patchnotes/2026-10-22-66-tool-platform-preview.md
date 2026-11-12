# QuickTools 0.4.0 - 66-Tool Platform Preview

Preview date: 2026-10-22
Version intent: MINOR

## Summary

QuickTools now publishes 66 utilities through a shared, registry-driven platform. The release expands the browser workbench while keeping tool discovery, documentation, routes, and page structure consistent.

## Added

- Published 66 tools across developer, data, text, image and media, design, math and units, and security categories.
- Added a generated typed registry as the shared source for the catalog, routes, documentation, search, sitemap, and page metadata.
- Added six shared tool templates for text, data conversion, files, calculators, generators, and reference tables.
- Added category navigation, name and keyword search, `Ctrl+K` or `Cmd+K` command search, favorites, and the eight most recently opened tools.
- Added a Docs section containing generated tool documentation and a categorized directory of free public APIs.
- Added an optional sound toggle with short synthesized interface feedback. Sound remains off by default and is disabled when reduced motion is requested.

## Improved

- Updated QuickTools to a token-driven black and white interface with consistent light and dark themes.
- Standardized tool pages on the shared workbench layout, controls, settings panel, and responsive behavior.
- Added the responsive dotted globe to the homepage with theme-aware colors and reduced-motion support.
- Added static metadata, canonical URLs, Open Graph URLs, `sitemap.xml`, and `robots.txt` generation for published routes.

## Privacy And Network Behavior

- Most tools process input locally in the browser.
- Free API Explorer sends only the request configured by the user to the selected third-party public API and identifies that behavior on its page.
- No QuickTools backend, account, or API key is required for the published browser tools.

## Release Status

- This release is available on the `release/66-tools` Vercel preview.
- It has not been merged into `main` or deployed to production.
- Planned backlog entries remain excluded from the catalog, routes, Docs, search, and sitemap.
