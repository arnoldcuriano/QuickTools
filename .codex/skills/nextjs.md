# Next.js Skill

Reusable guidance for agents working in a Next.js codebase. QuickTools does not currently use Next.js; apply this only if the repository migrates or a separate Next.js package is added.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and `docs/standards/coding-standards.md` before applying this skill.

## Best Practices

- Use the App Router unless project constraints require Pages Router.
- Keep Server Components as the default and mark Client Components with `"use client"` only when hooks, browser APIs, or event handlers are required.
- Fetch data as close to the route segment as practical and parallelize independent requests.
- Use route handlers for server-only API behavior and validate all request input.
- Keep secrets server-side; only expose values intentionally prefixed for the browser.
- Use metadata APIs for titles, descriptions, canonical URLs, and Open Graph data.

## Anti-Patterns

- Marking entire route trees as client components by default.
- Waterfalling independent data fetches.
- Passing large serialized objects from server to client components.
- Using client-side redirects or auth checks as security boundaries.
- Storing secrets in public environment variables.
- Adding route handlers without validation and error response contracts.

## Quality Standards

- Route behavior is documented.
- Loading, error, and not-found states exist where relevant.
- Server-only code is not imported into client components.
- Data fetching, caching, and revalidation choices are explicit.
- Authentication and authorization are enforced server-side.

## Optimization Strategies

- Start independent promises early and await late.
- Use dynamic imports for heavy client-only components.
- Keep client bundles small by moving non-interactive UI to Server Components.
- Use caching deliberately: static rendering, revalidation, or no-store based on data volatility.
- Avoid barrel imports for large component or icon libraries.

## Examples

```tsx
// Prefer parallel independent fetches.
const userPromise = getUser();
const toolsPromise = getTools();

const [user, tools] = await Promise.all([userPromise, toolsPromise]);
```

```tsx
// Client component only when needed.
"use client";

import { useState } from "react";
```

## Checklist

- Server/client boundary is intentional.
- Route has loading/error handling where needed.
- Metadata is accurate.
- Secrets remain server-side.
- Data fetching avoids avoidable waterfalls.
- Auth checks are server-enforced.
- Build and route smoke tests pass.
