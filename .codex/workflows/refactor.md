# Refactor Workflow

## Entry Requirements

- Refactor goal is stated: duplication, readability, testability, performance, or architecture clarity.
- Existing behavior to preserve is understood.
- Affected files and boundaries are identified.
- Risk level is assessed before editing.

## Required Agents

- Architect
- Frontend or Backend, depending on affected code
- QA
- Reviewer
- Documentation, if architecture or standards change
- Performance, if refactor targets or risks performance-sensitive code

## Required Skills

- `refactoring.md` for behavior-preserving change rules.
- `code-review.md` for review criteria.
- `testing.md` for equivalence validation.
- `react.md`, `typescript.md`, and `tailwind.md` when client code is involved.

## Sequence Of Execution

1. Architect confirms the refactor is justified and bounded.
2. QA identifies behavior that must remain unchanged.
3. Implementation agent makes incremental, reviewable changes.
4. Tests are added or run to prove behavior preservation.
5. Reviewer checks for accidental behavior changes or unnecessary abstraction.
6. Documentation updates architecture or standards if ownership boundaries changed.

## Validation

- Compare behavior before and after where practical.
- Run tests covering affected workflows.
- Run build for import, type, or bundling changes.
- Check generated output only if explicitly part of the task.

## Exit Criteria

- Behavior is preserved.
- Code is simpler, clearer, or more testable.
- No unrelated redesign or feature work is included.
- Documentation is updated if architecture changed.

## Expected Artifacts

- Refactored source.
- Tests or verification notes.
- Updated architecture docs or ADR when relevant.

## Quality Gates

- Refactor has measurable maintenance value.
- Abstractions have real call sites.
- Public routes and user workflows remain stable.
- Review confirms no hidden behavior change.
