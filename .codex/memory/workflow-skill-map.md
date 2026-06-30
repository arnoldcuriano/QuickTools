# Workflow Skill Map

This file maps each workflow to the reusable skills it should activate.

| Workflow | Required Skills | Conditional Skills |
| --- | --- | --- |
| `new-feature.md` | `react.md`, `typescript.md`, `tailwind.md`, `testing.md`, `playwright.md` | `security.md`, `performance.md`, `accessibility.md`, `seo.md`, `deployment.md`, `shadcn.md`, `nextjs.md` |
| `bug-fix.md` | `testing.md`, `code-review.md`, `git.md` | `react.md`, `typescript.md`, `security.md`, `performance.md`, `accessibility.md` |
| `refactor.md` | `refactoring.md`, `testing.md`, `code-review.md`, `git.md` | `react.md`, `typescript.md`, `tailwind.md`, `performance.md` |
| `release.md` | `deployment.md`, `git.md`, `testing.md`, `code-review.md` | `security.md`, `performance.md`, `seo.md`, `accessibility.md` |
| `hotfix.md` | `testing.md`, `git.md`, `code-review.md` | `security.md`, `deployment.md`, `performance.md` |
| `deployment.md` | `deployment.md`, `git.md`, `testing.md`, `playwright.md` | `security.md`, `performance.md` |
| `testing.md` | `testing.md`, `playwright.md` | `react.md`, `security.md`, `performance.md`, `accessibility.md` |
| `documentation.md` | `git.md`, `code-review.md` | Domain skill matching the document subject |
| `security-review.md` | `security.md`, `code-review.md`, `testing.md` | `deployment.md`, `playwright.md` |
| `performance-review.md` | `performance.md`, `testing.md`, `playwright.md` | `react.md`, `typescript.md`, `deployment.md` |

## Rules

- Load required skills before acting.
- Load conditional skills only when the request touches that concern.
- `nextjs.md` and `shadcn.md` are future-compatible skills and should not be applied to current QuickTools code unless those technologies are introduced.
