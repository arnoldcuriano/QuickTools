import { compareJsonTexts } from './jsonCompare';

test('compareJsonTexts reports added and changed values', () => {
  const result = compareJsonTexts(
    '{"name":"QuickTools","version":1}',
    '{"name":"QuickTools","version":2,"theme":"dark"}',
  );

  expect(result.error).toBeUndefined();
  expect(result.summary).toEqual({
    added: 1,
    removed: 0,
    changed: 1,
    total: 2,
    identical: false,
  });
  expect(result.differences).toHaveLength(2);
});

test('compareJsonTexts rejects invalid input', () => {
  const result = compareJsonTexts('{invalid', '{"name":"QuickTools"}');

  expect(result.error).toMatch(/Left JSON is invalid/i);
  expect(result.differences).toHaveLength(0);
});
import { expect, test } from 'vitest';
