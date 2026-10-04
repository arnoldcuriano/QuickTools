# Shared Tool Workbench

Release date: 2026-10-04
Version intent: MINOR

## Improved

- Gave all eight tools a consistent page layout with clearer input, output, actions, and settings areas.
- Added a mobile navigation menu and separate light and dark theme controls.
- Added a GitHub star count in the header, with a cached value when GitHub is unavailable.
- Updated responsive layouts and keyboard and accessibility checks for the shared tool pages.

## Developer Notes

- Tool pages now use shared components in `client/src/components/ui/ToolPage.tsx` and metadata from `client/src/data/toolCatalog.ts`.
- `/kitchen-sink` displays component examples in both themes.
- Tool processing remains in the browser; no backend API was added.
