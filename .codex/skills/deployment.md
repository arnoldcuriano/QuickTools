# Deployment Skill

Reusable guidance for deployment and release operations.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `.codex/workflows/deployment.md` before applying this skill.

## Best Practices

- Document deployment target before claiming one exists.
- Build production artifacts with project scripts.
- Keep environment variables documented without exposing secrets.
- Verify release artifacts before deployment.
- Define rollback only when an actual deployment platform exists.

## Anti-Patterns

- Inventing hosting, domains, environments, or CI/CD.
- Deploying a server package before it has a runnable app.
- Treating generated build output as source without a decision.
- Hardcoding secrets into deployment docs.
- Skipping build verification for release changes.

## Quality Standards

- Build command is known and verified.
- Deployment assumptions are explicit.
- Runtime configuration is documented.
- Rollback path is realistic.
- Server deployment is documented only after server runtime exists.

## Optimization Strategies

- Keep CI steps simple: install, lint, test, build.
- Use reproducible dependency installs.
- Separate client and server deployment concerns.
- Automate smoke checks once a deployment target exists.

## Examples

```powershell
cd client
npm run build
```

```text
Current: no documented deployment target.
Future: add hosting, environment, smoke test, and rollback docs.
```

## Checklist

- Deployment target exists or is clearly marked future.
- Build command succeeds.
- Environment variables are documented safely.
- Server runtime exists before server deploy claims.
- Rollback is documented when applicable.
- Release notes state runtime impact.
