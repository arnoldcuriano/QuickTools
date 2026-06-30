# Deployment Checklist

Use this checklist for deployment planning or release-to-environment work.

## Current State

- [ ] Deployment target is documented before use.
- [ ] No hosting, domain, CI/CD, or rollback process is invented.
- [ ] Client deployment is separated from future server deployment.
- [ ] Server deployment is not claimed while `server/app.js` is empty.

## Build

- [ ] Client dependencies are installed reproducibly.
- [ ] `npm run build` runs from `client`.
- [ ] Build output is inspected or smoke-tested.
- [ ] Generated files are committed only if intentionally required.

## Environment

- [ ] Required environment variables are documented.
- [ ] No secrets are committed.
- [ ] Client-exposed environment variables are treated as public.
- [ ] Server secrets are stored outside source control when server runtime exists.

## Runtime

- [ ] Core routes load after build.
- [ ] Static assets resolve.
- [ ] Error fallback behavior is known.
- [ ] Security headers are configured at server or edge when deployment exists.

## Rollback

- [ ] Rollback process is documented for real deployment target.
- [ ] Previous artifact or commit is identifiable.
- [ ] Smoke checks are defined for post-rollback validation.

## Handoff

- [ ] Deployment steps are documented.
- [ ] Verification results are summarized.
- [ ] Known risks are listed.
