# Deployment SSOT

Last reviewed: 2026-10-12

This document is the deployment source of truth for QuickTools.

## Current Deployment Target

QuickTools deploys the React client to Vercel from GitHub.

Current production domain:

- `https://quick-tools-mu-sable.vercel.app/`

Current deployment model:

- Source branch: `main`
- Source repository: `arnoldcuriano/QuickTools`
- Build target: `client`
- Output directory: `client/build`
- Runtime type: static React application with generated route HTML

## Vercel Configuration

The root `vercel.json` defines:

- `installCommand`: `cd client && npm ci`
- `buildCommand`: `cd client && npm run build`
- `outputDirectory`: `client/build`
- Clean URLs enabled with trailing slashes disabled

The client build generates an HTML file for every published tool route, `/docs`, `/kitchen-sink`, and the legacy `/tools/base64` path. Vercel clean URLs map those files to extensionless routes without a catch-all SPA rewrite.

## Deployment Requirements

The following files must be tracked in Git:

- `vercel.json`
- `client/package.json`
- `client/package-lock.json`
- `client/index.html`
- `client/vite.config.ts`
- client source under `client/src`

The server package is not part of the current Vercel runtime.

## Verification Gates

Before claiming deployment success, verify:

1. `npm.cmd run build` from `client` passes locally.
2. Vercel deployment status is `success` for the expected commit SHA.
3. Production root returns HTTP 200.
4. At least one direct tool route returns HTTP 200, for example `/tools/json-converter`.
5. The returned HTML includes route-specific title, description, canonical, static heading content, and React bundle references.
6. `/sitemap.xml` and `/robots.txt` return generated registry-driven content.

## Known Risks

- `client/build` is checked in but should be treated as generated output.
- Running a local build can create tracked hash churn; restore it unless intentionally refreshing build artifacts.
- GitHub Actions and Vercel are separate signals. A Vercel deployment can succeed while GitHub Actions needs separate CI investigation.

## Rollback

Use Vercel rollback or redeploy a known good commit. Do not manually edit production artifacts outside the repository workflow.
