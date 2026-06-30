# Security Review Workflow

## Entry Requirements

- Security review is requested or change touches sensitive areas.
- Scope is identified: client, server, files, dependencies, logging, network, or deployment.
- Relevant source files and docs are available.

## Required Agents

- Security
- Reviewer
- Frontend or Backend, depending on code area
- QA
- Documentation
- Deployment, if environment or headers are involved

## Required Skills

- `security.md` for review rules.
- `code-review.md` for evidence-based findings.
- `testing.md` for validation and abuse cases.
- `deployment.md` when environment, headers, or secrets are involved.

## Sequence Of Execution

1. Security agent identifies trust boundaries and sensitive data paths.
2. Implementation agent provides context on intended behavior.
3. Security agent scans for high-signal issues.
4. QA defines abuse and validation scenarios.
5. Reviewer validates evidence and severity.
6. Documentation updates security standards or API constraints when needed.

## Validation

- Inputs, files, URLs, storage, and logs are checked.
- Backend routes, if any, have validation and limits.
- Secrets are not present in committed files.
- Error messages do not expose internals.
- Dependency changes are reviewed.

## Exit Criteria

- Findings are documented with severity and evidence.
- Required mitigations are complete or tracked.
- Residual risks are explicit.
- Documentation reflects security-relevant behavior.

## Expected Artifacts

- Security review findings.
- Fixes or mitigation plan.
- Validation notes.
- Updated security standards or API docs when applicable.

## Quality Gates

- No unbounded upload or request body behavior.
- No unsafe raw HTML or DOM injection.
- No secrets in client bundle or docs.
- No permissive CORS/server assumptions without justification.
- Claims are evidence-based.
