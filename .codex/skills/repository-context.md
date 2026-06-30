# Repository Context Skill

Use this context when an assistant needs to orient itself in QuickTools.

## Product

QuickTools is a browser utility collection for developers and writers. Current implemented tools include:

- Base64 encoder/decoder.
- Text formatter for JSON, XML, HTML, and plain text.
- WebP converter for JPG/PNG batches up to 20 files.
- JSON beautifier/minifier.

## Implementation Shape

- `client/src/App.tsx` defines routes.
- `client/src/pages/Home.tsx` renders the landing page and links to implemented tools.
- `client/src/pages/tools` contains routed tool pages.
- `client/src/utils/jsonConverter.ts` contains JSON conversion logic.
- `client/src/utils/formatFileSize.ts` formats byte sizes for image tooling.
- `client/src/components/ui/ImagePreviewCard.tsx` renders converted image previews.

## Existing Patterns to Follow

- Functional components with hooks.
- Tailwind utility classes.
- Headless UI `Button`, `Textarea`, and `Listbox`.
- Heroicons outline icons.
- Framer Motion variants for entry and interaction animation.
- User-facing error messages near the affected workspace.

## Existing Gaps

- Backend is scaffolded but empty.
- Test coverage is minimal.
- Landing page lists some tools that are not implemented as routes.
- Some text appears with encoding artifacts in existing source.
- Shared layout patterns are duplicated across tool pages.
