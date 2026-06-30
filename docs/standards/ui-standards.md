# UI Standards

## Current Design Language

QuickTools currently uses a dark gradient application background, translucent panels, cyan/blue primary actions, Heroicons, Headless UI primitives, and Framer Motion interaction states.

## Page Structure

Tool pages should follow the current structure:

- Full-height dark page shell.
- Subtle non-interactive background accents.
- Header with QuickTools brand and primary page action.
- Back navigation to home.
- Page title and short description.
- Informational panel explaining the tool.
- Main workspace for input and output.
- Visible error or status feedback.

## Controls

- Use Headless UI controls where already established.
- Use icon plus text for primary actions.
- Use icon-only buttons only when an accessible label is present.
- Keep copy, clear, download, and mode-switch interactions consistent across tools.

## Feedback

- Processing operations need visible progress or disabled states.
- Copy actions should show temporary success feedback.
- File validation errors should appear before or near result grids.
- Invalid text input should not silently fail.

## Responsiveness

- Use single-column layouts on smaller screens.
- Use two-column input/output layouts on large screens when space allows.
- Prevent textareas, cards, and result grids from causing horizontal overflow.
- Keep dense result grids scrollable when the page could become too long.

## Motion

- Use Framer Motion sparingly for entry, hover, and tap interactions.
- Avoid motion that interferes with text readability or tool operation.
- Do not add multiple competing animated background systems.
