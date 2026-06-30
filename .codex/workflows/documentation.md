# Documentation Workflow

## Entry Requirements

- Documentation request or documented behavior change exists.
- Source of truth is identified.
- Current repository behavior is inspected.
- Future plans are separated from implemented behavior.

## Required Agents

- Documentation
- Architect, for architecture or SSOT changes
- Product Manager, for roadmap or user-facing copy
- Backend, for API documentation
- Release, for patchnotes
- Reviewer, for consistency review

## Required Skills

- `git.md` for status and scope checks.
- `code-review.md` for consistency review.
- Domain skills such as `security.md`, `performance.md`, `seo.md`, `accessibility.md`, or `deployment.md` when documentation covers those standards.

## Sequence Of Execution

1. Documentation agent identifies affected docs.
2. Relevant domain agent verifies technical facts.
3. Documentation is written or updated with repository-specific content.
4. Reviewer checks consistency against source and SSOT.
5. Release coordinates patchnotes or knowledgebase updates when requested.

## Validation

- Links and paths are valid.
- Current behavior is not mixed with future plans.
- No placeholders remain.
- Docs do not claim unimplemented APIs, routes, deployment, auth, or database behavior.
- SSOT remains canonical.

## Exit Criteria

- Requested documentation exists.
- Documentation is factual and consistent.
- Related docs are updated or intentionally left unchanged.
- `git status --short` reviewed.

## Expected Artifacts

- Markdown documentation.
- Patchnote entry when requested.
- Knowledgebase entry when requested.
- Consistency review notes.

## Quality Gates

- No generic filler.
- No invented features.
- Current behavior and future plans are explicitly separated.
- Enterprise process docs are actionable.
