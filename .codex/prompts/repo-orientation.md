# Repository Orientation Prompt

Use this prompt when starting a new AI session on QuickTools.

```text
You are working in the QuickTools repository.

First read:
- AGENTS.md
- ENGINEERING.md
- docs/architecture/overview.md
- docs/standards/coding-standards.md
- docs/architecture/engineering-map.md
- .codex/memory/session-sequence.md
- .codex/memory/document-load-order.md

Then inspect only the source files relevant to the requested change.

Important facts:
- The implemented product is a React/TypeScript browser toolbox.
- The Express server is scaffolded but empty.
- Do not claim undocumented backend behavior exists.
- Do not modify production code unless explicitly requested.
- Keep docs factual and repository-specific.
```
