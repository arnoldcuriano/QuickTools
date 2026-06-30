# Knowledgebase: CI, Repository Review, and AI Optimization

## What Changed

QuickTools now includes GitHub Actions, a senior engineering review, an engineering map, and Phase 12 AI optimization files.

The AI optimization layer teaches future Codex sessions how to:

- Load project context consistently.
- Select agents by task type.
- Map workflows to reusable skills.
- Use command-style prompts such as `/feature`, `/bugfix`, `/review`, `/release`, `/refactor`, and `/deploy`.
- Start from a shared repository memory index.

## Why It Changed

The repository now has a complete AI-first engineering workspace. Without an explicit routing and load-order system, future AI assistants could ignore the created agents, workflows, skills, checklists, and templates.

Phase 12 connects those assets into an operating system.

## Current Behavior

Runtime application behavior is unchanged.

The repository now has CI definitions, but local verification found current blockers:

- Unit tests fail because Jest cannot resolve `prettier/parser-babel`.
- Lint fails because no ESLint config exists.
- TypeScript check passes.
- Client build compiles successfully, though the local command timed out after successful output.

## How Future Sessions Should Behave

Future sessions should start with:

1. `AGENTS.md`
2. `docs/architecture/project-ssot.md`
3. `docs/architecture/engineering-map.md`
4. The relevant `.codex/workflows/*.md`
5. The required `.codex/agents/*.md`
6. The required `.codex/skills/*.md`
7. The relevant checklist or template

## Constraints

- Slash-command files are reusable prompt contracts, not executable shell commands.
- No automatic production deployment exists.
- The server remains scaffolded and has no implemented API.
- CI configuration exists, but blockers must be fixed before branch protection should rely on it.
