# shadcn Skill

Reusable guidance for shadcn/ui projects. QuickTools does not currently include shadcn/ui or `components.json`; apply this only if shadcn is introduced later.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `docs/standards/ui-standards.md` before applying this skill.

## Best Practices

- Run the shadcn CLI using the project package runner.
- Check project context with `shadcn info` before adding or updating components.
- Use existing shadcn components before custom markup.
- Compose components using documented subcomponents.
- Use semantic tokens and variants instead of raw color overrides.
- Review files added by the CLI before handoff.

## Anti-Patterns

- Importing components that have not been added.
- Manually copying registry source without the CLI.
- Overwriting locally modified components without approval.
- Using raw color utilities instead of design tokens in shadcn projects.
- Rendering dialog/sheet/drawer content without accessible titles.
- Guessing registry or preset when the user did not specify one.

## Quality Standards

- Component APIs match installed shadcn version and primitive base.
- Imports match configured aliases.
- Forms use the project-standard field primitives.
- Buttons, cards, tabs, dialogs, and menus follow documented composition.
- Accessibility requirements from component docs are preserved.

## Optimization Strategies

- Add only components needed for the current feature.
- Avoid installing full blocks when a smaller component composition is enough.
- Use variants before custom class overrides.
- Keep component updates incremental and diff-reviewed.

## Examples

```tsx
<Card>
  <CardHeader>
    <CardTitle>JSON Converter</CardTitle>
    <CardDescription>Beautify or minify JSON input.</CardDescription>
  </CardHeader>
  <CardContent>{children}</CardContent>
</Card>
```

```tsx
<Dialog>
  <DialogContent>
    <DialogTitle>Confirm action</DialogTitle>
  </DialogContent>
</Dialog>
```

## Checklist

- `components.json` exists before using shadcn conventions.
- CLI docs were checked for new components.
- Imports use configured aliases.
- Variants are used before custom styles.
- Added files were reviewed.
- Accessibility subcomponents are present.
