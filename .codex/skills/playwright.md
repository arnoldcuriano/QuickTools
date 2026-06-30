# Playwright Skill

Reusable guidance for browser verification.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `.codex/workflows/testing.md` before applying this skill.

## Best Practices

- Use Playwright for end-to-end flows and visual/responsive checks.
- Test real routes and user interactions.
- Check console errors during browser tests.
- Use stable locators such as roles, labels, and text.
- Test desktop and mobile viewports for UI changes.

## Anti-Patterns

- Relying on brittle CSS selectors when accessible selectors exist.
- Ignoring console errors.
- Testing only the happy path.
- Using arbitrary timeouts instead of waiting for UI states.
- Treating screenshots as a substitute for functional assertions.

## Quality Standards

- Tests are deterministic.
- User workflows are realistic.
- Assertions verify outcome, not just element existence.
- Failures include enough context to debug.
- Responsive behavior is covered for layout-sensitive changes.

## Optimization Strategies

- Reuse setup fixtures.
- Keep tests isolated and reset state between flows.
- Use traces/screenshots on failure.
- Scope E2E tests to high-value workflows.

## Examples

```ts
await page.goto("/tools/json-converter");
await page.getByPlaceholder(/enter json/i).fill('{"name":"QuickTools"}');
await expect(page.getByText(/QuickTools/)).toBeVisible();
```

```ts
const errors: string[] = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
```

## Checklist

- Route loads.
- Core interaction works.
- Error state works.
- Console errors are checked.
- Desktop and mobile layouts are considered.
- Trace or screenshot is captured when useful.
