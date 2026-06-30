# Product Roadmap

This roadmap reflects the current repository state and likely next engineering steps. It is not a commitment that these features are already implemented.

## Current Product

QuickTools currently ships a React single-page toolbox with:

- Landing page.
- Base64 encoder/decoder.
- Text formatter.
- WebP converter.
- JSON converter.

## Near-Term Priorities

- Align landing-page tool listings with implemented routes.
- Fix visible text encoding artifacts in existing UI copy.
- Increase test coverage for JSON conversion, text formatting, Base64 handling, and WebP constraints.
- Extract repeated tool page shell patterns when the next tool page is added.
- Decide whether `client/build` should remain committed.
- Fix CI blockers for lint configuration and Jest module resolution.

## Backend Decision Point

The server package has dependencies for Express, security middleware, uploads, and image processing, but no app implementation. Before backend development begins:

- Define the first API use case in `docs/api`.
- Add an ADR for client-side versus server-side processing.
- Decide file upload limits and cleanup rules.
- Add runnable server scripts.

## Quality Priorities

- Keep browser tools responsive with large input.
- Keep transformations deterministic and testable.
- Preserve user privacy by avoiding uploads unless a backend capability is necessary.
- Maintain clear documentation so AI assistants can safely continue work.

## Engineering Infrastructure

Current automation includes GitHub Actions for lint, type check, build, unit tests, Playwright smoke checks, Lighthouse, dependency audit, security scanning, and preview build artifacts.

Near-term infrastructure work:

- Add or align ESLint configuration so the existing lint script can pass.
- Fix Jest compatibility for Prettier parser imports.
- Decide whether Playwright and Lighthouse dependencies should become explicit dev dependencies rather than CI-only transient installs.
- Add branch protection once CI is stable.
