export interface RegexMatchInfo {
  index: number;
  start: number;
  end: number;
  text: string;
  groups: string[];
}

export interface RegexAnalysisResult {
  error?: string;
  regex?: RegExp;
  matches: RegexMatchInfo[];
  totalMatches: number;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildRegexFlags = (flags: {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
}) =>
  [
    flags.global ? 'g' : '',
    flags.ignoreCase ? 'i' : '',
    flags.multiline ? 'm' : '',
    flags.dotAll ? 's' : '',
    flags.unicode ? 'u' : '',
    flags.sticky ? 'y' : '',
  ].join('');

export const safeCreateRegex = (pattern: string, flags: string) => {
  if (!pattern.trim()) {
    return { error: 'Enter a regular expression pattern.' };
  }

  try {
    return { regex: new RegExp(pattern, flags) };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown regex error';
    return { error: `Invalid regular expression: ${message}` };
  }
};

export const analyseRegexText = (text: string, pattern: string, flags: string): RegexAnalysisResult => {
  const compiled = safeCreateRegex(pattern, flags);
  if (compiled.error || !compiled.regex) {
    return {
      error: compiled.error,
      matches: [],
      totalMatches: 0,
    };
  }

  const matches: RegexMatchInfo[] = [];
  const regex = compiled.regex;
  const sourceText = text ?? '';

  if (!regex.global) {
    const singleMatch = regex.exec(sourceText);
    if (singleMatch) {
      matches.push({
        index: singleMatch.index,
        start: singleMatch.index,
        end: singleMatch.index + singleMatch[0].length,
        text: singleMatch[0],
        groups: singleMatch.slice(1),
      });
    }
  } else {
    let currentMatch: RegExpExecArray | null;
    regex.lastIndex = 0;

    while ((currentMatch = regex.exec(sourceText)) !== null) {
      matches.push({
        index: currentMatch.index,
        start: currentMatch.index,
        end: currentMatch.index + currentMatch[0].length,
        text: currentMatch[0],
        groups: currentMatch.slice(1),
      });

      if (currentMatch[0].length === 0) {
        regex.lastIndex += 1;
      }
    }
  }

  return {
    regex,
    matches,
    totalMatches: matches.length,
  };
};

export const splitTextByMatches = (text: string, matches: RegexMatchInfo[]) => {
  const segments: Array<{ text: string; matched: boolean; key: string }> = [];
  const orderedMatches = [...matches].sort((left, right) => left.start - right.start);
  let cursor = 0;

  orderedMatches.forEach((match, index) => {
    if (match.start > cursor) {
      segments.push({
        text: text.slice(cursor, match.start),
        matched: false,
        key: `text-${cursor}-${match.start}`,
      });
    }

    segments.push({
      text: text.slice(match.start, match.end),
      matched: true,
      key: `match-${index}-${match.start}-${match.end}`,
    });

    cursor = Math.max(cursor, match.end);
  });

  if (cursor < text.length) {
    segments.push({
      text: text.slice(cursor),
      matched: false,
      key: `text-${cursor}-${text.length}`,
    });
  }

  if (segments.length === 0) {
    segments.push({
      text,
      matched: false,
      key: 'text-0-0',
    });
  }

  return segments;
};

export const escapeRegexSample = escapeRegExp;
