# QuickTools Brand Foundation

Status: Phase 1 implemented

Last reviewed: 2026-09-09

## Brand Idea

QuickTools is an open-source professional workbench for useful browser-based tools. It should make technical work feel precise and trustworthy without requiring expert knowledge to navigate.

The product may serve developers, technical writers, students, general users, marketers, and creative teams. This breadth must come from a well-organized tool catalog, not from vague positioning or crowded screens.

## Product Name

The official product name remains **QuickTools**. The interface may use the lowercase **quicktools** wordmark as a visual treatment, but documentation, repository metadata, page titles, and formal references use QuickTools.

Retaining the name preserves repository, deployment, and user recognition. A rename requires a separate naming review covering repository continuity, domain availability, package conflicts, searchability, and trademark risk.

Future naming candidates for formal review:

- **QuickTools Open Workbench**: keeps current recognition and adds a clear category descriptor.
- **Toolframe**: suggests a structured workspace for many tool categories.
- **OpenWorkbench**: emphasizes open source and professional utility, but requires stronger availability review.

Recommendation: use **QuickTools** with the descriptor **Open Workbench** rather than rename during Phase 1.

## Positioning

Primary promise: reliable tools, ready when the user needs them.

Supporting principles:

- Open source and documented.
- Browser-local processing by default when practical.
- Secure handling and explicit validation.
- Professional results without congested controls.
- Useful to specialists while understandable to non-specialists.
- Third-party open-source libraries and external APIs are disclosed accurately.

QuickTools must not claim that all processing is local when a tool uses an external API. Network-backed tools must identify the provider, data sent, authentication requirements, rate limits, geographic coverage, license, and privacy implications before use.

## Voice And Tone

The brand traits are **precise, premium, and technical**.

- Use short, literal labels for actions.
- Explain errors with a cause and a recovery action.
- Avoid exaggerated claims such as "ultimate," "magic," or "military-grade."
- Prefer calm professional language over playful developer slang.
- Introduce technical terms only when they improve accuracy.
- Document source, license, limitations, and processing location for each tool.

## Visual Direction

The preferred direction is a clean professional workbench with equal light and dark mode support.

### Color

Retain the current graphite and amber direction as the starting identity. Amber is more distinctive than the common blue or purple developer-tool palette and communicates focused, premium utility when used sparingly.

- Dark foundation: neutral graphite surfaces, not blue-tinted slate.
- Light foundation: cool neutral white and gray surfaces.
- Primary accent: restrained amber or warm gold for primary actions and focus.
- Information: clear blue.
- Success: green.
- Warning: amber, differentiated from primary actions through icon and copy.
- Danger: red.

Accent color must not carry meaning alone. Text, icons, and state labels remain required.

### Typography

- Interface and display: **Inter**.
- Code, structured data, and technical output: **JetBrains Mono** or a compatible system monospace fallback.
- Use one interface family across headings and body text; hierarchy comes from size and weight.
- Avoid oversized marketing typography inside the workbench.

Inter and JetBrains Mono are loaded by the client runtime with system font fallbacks.

### Spacing And Shape

- Use a 4 px base spacing scale, with 8, 12, 16, 24, 32, and 48 px as common steps.
- Favor breathing room and clear grouping over dense control bars.
- Let editors, previews, and result areas use available width and height.
- Keep controls compact enough to preserve workspace, but never compress labels or touch targets.
- Use restrained corner radii: 6-8 px for controls and up to 12 px for major tool surfaces.
- Avoid decorative nested cards, excessive translucency, and persistent motion.

## Logo Directions

Three directions are approved for visual exploration:

1. **Current Focus Mark**: retain the existing rounded focus/search form and refine its geometry. Lowest migration risk.
2. **Q Workbench Mark**: a Q monogram constructed from a tool window or command prompt frame. Strongest connection to the name.
3. **Modular Transform Mark**: two or four precise modules showing input becoming output. Best representation of a broad tool platform.

Recommendation: refine the current mark first, then compare it with the Q Workbench Mark at favicon, header, repository avatar, and monochrome sizes.

## Product Architecture

The home page remains the discovery and trust surface. Each tool remains on a dedicated route so it can be linked, bookmarked, refreshed, and documented independently.

Tool navigation evolves by catalog size:

- Up to 8 tools: home catalog, categories, search, shared header, and clear return-home navigation.
- 9-24 tools: add a collapsible desktop tool navigator and command search while retaining dedicated routes.
- More than 24 tools: add category navigation, favorites, recent tools, and a full command palette.

Mobile uses a compact header and drawer rather than a permanently visible sidebar.

## Tool Page Standard

Every tool page should provide:

- Product header with home access, theme control, repository link, and tool navigation when justified.
- Breadcrumb or clear back path.
- Tool name, one-sentence purpose, processing-location disclosure, and documentation link.
- A spacious primary workspace sized for the tool's content.
- Predictable input, primary action, output, copy or download, clear, and reset behavior.
- Empty, loading, success, warning, and error states where applicable.
- Keyboard access, visible focus, readable contrast, and reduced-motion support.
- Source and license attribution for embedded open-source engines.
- Provider, privacy, and rate-limit disclosure for API-backed tools.

Controls may be arranged differently when the tool workflow requires it, but action naming and feedback behavior should remain consistent.

## Tool Categories

The planned catalog may grow across these clearly labeled categories:

- Developer and vibe-coding tools.
- Data, markup, and document viewers.
- API, mapping, address, and geographic utilities.
- Writing and technical documentation tools.
- Marketing and creative production tools.
- General conversion and productivity tools.

Category presence is a roadmap direction, not a claim that these tools currently exist.

## Open-Source Standard

QuickTools is distributed under the MIT License. Open-source governance should include:

- A clear contribution path and code of conduct.
- Dependency license review before adoption.
- Attribution where a dependency license or project policy requires it.
- A tool manifest documenting engine, provider, license, processing location, and maintenance owner.
- No copied interface, brand asset, or source code without compatible rights.
- Security reporting instructions and responsible disclosure guidance.

Open source does not remove the need for dependency review, API terms review, privacy disclosure, or maintenance ownership.

## Reference Quality

The intended quality bar draws from:

- Apple: restraint, hierarchy, and clarity.
- GitHub: technical credibility, navigation, and information density control.
- SaaSFrame references: contemporary SaaS composition without copying individual products.

These are quality references, not visual templates.

## Phase 1 Implementation

The runtime now implements the approved graphite and amber themes, Inter and JetBrains Mono typography, persistent light/dark selection, a centralized searchable catalog, category filters, and a responsive shared header. The current focus mark remains in use pending a separate logo comparison milestone.

Tool processing behavior and routes were not changed by the Phase 1 identity work. Legacy tool screens use a shared compatibility layer until their layouts are migrated to reusable workbench components.
