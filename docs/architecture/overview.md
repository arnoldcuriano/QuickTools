# Architecture Overview

QuickTools is currently a client-first single-page application with a scaffolded backend package.

## Product Shape

The application provides browser tools for common developer and writer workflows. Current implemented workflows run locally in the browser:

- Base64 encoding and decoding.
- JSON beautification and minification.
- JSON, XML, HTML, and plain text formatting.
- JPG/PNG to WebP conversion with ZIP download.
- QR code generation.
- Nested JSON comparison.
- CSV and TSV conversion.
- Regular expression testing and match highlighting.

## Client Architecture

The client lives in `client` and is built with Vite.

Primary files:

- `client/src/index.tsx`: React root setup with `React.StrictMode`.
- `client/index.html`: Vite HTML entry point.
- `client/vite.config.ts`: build and Vitest configuration.
- `client/src/App.tsx`: Router and route definitions.
- `client/src/pages/Home.tsx`: Landing page and tool navigation.
- `client/src/pages/tools`: Routed tool pages.
- `client/src/components/ui`: Reusable UI components.
- `client/src/utils`: Shared transformation and formatting utilities.

The current client architecture favors page-owned state. Tool pages store input, output, error, and interaction state locally with `useState` and perform transformations with callbacks or imported utilities.

## Server Architecture

The server lives in `server`. It currently contains package dependencies and empty domain folders:

- `controllers`
- `middleware`
- `models`
- `routes`
- `utils`

`server/app.js` is empty, so there is no active HTTP API, middleware pipeline, routing layer, persistence layer, or deployment contract in the current repository.

## Data Flow

Current data flow is browser-local:

1. User enters text or selects files in a tool page.
2. React state stores input and UI state.
3. Browser APIs and local libraries process the input.
4. Output is rendered, copied to clipboard, downloaded, or packaged as a ZIP.

No implemented workflow currently requires a server round trip.

## Architectural Risks

- Shared layout and header patterns are duplicated across tool pages.
- Some transformation logic is embedded in page components, making it harder to test independently.
- The backend package suggests planned API work but has no implementation.
- The landing page advertises tools that do not all have implemented routes.
- The checked-in build output can drift from source if not intentionally refreshed.

## Recommended Direction

- Keep lightweight tools client-side.
- Extract repeated tool shell UI only when reuse is clear.
- Move reusable transformation logic into `client/src/utils`.
- Add tests around utilities before larger refactors.
- Define server API contracts in `docs/api` before implementing backend routes.
