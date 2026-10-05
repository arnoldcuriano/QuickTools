# QuickTools Project SSOT

Last reviewed: 2026-10-05

This document is the canonical source of truth for QuickTools. It describes the repository as it exists today and separates current behavior from future plans.

## Project Vision

QuickTools is a browser-accessible productivity toolbox for developers and writers. The project prioritizes fast, understandable utilities that help users transform text, data, and images without complex setup.

Approved product direction expands the intended audience to developers, technical writers, students, general users, marketing teams, and creative teams while preserving a professional workbench structure. Planned categories must not be documented as implemented until corresponding routes and behavior exist.

## Mission

Provide simple, reliable, client-first tools that solve common formatting, conversion, and content-preparation tasks directly in the browser whenever practical.

QuickTools is an open-source project under the MIT License. Browser-local processing remains the default when practical; future API-backed tools must disclose their provider, data flow, terms, limits, and privacy implications.

## Current Architecture

QuickTools is currently a React single-page application with a scaffolded Node/Express backend package.

Current runtime behavior is client-first:

1. Users open a routed React page.
2. Users enter text or select local files.
3. Tool logic runs in the browser using React state, browser APIs, and client dependencies.
4. Results are rendered, copied to clipboard, downloaded directly, or packaged as a ZIP.

There is no implemented backend API at this time.

## Folder Structure

