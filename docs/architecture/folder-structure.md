# Folder Structure

```text
.
|-- .codex/
|   |-- agents/
|   |-- checklists/
|   |-- commands/
|   |-- memory/
|   |-- prompts/
|   |-- skills/
|   |-- templates/
|   `-- workflows/
|-- .github/
|   |-- workflows/
|   `-- ISSUE_TEMPLATE/
|-- client/
|   |-- build/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- utils/
|   |   |-- App.tsx
|   |   |-- index.css
|   |   `-- index.tsx
|   |-- package.json
|   |-- tailwind.config.js
|   `-- tsconfig.json
|-- docs/
|   |-- adr/
|   |-- api/
|   |-- architecture/
|   |-- knowledgebase/
|   |-- patchnotes/
|   |-- roadmap/
|   `-- standards/
|-- server/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- app.js
|   `-- package.json
|-- AGENTS.md
|-- CONTRIBUTING.md
|-- ENGINEERING.md
|-- LICENSE
`-- README.md
```

## Ownership

- `.codex`: AI-assistant operating context, command contracts, reusable prompts, memory, workflows, skills, templates, agents, and checklists.
- `.github`: GitHub issue templates, pull request template, discussions guidance, labels documentation, and Actions workflows.
- `client`: Implemented React application.
- `docs`: Durable engineering, architecture, API, roadmap, and standards documentation.
- `server`: Reserved backend package; currently scaffolded only.

## Source vs Generated Files

- `client/src` is source.
- `client/public` contains static public assets.
- `client/build` is generated build output currently present in the repo.
- `node_modules` directories are local dependency installs and should not be treated as source.
