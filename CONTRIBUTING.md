# Contributing to QuickTools

QuickTools is a React/TypeScript toolbox application with a currently scaffolded Express backend. Contributions should keep the product fast, understandable, and easy for both humans and AI assistants to maintain.

## Local Setup

Client:

```powershell
cd client
npm install
npm start
```

Useful client commands:

```powershell
npm test
npm run build
npm run lint
```

Server:

```powershell
cd server
npm install
```

The server package has Express and image-processing dependencies installed, but `server/app.js` is empty and no runnable API is currently documented.

## Contribution Scope

- Keep changes focused on one feature, fix, or documentation update.
- Do not mix formatting-only edits with behavior changes.
- Do not introduce new frameworks without an architecture decision record.
- Do not assume server behavior exists until it is implemented and documented.
- Treat `client/build` as generated output; update it only when the intended change explicitly includes refreshed build artifacts.

## Branch and Commit Expectations

- Use descriptive branch names, such as `tool/json-error-state` or `docs/architecture-foundation`.
- Commit messages should state the changed area and outcome.
- Include verification in the PR description or handoff notes.

## Pull Request Checklist

- The change is scoped and understandable.
- User-facing behavior is documented when changed.
- Tests were run, or a clear reason is given.
- UI changes preserve the existing QuickTools visual language.
- New dependencies are justified.
- No secrets, local paths, or machine-specific files are committed.

## Review Priorities

Reviewers should prioritize:

- Correctness of data transformation tools.
- Input validation and error handling.
- Browser performance for large text and image operations.
- Accessibility of controls and feedback.
- Consistency with existing React/Tailwind patterns.
- Whether documentation matches real behavior.
