# Release Checklist

Use this checklist before preparing QuickTools release notes or deployment handoff.

## Scope Control

- [ ] Release scope is listed.
- [ ] Version intent is identified: MAJOR, MINOR, or PATCH.
- [ ] Runtime impact is known.
- [ ] Documentation-only changes are marked as no runtime impact.
- [ ] Unrelated changes are excluded.

## Verification

- [ ] Relevant tests passed or skipped checks are explained.
- [ ] `npm run build` passed for client release changes.
- [ ] Implemented routes still match `client/src/App.tsx`.
- [ ] No server runtime is claimed while `server/app.js` remains empty.
- [ ] Generated build output is included only if intentionally refreshed.

## Review

- [ ] Reviewer findings are resolved or explicitly accepted.
- [ ] QA validation is complete.
- [ ] Security review is complete for user input, files, backend, or dependency changes.
- [ ] Performance review is complete for heavy processing or bundle changes.
- [ ] Accessibility and SEO checks are complete for public UI/copy changes.

## Documentation

- [ ] Patchnote is concise and user-focused.
- [ ] Knowledgebase entry reflects actual behavior.
- [ ] SSOT is still canonical.
- [ ] API docs match backend reality.
- [ ] Roadmap is updated if feature status changed.

## Final Handoff

- [ ] Changed files are summarized.
- [ ] Verification commands are summarized.
- [ ] Known risks are stated.
- [ ] `git status --short` was reviewed.
