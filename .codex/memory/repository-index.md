# Repository Memory Index

Last reviewed: 2026-09-09

This index gives future AI sessions a fast map of what exists, what is authoritative, and what must not be inferred.

## Canonical Documents

- `AGENTS.md`: first-read operating rules for AI assistants.
- `docs/architecture/project-ssot.md`: canonical project truth.
- `docs/architecture/engineering-map.md`: onboarding map for docs, agents, workflows, skills, checklists, templates, GitHub standards, and CI.
- `docs/architecture/repository-review.md`: senior review findings and prioritized roadmap.
- `ENGINEERING.md`: engineering principles and repository rules.
- `CONTRIBUTING.md`: contribution process.

## Current Application Facts

- Product: QuickTools.
- Current app: React 18, Vite 8, TypeScript 5.9, React Router 7, Tailwind CSS 3.
- Current processing model: client-first.
- Current server: scaffolded package only; `server/app.js` is empty.
- Current production deployment: Vercel, configured by root `vercel.json` and connected to `main`.
- Current CI: GitHub Actions runs lint, type checks, Vitest, Vite builds, Playwright/Axe, Lighthouse, dependency audits, and CodeQL.

## Implemented Routes

- `/`
- `/tools/base64`
- `/tools/text-formatter`
- `/tools/webp-converter`
- `/tools/json-converter`
- `/tools/qr-code-generator`
- `/tools/json-compare`
- `/tools/csv-tsv-converter`
- `/tools/regex-tester`

## Main Source Files

- `client/src/App.tsx`: route registry.
- `client/src/pages/Home.tsx`: landing page and tool discovery.
- `client/src/pages/tools/Base64Tool.tsx`: Base64 workflow.
- `client/src/pages/tools/TextFormatter.tsx`: JSON/XML/HTML/plain text formatter.
- `client/src/pages/tools/WebPConverter.tsx`: JPG/PNG to WebP conversion.
- `client/src/pages/tools/JSONConverter.tsx`: JSON beautify/minify workflow.
- `client/src/components/ui/ImagePreviewCard.tsx`: WebP preview card.
- `client/src/utils/jsonConverter.ts`: JSON conversion utility.
- `client/src/utils/formatFileSize.ts`: file size utility.

## AI Workspace

- `.codex/agents`: role definitions.
- `.codex/workflows`: task execution processes.
- `.codex/skills`: reusable technical guidance.
- `.codex/checklists`: pre-handoff quality gates.
- `.codex/templates`: immediately usable artifact templates.
- `.codex/commands`: command-style prompt contracts.
- `.codex/memory`: stable repository memory.

## Known Risks

- The production bundle currently triggers Vite's 500 kB chunk warning and needs route-level code splitting.
- `client/build` remains committed but is treated as generated output.
- The server is only a dependency scaffold and has no runtime behavior.

## Do Not Infer

- Do not infer a backend API.
- Do not infer authentication, database, backend runtime, SSR, or route-level SEO.
- Do not treat planned tools as implemented.
- Do not treat slash-command files as executable commands.
