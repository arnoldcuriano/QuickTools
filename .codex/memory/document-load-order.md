# Document Load Order

Use this guide to load only the documents needed for a request while preserving consistent context.

## Always Load First

1. `AGENTS.md`
2. `docs/architecture/project-ssot.md`
3. `docs/architecture/engineering-map.md`
4. `.codex/memory/repository-index.md`
5. `.codex/memory/task-routing.md`

## Feature Request

Then load:

- `.codex/workflows/new-feature.md`
- `.codex/agents/product-manager.md`
- `.codex/agents/architect.md`
- `.codex/agents/frontend.md`
- `.codex/skills/react.md`
- `.codex/skills/typescript.md`
- `.codex/skills/tailwind.md`
- `.codex/checklists/feature.md`
- `.codex/templates/feature-specification.md`

## Bug Fix

Then load:

- `.codex/workflows/bug-fix.md`
- `.codex/agents/qa.md`
- `.codex/agents/reviewer.md`
- `.codex/skills/testing.md`
- `.codex/skills/code-review.md`
- `.codex/templates/bug-report.md`

## Review

Then load:

- `.codex/agents/reviewer.md`
- `.codex/skills/code-review.md`
- `.codex/checklists/pull-request.md`
- `docs/architecture/repository-review.md`

## Refactor

Then load:

- `.codex/workflows/refactor.md`
- `.codex/agents/architect.md`
- `.codex/skills/refactoring.md`
- `.codex/skills/testing.md`
- `.codex/templates/refactoring-proposal.md`

## Release

Then load:

- `.codex/workflows/release.md`
- `.codex/agents/release.md`
- `.codex/agents/deployment.md`
- `.codex/checklists/release.md`
- `.codex/templates/release-notes.md`

## Deployment

Then load:

- `.codex/workflows/deployment.md`
- `.codex/agents/deployment.md`
- `.codex/skills/deployment.md`
- `.codex/checklists/deployment.md`
- `.codex/templates/deployment-plan.md`

## Security

Then load:

- `.codex/workflows/security-review.md`
- `.codex/agents/security.md`
- `.codex/skills/security.md`
- `.codex/checklists/security.md`
- `.codex/templates/security-report.md`

## Performance

Then load:

- `.codex/workflows/performance-review.md`
- `.codex/agents/performance.md`
- `.codex/skills/performance.md`
- `.codex/checklists/performance.md`
- `.codex/templates/performance-report.md`

## Documentation

Then load:

- `.codex/workflows/documentation.md`
- `.codex/agents/documentation.md`
- `.codex/checklists/documentation.md`
- `.codex/templates/documentation-update.md`
