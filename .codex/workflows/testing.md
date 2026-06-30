# Testing Workflow

## Entry Requirements

- Affected behavior is identified.
- Test level is selected: unit, component, integration, browser, or smoke.
- Existing test commands are known.
- Any untestable condition is documented.

## Required Agents

- QA
- Frontend or Backend, depending on target
- Performance, for large input or load-sensitive paths
- Security, for validation or abuse-case tests
- Reviewer

## Required Skills

- `testing.md` for test design.
- `playwright.md` for browser smoke and end-to-end checks.
- `react.md` for component behavior.
- `security.md` and `performance.md` for abuse and large-input scenarios.

## Sequence Of Execution

1. QA defines scenarios from acceptance criteria or bug reproduction.
2. Implementation agent adds or updates tests where practical.
3. QA runs targeted and relevant regression tests.
4. Reviewer checks tests for meaningful assertions.
5. Documentation records test strategy changes if workflow standards changed.

## Validation

- Unit tests cover pure utilities.
- Component tests cover user-visible behavior.
- Browser checks cover route and interaction workflows when needed.
- Negative cases cover invalid input and file constraints.
- Test results are reported accurately.

## Exit Criteria

- Relevant tests pass.
- Failed or skipped tests are explained.
- Coverage is appropriate for risk.
- Test artifacts are committed only if intended.

## Expected Artifacts

- Test files or updated test cases.
- Test command output summary.
- Manual verification notes when automation is not practical.

## Quality Gates

- Tests fail for real regressions.
- Tests do not depend on local machine state.
- Assertions target behavior rather than implementation details.
- No claim that unrun tests passed.
