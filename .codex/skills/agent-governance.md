# Agent Governance Skill

Use this skill to keep QuickTools work routed through the correct agent, workflow, checklist, and source-of-truth documents.

## Standards Reference

Read these before using the skill:

- `AGENTS.md`
- `docs/architecture/agent-operating-model.md`
- `docs/architecture/project-ssot.md`
- `.codex/memory/task-routing.md`
- `.codex/memory/document-load-order.md`

## Operating Rules

- Classify the request before editing.
- Load only the governing docs needed for the classification.
- Assign agent levels only when they add real review value.
- Keep implementation agents scoped to their boundaries.
- Require reviewer or QA review for user-facing, workflow, deployment, or release changes.
- Require release or deployment gatekeeping before claiming production readiness.

## Escalation Rules

- Use architect review for architecture, backend, persistence, dependency, or routing decisions.
- Use security review for uploads, parsing, dependency, logging, network, or backend changes.
- Use performance review for large files, image conversion, heavy parsing, or bundle impact.
- Use documentation review for SSOT, knowledgebase, patchnote, or workflow changes.

## Completion Rules

- Verification must match the change type.
- Generated build artifacts must be restored unless intentionally updated.
- Final handoff must state remaining risk and documentation status.
