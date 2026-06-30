# Pull Request Checklist

Use this checklist before opening or reviewing a QuickTools pull request.

## Scope

- [ ] PR title states the changed area and outcome.
- [ ] PR description explains why the change exists.
- [ ] Changes are limited to the requested scope.
- [ ] Unrelated formatting or refactors are excluded.
- [ ] Generated artifacts are included only if intended.

## Architecture

- [ ] Change matches `docs/architecture/project-ssot.md`.
- [ ] Client/server boundary is respected.
- [ ] Backend APIs are not claimed without implementation and docs.
- [ ] ADR is included for meaningful architecture changes.

## Code Quality

- [ ] TypeScript types are clear.
- [ ] Reusable pure logic is in `client/src/utils` when appropriate.
- [ ] Reusable UI is in `client/src/components` when appropriate.
- [ ] Error handling is visible to users.
- [ ] No unnecessary dependency was added.

## UI Quality

- [ ] Existing QuickTools visual language is preserved.
- [ ] Responsive behavior is checked.
- [ ] Accessibility basics are satisfied.
- [ ] Public copy matches implemented routes.

## Verification

- [ ] Tests run or skipped with reason.
- [ ] Build run when route/import/type behavior changed.
- [ ] Manual verification is described when used.
- [ ] Security/performance checks completed when relevant.

## Documentation

- [ ] SSOT updated if project truth changed.
- [ ] API docs updated for backend changes.
- [ ] Patchnote and knowledgebase update offered for meaningful changes.
- [ ] PR links to relevant issue or decision record.
