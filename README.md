# QuickTools

An open-source professional workbench for browser-based developer, writing, data, and creative utilities.

QuickTools currently provides client-side Base64, JSON formatting and comparison, text formatting, WebP conversion, QR code generation, CSV/TSV conversion, and regex testing. Planned tools are tracked separately and are not presented as implemented features.

## Local Development

Prerequisite: Node.js 24.15 or newer and npm.

```powershell
cd client
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:5173`. To verify a production build locally:

```powershell
npm.cmd run build
npm.cmd run preview
```

Quality commands:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd test
npm.cmd run test:a11y
```

The accessibility suite uses installed Chrome locally. GitHub Actions installs a pinned Playwright Chromium build.

## Deployment

Vercel deploys `main` automatically through the connected Git repository. The root `vercel.json` installs and builds the client, publishes `client/build`, and rewrites direct SPA routes to `index.html`.

## Open Source

QuickTools is available under the [MIT License](LICENSE). Contributions should follow [CONTRIBUTING.md](CONTRIBUTING.md).
