export interface JsonDifference {
  path: string;
  kind: 'added' | 'removed' | 'changed';
  leftValue: unknown;
  rightValue: unknown;
}

export interface JsonCompareSummary {
  added: number;
  removed: number;
  changed: number;
  total: number;
  identical: boolean;
}

export interface JsonCompareResult {
  error?: string;
  summary: JsonCompareSummary;
  differences: JsonDifference[];
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const toPath = (base: string, key: string | number) =>
  base === '$' ? `$.${key}` : typeof key === 'number' ? `${base}[${key}]` : `${base}.${key}`;

const compareValues = (
  leftValue: unknown,
  rightValue: unknown,
  path: string,
  differences: JsonDifference[],
) => {
  if (Object.is(leftValue, rightValue)) {
    return;
  }

  const leftIsArray = Array.isArray(leftValue);
  const rightIsArray = Array.isArray(rightValue);

  if (leftIsArray && rightIsArray) {
    const maxLength = Math.max(leftValue.length, rightValue.length);
    for (let index = 0; index < maxLength; index += 1) {
      const hasLeft = index in leftValue;
      const hasRight = index in rightValue;

      if (!hasLeft && hasRight) {
        differences.push({
          path: toPath(path, index),
          kind: 'added',
          leftValue: undefined,
          rightValue: rightValue[index],
        });
        continue;
      }

      if (hasLeft && !hasRight) {
        differences.push({
          path: toPath(path, index),
          kind: 'removed',
          leftValue: leftValue[index],
          rightValue: undefined,
        });
        continue;
      }

      compareValues(leftValue[index], rightValue[index], toPath(path, index), differences);
    }
    return;
  }

  const leftIsObject = isPlainObject(leftValue);
  const rightIsObject = isPlainObject(rightValue);

  if (leftIsObject && rightIsObject) {
    const keys = new Set([...Object.keys(leftValue), ...Object.keys(rightValue)]);
    keys.forEach((key) => {
      const hasLeft = Object.prototype.hasOwnProperty.call(leftValue, key);
      const hasRight = Object.prototype.hasOwnProperty.call(rightValue, key);

      if (!hasLeft && hasRight) {
        differences.push({
          path: toPath(path, key),
          kind: 'added',
          leftValue: undefined,
          rightValue: rightValue[key],
        });
        return;
      }

      if (hasLeft && !hasRight) {
        differences.push({
          path: toPath(path, key),
          kind: 'removed',
          leftValue: leftValue[key],
          rightValue: undefined,
        });
        return;
      }

      compareValues(leftValue[key], rightValue[key], toPath(path, key), differences);
    });
    return;
  }

  differences.push({
    path,
    kind: 'changed',
    leftValue,
    rightValue,
  });
};

const parseJson = (value: string, label: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { error: `${label} JSON is empty.` };
  }

  try {
    return { value: JSON.parse(trimmed) as unknown };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown JSON error';
    return { error: `${label} JSON is invalid: ${message}` };
  }
};

export const compareJsonTexts = (leftText: string, rightText: string): JsonCompareResult => {
  const left = parseJson(leftText, 'Left');
  if (left.error) {
    return {
      error: left.error,
      summary: { added: 0, removed: 0, changed: 0, total: 0, identical: false },
      differences: [],
    };
  }

  const right = parseJson(rightText, 'Right');
  if (right.error) {
    return {
      error: right.error,
      summary: { added: 0, removed: 0, changed: 0, total: 0, identical: false },
      differences: [],
    };
  }

  const differences: JsonDifference[] = [];
  compareValues(left.value, right.value, '$', differences);

  const summary = differences.reduce<JsonCompareSummary>(
    (accumulator, difference) => {
      if (difference.kind === 'added') {
        accumulator.added += 1;
      } else if (difference.kind === 'removed') {
        accumulator.removed += 1;
      } else {
        accumulator.changed += 1;
      }

      accumulator.total += 1;
      accumulator.identical = accumulator.total === 0;
      return accumulator;
    },
    { added: 0, removed: 0, changed: 0, total: 0, identical: true },
  );

  return {
    summary,
    differences,
  };
};

export const formatJsonCompareValue = (value: unknown) => {
  if (value === undefined) {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
};
