# Phase 1 Brand And Catalog

Last reviewed: 2026-09-09

## What Changed

QuickTools now presents its implemented tools through a centralized catalog on the home page. Users can search by name, description, category, or tag and filter the results by Developer, Data, Content, or Media.

The interface supports persistent light and dark themes. An explicit selection is stored in the browser and remains active across tool navigation and reloads. When no selection exists, QuickTools follows the operating-system preference.

## Identity

- Formal name: QuickTools.
- Interface descriptor: Open Workbench.
- Interface font: Inter with system fallbacks.
- Technical content font: JetBrains Mono with monospace fallbacks.
- Visual foundation: neutral graphite and cool-gray surfaces with restrained amber accents.
- License: MIT.

## Architecture

`client/src/data/toolCatalog.ts` is the canonical source for home-page tool metadata. A tool must have a working route before it is added to this catalog.

The shared header owns home navigation, theme control, and the GitHub repository link. Tool processing remains client-local and was not changed by this milestone.

## Validation

- Catalog search, category filtering, and theme persistence have automated interaction coverage.
- Every implemented route is scanned for serious and critical Axe findings in both themes.
- The home page is checked at 320 px, 768 px, and 1440 px for visibility and horizontal overflow.
