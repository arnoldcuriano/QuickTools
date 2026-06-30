# Performance Review Workflow

## Entry Requirements

- Performance review is requested or change affects heavy processing, rendering, bundles, files, or routes.
- Affected workflow and expected input size are known.
- Current constraints are checked in the SSOT.

## Required Agents

- Performance
- Frontend or Backend, depending on affected area
- QA
- Reviewer
- Architect, if review may change client/server boundaries
- Documentation, if limits or standards change

## Required Skills

- `performance.md` for review strategy.
- `react.md` and `typescript.md` for client performance.
- `testing.md` and `playwright.md` for workflow validation.
- `deployment.md` for build or bundle concerns.

## Sequence Of Execution

1. Performance agent identifies hotspots and input-size assumptions.
2. Implementation agent explains current algorithm or rendering path.
3. QA defines large-input and normal-input scenarios.
4. Performance agent recommends minimal optimizations.
5. Reviewer checks complexity and regression risk.
6. Documentation updates limits, standards, or future plans when needed.

## Validation

- Verify normal workflow remains responsive.
- Check large input or batch scenarios relevant to the change.
- Confirm progress/loading feedback exists for long work.
- Run build if bundle or import changes occurred.
- Note measurements or qualitative evidence.

## Exit Criteria

- Performance risk is reduced or documented.
- Optimization does not add unnecessary complexity.
- User feedback exists for long-running operations.
- Limits are explicit when needed.

## Expected Artifacts

- Performance findings.
- Optimization patch or recommendation.
- Verification notes.
- Updated standards or SSOT limits when changed.

## Quality Gates

- No premature broad rewrites.
- No backend migration without clear bottleneck.
- No heavy dependency added without justification.
- Responsiveness and correctness both preserved.
