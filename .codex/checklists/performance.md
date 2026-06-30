# Performance Checklist

Use this checklist for QuickTools changes affecting processing, rendering, bundles, or file handling.

## Browser Processing

- [ ] Transformation logic avoids unnecessary repeated parsing.
- [ ] Large input behavior is considered.
- [ ] Batch limits are explicit.
- [ ] Long-running operations show progress or processing state.
- [ ] Memory-heavy operations release or replace state intentionally.

## React Rendering

- [ ] Component state is minimal.
- [ ] Derived values are not duplicated unnecessarily.
- [ ] Expensive work is not triggered by unrelated state updates.
- [ ] Lists have stable keys.
- [ ] Components are not defined inside components.

## Dependencies And Bundles

- [ ] New dependencies are justified by clear value.
- [ ] Heavy optional code is considered for dynamic import.
- [ ] Barrel imports are avoided for large libraries when direct imports are available.
- [ ] Production build impact is considered.

## UI Motion

- [ ] Animations are subtle.
- [ ] No multiple competing continuous background effects were added.
- [ ] Motion does not affect readability or input responsiveness.

## Verification

- [ ] Normal workflow remains responsive.
- [ ] Large or batch scenario was tested or risk-noted.
- [ ] `npm run build` was run when bundle/import changes occurred.
- [ ] Performance tradeoffs are documented.
