# Engineering Map

Last reviewed: 2026-06-30

This map explains how QuickTools engineering documents, AI agent files, workflows, skills, checklists, templates, and GitHub standards relate to each other. It is the onboarding guide for future AI assistants and developers.

## Start Here

Read these first, in order:

1. `AGENTS.md`: operating rules for AI assistants.
2. `docs/architecture/project-ssot.md`: canonical project truth.
3. `ENGINEERING.md`: engineering principles and conventions.
4. `CONTRIBUTING.md`: contributor workflow.
5. This file: document navigation and relationships.

## Canonical Source

`docs/architecture/project-ssot.md` is the source of truth.

All other documents must align with it:

- If another document conflicts with the SSOT, update the stale document.
- If project truth changes, update the SSOT first or in the same change.
- Future plans must stay clearly marked as future plans.

## Repository Documentation Layer

- `docs/architecture/overview.md`: shorter architecture summary.
- `docs/architecture/agent-operating-model.md`: governed AI agent hierarchy, routing, escalation, and review gates.
- `docs/architecture/deployment-ssot.md`: Vercel/GitHub deployment source of truth.
- `docs/architecture/tool-contract.md`: required behavior for every browser utility.
- `docs/architecture/folder-structure.md`: repository layout and ownership.
- `docs/architecture/repository-review.md`: senior engineering review and prioritized roadmap.
- `docs/adr/0001-client-first-tool-processing.md`: accepted architecture decision for client-first processing.
- `docs/api/server-api.md`: current server API state; explicitly says no API exists.
- `docs/roadmap/product-roadmap.md`: roadmap derived from current implementation gaps.
- `docs/standards/coding-standards.md`: coding standards for source changes.
- `docs/standards/ui-standards.md`: UI consistency standards.
- `docs/quality/verification-matrix.md`: verification requirements by change type.
- `docs/release/release-gates.md`: release readiness gates.
- `docs/patchnotes/*`: release/change notes.
- `docs/knowledgebase/*`: durable behavior and process explanations.

## AI Workspace Layer

`.codex` is the AI engineering workspace.

- `.codex/agents`: specialized engineering roles.
- `.codex/skills`: reusable technical guidance.
- `.codex/workflows`: execution processes.
- `.codex/checklists`: production readiness checklists.
- `.codex/templates`: immediately usable engineering templates.
- `.codex/commands`: slash-command prompt contracts.
- `.codex/prompts`: reusable session prompts.
- `.codex/memory`: stable repository facts, routing maps, load order, and session sequence.

## Agent System

Agents define who owns a concern:

- `lead-engineer.md`: task routing, agent orchestration, escalation, and final readiness.
- `architect.md`: architecture boundaries, ADRs, SSOT consistency.
- `frontend.md`: React client implementation.
- `backend.md`: server/API work only when explicitly required.
- `reviewer.md`: code and documentation review.
- `qa.md`: test planning and verification.
- `security.md`: input, file, dependency, logging, and server safety.
- `performance.md`: responsiveness, bundle, rendering, and processing performance.
- `seo.md`: public copy and static SPA metadata accuracy.
- `documentation.md`: docs, patchnotes, knowledgebase, and consistency.
- `deployment.md`: build artifacts, environments, and deployment process.
- `release.md`: release readiness and version intent.
- `product-manager.md`: user problem, acceptance criteria, and roadmap.

Each agent file references its primary workflows.

## Workflow System

Workflows define how work moves through agents:

- `agent-governed-change.md`: default governed workflow for non-trivial or cross-cutting work.
- `new-feature.md`: product scope through implementation and documentation.
- `bug-fix.md`: reproduction, minimal fix, regression verification.
- `refactor.md`: behavior-preserving structural improvement.
- `release.md`: release readiness and notes.
- `hotfix.md`: urgent production-impacting fixes.
- `deployment.md`: artifact and environment process.
- `testing.md`: test planning and execution.
- `documentation.md`: docs creation and consistency review.
- `security-review.md`: security findings and mitigations.
- `performance-review.md`: performance assessment and optimization.
- `change-workflow.md`: general change workflow retained as a quick reference.

Each workflow references required agents and required skills.

## Skill System

Skills define reusable technical standards:

