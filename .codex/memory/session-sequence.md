# Standard Session Sequence

Every new Codex session for QuickTools should follow this sequence unless the user explicitly asks for a narrow read-only answer.

## 1. Establish Context

- Read `AGENTS.md`.
- Read `docs/architecture/project-ssot.md`.
- Read `docs/architecture/engineering-map.md`.
- Read `.codex/memory/repository-index.md`.
- Read `.codex/memory/task-routing.md`.

## 2. Classify The Request

Classify as one of:

- Feature
- Bug fix
- Review
- Refactor
- Release
- Deployment
- Testing
- Documentation
- Security review
- Performance review
- General question

## 3. Load The Right System

- Use `.codex/memory/document-load-order.md`.
- Load the workflow for the request type.
- Load required agents.
- Load required skills.
- Load relevant checklist or template.

## 4. Inspect The Repository

- Check `git status --short`.
- Read affected source files.
- Do not assume backend APIs, deployment targets, databases, authentication, or route-level SEO.

## 5. Execute

- Follow the selected workflow sequence.
- Keep changes scoped.
- Avoid production code changes unless implementation is requested.
- Preserve user changes.

## 6. Validate

- Run applicable checks.
- If checks fail, report the exact blocker.
- For docs-only work, verify paths, consistency, and `git status --short`.

## 7. Handoff

- Summarize files changed.
- Summarize verification.
- Call out known blockers.
- Ask for patchnote and knowledgebase update for meaningful changes.

## 8. Update Memory When Needed

Update memory files only when stable facts change:

- Implemented routes.
- Current stack.
- CI status.
- Server state.
- Deployment state.
- Known blockers.
