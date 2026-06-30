# Security Skill

Reusable guidance for secure JavaScript/TypeScript web work in QuickTools-style projects.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and the SSOT security section before applying this skill.

## Best Practices

- Treat all user input, files, URLs, storage, and API responses as untrusted.
- Keep secrets out of client bundles and committed files.
- Validate file type, count, and size before processing.
- Avoid raw HTML insertion and dangerous DOM sinks.
- Do not log user-provided sensitive content.
- For Express routes, validate request inputs and configure body/upload limits.

## Anti-Patterns

- Storing secrets in `REACT_APP_*`, public assets, or committed config.
- Using `dangerouslySetInnerHTML` with untrusted content.
- Fetching or redirecting to user-controlled URLs without allowlists.
- Permissive CORS with credentials.
- File uploads without limits, cleanup, and retention rules.
- Returning stack traces or internal errors in production.

## Quality Standards

- Expected invalid input is rejected or safely handled.
- User content is not logged.
- Client-only checks are not treated as authorization.
- Backend routes have validation, limits, and safe errors when introduced.
- Dependency changes are justified and lockfiles are preserved.

## Optimization Strategies

- Prefer browser-local processing for privacy when safe and practical.
- Centralize validation for repeated input shapes.
- Use allowlists instead of blocklists.
- Keep security controls simple and testable.
- Add defense-in-depth headers at the server or edge when deployment exists.

## Examples

```ts
const allowedTypes = new Set(["image/jpeg", "image/png"]);
const validFiles = files.filter((file) => allowedTypes.has(file.type));
```

```ts
const message = error instanceof Error ? error.message : "Unknown error";
```

## Checklist

- No secrets are committed or exposed to client code.
- Inputs and files are validated.
- No unsafe HTML or DOM injection.
- Logs avoid user-sensitive content.
- Server routes, if added, have limits and validation.
- Security assumptions are documented.
