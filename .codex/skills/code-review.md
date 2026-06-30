# Code Review Skill

Reusable guidance for engineering review.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `.codex/agents/reviewer.md` before applying this skill.

## Best Practices

- Lead with findings ordered by severity.
- Reference exact files and lines when possible.
- Focus on correctness, regressions, missing tests, security, performance, and maintainability.
- Separate blockers from optional improvements.
- Verify documentation matches implementation.

## Anti-Patterns

- Starting with broad summaries before serious findings.
- Nitpicking style that does not affect maintainability.
- Requesting unrelated refactors.
- Approving unverified behavior claims.
- Ignoring test gaps for changed logic.

## Quality Standards

- Findings are actionable.
- Severity is proportional to impact.
- Review is grounded in code evidence.
- Open questions are explicit.
- No invented requirements are applied.

## Optimization Strategies

- Review diffs first, then related context.
- Trace data flow for transformation and validation changes.
- Check edge cases: empty, invalid, large, unsupported inputs.
- Check docs for stale claims.
- Prioritize user-visible regressions.

## Examples

```text
High: client/src/pages/tools/JSONConverter.tsx:42 accepts invalid JSON without clearing stale output, so users can copy outdated data after an error.
```

```text
Test gap: conversion behavior changed, but no utility tests cover invalid input.
```

## Checklist

- Findings first.
- Severity assigned.
- File/line evidence included.
- Tests and docs reviewed.
- Open questions listed.
- Summary is brief and secondary.
