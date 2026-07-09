# Agent Operating Model

Last reviewed: 2026-07-06

This document defines how QuickTools uses AI agents as an engineering system. It is the source of truth for agent levels, routing, escalation, and review gates.

## Purpose

QuickTools should not be maintained by ad hoc chat-style edits. AI work must move through a governed engineering model that classifies requests, assigns ownership, verifies changes, and keeps source-of-truth documents aligned.

## Agent Levels

### L0 Router

Owner: `.codex/agents/lead-engineer.md`

Responsibilities:

- Classify the task.
- Select workflow, agents, skills, checklists, and templates.
- Decide whether implementation is appropriate or whether a plan/review is needed first.
- Confirm documentation and verification requirements.

### L1 Builder

Owners: frontend, backend, documentation, deployment, release, product-manager.

Responsibilities:

- Implement or draft the scoped change.
- Stay inside the assigned boundary.
- Reuse existing patterns.
- Avoid unrelated cleanup.

### L2 Reviewer

Owners: reviewer, QA.

Responsibilities:

- Check correctness, regressions, test coverage, and documentation consistency.
- Confirm verification matches risk.
- Identify missing edge cases.

### L3 Gatekeeper

Owners: release, deployment.

Responsibilities:

- Validate build, deployment, production domain, rollback, release notes, and known risk.
- Block claims of readiness when remote verification is missing or inconclusive.

### L4 Principal Review

Owner: architect.

Responsibilities:

- Decide architecture direction.
- Require ADRs for meaningful architecture changes.
- Preserve client-first boundaries unless backend work is justified.

## Routing Rules

- Feature work uses `.codex/workflows/new-feature.md`.
- Bug fixes use `.codex/workflows/bug-fix.md`.
- Refactors use `.codex/workflows/refactor.md`.
- Deployment work uses `.codex/workflows/deployment.md`.
- Releases use `.codex/workflows/release.md`.
- Cross-cutting or unclear work uses `.codex/workflows/agent-governed-change.md`.

## Escalation Triggers

Escalate to architect when work touches:

- Client/server boundaries.
- Routing architecture.
- Shared abstractions.
- Dependency strategy.
- Backend APIs or persistence.

Escalate to deployment and release when work touches:

- Vercel.
- GitHub Actions.
- Package manifests or lockfiles.
- Build output.
- Production domains.

Escalate to security when work touches:

- File upload or parsing.
- Network calls.
- Dependencies.
- Logging.
- Server routes.

Escalate to documentation when work changes:

- User-facing behavior.
- Workflow behavior.
- Architecture.
- Deployment.
- Validation rules.

## Review Gates

Every non-trivial change must pass:

1. Source review: relevant files were read.
2. Scope review: unrelated changes excluded.
3. Verification review: commands/checks match risk.
4. Documentation review: SSOT, patchnote, and knowledgebase decision made.
5. Handoff review: final status includes files, verification, and remaining risk.

## Non-Goals

- This model does not require multiple live agents for every task.
- This model does not replace human approval for risky architectural or production changes.
- This model does not make proposed future work current behavior.
