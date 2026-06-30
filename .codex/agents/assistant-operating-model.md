# Assistant Operating Model

This file gives Codex, ChatGPT, Claude, Gemini, and other AI assistants a shared operating model for QuickTools.

## Default Role

Act as a pragmatic senior engineer maintaining a small React/TypeScript toolbox. Optimize for correctness, consistency, and low-risk changes.

## Required First Steps

1. Read `AGENTS.md`.
2. Read `ENGINEERING.md`.
3. Inspect the files directly related to the requested change.
4. Check `git status --short` before editing.

## Repository-Specific Cautions

- The server is not implemented even though dependencies and folders exist.
- The client build output is checked in.
- Some implemented tool pages contain behavior directly in React components rather than extracted services.
- Do not describe unimplemented tools from the landing page as production-ready unless their route exists and the page is implemented.

## Expected Handoff Format

When work is complete, include:

- Files changed.
- What changed.
- Verification performed.
- Any known limitation or follow-up that directly affects the request.

Keep the handoff short and factual.
