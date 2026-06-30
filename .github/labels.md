# Repository Labels

Use these labels to keep QuickTools issues and pull requests consistent.

## Type

- `type: feature` - New user-facing capability or tool.
- `type: bug` - Incorrect behavior or regression.
- `type: documentation` - Docs, `.codex`, templates, or process updates.
- `type: refactor` - Internal restructuring without intended behavior change.
- `type: security` - Security or privacy concern.
- `type: performance` - Responsiveness, memory, bundle, or processing concern.
- `type: testing` - Test coverage or test infrastructure.
- `type: deployment` - Build, release, hosting, or deployment process.

## Area

- `area: client` - React app under `client`.
- `area: server` - Server package under `server`.
- `area: docs` - Documentation under `docs`.
- `area: ai-workspace` - `.codex` agents, skills, workflows, checklists, templates, or memory.
- `area: github` - GitHub issue templates, PR template, labels, discussions.
- `area: api` - API contracts or future backend endpoints.
- `area: ui` - Visual or interaction layer.

## Status

- `status: needs-triage` - Needs review and prioritization.
- `status: accepted` - Approved for implementation.
- `status: blocked` - Cannot proceed without external decision or dependency.
- `status: in-progress` - Actively being worked.
- `status: needs-review` - Ready for review.
- `status: needs-verification` - Needs QA or validation.

## Priority

- `priority: critical` - Production-breaking, data-loss, or severe security issue.
- `priority: high` - Important user-facing issue or release blocker.
- `priority: medium` - Normal planned work.
- `priority: low` - Cleanup or minor improvement.

## Release

- `release: major` - Breaking change.
- `release: minor` - New non-breaking feature.
- `release: patch` - Fix, documentation, or small improvement.

## Rules

- Every issue should have one `type:*` label.
- Add at least one `area:*` label when the affected area is known.
- Use `priority:*` after triage, not by default.
- Do not use labels to claim unimplemented features or infrastructure.
