# Feature Checklist

Use this checklist for new QuickTools tools, route changes, or user-facing improvements.

## Scope

- [ ] User problem is stated.
- [ ] Acceptance criteria are testable.
- [ ] Implemented route or affected page is identified.
- [ ] Current behavior was checked in `docs/architecture/project-ssot.md`.
- [ ] Future plans are not described as current behavior.
- [ ] Backend work is excluded unless explicitly required and approved.

## Architecture

- [ ] Client-side processing remains the default for browser-capable tools.
- [ ] API contract is documented in `docs/api` before backend implementation, if server work is required.
- [ ] New abstraction has more than one real use case or removes meaningful complexity.
- [ ] Route naming uses lowercase kebab-case.
- [ ] Utility logic is placed in `client/src/utils` when reusable or testable.
- [ ] Reusable visual components are placed in `client/src/components`.

## UI

- [ ] Page follows current QuickTools tool structure: header, back navigation, title, description, info panel, workspace, feedback.
- [ ] Tailwind classes match existing spacing, colors, and panel patterns.
- [ ] Headless UI, Heroicons, and Framer Motion patterns are reused where appropriate.
- [ ] Empty, loading/processing, error, and success states are visible.
- [ ] UI does not advertise unimplemented tools as available.

## Validation

- [ ] Empty input is handled.
- [ ] Invalid input is handled with a user-facing message.
- [ ] Valid input produces expected output.
- [ ] File type restrictions are explicit when files are accepted.
- [ ] File count and size limits are explicit when files are accepted.

## Verification

- [ ] Relevant tests were added or updated.
- [ ] Client tests were run when client behavior changed.
- [ ] `npm run build` was run for route, import, TypeScript, or release-sensitive changes.
- [ ] Responsive behavior was checked for UI changes.
- [ ] `git status --short` was reviewed.

## Documentation

- [ ] SSOT was updated if architecture, standards, route list, or current behavior changed.
- [ ] Roadmap was updated if feature status changed.
- [ ] API docs were updated if server behavior was added.
- [ ] Patchnote and knowledgebase update was offered for meaningful changes.
