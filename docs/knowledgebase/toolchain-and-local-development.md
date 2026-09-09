# Toolchain and Local Development

Last reviewed: 2026-09-09

## Current Toolchain

QuickTools uses Node.js 24.15 or newer, Vite 8, React 18, TypeScript 5.9, React Router 7, Tailwind CSS 3, Vitest, React Testing Library, Playwright, and Axe.

The client remains a static browser SPA. The `server` package is dependency scaffolding and has no active application entrypoint.

## Local Setup

```powershell
cd client
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:5173`. Vite supports direct development access to the registered React routes.

## Production Preview

```powershell
cd client
npm.cmd run build
npm.cmd run preview
```

The preview server defaults to `http://localhost:4173`.

## Verification

```powershell
cd client
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd test
npm.cmd run build
npm.cmd run test:a11y
npm.cmd audit --omit=dev --audit-level=high

cd ..\server
npm.cmd ci
npm.cmd audit --omit=dev --audit-level=high
```

Local Playwright runs use the installed Chrome channel. GitHub Actions installs Playwright's pinned Chromium build and runs the same accessibility suite.

## Security Scan Root Cause

The failed dependency scans were caused by stale lockfile metadata and vulnerable production dependency versions in both packages. The client lockfile referenced inconsistent transitive packages and included vulnerable XML and formatting dependencies. The server included vulnerable versions of `morgan`, `multer`, `sharp`, and a transitive `qs` release.

The lockfiles and direct dependencies were refreshed together. Both production dependency audits must remain clean before release.

## Automatic Vercel Deployment

The Vercel project is linked to `arnoldcuriano/QuickTools`. A push to `main` triggers a production deployment through the Git integration.

The root `vercel.json` is authoritative:

- Install: `cd client && npm ci`
- Build: `cd client && npm run build`
- Output: `client/build`
- Rewrite: every application route falls back to `/index.html`

Do not run a separate server deployment for the current product. Verify the deployed commit, production root, and at least one direct `/tools/*` URL before declaring a release complete.
