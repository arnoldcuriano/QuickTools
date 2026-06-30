# Repository Review

Last reviewed: 2026-06-30

This review evaluates QuickTools as it exists today. It does not implement fixes.

## Review Scope

Reviewed:

- Architecture
- Folder organization
- Naming
- Scalability
- Technical debt
- Unused code and dead files
- Performance
- Security
- SEO
- Accessibility
- Developer experience
- Documentation
- Testing
- CI/CD readiness

Local verification attempted:

- `npm.cmd test -- --watchAll=false` from `client`: failed.
- `npx.cmd tsc --noEmit` from `client`: passed.
- `npm.cmd run build` from `client`: compiled successfully, but command timed out after successful output.
- `npm.cmd run lint` from `client`: failed.
- `npm.cmd audit --audit-level=high` from `client` and `server`: failed because the audit endpoint/cache logging failed in the local environment.

## Critical Issues

### P0-1: Unit Tests Fail Because Jest Cannot Resolve Prettier Parser Import

Priority: P0

Evidence:

- `npm.cmd test -- --watchAll=false` fails in `client`.
- Failure: `Cannot find module 'prettier/parser-babel' from 'src/pages/tools/TextFormatter.tsx'`.
- Affected import: `client/src/pages/tools/TextFormatter.tsx`.

Impact:

- CI unit test job will fail.
- Existing test coverage cannot protect routes.
- Any PR using the new CI pipeline will be blocked until fixed.

Recommendation:

- Align Prettier imports with the installed Prettier version and Jest compatibility.
- Add focused tests for text formatting utilities after import compatibility is fixed.

### P0-2: Lint Script Exists But No ESLint Configuration Exists

Priority: P0

Evidence:

- `npm.cmd run lint` fails.
- ESLint reports it cannot find a configuration file.

Impact:

- CI lint job will fail immediately.
- Coding standards cannot be automatically enforced.

Recommendation:

- Add a client ESLint configuration compatible with React, TypeScript, and Create React App, or change the lint script to use the CRA-supported lint path if adopted.

### P0-3: Server Package Suggests Backend Capability But Has No Runtime

Priority: P0

Evidence:

- `server/app.js` is empty.
- Server folders and dependencies exist.

Impact:

- Contributors and AI assistants can easily infer APIs that do not exist.
- Deployment and security posture cannot be defined for the server.

Recommendation:

- Either document the server as planned-only, which the SSOT now does, or implement a minimal Express app only when a real backend use case is approved.

## Important Improvements

### P1-1: Generated Client Build Is Checked In

Priority: P1

Evidence:

- `client/build` exists in the repository.

Impact:

- Source and generated output can drift.
- Reviews become noisier when builds are refreshed.
- CI artifacts now provide a cleaner preview path.

Recommendation:

- Decide whether `client/build` should remain versioned.
- If not required for hosting, remove it in a dedicated cleanup PR and rely on CI build artifacts.

### P1-2: Landing Page Lists Tools That Are Not Implemented

Priority: P1

Evidence:

- `Home.tsx` lists tools such as Image Resizer, Favicon Generator, SVG Optimizer, Grammar Checker, Text Summarizer, Word Counter, HTML Beautifier, CSS Minifier, Open Graph Previewer, Meta Tag Generator, Twitter Card Tester, and Slug Generator.
- Only four tool routes are implemented in `client/src/App.tsx`.

Impact:

- Product copy overstates current functionality.
- SEO and user expectations can become inaccurate.

Recommendation:

- Separate implemented tools from planned tools.
- Link only implemented tools.

### P1-3: UI Source Contains Encoding Artifacts And Stray Text

Priority: P1

Evidence:

- Existing source contains visible encoding artifacts such as `â€”`, `Â©`, and `â†’`.
- `client/src/pages/tools/JSONConverter.tsx` includes stray text `idioma` in the header area.

Impact:

- User-facing polish and trust are reduced.
- Tests and snapshots may encode broken copy.

Recommendation:

- Clean copy and encoding artifacts in a dedicated UI text fix.

### P1-4: Tool Layout Is Duplicated Across Pages

Priority: P1

Evidence:

- Tool pages repeat header, background, info panel, clear button, and animation patterns.

Impact:

- Future tool additions will increase maintenance cost.
- UI consistency can drift.

Recommendation:

- After one more tool or cleanup pass, extract a shared `ToolPageLayout`, `ToolHeader`, and `ToolInfoPanel`.

