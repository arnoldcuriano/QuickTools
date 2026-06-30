# /review

Use when the user asks for review.

## Load

1. `AGENTS.md`
2. `docs/architecture/project-ssot.md`
3. `docs/architecture/engineering-map.md`
4. `.codex/agents/reviewer.md`
5. `.codex/skills/code-review.md`
6. `.codex/checklists/pull-request.md`

## Agents

- reviewer
- QA

Conditional:

- architect
- security
- performance
- documentation

## Output Format

- Findings first, ordered by severity.
- File and line references where possible.
- Open questions.
- Brief summary only after findings.
