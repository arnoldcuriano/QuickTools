# QuickTools 0.2.0 - Security, Accessibility, and Toolchain Modernization

Release date: 2026-09-09

## Improved

- Migrated the client build and development workflow from Create React App to Vite.
- Added route-level code splitting so tool-specific dependencies load only when needed.
- Replaced Jest with Vitest while preserving the existing React Testing Library coverage.
- Added automated Playwright and Axe checks across every implemented route.
- Improved muted-text contrast, heading structure, external-link labeling, and the WebP quality control label.
- Updated client and server dependencies to resolve the high-severity production audit findings.
- Standardized local and GitHub Actions builds on Node.js 24.

## Deployment

- Vercel continues to build `client` and publish `client/build` automatically from `main`.
- Direct tool URLs continue to resolve through the existing SPA rewrite.

## Developer Notes

- Use `npm.cmd run dev` from `client` for local development.
- Use `npm.cmd test` for unit tests and `npm.cmd run test:a11y` for all-route accessibility verification.
- The generated `client/build` directory remains tracked but should not be manually edited.
