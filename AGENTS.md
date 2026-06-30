# QuickTools AI Agent Guide

This repository is an AI-first engineering workspace for QuickTools, a browser-based toolbox for developers and writers. AI assistants must treat this file as the first source of truth before changing the repo.

## Current Repository State

- Product: QuickTools, a productivity toolbox with client-side utilities for Base64, JSON, text formatting, and WebP conversion.
- Client: Create React App, React 18, TypeScript 4.9, React Router 6, Tailwind CSS 3, Headless UI, Heroicons, Framer Motion.
- Server: Node.js/Express dependency scaffold with folders for controllers, middleware, models, routes, and utils. `server/app.js` is currently empty.
- Build artifact: `client/build` is present in the repository.
- Tests: Jest/React Testing Library through `react-scripts test`; current test coverage is minimal.

## Agent Operating Rules

- Do not modify production code unless the user explicitly asks for implementation work.
- Read the relevant source before proposing or making changes.
- Prefer minimal, localized edits that match existing patterns.
- Preserve user changes in the working tree. Do not reset, checkout, or delete unrelated files.
- Keep generated documentation factual. Do not invent APIs, routes, database schemas, deployments, or features that do not exist in the repo.
- When documenting future work, label it as planned or recommended, not current behavior.
- Run verification appropriate to the change. Documentation-only changes usually require link/path review and `git status`; code changes require tests or a stated reason tests were not run.

## Architecture Boundaries

- `client/src/pages` owns routed page experiences.
- `client/src/pages/tools` owns individual tool screens.
- `client/src/components` owns reusable UI components.
- `client/src/utils` owns reusable pure utility logic.
- `server` is reserved for backend work but is not currently wired.
- `docs` owns human-readable engineering documentation.
- `.codex` owns AI-assistant context, prompts, workflows, and reusable checklists.

## Coding Conventions

- Use TypeScript for React client code.
- Use functional React components and hooks.
- Keep browser-only tool processing in the client unless there is a clear backend need.
- Keep pure transformations in `client/src/utils`.
- Keep reusable visual pieces in `client/src/components/ui`.
- Use PascalCase for React components and page files.
- Use camelCase for functions, variables, hooks, and utility files.
- Use route paths in lowercase kebab-case, such as `/tools/text-formatter`.
- Keep Tailwind utility styling consistent with the current dark cyan/blue QuickTools visual language unless a redesign is explicitly requested.

## UI Rules

- Reuse existing component patterns before introducing new ones.
- Current UI uses Headless UI primitives, Heroicons, Framer Motion, and Tailwind utility classes.
- Keep tool pages consistent: header, back navigation, clear action, info panel, input/output workspace, error feedback.
- Avoid adding new UI libraries.
- Validate file inputs and user text before processing.
- Show user-facing errors for invalid input.
- Preserve accessibility attributes for icon-only controls and file inputs.

## Definition of Done

- The change solves the requested problem without unrelated rewrites.
- Existing user-facing behavior is preserved unless intentionally changed.
- New or changed logic has focused tests when practical.
- UI changes are checked for responsive layout, readable text, error states, and keyboard-accessible controls.
- Documentation is updated when behavior, architecture, setup, or workflows change.
- No generated placeholders, fake APIs, or undocumented assumptions remain.

## Documentation Requirement

For meaningful user-facing, architectural, workflow, validation, or bug-fix changes, ask:

`Do you want to generate a patchnote entry and update the knowledgebase for this change?`

Only generate patchnotes or knowledgebase content after the user confirms.
