# /deploy

Use when planning deployment, preview artifacts, or release-to-environment work.

## Load

1. `AGENTS.md`
2. `docs/architecture/project-ssot.md`
3. `.codex/workflows/deployment.md`
4. `.codex/agents/deployment.md`
5. `.codex/skills/deployment.md`
6. `.codex/checklists/deployment.md`
7. `.codex/templates/deployment-plan.md`

## Agents

- deployment
- release
- QA
- documentation

Conditional:

- backend
- security
- performance

## Rules

- Do not deploy automatically to production.
- Do not claim hosting, domains, or rollback process unless documented.
- Do not claim server deployment while `server/app.js` is empty.
