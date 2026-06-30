# SEO Skill

Reusable guidance for search-facing work. QuickTools is currently a Create React App SPA with static metadata only.

Standards reference: follow `docs/architecture/project-ssot.md`, `ENGINEERING.md`, and the SSOT SEO section before applying this skill.

## Best Practices

- Keep product copy accurate to implemented routes and tools.
- Maintain clear title, description, manifest, favicon, and robots files.
- Use semantic headings in page content.
- Keep public metadata aligned with the product name and mission.
- Mark future SEO strategy separately from current behavior.

## Anti-Patterns

- Claiming route-level SEO metadata exists when it does not.
- Keyword stuffing.
- Advertising unimplemented tools as available.
- Adding hidden text for search engines.
- Treating SPA client routing as equivalent to server-rendered SEO.

## Quality Standards

- Metadata is factual.
- Page copy matches implemented features.
- Headings are structured and readable.
- Public assets are valid.
- SEO limitations are documented honestly.

## Optimization Strategies

- Improve static app shell metadata first.
- Align landing page copy with actual route availability.
- Consider static generation or SSR only as a future architecture decision.
- Keep route paths descriptive and stable.

## Examples

```html
<title>QuickTools</title>
<meta name="description" content="Browser tools for developers and writers." />
```

```text
Current: /tools/json-converter exists.
Future: Grammar checker is listed as planned unless implemented.
```

## Checklist

- Metadata matches current product.
- No unimplemented tools are described as live.
- Route names are descriptive.
- Public manifest remains valid.
- SEO strategy reflects SPA limitations.
- Future SEO work is clearly labeled.
