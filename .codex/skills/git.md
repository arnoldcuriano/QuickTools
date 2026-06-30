# Git Skill

Reusable guidance for safe Git work.

Standards reference: follow `AGENTS.md`, `CONTRIBUTING.md`, and `ENGINEERING.md` before applying this skill.

## Best Practices

- Check `git status --short` before edits and before handoff.
- Preserve user changes.
- Keep commits focused.
- Use clear commit messages that describe outcome.
- Review diffs before finalizing.
- Separate generated artifacts from source changes unless intentionally included.

## Anti-Patterns

- Running destructive commands without explicit user approval.
- Reverting files you did not change.
- Mixing unrelated refactors with requested work.
- Committing secrets, local paths, or machine-specific files.
- Using broad add commands without reviewing included files.

## Quality Standards

- Working tree changes match the request.
- No unrelated files are modified.
- Generated files are intentional.
- Commit message is accurate.
- Handoff includes changed files and verification.

## Optimization Strategies

- Use `git diff -- <path>` to review targeted changes.
- Use small commits for separable work.
- Keep docs and production code changes distinguishable.
- Prefer non-interactive commands for repeatability.

## Examples

```powershell
git status --short
git diff -- docs/architecture/project-ssot.md
```

```text
docs: add QuickTools AI engineering foundation
```

## Checklist

- Status checked before work.
- Status checked after work.
- Diff reviewed.
- No unrelated changes included.
- No destructive command used without approval.
- Handoff matches actual changes.
