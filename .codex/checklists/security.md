# Security Checklist

Use this checklist for any QuickTools change touching input, files, dependencies, network calls, server code, or deployment.

## Client Security

- [ ] No secrets are stored in React code, public assets, or client environment variables.
- [ ] User-provided text is rendered through normal React escaping.
- [ ] `dangerouslySetInnerHTML` is not introduced for untrusted content.
- [ ] Direct DOM sinks such as `innerHTML`, `document.write`, and `insertAdjacentHTML` are avoided.
- [ ] URLs from users, query strings, storage, or APIs are validated before navigation or resource loading.
- [ ] Clipboard and download behavior does not expose unexpected data.

## File Handling

- [ ] Accepted file types are allowlisted.
- [ ] File count limits are explicit.
- [ ] File size limits are defined or risk-noted.
- [ ] Uploaded or selected files are not rendered as active HTML/SVG content.
- [ ] User file names are not trusted for server paths.

## Server Security

- [ ] No server API is claimed unless wired into `server/app.js`.
- [ ] Request body limits are defined for new server routes.
- [ ] Upload limits, cleanup, and retention rules are documented before implementation.
- [ ] `helmet`, CORS, and error handling are configured before production server use.
- [ ] Error responses do not expose stack traces or secrets.
- [ ] User input is validated before filesystem, database, redirect, or outbound request usage.

## Dependencies

- [ ] New dependencies are justified.
- [ ] Lockfiles are updated consistently.
- [ ] Dependency changes do not introduce duplicate libraries for existing capabilities.
- [ ] Known critical advisories are reviewed for touched packages.

## Logging

- [ ] User-provided sensitive content is not logged.
- [ ] Errors are useful for debugging without exposing internals to users.
- [ ] Future server logs include redaction requirements if server runtime is added.

## Documentation

- [ ] Security-relevant behavior is documented in SSOT, API docs, or standards.
- [ ] Residual risks are explicitly stated.
