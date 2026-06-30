# Change Workflow

Use this workflow for implementation work in QuickTools.

## 1. Orient

- Read `AGENTS.md` and `ENGINEERING.md`.
- Identify whether the change is client, server, documentation, or workflow-only.
- Inspect directly related files.
- Check current git status.

## 2. Plan the Smallest Safe Change

- Keep changes inside the relevant boundary.
- Prefer existing utilities and UI patterns.
- Avoid unrelated cleanup.
- If server behavior is needed, define the API contract in `docs/api` before or alongside implementation.

## 3. Implement

- Use TypeScript types for client behavior.
- Keep pure transformation logic testable.
- Keep UI state explicit: input, output, error, loading/processing, copied/success.
- Preserve current route naming and visual language.

## 4. Verify

Documentation-only:

- Review created or edited links and paths.
- Run `git status --short`.

Client changes:

- Run `npm test` from `client`.
- Run `npm run build` for changes affecting routing, bundling, imports, or TypeScript.
- Run `npm run lint` when lint-sensitive files change.

Server changes:

- Add or update an executable server script before claiming server functionality works.
- Run the relevant Node/TypeScript checks once they exist.

## 5. Document

Update docs when behavior, architecture, setup, or conventions change. For meaningful changes, ask whether the user wants a patchnote entry and knowledgebase update.
