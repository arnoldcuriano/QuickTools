export type DelimitedFormat = 'csv' | 'tsv';

const getDelimiter = (format: DelimitedFormat) => (format === 'csv' ? ',' : '\t');

export const parseDelimitedText = (input: string, format: DelimitedFormat) => {
  const text = input.trim();
  if (!text) {
    return [] as string[][];
  }

  const delimiter = getDelimiter(format);
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const nextCharacter = input[index + 1];

    if (inQuotes) {
      if (character === '"') {
        if (nextCharacter === '"') {
          currentCell += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
      continue;
    }

    if (character === delimiter) {
      currentRow.push(currentCell);
      currentCell = '';
      continue;
    }

    if (character === '\r' || character === '\n') {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += character;
  }

  if (inQuotes) {
    throw new Error('Unterminated quoted field.');
  }

  currentRow.push(currentCell);
  rows.push(currentRow);

  return rows;
};

const needsQuoting = (value: string, delimiter: string) =>
  value.includes(delimiter) || value.includes('"') || value.includes('\n') || value.includes('\r');

export const serializeDelimitedRows = (rows: string[][], format: DelimitedFormat) => {
  const delimiter = getDelimiter(format);

  return rows
    .map((row) =>
      row
        .map((cell) => {
          const value = cell ?? '';
          if (!needsQuoting(value, delimiter) && !/^\s|\s$/.test(value)) {
            return value;
          }

          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(delimiter),
    )
    .join('\n');
};

export const convertDelimitedText = (input: string, fromFormat: DelimitedFormat, toFormat: DelimitedFormat) => {
  const rows = parseDelimitedText(input, fromFormat);
  return serializeDelimitedRows(rows, toFormat);
};

export const summarizeDelimitedRows = (rows: string[][]) => ({
  rowCount: rows.length,
  columnCount: rows.reduce((maxColumns, row) => Math.max(maxColumns, row.length), 0),
});
