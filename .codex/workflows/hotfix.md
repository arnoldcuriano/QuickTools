# Hotfix Workflow

## Entry Requirements

- Issue is production-impacting or time-critical.
- Impact, affected users, and severity are known.
- Minimal fix path is identified.
- Nonessential changes are explicitly out of scope.

## Required Agents

- Product Manager
- QA
- Relevant implementation agent: Frontend or Backend
- Reviewer
- Release
- Deployment, if deployment is required
- Security, if data exposure, files, auth, or input validation is involved

## Required Skills

- `testing.md` for fast reproduction and fix validation.
- `git.md` for scope control.
- `code-review.md` for focused review.
- `security.md` when the hotfix touches sensitive behavior.
- `deployment.md` when a release artifact or deployment handoff is required.

## Sequence Of Execution

1. Product Manager confirms severity and user impact.
2. QA captures fast reproduction and success criteria.
3. Implementation agent applies the smallest safe fix.
4. Reviewer performs focused review for correctness and regressions.
5. QA verifies the fix and critical adjacent flows.
6. Release prepares hotfix notes.
7. Deployment handles deployment steps when infrastructure exists.
8. Documentation records patchnote/knowledgebase updates after stabilization.

## Validation

- Reproduction path passes.
- Critical adjacent workflows pass.
- Targeted tests run where practical.
- Build runs if release artifact is affected.

## Exit Criteria

- Production-impacting issue is resolved.
- Fix is minimal and low risk.
- Deployment or handoff notes are complete.
- Follow-up cleanup is tracked separately.

## Expected Artifacts

- Minimal fix.
- Hotfix verification notes.
- Release note or patchnote.
- Follow-up issue list if deeper refactor is deferred.

## Quality Gates

- No opportunistic refactors.
- No broad dependency upgrades unless required for the hotfix.
- Risk is lower after fix than before.
- Documentation distinguishes emergency fix from future cleanup.
