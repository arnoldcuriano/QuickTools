# Tailwind Skill

Reusable guidance for Tailwind CSS work. QuickTools currently uses Tailwind CSS 3.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `docs/standards/ui-standards.md` before applying this skill.

## Best Practices

- Use utility classes consistently.
- Keep spacing, colors, borders, and layout aligned with existing screens.
- Use responsive classes for mobile and desktop layouts.
- Prefer `gap-*` for flex/grid spacing.
- Keep dynamic inline styles limited to runtime values such as progress width.
- Extract repeated class patterns only when reuse is clear.

## Anti-Patterns

- Introducing a second styling system.
- Using arbitrary values where theme utilities are sufficient.
- Mixing unrelated visual languages on adjacent pages.
- Creating unreadable class strings with duplicated or conflicting utilities.
- Using color alone for errors or success.
- Adding decorative motion or backgrounds that reduce readability.

## Quality Standards

- Layout does not overflow at common viewport sizes.
- Text remains readable on dark backgrounds.
- Controls have consistent sizing and spacing.
- Focus states remain visible.
- UI matches the existing QuickTools visual language unless redesign is requested.

## Optimization Strategies

- Prefer responsive grid/flex utilities over custom CSS.
- Use shared components to reduce repeated class-heavy markup when justified.
- Avoid excessive animated utility combinations on dense pages.
- Keep Tailwind content paths aligned with source locations.

## Examples

```tsx
<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
  ...
</div>
```

```tsx
<button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-white">
  Save
</button>
```

## Checklist

- Uses Tailwind utilities, not inline style for static styling.
- Responsive behavior is defined.
- Spacing matches nearby patterns.
- Contrast is readable.
- Focus and error states are visible.
- No new design language was introduced accidentally.
