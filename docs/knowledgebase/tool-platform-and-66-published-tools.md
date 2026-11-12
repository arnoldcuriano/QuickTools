# Tool Platform And 66 Published Tools

Last reviewed: 2026-10-22

## Overview

QuickTools currently publishes 66 utilities through one registry-driven browser platform. Published tools share routing, catalog discovery, documentation, metadata, tests, and one of six page templates.

Most tools run locally in the browser. Free API Explorer is the exception: it sends user-configured requests directly to the selected third-party public API and does not route them through a QuickTools backend.

## Source Of Truth

`client/src/data/tools-backlog.json` stores tool metadata and publication status. The generation step validates that data and creates `client/src/generated/toolRegistry.ts`, which contains only published entries with status `existing` or `live`.

The published registry drives:

- Catalog categories, counts, search results, favorites, and recent tools.
- Lazy tool routes and route metadata.
- Tool titles, descriptions, paths, category labels, and template assignments.
- Tool sections in Docs.
- Prerendered tool HTML, canonical and Open Graph URLs, and sitemap entries.

Entries that are not published do not appear in the registry, catalog, routes, Docs, command search, or sitemap.

## Tool Module Contract

Each published tool has a module under `client/src/tools/<id>/index.ts`. A module exports its registry metadata, a runner, executable examples, template configuration, and page component.

The examples serve as both documentation examples and unit-test fixtures. Tool-specific libraries and page code load only when their route is opened, keeping tool implementation code out of the homepage path.

## Shared Templates

All published tool pages use `ToolPage` through one of six templates:

- `T`: text input and output.
- `D`: structured data conversion with format options.
- `F`: local file input, file lists, settings, and downloads.
- `C`: calculator fields and live results.
- `G`: configurable generators with preview, copy, or download actions.
- `R`: searchable reference tables.

The templates provide the shared heading, activity disclosure, workspace, controls, responsive layout, and settings panel. Tool modules retain only the behavior and configuration specific to their task.

## Discovery And Personalization

The homepage catalog groups published tools by category and searches names, descriptions, categories, and keywords. Users can also open command search with `Ctrl+K` or `Cmd+K`.

Favorites and the eight most recently opened tools are stored locally in the browser. They do not require an account and are not synchronized to a server.

## Docs And Free APIs

The `/docs` section uses the same tool registry for its tool navigation and documentation entries. Its Free APIs directory is generated from the shared API data file and groups public services by category.

Free API Explorer uses the same API data for its available presets. It reports when requests leave the browser, does not add API keys, and does not fabricate responses when a provider blocks browser access or returns an error.

## Interface Behavior

- The interface uses token-driven black and white light and dark themes.
- The homepage includes a decorative dotted globe that follows the active theme and becomes static when reduced motion is enabled.
- The sound toggle is optional, off by default, persisted locally, and unavailable when reduced motion is requested.
- Tool pages use shared controls, focus treatment, spacing, and responsive layouts at mobile, tablet, and desktop widths.

## Publishing And Validation

The build fails when published IDs collide or a published registry entry has no matching module. Published routes are prerendered with production metadata, while the sitemap includes only `existing` and `live` tools.

Unit tests run each tool's examples. Playwright and Axe cover the shared layouts, responsive widths, keyboard navigation, light and dark themes, and serious accessibility findings across published routes.

## Constraints

- The Express server remains a scaffold and provides no runtime API.
- QuickTools does not provide accounts, cloud storage, or cross-device favorites and recents.
- Third-party API availability, CORS behavior, rate limits, and response formats remain controlled by each provider.
- This documented release is on a Vercel preview branch and is not a production deployment.
