# Knowledgebase: Browser-Only Developer Tools and Vercel SPA Alignment

## What Changed

QuickTools now includes a broader browser-only developer tool set:

- `/tools/qr-code-generator`
- `/tools/json-compare`
- `/tools/csv-tsv-converter`
- `/tools/regex-tester`

The landing page now highlights these tools so they are discoverable from the home screen.

The app also keeps its Vercel SPA rewrite setup so routed pages can be refreshed directly in production.

## How It Behaves Now

- QR codes are generated locally in the browser and can include colors, a logo image, and frame text.
- JSON Compare parses both documents locally and reports nested differences.
- CSV / TSV Converter handles quoted fields and converts between formats in the browser.
- Regex Tester evaluates patterns locally, supports common flags, and highlights matches in the preview.
- The app remains browser-first. No backend service is required for these tools.
- The shared header shows the QuickTools repository link and live GitHub star count through the existing GitHub badge behavior.

## Why It Was Added

These tools expand QuickTools in the developer-tools direction while keeping the app lightweight and privacy-friendly. The new utilities address common browser-local workflows: sharing links, comparing structured JSON, moving tabular data between formats, and testing regular expressions.

## Constraints

- The tools are implemented as client-side routes, not server endpoints.
- The QR tool depends on browser canvas and image APIs.
- The app should continue to be deployed as a static SPA with route rewrites, not as a server-rendered app.
- Planned future tools should stay browser-first unless a new documented backend use case is approved.
