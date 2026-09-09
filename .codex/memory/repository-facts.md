# Repository Facts

Last reviewed: 2026-09-09

## Stable Facts

- Repository name: QuickTools.
- Product description: an open-source professional workbench for browser-based developer, writing, data, and creative utilities.
- Client package name: `quicktools-client`.
- Server package name: `server`.
- Client app uses Vite 8, React 18, TypeScript 5.9, and React Router 7.
- Client routes are defined in `client/src/App.tsx`.
- Server `app.js` is empty.

## Implemented Routes

- `/`
- `/tools/base64`
- `/tools/text-formatter`
- `/tools/webp-converter`
- `/tools/json-converter`
- `/tools/qr-code-generator`
- `/tools/json-compare`
- `/tools/csv-tsv-converter`
- `/tools/regex-tester`

## Implemented Tool Constraints

- WebP converter accepts JPG and PNG files.
- WebP converter processes up to 20 images per selection.
- JSON converter supports beautify and minify modes.
- Base64 tool supports encode and decode modes.
- Text formatter supports JSON, XML, HTML, and plain text.
- QR code generation, nested JSON comparison, CSV/TSV conversion, and regex testing run client-side.

## Do Not Infer

- Do not infer authentication, persistence, databases, or production APIs.
- Current deployment target is Vercel through the root `vercel.json` and the connected `main` branch.
- Do not infer server routes from installed dependencies.
- Do not infer all landing-page listed tools are implemented.
