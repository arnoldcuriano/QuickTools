import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const tools = JSON.parse(readFileSync(resolve(root, 'src/data/tools-backlog.json'), 'utf8').replace(/^\uFEFF/, ''));
const seen = new Set();
const failures = [];

for (const tool of tools) {
  if (seen.has(tool.id)) failures.push(`duplicate id: ${tool.id}`);
  seen.add(tool.id);
  if ((tool.status === 'existing' || tool.status === 'live') && !existsSync(resolve(root, `src/tools/${tool.id}/index.ts`))) {
    failures.push(`published tool has no module: ${tool.id}`);
  }
}

if (failures.length) {
  console.error(`Tool registry violations:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${tools.length} registry entries and ${tools.filter((tool) => tool.status === 'existing' || tool.status === 'live').length} published modules.`);
