# Refactoring Skill

Reusable guidance for safe refactoring.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `.codex/workflows/refactor.md` before applying this skill.

## Best Practices

- Refactor only when it reduces real complexity, duplication, or risk.
- Preserve behavior unless behavior change is explicitly requested.
- Add tests before risky refactors when practical.
- Keep changes small and reviewable.
- Move pure logic into utilities when it improves testability.

## Anti-Patterns

- Rewriting large areas without a clear need.
- Combining refactor and feature work without separation.
- Introducing abstractions for one call site.
- Changing UI design during structural cleanup.
- Renaming public routes or files without reason.

## Quality Standards

- Behavior remains equivalent.
- Tests or verification cover affected flows.
- Abstractions have clear ownership.
- Code is easier to understand after the change.
- Documentation is updated if architecture changes.

## Optimization Strategies

- Extract repeated UI after patterns stabilize.
- Extract pure functions before optimizing components.
- Use incremental migration for broad changes.
- Keep compatibility shims temporary and documented.

## Examples

```ts
// Before extracting, confirm at least two real callers need the same logic.
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
```

## Checklist

- Refactor has a concrete reason.
- Behavior preservation is verified.
- Scope is limited.
- Tests were added or run where practical.
- Docs updated for architecture changes.
- No unrelated redesign or feature work included.
