import { convertDelimitedText, parseDelimitedText, serializeDelimitedRows } from './delimitedText';

test('parseDelimitedText handles quoted commas', () => {
  const rows = parseDelimitedText('name,role\n"QuickTools, Inc.","Browser app"', 'csv');

  expect(rows).toEqual([
    ['name', 'role'],
    ['QuickTools, Inc.', 'Browser app'],
  ]);
});

test('convertDelimitedText converts csv to tsv', () => {
  const output = convertDelimitedText('name,role\nQuickTools,Browser app', 'csv', 'tsv');

  expect(output).toBe('name\trole\nQuickTools\tBrowser app');
});

test('serializeDelimitedRows quotes cells when needed', () => {
  const output = serializeDelimitedRows([['value,one', 'line two']], 'csv');

  expect(output).toBe('"value,one",line two');
});
import { expect, test } from 'vitest';
