# Definition of Done Checklist

Use this checklist before handing off QuickTools work.

## General

- The requested scope is complete.
- No unrelated production code was changed.
- Existing user changes were preserved.
- Documentation matches actual repository behavior.
- No placeholders or invented features were added.

## Client

- Routes still resolve from `client/src/App.tsx`.
- Tool behavior handles empty, valid, and invalid input.
- Processing states are visible for long-running work.
- Errors are user-facing and specific.
- Buttons, file inputs, and icon-only controls have accessible labels where needed.
- Responsive layouts avoid overlap and horizontal overflow.

## Server

- No server capability is claimed unless implemented in `server/app.js` or imported from it.
- API contracts are documented in `docs/api`.
- Request size, file limits, validation, and error responses are explicit for upload routes.

## Verification

- Relevant tests or builds were run.
- Any skipped verification is explained.
- `git status --short` was reviewed.
