# Release Gates

Last reviewed: 2026-07-06

This document defines release readiness gates for QuickTools.

## Gate 1: Scope

- The change has a clear user or engineering purpose.
- Unrelated cleanup is excluded.
- Current behavior and future plans are not mixed.

## Gate 2: Source Integrity

- Relevant source files were read.
- Existing architecture boundaries were preserved.
- No fake APIs, routes, deployments, or data stores were documented.

## Gate 3: Verification

- Verification follows `docs/quality/verification-matrix.md`.
- Build output churn is restored unless intentionally released.
- Known warnings or skipped checks are documented.

## Gate 4: Documentation

For meaningful user-facing, workflow, validation, architecture, deployment, or bug-fix changes:

- Ask whether the user wants a patchnote and knowledgebase update.
- Update SSOT or related docs when behavior or workflow truth changes.

## Gate 5: Deployment

For deployment-impacting changes:

- Confirm build success.
- Confirm Vercel deployment status when available.
- Confirm production root and direct tool route return HTTP 200.
- State any GitHub/Vercel connector limitation.

## Gate 6: Handoff

Final handoff should include:

- Files changed.
- What changed.
- Verification performed.
- Remaining risk.
- Documentation decision.
- Commit or push status when applicable.
