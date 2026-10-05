# Shared Tool Workbench

Last reviewed: 2026-10-05

## Overview

All implemented QuickTools utilities use the shared workbench in `client/src/components/ui/ToolPage.tsx`. The shared layout provides consistent navigation, titles, descriptions, controls, settings placement, and output presentation without changing each tool's browser-local processing logic.

Tool names, descriptions, categories, paths, and template assignments come from `client/src/data/toolCatalog.ts`. The home catalog and routed tool pages use this same registry so their metadata remains synchronized.

## Layout Contract

Every tool page includes:

- A back link and browser-local processing notice.
- A registry-driven title and description.
- A main workspace and an optional 320 px settings panel.
- A stacked settings layout below 900 px.
- Shared controls with consistent focus, disabled, light-theme, and dark-theme behavior.

Tool pages use the shared `Button`, `Field`, `SettingsPanel`, `Dropzone`, `FileList`, `TextInput`, and `OutputBlock` components. Tool-specific pages retain only their workflow state and processing behavior.

## Template Assignments

| Tool | Template |
| --- | --- |
| Base64 Encoder/Decoder | TextTool |
| Text Formatter | TextTool |
| Regex Tester | TextTool |
| WebP Converter | FileTool |
| JSON Converter | DataTool |
| QR Code Generator | DataTool |
| JSON Compare | DataTool |
| CSV / TSV Converter | DataTool |

The templates currently share the same structural wrapper. Their assignments document the intended interaction model and allow each category to evolve consistently.

## Header And Repository Information

The shared header links to `arnoldcuriano/QuickTools` on GitHub. Its star count is requested after initial rendering from GitHub's public repository API and cached in local storage under `qt-stars` for one hour.

If GitHub is unavailable or rate-limits the request, QuickTools uses the last cached value. When no cached value exists, the star count is hidden while the GitHub icon and repository link remain available. Mobile navigation presents the same repository information as a plain menu row.

## Design And Accessibility

- The workbench supports light and dark themes through global design tokens.
- Controls use 1 px borders, 4 px radii, and no gradients or shadows.
- Tool layouts are checked at 360 px, 768 px, and 1280 px.
- Keyboard navigation and serious or critical Axe findings are covered by Playwright tests.

## Runtime Boundaries

Tool input and file processing remain in the browser. The GitHub star count is the only network-backed header information introduced by this milestone; tool content is not sent to GitHub or to a QuickTools backend.

The `/kitchen-sink` route provides an internal visual reference for shared components and templates in both themes.
