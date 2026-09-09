# QuickTools 0.3.0 - Brand And Catalog Foundation

Release date: 2026-09-09

## Added

- Added a searchable home-page catalog for all eight implemented tools.
- Added Developer, Data, Content, and Media category filters.
- Added persistent light and dark theme selection.
- Added responsive browser checks at mobile, tablet, and desktop widths.

## Improved

- Reworked the home page into a spacious application discovery experience.
- Adopted the QuickTools Open Workbench identity with Inter and JetBrains Mono typography.
- Standardized neutral surfaces, restrained amber accents, focus visibility, and reduced-motion behavior.
- Extended accessibility validation to every route in both light and dark modes.
- Improved the shared header for smaller screens without changing tool workflows.
- Updated CodeQL workflow actions to the current v4 runtime.

## Developer Notes

- Use `client/src/data/toolCatalog.ts` as the source for implemented tool discovery metadata.
- Run `npm.cmd run test:browser` to execute accessibility, route, theme, and responsive browser checks.
- Tool processing remains browser-local; this release does not introduce a backend API.
