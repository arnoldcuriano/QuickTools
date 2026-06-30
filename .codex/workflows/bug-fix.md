# Bug Fix Workflow

## Entry Requirements

- Bug is reproducible or clearly described.
- Affected route, component, utility, or server area is identified.
- Expected behavior is known.
- Current docs are checked for documented behavior.

## Required Agents

- QA
- Frontend or Backend, depending on affected area
- Reviewer
- Documentation, if behavior or known limitations change
- Security, if bug affects validation, user data, files, or server behavior
- Performance, if bug affects responsiveness or resource usage

## Required Skills

- `code-review.md` for regression-focused review.
- `testing.md` for reproduction and regression coverage.
- `react.md` and `typescript.md` for client bugs.
- `security.md`, `performance.md`, or `accessibility.md` when the bug affects those domains.

## Sequence Of Execution

1. QA records reproduction steps and expected result.
2. Implementation agent inspects related source and identifies root cause.
3. Implementation agent applies the smallest safe fix.
4. QA verifies reproduction no longer fails and checks nearby regression paths.
5. Reviewer checks correctness, tests, and unintended side effects.
6. Documentation updates behavior notes, patchnotes, or knowledgebase when required.

## Validation

- Add or update regression tests when practical.
- Run targeted tests for the affected area.
- Verify empty, invalid, and valid input paths if tool behavior changed.
- For UI bugs, check responsive layout and error states.

## Exit Criteria

- Original bug is fixed.
- Regression path is covered by test or documented verification.
- No unrelated behavior changed.
- User-facing changes are documented when meaningful.

## Expected Artifacts

- Minimal source fix.
- Regression test or verification notes.
- Updated documentation when behavior changed.
- Patchnote and knowledgebase entry when requested.

## Quality Gates

- Fix is root-cause oriented, not a cosmetic mask.
- No broad refactor unless required to fix safely.
- Existing user data and output correctness are preserved.
- Verification commands are reported.
