# Knowledgebase: AI Engineering Foundation

## What Changed

QuickTools now includes a documentation and workflow foundation for AI-assisted engineering. The repository has structured guidance for Codex, ChatGPT, Claude, Gemini, and human contributors.

The foundation includes:

- Root engineering guidance in `AGENTS.md`, `CONTRIBUTING.md`, and `ENGINEERING.md`.
- AI workspace context in `.codex`.
- Architecture, roadmap, ADR, standards, and API documentation under `docs`.
- GitHub issue templates under `.github/ISSUE_TEMPLATE`.

## Why It Changed

QuickTools is small but already has separate client and server packages, generated build output, duplicated tool-page UI patterns, and a scaffolded backend with no active API. Without explicit documentation, future assistants could incorrectly infer backend behavior, implemented routes, or architectural intent.

The new foundation makes the current state explicit and reduces the risk of inconsistent AI-generated changes.

## Current Behavior

The application remains unchanged at runtime.

Current implemented routes are:

- `/`
- `/tools/base64`
- `/tools/text-formatter`
- `/tools/webp-converter`
- `/tools/json-converter`

Current processing is browser-local. The Express server package exists, but `server/app.js` is empty and no API endpoints are implemented.

## Engineering Rules Now Documented

- Read `AGENTS.md` and `ENGINEERING.md` before making repository changes.
- Do not modify production code unless implementation work is explicitly requested.
- Keep browser-capable tools client-side by default.
- Document backend API contracts before implementing server routes.
- Keep reusable transformations in `client/src/utils`.
- Keep reusable visual components in `client/src/components`.
- Preserve existing React, TypeScript, Tailwind, Headless UI, Heroicons, and Framer Motion patterns.
- Update documentation when behavior, architecture, setup, or workflow changes.

## Constraints

- The documentation reflects the repository as reviewed on 2026-06-30.
- It does not claim authentication, persistence, deployment, database, or backend API behavior.
- It does not mark landing-page listed tools as implemented unless a route exists in `client/src/App.tsx`.
- It does not replace tests or runtime verification for future production code changes.
