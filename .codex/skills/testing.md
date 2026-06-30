# Testing Skill

Reusable guidance for tests.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and the SSOT testing section before applying this skill.

## Best Practices

- Test behavior, not implementation details.
- Add focused tests for changed transformation logic.
- Cover valid, invalid, and empty input.
- Use React Testing Library for user-facing component behavior.
- Keep tests deterministic and independent.
- Document skipped tests with a reason.

## Anti-Patterns

- Snapshotting large UI trees as primary coverage.
- Testing private implementation details.
- Mocking so much that real behavior is not exercised.
- Claiming tests passed without running them.
- Ignoring failing tests unrelated to the current change without noting them.

## Quality Standards

- Tests fail for meaningful regressions.
- Test names describe user-visible behavior.
- Utilities have direct unit coverage when practical.
- UI tests use accessible queries where possible.
- Test setup does not depend on local machine state.

## Optimization Strategies

- Put pure logic in utilities to make it easy to test.
- Use table-driven tests for format modes and edge cases.
- Keep slow integration tests separate from fast unit tests.
- Use mocks only at external boundaries.

## Examples

```ts
it("returns an error for invalid JSON", async () => {
  const result = await convertJson("{", { mode: "beautify", indent: 2 });
  expect(result.error).toMatch(/Invalid JSON/);
});
```

```tsx
expect(screen.getByRole("button", { name: /clear all/i })).toBeInTheDocument();
```

## Checklist

- Changed logic has coverage where practical.
- Empty, valid, and invalid states are checked.
- Tests use user-facing queries.
- Commands run are reported.
- Skipped verification is explained.
- No brittle implementation-only assertions.
