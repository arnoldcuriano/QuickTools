# Release Workflow

## Entry Requirements

- Release scope is defined.
- All intended changes are present in the working branch.
- Known blockers are resolved or explicitly accepted.
- Version intent is proposed.

## Required Agents

- Release
- QA
- Reviewer
- Documentation
- Deployment, if deployable artifacts or environment changes are involved
- Product Manager, for user-facing release impact
- Security and Performance, for relevant risk areas

## Required Skills

- `deployment.md` for build and artifact handling.
- `git.md` for status and release hygiene.
- `testing.md` for verification.
- `security.md`, `performance.md`, `seo.md`, and `accessibility.md` when release scope touches those areas.

## Sequence Of Execution

1. Release agent defines version intent: MAJOR, MINOR, or PATCH.
2. Reviewer checks changed files for blockers.
3. QA runs final verification.
4. Documentation ensures patchnotes, knowledgebase, SSOT, and API docs are current.
5. Deployment validates build or deployment readiness when applicable.
6. Product Manager confirms user-facing summary.
7. Release agent produces final readiness summary.

## Validation

- Run relevant tests.
- Run production build for client release changes.
- Confirm documentation reflects actual behavior.
- Confirm no unrelated files are included.
- Confirm no secrets or local files are present.

## Exit Criteria

- Release scope is complete.
- Verification is complete or skipped with reason.
- Release notes are accurate.
- Runtime impact is stated.
- Deployment readiness is confirmed when applicable.

## Expected Artifacts

- Release summary.
- Patchnote entry.
- Knowledgebase entry when requested.
- Verification report.
- Deployment notes when applicable.

## Quality Gates

- No unresolved blocker findings.
- Version intent matches semantic versioning.
- Documentation is user-focused and factual.
- `git status --short` reviewed before handoff.
