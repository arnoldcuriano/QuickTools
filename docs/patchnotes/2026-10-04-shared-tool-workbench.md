# Shared Tool Workbench

Release date: 2026-10-04
Version intent: MINOR

## Improved

- Gave all eight tools a consistent page layout with clearer input, output, actions, and settings areas.
- Added a mobile navigation menu and separate light and dark theme controls.
- Linked the header to the QuickTools GitHub repository and added a non-blocking star count with a one-hour browser cache and graceful fallback when GitHub is unavailable.
- Aligned desktop navigation with the approved compact header: active-page underline, GitHub before theme selection, and a textual `Light / Dark` control.
- Updated responsive layouts and keyboard and accessibility checks for the shared tool pages.

## Developer Notes

- Tool pages now use shared components in `client/src/components/ui/ToolPage.tsx` and metadata from `client/src/data/toolCatalog.ts`.
- `/kitchen-sink` displays component examples in both themes.
- The mobile GitHub link uses the same icon, label, and star information as desktop navigation while retaining a plain menu-row layout.
- Tool processing remains in the browser; no backend API was added.
