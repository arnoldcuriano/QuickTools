import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const allowedColorFiles = new Set(['index.css', 'data/designTokens.ts']);
const supported = new Set(['.css', '.js', '.mjs', '.ts', '.tsx']);
const failures = [];

const visit = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) visit(path);
    else if (supported.has(extname(path))) {
      const file = relative(root, path).replaceAll('\\', '/');
      const source = readFileSync(path, 'utf8');
      const colorSource = file === 'data/designTokens.ts'
        ? ''
        : allowedColorFiles.has(file) ? source.replace(/^\s*--[\w-]+:\s*#[0-9a-f]{3,8};.*$/gim, '') : source;
      if (/#[0-9a-f]{3,8}\b/i.test(colorSource)) failures.push(`${file}: hardcoded hex color`);
      if (/\bblue\b/i.test(source)) failures.push(`${file}: color keyword blue`);
      if (/box-shadow\s*:|\bboxShadow\b/i.test(source)) failures.push(`${file}: box-shadow`);
      if (/(?:linear|radial|conic)-gradient\s*\(/i.test(source)) failures.push(`${file}: gradient`);
    }
  }
};

visit(root);
if (failures.length) {
  console.error(`Design token violations:\n${failures.join('\n')}`);
  process.exitCode = 1;
}