- `agent-governance.md`: routing, escalation, and agent-level quality gates.
- `react.md`, `typescript.md`, `tailwind.md`: current client implementation.
- `nextjs.md`, `shadcn.md`: future-compatible guidance; not current stack.
- `seo.md`, `accessibility.md`, `performance.md`, `security.md`: cross-cutting quality.
- `testing.md`, `playwright.md`: validation.
- `git.md`: source control hygiene.
- `deployment.md`: build and release operations.
- `refactoring.md`: behavior-preserving cleanup.
- `code-review.md`: review discipline.
- `repository-context.md`: concise QuickTools context.

Each skill points back to engineering standards or the SSOT.

## Phase 12 AI Optimization Layer

Phase 12 connects all AI workspace assets into a repeatable operating model.

- `.codex/memory/repository-index.md`: fast repository memory and known blockers.
- `.codex/memory/task-routing.md`: maps request types to workflows, agents, skills, checklists, and templates.
- `.codex/memory/document-load-order.md`: defines which documents load first by request type.
- `.codex/memory/workflow-skill-map.md`: maps workflows to required and conditional skills.
- `.codex/memory/session-sequence.md`: standard sequence every future Codex session should follow.
- `.codex/commands/*.md`: reusable slash-command prompt contracts.

Slash-command files are not shell commands. They are prompt contracts for tools or humans that support command-like invocation.

## Checklist System

Checklists are used before handoff:

- `feature.md`: new user-facing work.
- `release.md`: release readiness.
- `security.md`: security-sensitive changes.
- `seo.md`: public copy and metadata.
- `accessibility.md`: UI accessibility.
- `performance.md`: heavy processing and rendering.
- `deployment.md`: build/deploy readiness.
- `pull-request.md`: PR quality.
- `documentation.md`: docs consistency.
- `definition-of-done.md`: universal completion gate.

## Template System

Templates are starting points for structured work:

- `architecture-decision-record.md`
- `feature-specification.md`
- `bug-report.md`
- `technical-design.md`
- `refactoring-proposal.md`
- `deployment-plan.md`
- `release-notes.md`
- `testing-plan.md`
- `performance-report.md`
- `security-report.md`
- `documentation-update.md`

Use templates when creating durable artifacts, not for casual notes.

## GitHub Standards

GitHub files operationalize the workflow:

- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/performance_issue.md`
- `.github/ISSUE_TEMPLATE/security_issue.md`
- `.github/ISSUE_TEMPLATE/documentation_issue.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/DISCUSSIONS.md`
- `.github/labels.md`
- `.github/workflows/ci.yml`
- `.github/workflows/security.yml`

Actions validate lint, type check, build, unit tests, Playwright smoke checks, Lighthouse, dependency audit, security scan, and preview build artifacts. They do not deploy automatically to production.

## Recommended Path By Work Type

Feature:

1. Optional command: `.codex/commands/feature.md`.
2. Feature issue or `.codex/templates/feature-specification.md`.
3. `.codex/workflows/new-feature.md`.
4. Relevant agents and skills.
5. `.codex/checklists/feature.md`.
6. PR template.

Bug:

1. Optional command: `.codex/commands/bugfix.md`.
2. Bug issue or `.codex/templates/bug-report.md`.
3. `.codex/workflows/bug-fix.md`.
4. QA, implementation, reviewer.
5. Regression test or verification.

Architecture:

1. Architect agent.
2. ADR template.
3. SSOT update.
4. Repository review or roadmap update when needed.

Release:

1. Optional command: `.codex/commands/release.md`.
2. `.codex/workflows/release.md`.
3. Release and deployment agents.
4. Release checklist.
5. Patchnote and knowledgebase if requested.

Security:

1. Optional command: `.codex/commands/security.md`.
2. Security issue or security report template.
3. `.codex/workflows/security-review.md`.
4. Security checklist.
5. API or SSOT updates if behavior changes.

## Consistency Rules

- SSOT outranks all other docs.
- Agent operating model defines routing and escalation.
- Agents use workflows.
- Workflows reference skills.
- Skills reference standards.
- Checklists enforce quality gates.
- Templates create durable artifacts.
- GitHub files collect structured input and enforce CI.

## Current Known Engineering Reality

- Current app is React/TypeScript with Create React App.
- Current backend is scaffolded but not implemented.
- Current CI is configured but local review found likely blockers: missing ESLint config and Jest failure around Prettier parser imports.
- Current production deployment target is not documented.
- Current source of implemented routes is `client/src/App.tsx`.
