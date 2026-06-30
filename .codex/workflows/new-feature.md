# New Feature Workflow

## Entry Requirements

- Feature request or user story is stated clearly.
- Product scope is known, including target route or tool category.
- Current behavior has been checked in `docs/architecture/project-ssot.md`.
- If backend behavior is proposed, API contract work is explicitly in scope.

## Required Agents

- Product Manager
- Architect
- Frontend
- Backend, only if server behavior is required
- QA
- Reviewer
- Documentation
- Security, for user input, files, auth, network, or server work
- Performance, for large input, batch processing, or heavy UI work
- SEO, for public-facing copy or discoverability changes

## Required Skills

- `react.md`, `typescript.md`, and `tailwind.md` for client feature work.
- `testing.md` and `playwright.md` for validation.
- `security.md`, `performance.md`, `accessibility.md`, and `seo.md` when the feature touches those concerns.
- `deployment.md` only if release or preview artifact behavior changes.

## Sequence Of Execution

1. Product Manager defines the user problem, acceptance criteria, and non-goals.
2. Architect confirms client/server boundaries and whether an ADR is required.
3. Documentation updates planned docs or API contracts before implementation when needed.
4. Frontend and Backend agents implement within approved boundaries.
5. Security and Performance review relevant risk areas.
6. QA validates acceptance criteria and regression paths.
7. Reviewer performs final engineering review.
8. Documentation updates SSOT, roadmap, API docs, standards, patchnotes, or knowledgebase as required.

## Validation

- Client: run relevant tests, `npm run build` for route/import/type-sensitive changes, and browser smoke checks when UI changes are significant.
- Backend: validate API contract, request validation, error responses, and runtime script once backend exists.
- Confirm implemented routes match product copy.
- Confirm accessibility basics for new UI.

## Exit Criteria

- Acceptance criteria are satisfied.
- No unapproved scope expansion remains.
- Tests/builds pass or skipped checks are justified.
- Documentation reflects real behavior.
- Security, performance, and accessibility risks are addressed or documented.

## Expected Artifacts

- Source changes for the feature.
- Tests or verification notes.
- Updated documentation.
- ADR when architecture changes.
- API contract when backend behavior is added.
- Patchnote and knowledgebase update when requested.

## Quality Gates

- Feature is production-ready.
- Current QuickTools design and route conventions are preserved.
- User input has validation and visible errors.
- No fake APIs, unimplemented routes, or undocumented infrastructure claims.
- `git status --short` reviewed before handoff.
