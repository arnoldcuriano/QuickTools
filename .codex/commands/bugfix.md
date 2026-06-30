# /bugfix

Use when the user reports incorrect behavior or asks for a fix.

## Load

1. `AGENTS.md`
2. `docs/architecture/project-ssot.md`
3. `.codex/workflows/bug-fix.md`
4. `.codex/templates/bug-report.md`
5. `.codex/skills/testing.md`
6. `.codex/skills/code-review.md`

## Agents

- QA
- frontend or backend
- reviewer
- documentation

Conditional:

- security
- performance

## Execution

1. Reproduce or define the failing behavior.
2. Find root cause.
3. Apply minimal fix if implementation is requested.
4. Add regression coverage where practical.
5. Verify and summarize.
