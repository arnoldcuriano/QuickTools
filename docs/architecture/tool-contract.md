# Tool Contract

Last reviewed: 2026-07-06

This document defines the required behavior for every QuickTools browser utility.

## Product Boundary

Tools should run in the browser by default. Do not add backend processing unless a documented technical need exists.

## Required User Flow

Every tool page should provide:

- Clear page title and short purpose statement.
- Input area or file selector.
- Primary action.
- Output or result area.
- Clear/reset behavior when applicable.
- Copy or download behavior when useful.
- Visible validation and error state.

## Validation Rules

- Empty input should produce a predictable empty state or helpful validation message.
- Invalid input should not crash the page.
- File tools must validate type, count, and size constraints before processing.
- Errors must be visible text, not console-only diagnostics.

## Implementation Rules

- Keep page workflow state explicit: input, output, error, processing, copied, and selected mode.
- Move reusable transformation logic into `client/src/utils`.
- Move shared types into `client/src/types` when used across components.
- Keep reusable UI under `client/src/components/ui`.
- Avoid dependencies for small transformations when browser APIs or existing dependencies are sufficient.

## UI Consistency Rules

- Preserve the current dark QuickTools visual language.
- Reuse existing header, panel, button, and error patterns.
- Use Headless UI and Heroicons before creating new primitives.
- Keep keyboard and screen-reader basics intact.

## Testing Expectations

Prefer focused tests for:

- Valid input.
- Invalid input.
- Empty input.
- Copy/download behavior when practical.
- Route rendering for implemented pages.
