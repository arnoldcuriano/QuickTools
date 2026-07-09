# Verification Matrix

Last reviewed: 2026-07-06

Use this matrix to choose verification for QuickTools changes.

## Documentation Only

Required:

- Review edited links and paths.
- Run `git status --short`.

Recommended:

- Check consistency with `docs/architecture/project-ssot.md`.

## Client Source

Required:

- `npm.cmd run lint`
- `npx.cmd tsc --noEmit`
- `npm.cmd test -- --watchAll=false --runInBand`

Required when routing, imports, dependencies, or production behavior change:

- `npm.cmd run build`

Recommended for rendered UI:

- Browser smoke test for `/`.
- Browser smoke test for the changed route.

## Tool Behavior

Required:

- Valid input check.
- Invalid input check.
- Empty input check.
- Error visibility check.

Recommended:

- Utility-level tests for pure transformations.
- Browser interaction proof for copy/download or file processing.

## Deployment

Required:

- `npm.cmd run build` from `client`.
- Confirm `vercel.json` build and output settings.
- Confirm deployment status for expected commit SHA when remote access is available.
- Confirm production root returns HTTP 200.
- Confirm direct `/tools/*` route returns HTTP 200.

## GitHub Actions

Required:

- Check latest workflow status for the expected commit SHA.
- If logs are unavailable, state the tool/auth limitation.
- Reproduce locally using the closest command sequence.

## Governance Or Workflow Changes

Required:

- Check `AGENTS.md`.
- Check `docs/architecture/project-ssot.md`.
- Check `docs/architecture/engineering-map.md`.
- Check `.codex/memory/task-routing.md`.
- Check `.codex/memory/document-load-order.md`.
- Run `git status --short`.

## Generated Build Output

Rule:

- Do not leave `client/build` dirty unless the task explicitly refreshes committed build output.