### P1-5: CI Uses Transient Playwright And Lighthouse Dependencies

Priority: P1

Evidence:

- GitHub Actions install Playwright, `serve`, `wait-on`, and Lighthouse CI transiently.

Impact:

- CI is functional without production dependency changes, but versions are less controlled.

Recommendation:

- Once CI stabilizes, add explicit dev dependencies or pin versions in workflow commands.

## Minor Improvements

### P2-1: CRA Default CSS And Assets Appear Unused

Priority: P2

Evidence:

- `client/src/App.css` contains default Create React App styles but is not imported by `App.tsx`.
- `client/src/logo.svg` appears to be default CRA asset.

Impact:

- Minor repository noise.

Recommendation:

- Remove unused CRA defaults in a cleanup PR after confirming no imports remain.

### P2-2: Server Package Metadata Is Generic

Priority: P2

Evidence:

- `server/package.json` uses `"name": "server"`, empty description, and default test script.

Impact:

- Developer experience is weak if backend work begins.

Recommendation:

- Rename and document server package when backend runtime is implemented.

### P2-3: Documentation Now Has Strong Coverage But Needs Stewardship

Priority: P2

Evidence:

- SSOT, agents, workflows, skills, checklists, templates, and GitHub standards exist.

Impact:

- Documentation can drift unless changes update the SSOT first.

Recommendation:

- Treat `docs/architecture/project-ssot.md` as required review material for every PR.

## Recommended Refactors

### R1: Extract Pure Text Formatting Logic

Priority: P1

Current state:

- Text formatting logic lives inside `TextFormatter.tsx`.

Recommendation:

- Move JSON/XML/HTML/plain text formatting logic into utilities.
- Add utility tests before changing UI behavior.

### R2: Consolidate Tool Page Shell

Priority: P1

Current state:

- Tool pages repeat layout and background structure.

Recommendation:

- Extract shared page shell components after fixing current CI blockers.

### R3: Normalize Tool State Pattern

Priority: P2

Current state:

- Tool pages independently manage `input`, `output`, `error`, copied state, mode state, and clear behavior.

Recommendation:

- Define a small local pattern or hook only if the next tool repeats the same workflow.

### R4: Clarify Client Build Artifact Policy

Priority: P1

Current state:

- `client/build` is committed and CI now produces preview artifacts.

Recommendation:

- Decide whether build output remains in source control. Prefer CI artifacts unless hosting requires committed build files.

## Future Opportunities

### O1: Add Explicit Playwright Test Suite

Priority: P2

- Move smoke checks from inline workflow script into committed Playwright tests when browser coverage grows.

### O2: Add Lighthouse Budgets

Priority: P2

- Add a Lighthouse CI config with project-specific budgets after baseline scores are known.

### O3: Introduce Web Workers For Heavy Client Processing

Priority: P3

- Consider Web Workers for large image batches or large text formatting before moving browser-suitable work to the server.

### O4: Define Backend Use Case Before Implementing Server

Priority: P2

- Potential server use cases include server-side image processing, metadata generation, or integrations, but none should be implemented without an API contract and ADR.

### O5: Improve SEO Strategy If Public Growth Becomes A Goal

Priority: P3

- Current SPA metadata is limited. Static generation or SSR should be evaluated only if SEO becomes a product priority.

## Roadmap

### Phase 1: Stabilize Engineering Automation

Priority: P0

- Fix Jest Prettier parser import failure.
- Add or align ESLint configuration.
- Confirm GitHub Actions pass on a pull request.
- Decide whether dependency audit failures should block or warn during initial stabilization.

### Phase 2: Correct Current Product Surface

Priority: P1

- Fix UI encoding artifacts and stray text.
- Align landing page tool listings with implemented routes.
- Add regression tests for current tools.

### Phase 3: Clean Repository Structure

Priority: P1

- Decide and document `client/build` policy.
- Remove unused CRA assets after verification.
- Keep server package documented as planned-only until backend work starts.

### Phase 4: Improve Maintainability

Priority: P2

- Extract pure transformation utilities.
- Extract shared tool page shell components.
- Add Playwright tests as committed test files.
- Add Lighthouse budget configuration.

### Phase 5: Future Platform Work

Priority: P3

- Define first backend API use case, if needed.
- Add deployment target and rollback documentation.
- Add branch protection once CI is consistently green.
