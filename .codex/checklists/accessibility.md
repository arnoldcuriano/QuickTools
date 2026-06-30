# Accessibility Checklist

Use this checklist for QuickTools UI changes.

## Keyboard

- [ ] All interactive controls are keyboard reachable.
- [ ] Focus order follows the visual workflow.
- [ ] Focus states are visible on dark backgrounds.
- [ ] Dialogs, dropdowns, or overlays trap and restore focus when applicable.

## Labels

- [ ] Inputs have visible labels or accessible names.
- [ ] Icon-only buttons have `aria-label` or equivalent accessible text.
- [ ] Hidden file inputs have accessible labels.
- [ ] Buttons use real `button` elements or accessible primitives.

## Feedback

- [ ] Error messages are visible text.
- [ ] Error states are not color-only.
- [ ] Loading or processing states are announced visually and do not block understanding.
- [ ] Copy/download success states are clear.

## Visual Accessibility

- [ ] Text contrast remains readable on dark gradient backgrounds.
- [ ] Text does not overlap controls or cards.
- [ ] Layout works at mobile and desktop widths.
- [ ] Motion is subtle and not required to understand the page.

## Content

- [ ] Headings follow logical hierarchy.
- [ ] Link text describes destination.
- [ ] Form instructions are concise and near the control.
- [ ] Decorative icons do not create screen reader noise.

## Verification

- [ ] Keyboard smoke test completed.
- [ ] Responsive layout checked.
- [ ] Accessibility impact is summarized in handoff.
