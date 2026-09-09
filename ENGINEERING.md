# QuickTools Engineering Guide

## Project Vision

QuickTools provides fast, browser-accessible utilities for developers and writers. The current product direction is a client-first toolbox where common transformations run locally in the browser: text encoding, structured data formatting, and image conversion.

The engineering foundation should keep the repository easy for multiple AI assistants and human maintainers to understand without relying on hidden context.

## Current Stack

Client:

- React 18 with Vite 8.
- TypeScript 5.9.
- React Router 7 for page routing.
- Tailwind CSS 3 for utility-first styling.
- Headless UI for accessible primitives.
- Heroicons for icons.
- Framer Motion for page and control animations.
- Vitest, React Testing Library, Playwright, and Axe for automated verification.
- Prettier standalone, js-beautify, `@xmldom/xmldom`, JSZip, and file-saver for tool behavior.

Server:

- Node.js package with Express 5, helmet, cors, compression, morgan, multer, sharp, jimp, dotenv, TypeScript tooling, and nodemon.
- Server folders exist but no Express app is implemented yet.

## Architecture Summary

QuickTools currently behaves as a single-page React application. Routes are registered in `client/src/App.tsx`:

- `/`
- `/tools/base64`
- `/tools/text-formatter`
- `/tools/webp-converter`
- `/tools/json-converter`
- `/tools/qr-code-generator`
- `/tools/json-compare`
- `/tools/csv-tsv-converter`
- `/tools/regex-tester`

Most tool logic is implemented directly in page components. Reusable utility logic exists in `client/src/utils`, and the WebP image preview card is extracted to `client/src/components/ui/ImagePreviewCard.tsx`.

## Engineering Principles

- Prefer client-side processing for privacy and speed when the browser can perform the task safely.
- Move repeated transformation logic into utilities before it spreads across page components.
- Keep UI and transformation logic separable when adding complexity.
- Validate user input before processing and return actionable errors.
- Avoid long-running synchronous work on the main thread for large files or text.
- Introduce backend APIs only for work that cannot be safely or efficiently handled in the browser.
- Document architecture changes at the same time as implementation changes.

## Naming Conventions

- React component files: PascalCase, for example `ImagePreviewCard.tsx`.
- Page components: PascalCase under `client/src/pages`.
- Tool pages: PascalCase under `client/src/pages/tools`.
- Utility files: camelCase, for example `formatFileSize.ts`.
- Functions and variables: camelCase.
- Types and interfaces: PascalCase.
- Routes: lowercase kebab-case.
- Documentation files: lowercase kebab-case.

## Repository Rules

- Do not add production code without reading the relevant existing file.
- Do not create duplicate utility logic if a matching utility exists.
- Do not add broad abstractions before at least two real call sites justify them.
- Do not add dependencies for small transformations that can be implemented safely with existing dependencies or platform APIs.
- Do not store user-uploaded files in the repository.
- Do not commit secrets or environment-specific configuration.
- Keep AI guidance in `.codex` and durable engineering documentation in `docs`.

## Definition of Done

- Behavior is correct for valid, empty, and invalid input.
- Error states are visible and understandable.
- Loading or processing states are present for file/batch operations.
- Keyboard and screen-reader basics are preserved.
- Tests cover changed transformation logic when practical.
- Build or test commands pass, or failures are documented.
- Relevant docs are updated.
