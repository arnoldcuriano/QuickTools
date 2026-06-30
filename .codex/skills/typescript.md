# TypeScript Skill

Reusable guidance for TypeScript work. QuickTools currently uses TypeScript in the client.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `docs/standards/coding-standards.md` before applying this skill.

## Best Practices

- Prefer explicit domain types for modes, options, and result objects.
- Use unions for finite states.
- Type component props with interfaces or type aliases.
- Return structured results from validation-heavy utilities.
- Narrow `unknown` or caught errors before reading properties.
- Keep generated or ambient declarations separate from application logic.

## Anti-Patterns

- Using `any` to bypass design decisions.
- Repeating string literals instead of using union types.
- Catching errors and assuming they are `Error`.
- Returning mixed result shapes that callers must guess.
- Exporting types that expose implementation details unnecessarily.

## Quality Standards

- Public utilities have clear input and output types.
- Nullable or optional fields are handled explicitly.
- Type names describe business meaning.
- TypeScript errors are fixed rather than suppressed.
- Type assertions are rare and justified.

## Optimization Strategies

- Use discriminated unions for complex UI states.
- Keep reusable interfaces near the boundary that owns them.
- Use `ReadonlyArray` or readonly properties when mutation would be unsafe.
- Avoid over-generic helpers until multiple call sites need them.

## Examples

```ts
type ConvertMode = "beautify" | "minify";

interface ConversionResult {
  result: string;
  error?: string;
  originalSize?: number;
  resultSize?: number;
}
```

```ts
const message = error instanceof Error ? error.message : "Unknown error";
```

## Checklist

- No unnecessary `any`.
- Finite states use unions.
- Utility return types are explicit.
- Errors are safely narrowed.
- Props and callbacks are typed.
- Type changes do not widen invalid states.