```text
.
|-- .codex/
|   |-- agents/
|   |-- checklists/
|   |-- commands/
|   |-- memory/
|   |-- prompts/
|   |-- skills/
|   |-- templates/
|   `-- workflows/
|-- .github/
|   |-- workflows/
|   `-- ISSUE_TEMPLATE/
|-- client/
|   |-- build/
|   |-- public/
|   |-- tests/
|   |-- src/
|   |   |-- components/
|   |   |   `-- ui/
|   |   |-- pages/
|   |   |   `-- tools/
|   |   |-- utils/
|   |   |-- App.tsx
|   |   |-- index.css
|   |   `-- index.tsx
|   |-- index.html
|   |-- package.json
|   |-- playwright.config.ts
|   |-- tailwind.config.js
|   |-- tsconfig.json
|   `-- vite.config.ts
|-- docs/
|   |-- adr/
|   |-- api/
|   |-- architecture/
|   |-- knowledgebase/
|   |-- patchnotes/
|   |-- roadmap/
|   `-- standards/
|-- server/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- app.js
|   `-- package.json
|-- AGENTS.md
|-- CONTRIBUTING.md
|-- ENGINEERING.md
|-- LICENSE
`-- README.md
```

Folder ownership:

- `.codex`: AI assistant guidance, agents, workflows, skills, prompts, command contracts, checklists, templates, and memory.
- `.github`: GitHub issue templates, pull request template, discussions guidance, labels documentation, and GitHub Actions workflows.
- `client`: Implemented React application.
- `docs`: Canonical engineering documentation.
- `server`: Reserved backend package; currently scaffolded only.

## Agent Governance

QuickTools uses a governed AI engineering model rather than ad hoc chat-driven edits.

Canonical governance references:

- `docs/architecture/agent-operating-model.md`: agent levels, routing, escalation, and review gates.
- `.codex/agents/lead-engineer.md`: task classification and readiness owner.
- `.codex/workflows/agent-governed-change.md`: default workflow for non-trivial changes.
- `.codex/skills/agent-governance.md`: reusable routing and escalation guidance.

Non-trivial work should be classified before editing, routed through the correct workflow, verified according to risk, and handed off with remaining risk and documentation status.

## Technology Stack

### Client

- React 18.
- Vite 8.
- TypeScript 5.9.
- React Router 7.
- Tailwind CSS 3.
- Headless UI.
- Heroicons.
- Framer Motion.
- Vitest and React Testing Library.
- Playwright and Axe for route-level accessibility checks.

Client tool dependencies:

- Prettier standalone for formatting.
- `js-beautify` for HTML formatting.
- `@xmldom/xmldom` for XML parsing/serialization.
- JSZip for ZIP creation.
- file-saver for browser downloads.

### Server

The server package includes dependencies for Express, helmet, cors, compression, morgan, multer, sharp, jimp, dotenv, TypeScript tooling, and nodemon.

Current state: `server/app.js` is empty. No server runtime behavior exists.

## Application Routes

Routes are defined in `client/src/App.tsx`.

Implemented routes:

- `/`: landing page.
- `/tools/base64`: Base64 encoder/decoder.
- `/tools/text-formatter`: JSON, XML, HTML, and plain text formatter.
- `/tools/webp-converter`: JPG/PNG to WebP converter.
- `/tools/json-converter`: JSON beautifier/minifier.
- `/tools/qr-code-generator`: QR code generator with browser-only premium styling.
- `/tools/json-compare`: nested JSON compare and diff view.
- `/tools/csv-tsv-converter`: CSV and TSV converter with quoted-field handling.
- `/tools/regex-tester`: regex tester and match highlighter.
- `/kitchen-sink`: shared component examples in light and dark themes.

Do not document landing-page-listed tools as implemented unless they have a route and page implementation.

## Component Architecture

The current client architecture uses route-level page components with local state.

Current component boundaries:

- `client/src/App.tsx`: routing.
- `client/src/pages/Home.tsx`: landing page and tool discovery.
- `client/src/data/toolCatalog.ts`: canonical implemented-tool metadata used by catalog discovery.
- `client/src/pages/tools/*.tsx`: individual tool screens and workflow state.
- `client/src/components/ui/AppHeader.tsx`: shared responsive header shell.
- `client/src/components/ui/ThemeToggle.tsx`: persistent light/dark theme control.
- `client/src/components/ui/GitHubRepoStar.tsx`: GitHub repository link and cached star count.
- `client/src/components/ui/ToolPage.tsx`: shared tool layout and form, output, file, and action components.
- `client/src/pages/KitchenSink.tsx`: shared component examples.
- `client/src/utils/jsonConverter.ts`: JSON conversion utility.
- `client/src/utils/formatFileSize.ts`: file-size display utility.
- `client/src/utils/qrCode.ts`: QR code generation helpers.
- `client/src/utils/jsonCompare.ts`: JSON comparison helpers.
- `client/src/utils/delimitedText.ts`: CSV/TSV parsing and serialization helpers.
- `client/src/utils/regexTools.ts`: regex analysis and highlighting helpers.

Current pattern:

- Tool pages own `input`, `output`, `error`, and interaction state.
- Tool routes are lazy-loaded so specialized dependencies do not inflate the initial home-page bundle.
- Tool pages use shared native controls and Heroicons; the theme control uses Headless UI buttons.
- Reusable pure logic belongs in `client/src/utils`.
- Reusable visual pieces belong in `client/src/components`.

Future plan:

- Move more transformation logic out of page components when it becomes shared or needs focused testing.

## Coding Conventions

- Use TypeScript for client source.
- Use functional React components and hooks.
- Keep page-level workflow state explicit.
- Use structured utility return values for validation-heavy transformations.
- Keep expected invalid user input as user-facing errors, not uncaught exceptions.
- Avoid adding dependencies for small transformations that can be handled safely with existing browser APIs or installed libraries.

## Coding Standards

- Keep changes small and localized.
- Read related files before editing.
- Do not modify generated build output unless the task explicitly includes refreshing build artifacts.
- Do not modify production code for documentation-only tasks.
- Prefer existing patterns over new abstractions.
- Add comments only when they clarify non-obvious logic.
- Do not introduce new UI libraries without an accepted ADR.

## Design Philosophy

QuickTools currently uses a professional workbench design language:

- Equal light and dark themes with persistent user selection.
- Neutral graphite and cool-gray surfaces with restrained amber accents.
- Inter for interface text and JetBrains Mono for structured technical content.
- A searchable, category-filtered home catalog generated from centralized route metadata.
- Restrained 4 px radii and spacious responsive layouts.
- Heroicons for action icons.
- Framer Motion only where an existing tool benefits from restrained interaction feedback.

Design goals:

- Keep tools clear and task-focused.
- Make input, output, status, and errors easy to scan.
- Keep visual effects secondary to utility.
- Preserve consistency across tool pages.

Shared tool layout and controls are implemented in `client/src/components/ui/ToolPage.tsx`.

## Naming Rules

- React component files: PascalCase, for example `ImagePreviewCard.tsx`.
- Page files: PascalCase.
- Tool route paths: lowercase kebab-case, for example `/tools/text-formatter`.
- Utility files: camelCase, for example `formatFileSize.ts`.
- Variables and functions: camelCase.
- Types and interfaces: PascalCase.
- Documentation files: lowercase kebab-case.
- ADR files: numeric prefix plus kebab-case title, for example `0001-client-first-tool-processing.md`.

## Error Handling

Current approach:

- Empty input clears output or returns a validation message depending on utility behavior.
- Invalid JSON, XML, Base64, image, and formatting inputs should produce visible user-facing messages.
- Tool pages store error state locally.
- Console errors may be used for diagnostics but must not be the only error feedback.

Rules:

- Keep errors specific enough for users to act.
- Avoid crashing the page for expected invalid input.
- Keep file validation errors near upload or result areas.
- Clear stale errors when input, mode, or selected format changes.

## Logging

Current state:

- Client code uses limited `console.error` calls for failed clipboard and formatting operations.
- No centralized client logging exists.
- Server dependencies include morgan, but no server app is implemented.

Rules:

- Do not log user-provided sensitive content.
- Do not add noisy logs for normal tool usage.
- Use console logging only for developer diagnostics unless a logging strategy is introduced.

Future plan:

- If a backend is implemented, define request logging, error logging, retention, and redaction rules before production use.

## Testing Strategy

Current state:

- Client uses Vitest and React Testing Library for unit and render tests.
- Playwright and Axe check every implemented route in light and dark modes for serious or critical accessibility violations.
- Playwright checks home-page usability at mobile, tablet, and desktop widths and tool layout at 360 px, 768 px, and 1280 px.
- Current unit coverage focuses on the app shell, JSON comparison, CSV/TSV conversion, regex behavior, and QR generation.
- No server tests exist.

Rules:

- Add focused tests for changed transformation logic when practical.
- Prefer utility tests for pure conversion and formatting behavior.
- Use React Testing Library for routed page behavior and user interactions.
- Cover valid input, empty input, and invalid input for tool logic.

Recommended future tests:

- Base64 encode/decode valid and invalid strings.
- JSON beautify/minify success and parse failures.
- Text formatter behavior by format.
- WebP file validation and batch limit behavior.
- Route rendering for implemented tools.

## Deployment Strategy

Current state:

- The client can be built with `npm run build` from `client`.
- `client/build` exists in the repository.
- GitHub Actions workflows exist for lint, type check, build, unit tests, Playwright smoke checks, Lighthouse, dependency audit, security scanning, and preview build artifacts.
- Vercel is the documented client deployment target through the root `vercel.json` build and SPA rewrite config.
- The server package has no runnable application entrypoint.
- `docs/architecture/deployment-ssot.md` is the deployment source of truth.

Rules:

- Do not claim a deployment platform exists until it is documented and configured.
- Treat `client/build` as generated output.
- Run `npm run build` before production client release work.
- Do not deploy automatically to production from CI.
- Keep the client as a browser SPA and preserve route refresh behavior through Vercel rewrites.

Future plan:

- Decide whether `client/build` should remain committed.
- Keep hosting and rollback steps aligned with the active Vercel deployment.

## Roadmap

Current implemented product:

- Landing page.
- Base64 encoder/decoder.
- Text formatter.
- WebP converter.
- JSON converter.
- QR code generator.
- JSON compare.
- CSV / TSV converter.
- Regex tester.

Near-term future plans:

- Expand the browser-only developer tool suite with additional focused utilities as demand emerges.
- Fix visible text encoding artifacts in UI copy.
- Add focused tests for existing tool behavior.
- Decide whether generated build output should remain versioned.

Backend future plans:

- Define the first backend use case before writing server code.
- Document API contracts in `docs/api`.
- Add an ADR for server-backed processing if the default client-first model changes.
- Add runnable server scripts when server behavior is implemented.

## Definition of Done

A change is done when:

- It solves the requested scope without unrelated rewrites.
- Existing behavior is preserved unless intentionally changed.
- Errors and edge cases relevant to the change are handled.
- Tests were run or skipped with a clear reason.
- Verification follows `docs/quality/verification-matrix.md`.
- Documentation is updated for behavior, architecture, setup, or workflow changes.
- UI changes remain responsive and consistent with the current design language.
- No placeholders, fake APIs, or invented features are added.
- `git status --short` has been reviewed before handoff.

## Security Standards

Current state:

- Most implemented processing is browser-local.
- No authentication, authorization, persistence, or server API exists.
- No secrets should be required for current client-only tools.

Rules:

- Do not commit secrets or environment-specific credentials.
- Do not log user-provided sensitive content.
- Validate file types before processing uploads.
- Keep upload limits explicit.
- Avoid unnecessary network transfer of user files or text.
- If server upload routes are added, document limits, cleanup, retention, validation, and error responses before implementation is considered complete.

## Performance Standards

Current standards:

- Keep browser tools responsive for typical text and image inputs.
- Avoid unnecessary repeated parsing or conversion.
- Keep batch limits explicit.
- Use browser APIs carefully for memory-heavy file operations.

Current explicit limit:

- WebP converter processes up to 20 selected JPG/PNG images.

Future plan:

- Consider Web Workers for heavy client-side processing before moving browser-suitable work to the server.
- Add performance testing for large text inputs and image batches if usage grows.

## Accessibility Standards

Current approach:

- Headless UI is used for accessible primitives.
- Some controls include `aria-label` or `title` attributes.
- Tool pages use visible labels, headings, and status messages.

Rules:

- Preserve keyboard access for controls.
- Add accessible labels for icon-only buttons and hidden file inputs.
- Keep error messages visible and text-based.
- Do not rely on color alone for critical feedback.
- Keep contrast readable on dark backgrounds.
- Avoid motion that interferes with readability or operation.

Current automation:

- GitHub Actions runs Playwright and Axe across every implemented route in both themes, plus responsive home checks.
- Serious and critical Axe findings block the accessibility job.

## SEO Standards

Current state:

- Vite builds a single-page application from `client/index.html`.
- No route-specific metadata system is implemented.
- Public assets include manifest, favicon, icons, and robots file.
- The landing page communicates the product name and tagline.

Rules:

- Do not claim route-level SEO behavior exists.
- Keep product copy accurate to implemented tools.
- Keep static metadata aligned with the current product name and description.

Future plan:

- If SEO becomes a priority, define metadata strategy for SPA routes or evaluate server-side rendering/static generation separately.

## Canonical References

This SSOT should stay aligned with:

- `AGENTS.md`
- `docs/architecture/agent-operating-model.md`
- `docs/architecture/deployment-ssot.md`
- `docs/architecture/tool-contract.md`
- `ENGINEERING.md`
- `CONTRIBUTING.md`
- `docs/architecture/overview.md`
- `docs/architecture/folder-structure.md`
- `docs/architecture/engineering-map.md`
- `docs/architecture/repository-review.md`
- `.codex/memory/repository-index.md`
- `.codex/memory/session-sequence.md`
- `docs/adr/0001-client-first-tool-processing.md`
- `docs/api/server-api.md`
- `docs/standards/coding-standards.md`
- `docs/standards/ui-standards.md`
- `docs/standards/brand-foundation.md`
- `docs/quality/verification-matrix.md`
- `docs/release/release-gates.md`

When these documents conflict, update the stale document and keep this SSOT canonical.

## Consistency Review

This document has been reviewed for consistency against the current repository structure and existing documentation. It intentionally states that:

- The implemented application is client-first.
- The server is scaffolded but not implemented.
- Only routes present in `client/src/App.tsx` are treated as implemented.
- Future plans are labeled as future plans.
- No authentication, database, deployment platform, or backend API is claimed.
