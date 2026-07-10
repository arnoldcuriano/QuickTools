# Patchnote: Agent Governance and Deployment Foundation

Version intent: PATCH

## Summary

Added a governed QuickTools agent operating model and deployment-readiness documentation so future AI-assisted work is routed, reviewed, verified, and handed off consistently.

## Changes

- Added a Lead Engineer agent for task classification, escalation, and final readiness decisions.
- Added an agent-governed change workflow for non-trivial feature, bug, refactor, deployment, release, documentation, security, and performance work.
- Added an agent governance skill to enforce routing through the correct source-of-truth documents, workflows, review gates, and verification paths.
- Added deployment source-of-truth documentation for the current GitHub-to-Vercel static React deployment model.
- Added a browser tool contract defining expected behavior for QuickTools utilities.
- Added a verification matrix and release gates for documentation, client source, tool behavior, deployment, GitHub Actions, governance, and generated build output.
- Updated AGENTS, project SSOT, engineering map, task routing, workflow-skill map, document load order, and deployment skill references to align with the new governance model.

## User Impact

- Contributors and AI assistants get clearer routing before implementation begins.
- Deployment work now has explicit expectations for local build checks, Vercel status, production root checks, and direct tool route checks.
- Future changes should be easier to review because verification requirements are tied to change type and risk.

## Runtime Impact

- No production application code changed.
- No client or server runtime behavior changed.
- No new backend, API route, database, or deployment provider was introduced.
- Vercel production routes were verified after the governance foundation was pushed.
