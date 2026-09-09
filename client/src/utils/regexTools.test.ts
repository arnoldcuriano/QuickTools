import { analyseRegexText, buildRegexFlags, safeCreateRegex, splitTextByMatches } from './regexTools';

test('safeCreateRegex rejects invalid patterns', () => {
  const result = safeCreateRegex('[', 'g');

  expect(result.error).toMatch(/Invalid regular expression/i);
});

test('analyseRegexText captures matches and groups', () => {
  const analysis = analyseRegexText('QuickTools runs. QuickTools stays local.', '\\b(QuickTools)\\b', 'g');

  expect(analysis.error).toBeUndefined();
  expect(analysis.totalMatches).toBe(2);
  expect(analysis.matches[0].groups).toEqual(['QuickTools']);
});

test('splitTextByMatches highlights matched ranges', () => {
  const segments = splitTextByMatches('abc123xyz', [
    { index: 0, start: 3, end: 6, text: '123', groups: [] },
  ]);

  expect(segments).toEqual([
    { text: 'abc', matched: false, key: 'text-0-3' },
    { text: '123', matched: true, key: 'match-0-3-6' },
    { text: 'xyz', matched: false, key: 'text-6-9' },
  ]);
});

test('buildRegexFlags assembles enabled flags', () => {
  expect(
    buildRegexFlags({
      global: true,
      ignoreCase: true,
      multiline: false,
      dotAll: true,
      unicode: false,
      sticky: false,
    }),
  ).toBe('gis');
});
import { expect, test } from 'vitest';
