# Accessibility Skill

Reusable guidance for accessible frontend work.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and the SSOT accessibility section before applying this skill.

## Best Practices

- Use semantic HTML and accessible primitives.
- Ensure all interactive controls are keyboard reachable.
- Provide labels for inputs and icon-only buttons.
- Use text-based error messages.
- Preserve visible focus states.
- Respect reduced-motion preferences where practical.

## Anti-Patterns

- Using clickable `div` elements instead of buttons or links.
- Hiding labels without accessible alternatives.
- Relying only on color for errors or status.
- Removing focus outlines without replacement.
- Adding motion that interferes with reading or input.
- Rendering dialogs without titles.

## Quality Standards

- Keyboard users can complete the workflow.
- Screen reader labels identify controls.
- Errors are associated with affected inputs where practical.
- Contrast is readable on dark backgrounds.
- Motion is subtle and non-blocking.

## Optimization Strategies

- Prefer Headless UI or proven accessible primitives already in the project.
- Use `aria-label` for icon-only controls.
- Use native form elements when possible.
- Keep focus management simple and predictable.

## Examples

```tsx
<button aria-label="Remove image">
  <XMarkIcon className="h-4 w-4" />
</button>
```

```tsx
<input type="file" aria-label="Upload images" />
```

## Checklist

- Keyboard flow works.
- Inputs and controls have labels.
- Errors are visible as text.
- Focus states are visible.
- Contrast is acceptable.
- Motion does not block use.
