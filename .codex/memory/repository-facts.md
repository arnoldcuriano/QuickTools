# Repository Facts

Last reviewed: 2026-06-30

## Stable Facts

- Repository name: QuickTools.
- Product tagline in root README: "The Ultimate Toolbox for Developers & Writers".
- Client package name: `quicktools-client`.
- Server package name: `server`.
- Client app uses Create React App and React 18.
- Client routes are defined in `client/src/App.tsx`.
- Server `app.js` is empty.

## Implemented Routes

- `/`
- `/tools/base64`
- `/tools/text-formatter`
- `/tools/webp-converter`
- `/tools/json-converter`

## Implemented Tool Constraints

- WebP converter accepts JPG and PNG files.
- WebP converter processes up to 20 images per selection.
- JSON converter supports beautify and minify modes.
- Base64 tool supports encode and decode modes.
- Text formatter supports JSON, XML, HTML, and plain text.

## Do Not Infer

- Do not infer authentication, persistence, databases, deployment targets, or production APIs.
- Do not infer server routes from installed dependencies.
- Do not infer all landing-page listed tools are implemented.
