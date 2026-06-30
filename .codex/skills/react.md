# React Skill

Reusable guidance for React work. QuickTools currently uses React 18 with Create React App.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `docs/standards/coding-standards.md` before applying this skill.

## Best Practices

- Use functional components and hooks.
- Keep state local unless shared state is required.
- Derive values during render when possible instead of duplicating state.
- Keep pure transformation logic outside components when it needs reuse or tests.
- Use controlled inputs for text transformation tools.
- Handle loading, empty, invalid, and success states explicitly.

## Anti-Patterns

- Defining components inside components.
- Storing derived values in state without a reason.
- Running user-triggered logic in effects instead of event handlers.
- Using `dangerouslySetInnerHTML` for untrusted content.
- Adding global state for isolated page workflows.
- Memoizing trivial expressions while ignoring expensive work.

## Quality Standards

- Components are readable and focused.
- Props are typed.
- UI behavior is deterministic for the same input.
- Expected invalid input does not crash the page.
- Interactive controls remain keyboard accessible.
- Tests cover changed behavior when practical.

## Optimization Strategies

- Use functional state updates for callbacks based on previous state.
- Use `useCallback` when passing handlers to memoized children or reusing stable logic.
- Use `useMemo` only for expensive calculations or stable object identities that matter.
- Split expensive lists or processing work from high-frequency input updates.
- Use `startTransition` or deferred values for non-urgent expensive rendering when needed.

## Examples

```tsx
const [input, setInput] = useState("");
const [error, setError] = useState("");

const handleChange = (value: string) => {
  setInput(value);
  setError("");
};
```

```tsx
setItems((current) => current.filter((_, index) => index !== removedIndex));
```

## Checklist

- Component has one clear responsibility.
- State is minimal and explicit.
- Invalid input is handled.
- Effects are necessary and dependency-safe.
- Accessibility basics are preserved.
- Tests or verification notes cover changed behavior.
