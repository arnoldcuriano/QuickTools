# Agent-Governed Change Workflow

Use this workflow when a request is more than a trivial answer, especially for feature, bug, refactor, deployment, release, documentation, security, performance, or workflow changes.

## 1. Classify

- Identify the task type: feature, bug fix, refactor, deployment, release, documentation, security, performance, or planning.
- Identify affected boundaries: client, server scaffold, docs, `.codex`, GitHub Actions, Vercel, or generated build output.
- Check whether the work is advisory only or implementation.

## 2. Load The Minimum Governing Context

Always load:

- `AGENTS.md`
- `docs/architecture/project-ssot.md`
- `.codex/memory/task-routing.md`

Then load the workflow, agents, skills, and checklists mapped to the task type.

## 3. Assign Agent Levels

- L0 Router: lead-engineer.
- L1 Builder: frontend, backend, documentation, deployment, or release.
- L2 Reviewer: reviewer and QA.
- L3 Gatekeeper: release or deployment for production-impacting changes.
- L4 Principal Review: architect for architectural decisions.

Use only the levels needed for the task.

## 4. Plan The Smallest Safe Change

- Preserve current behavior unless the request explicitly changes it.
- Keep browser-first processing as the default.
- Do not invent backend APIs, persistence, or deployments.
- Avoid unrelated refactors and generated artifact churn.

## 5. Implement

- Keep edits inside the affected boundary.
- Reuse existing components, utilities, skills, workflows, and docs.
- Add durable documentation only where it becomes a source of truth.

## 6. Verify

Use `docs/quality/verification-matrix.md` to select commands and manual checks.

At minimum:

- Documentation-only: path/link review plus `git status --short`.
- Client source: lint, type check, tests, and build when applicable.
- Deployment: local build plus remote deployment or explicit tool-access limitation.
- Workflow/governance: consistency check across AGENTS, SSOT, engineering map, routing, and load order.

## 7. Handoff

Report:

- What changed.
- Files changed.
- Verification performed.
- Remote state if deployment was touched.
- Remaining risk.
- Patchnote/knowledgebase prompt when required.
