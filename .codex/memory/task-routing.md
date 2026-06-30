# Task Routing Matrix

Use this matrix to decide which agents, workflows, skills, checklists, and templates apply to common requests.

## Feature Work

- Workflow: `.codex/workflows/new-feature.md`
- Agents: product-manager, architect, frontend, QA, reviewer, documentation
- Conditional agents: backend, security, performance, SEO, deployment
- Skills: react, typescript, tailwind, testing, playwright
- Conditional skills: security, performance, accessibility, seo, deployment
- Checklist: `.codex/checklists/feature.md`
- Template: `.codex/templates/feature-specification.md`

## Bug Fix

- Workflow: `.codex/workflows/bug-fix.md`
- Agents: QA, frontend or backend, reviewer, documentation
- Conditional agents: security, performance
- Skills: testing, code-review, react, typescript
- Conditional skills: security, performance, accessibility
- Checklist: `.codex/checklists/definition-of-done.md`
- Template: `.codex/templates/bug-report.md`

## Code Review

- Workflow: `.codex/workflows/testing.md` for validation context, then reviewer agent
- Agents: reviewer, QA
- Conditional agents: architect, security, performance, documentation
- Skills: code-review, git, testing
- Checklist: `.codex/checklists/pull-request.md`
- Template: use PR template or security/performance report if specialized

## Refactor

- Workflow: `.codex/workflows/refactor.md`
- Agents: architect, frontend or backend, QA, reviewer, documentation
- Skills: refactoring, testing, code-review, react, typescript
- Checklist: `.codex/checklists/definition-of-done.md`
- Template: `.codex/templates/refactoring-proposal.md`

## Release

- Workflow: `.codex/workflows/release.md`
- Agents: release, QA, reviewer, documentation, product-manager
- Conditional agents: deployment, security, performance
- Skills: deployment, git, testing, code-review
- Checklist: `.codex/checklists/release.md`
- Template: `.codex/templates/release-notes.md`

## Deployment

- Workflow: `.codex/workflows/deployment.md`
- Agents: deployment, release, QA, documentation
- Conditional agents: backend, security, performance
- Skills: deployment, git, testing, playwright, security
- Checklist: `.codex/checklists/deployment.md`
- Template: `.codex/templates/deployment-plan.md`

## Security Review

- Workflow: `.codex/workflows/security-review.md`
- Agents: security, reviewer, QA, documentation
- Conditional agents: frontend, backend, deployment
- Skills: security, code-review, testing, deployment
- Checklist: `.codex/checklists/security.md`
- Template: `.codex/templates/security-report.md`

## Performance Review

- Workflow: `.codex/workflows/performance-review.md`
- Agents: performance, QA, reviewer, documentation
- Conditional agents: architect, frontend, backend
- Skills: performance, testing, playwright, react, typescript
- Checklist: `.codex/checklists/performance.md`
- Template: `.codex/templates/performance-report.md`

## Documentation

- Workflow: `.codex/workflows/documentation.md`
- Agents: documentation, reviewer
- Conditional agents: architect, product-manager, backend, release
- Skills: git, code-review plus domain skill
- Checklist: `.codex/checklists/documentation.md`
- Template: `.codex/templates/documentation-update.md`
