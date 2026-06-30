# GitHub Discussions Guidelines

Use Discussions for product ideas, architecture questions, and planning that is not ready for an issue or pull request.

## Good Discussion Topics

- Proposed QuickTools tools before acceptance criteria are known.
- Architecture questions about client-side versus server-side processing.
- Documentation structure improvements.
- Testing strategy and quality process proposals.
- Deployment planning before a deployment target exists.

## Not For Discussions

- Reproducible bugs. Use a bug report issue.
- Ready-to-build features with clear acceptance criteria. Use a feature request issue.
- Sensitive security reports with secrets or private data. Use a security issue without sensitive details or a private reporting channel if configured.
- Pull request review threads.

## Required Context

Include:

- Current repository behavior.
- Affected route, package, or document.
- Whether the topic is current behavior or future planning.
- Links to relevant docs such as `docs/architecture/project-ssot.md`.

## Decision Handling

- Accepted architecture decisions must become ADRs.
- Product direction changes must update the roadmap or SSOT.
- API discussions must update `docs/api` before implementation.
- Deployment discussions must not claim infrastructure exists until configured.

## Conduct

- Keep discussion factual and specific.
- Separate requirements from ideas.
- Do not include secrets, credentials, or private user data.
