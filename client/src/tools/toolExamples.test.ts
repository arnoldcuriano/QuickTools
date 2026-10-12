import { describe, expect, test } from 'vitest';
import { publishedTools } from '../generated/toolRegistry';
import type { ToolModule } from './types';

const modules = import.meta.glob<{ default: ToolModule }>('./*/index.ts', { eager: true });
const byId = new Map(Object.values(modules).map((module) => [module.default.meta.id, module.default]));

describe('published tool examples', () => {
  test('planned tools are excluded from the runtime registry', () => {
    expect(publishedTools.every((tool) => String(tool.status) !== 'planned')).toBe(true);
  });

  for (const tool of publishedTools) {
    const module = byId.get(tool.id);
    test(`${tool.id} exports a runnable example`, async () => {
      expect(module).toBeDefined();
      expect(module?.examples.length).toBeGreaterThan(0);
      for (const example of module?.examples ?? []) {
        const output = await module!.run(example.input, example.options);
        if (example.validate) expect(example.validate(output)).toBe(true);
        else expect(output).toEqual(example.expected);
      }
    });
  }
});
