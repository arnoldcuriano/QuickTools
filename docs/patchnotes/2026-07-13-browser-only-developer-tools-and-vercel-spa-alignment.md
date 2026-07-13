# Patchnote: Browser-Only Developer Tools and Vercel SPA Alignment

Version intent: MINOR

## Summary

Expanded QuickTools with new browser-only developer utilities and aligned the client for direct SPA hosting on Vercel.

## Changes

- Added a QR Code Generator with browser-local generation, color controls, logo overlays, frame text, and PNG download support.
- Added a JSON Compare tool for nested JSON diffs with added, removed, and changed value summaries.
- Added a CSV / TSV Converter with quoted-field parsing and table preview.
- Added a Regex Tester with flag toggles, match inspection, and highlighted previews.
- Expanded the landing page to surface the new developer tools alongside the existing tool catalog.
- Added focused utility tests for the new browser-side transformation helpers.
- Updated project architecture documentation so the implemented routes and component boundaries match the current app.
- Kept the Vercel SPA rewrite configuration in place so direct route refreshes resolve correctly.

## User Impact

- More developer-focused browser tools are available directly in the app.
- Users can generate QR codes, compare JSON, convert delimited text, and inspect regex matches without leaving the browser.
- Direct links and refreshes on deployed Vercel routes should continue to work through SPA rewrites.

## Runtime Impact

- Processing remains client-side for the added tools.
- No backend API, database, or cloud upload flow was introduced.
- No authentication or account requirement was added.
