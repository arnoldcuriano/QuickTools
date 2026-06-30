# Documentation Checklist

Use this checklist for root docs, `.codex`, `docs`, and GitHub templates.

## Accuracy

- [ ] Documentation reflects current repository behavior.
- [ ] Future plans are clearly labeled.
- [ ] No placeholders remain.
- [ ] No unimplemented APIs, routes, auth, database, deployment, or tools are claimed.
- [ ] Route list matches `client/src/App.tsx`.

## Structure

- [ ] SSOT remains canonical.
- [ ] Related docs do not conflict.
- [ ] File name is lowercase kebab-case unless convention requires otherwise.
- [ ] Markdown headings are clear.
- [ ] Links and paths are valid.

## Usefulness

- [ ] Document answers the workflow or engineering question directly.
- [ ] Requirements are actionable.
- [ ] Checklists use checkboxes.
- [ ] Templates are immediately usable.
- [ ] Agent/workflow docs identify responsibilities and gates.

## Review

- [ ] Consistency reviewed against source files where relevant.
- [ ] `git status --short` reviewed.
- [ ] Production code was not modified for documentation-only work.
- [ ] Patchnote/knowledgebase requirement was evaluated.
