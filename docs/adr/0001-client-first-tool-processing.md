# ADR 0001: Client-First Tool Processing

## Status

Accepted

## Context

QuickTools currently implements Base64, JSON, text formatting, and WebP conversion in the React client. The server package exists, but `server/app.js` is empty and no API routes are implemented.

The implemented tools operate on user-provided text and local image files. Keeping this work in the browser avoids unnecessary network transfer and preserves privacy for common utility workflows.

## Decision

QuickTools will treat browser-local processing as the default architecture for tools that can run safely and performantly in the client.

Backend APIs should be introduced only when a tool requires capabilities the browser cannot provide reliably, such as heavy processing, shared persistence, authentication, scheduled jobs, or integrations with external services.

## Consequences

- Client utilities must be written with input validation and browser performance in mind.
- Large or blocking operations may need Web Workers before they need server APIs.
- Server dependencies should not be considered active architecture until routes and app setup exist.
- API contracts must be documented before backend behavior is claimed.

## Verification

- New tools should state whether they are client-only or server-backed.
- Server-backed tools require documentation in `docs/api`.
- Tool tests should cover transformation logic independent of visual rendering when practical.
