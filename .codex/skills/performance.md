# Performance Skill

Reusable guidance for performance-sensitive work.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and the SSOT performance section before applying this skill.

## Best Practices

- Keep browser tools responsive for typical text and image inputs.
- Avoid repeated parsing or conversion when state has not changed.
- Keep batch limits explicit.
- Provide progress feedback for long-running operations.
- Use production builds for release verification.

## Anti-Patterns

- Processing large files synchronously without feedback.
- Re-running expensive conversions on unrelated state changes.
- Adding heavy dependencies for simple transformations.
- Animating dense UI continuously.
- Moving work to the server without a measured reason.

## Quality Standards

- Main workflows remain usable.
- Large input behavior is considered.
- Bundle impact is justified.
- Memory-heavy operations have limits.
- UI feedback appears during processing.

## Optimization Strategies

- Use `Promise.all` for independent async work where order is not required.
- Use maps or sets for repeated lookups.
- Use Web Workers for heavy browser-suitable processing when needed.
- Dynamically import heavy optional features.
- Combine array passes when profiling shows it matters.

## Examples

```ts
const results = await Promise.all(files.map((file) => convert(file)));
```

```ts
const byId = new Map(items.map((item) => [item.id, item]));
```

## Checklist

- Expensive work is scoped.
- Batch limits are explicit.
- Processing state is visible.
- No unnecessary dependency weight.
- Large inputs are tested or risk-noted.
- Build impact is understood.
