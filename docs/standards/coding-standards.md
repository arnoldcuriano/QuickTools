# Coding Standards

## TypeScript and React

- Use functional components.
- Keep component props typed with interfaces when the prop shape is reused or non-trivial.
- Use explicit union types for tool modes, such as `'encode' | 'decode'`.
- Keep state names clear: `input`, `output`, `error`, `isProcessing`, `copied`.
- Use `useCallback` for transformation handlers passed across components or reused by effects.

## Utilities

- Put reusable pure logic in `client/src/utils`.
- Keep utilities independent from React when possible.
- Return structured results for validation-heavy utilities, including result and error fields.
- Avoid throwing from utilities for expected invalid user input; return a user-displayable error instead.

## Components

- Put reusable visual components under `client/src/components`.
- Put shared UI primitives under `client/src/components/ui`.
- Keep page components responsible for route-level composition and local workflow state.
- Extract repeated UI only when it reduces meaningful duplication.

## Styling

- Use Tailwind utility classes.
- Avoid inline styles except where dynamic runtime values are required, such as progress width.
- Preserve the existing dark background, translucent panels, cyan/blue action color, and rounded panel style unless redesign work is explicitly requested.
- Do not introduce another styling system.

## Error Handling

- Empty input should clear output or produce a clear validation state.
- Invalid user input should produce a visible message near the affected control.
- Console errors are acceptable for developer diagnostics but not as the only feedback.

## Performance

- Be careful with large text inputs and image batches.
- Avoid repeated parsing or conversion work when state has not changed.
- Keep batch limits explicit.
- Consider Web Workers before moving browser-suitable work to the server.

## Tests

- Prefer utility tests for transformation logic.
- Use React Testing Library for routed UI behavior.
- Add regression tests for bugs that affect output correctness.
