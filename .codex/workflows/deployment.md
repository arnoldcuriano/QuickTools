# Deployment Workflow

## Entry Requirements

- Deployment target exists and is documented, or work is explicitly to define it.
- Release scope is approved.
- Build and runtime commands are known.
- Environment variables are documented without secrets.

## Required Agents

- Deployment
- Release
- QA
- Documentation
- Backend, if server runtime exists
- Security, for environment, headers, secrets, uploads, or server deployment
- Performance, for production build or runtime concerns

## Required Skills

- `deployment.md` for build, artifact, environment, and rollback rules.
- `git.md` for release hygiene.
- `testing.md` and `playwright.md` for smoke checks.
- `security.md` for secrets, headers, and runtime configuration.

## Sequence Of Execution

1. Deployment agent confirms target, artifact, and environment.
2. Release agent confirms release scope and version intent.
3. Build artifacts are produced with documented commands.
4. QA runs smoke checks against deployable artifact or target environment.
5. Security verifies secrets, headers, and unsafe config assumptions.
6. Documentation updates deployment notes and rollback instructions.
7. Deployment executes or hands off deployment steps.

## Validation

- Client: `npm run build` from `client`.
- Server: runnable server command exists before server deployment is claimed.
- Smoke checks cover core routes.
- Environment config is present and safe.
- Rollback plan exists when a real target exists.

## Exit Criteria

- Artifact is built and verified.
- Deployment steps are documented.
- Runtime assumptions are explicit.
- Rollback or recovery process is known for real deployments.

## Expected Artifacts

- Build output when intentionally generated.
- Deployment notes.
- Environment variable documentation.
- Smoke test results.
- Rollback instructions when applicable.

## Quality Gates

- No invented hosting, domains, pipelines, or environments.
- No secrets committed.
- Server deployment is not claimed while server app is empty.
- Generated artifacts are included only when intentional.
