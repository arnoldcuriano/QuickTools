import type { ReferenceEntry } from '../data/developerReferences';

export type TransformMode = 'encode' | 'decode';
const error = (message: string) => `Error: ${message}`;
const words = (input: string) => input.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];

export const runCharacterCounter = (input: string) => input ? `Characters: ${Array.from(input).length}\nWithout spaces: ${Array.from(input).filter((character) => !/\s/u.test(character)).length}` : error('Enter text to count.');

export const runRemoveExtraSpaces = (input: string) => input ? input.split(/\r?\n/u).map((line) => line.trim().replace(/[ \t]+/gu, ' ')).join('\n').trim() : error('Enter text to clean.');
export const runRemoveLineBreaks = (input: string) => input ? input.trim().replace(/\s*\r?\n+\s*/gu, ' ').replace(/[ \t]+/gu, ' ') : error('Enter text to join.');

export const runAddLineNumbers = (input: string, options: { start: number; separator: string } = { start: 1, separator: '. ' }) => {
  if (!input) return error('Enter text to number.');
  if (!Number.isInteger(options.start)) return error('The starting number must be an integer.');
  return input.split(/\r?\n/u).map((line, index) => `${options.start + index}${options.separator}${line}`).join('\n');
};

export type ReverseMode = 'characters' | 'words' | 'lines';
export const runReverseText = (input: string, options: { mode: ReverseMode } = { mode: 'characters' }) => {
  if (!input) return error('Enter text to reverse.');
  if (options.mode === 'words') return input.split(/(\s+)/u).reverse().join('');
  if (options.mode === 'lines') return input.split(/\r?\n/u).reverse().join('\n');
  return Array.from(input).reverse().join('');
};

export const runTextRepeater = (input: string, options: { count: number; separator: string } = { count: 2, separator: '\n' }) => {
  if (!input) return error('Enter text to repeat.');
  if (!Number.isInteger(options.count) || options.count < 1 || options.count > 100) return error('Repeat count must be an integer from 1 to 100.');
  return Array.from({ length: options.count }, () => input).join(options.separator.replace(/\\n/gu, '\n').replace(/\\t/gu, '\t'));
};

const countSyllables = (word: string) => {
  const value = word.toLowerCase().replace(/[^a-z]/gu, '');
  if (!value) return 0;
  if (value.length <= 3) return 1;
  const stripped = value.replace(/(?:[^l]e|es|ed)$/u, '').replace(/^y/u, '');
  return Math.max(1, stripped.match(/[aeiouy]{1,2}/gu)?.length ?? 1);
};
export const runReadability = (input: string) => {
  const englishWords = input.match(/[A-Za-z]+(?:'[A-Za-z]+)?/gu) ?? [];
  if (!englishWords.length) return error('Enter English text to analyze.');
  const sentenceCount = Math.max(1, input.match(/[.!?]+(?:\s|$)/gu)?.length ?? 0);
  const syllables = englishWords.reduce((total, word) => total + countSyllables(word), 0);
  const ease = 206.835 - 1.015 * (englishWords.length / sentenceCount) - 84.6 * (syllables / englishWords.length);
  const grade = 0.39 * (englishWords.length / sentenceCount) + 11.8 * (syllables / englishWords.length) - 15.59;
  return JSON.stringify({ words: englishWords.length, sentences: sentenceCount, syllables, readingEase: Number(ease.toFixed(1)), gradeLevel: Number(Math.max(0, grade).toFixed(1)) }, null, 2);
};

export const runReadingTime = (input: string, options: { readingWpm: number; speakingWpm: number } = { readingWpm: 200, speakingWpm: 130 }) => {
  const count = words(input).length;
  if (!count) return error('Enter text to estimate.');
  if (options.readingWpm <= 0 || options.speakingWpm <= 0) return error('Words per minute must be greater than zero.');
  return JSON.stringify({ words: count, readingMinutes: Number((count / options.readingWpm).toFixed(2)), speakingMinutes: Number((count / options.speakingWpm).toFixed(2)) }, null, 2);
};

const frequency = (input: string) => {
  const counts = new Map<string, number>();
  for (const word of words(input).map((item) => item.toLocaleLowerCase())) counts.set(word, (counts.get(word) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};
export const runKeywordDensity = (input: string) => {
  const total = words(input).length; if (!total) return error('Enter text to analyze.');
  return JSON.stringify(frequency(input).map(([word, count]) => ({ word, count, density: `${((count / total) * 100).toFixed(2)}%` })), null, 2);
};
export const runWordFrequency = (input: string) => {
  const entries = frequency(input); return entries.length ? entries.map(([word, count]) => `${word}: ${count}`).join('\n') : error('Enter text to count.');
};

export type FancyStyle = 'bold' | 'sans' | 'monospace';
const fancyRanges: Record<FancyStyle, readonly [number, number, number]> = { bold: [0x1d400, 0x1d41a, 0x1d7ce], sans: [0x1d5a0, 0x1d5ba, 0x1d7e2], monospace: [0x1d670, 0x1d68a, 0x1d7f6] };
export const runFancyText = (input: string, options: { style: FancyStyle } = { style: 'bold' }) => {
  if (!input) return error('Enter text to style.');
  const [upper, lower, digit] = fancyRanges[options.style];
  return Array.from(input, (character) => /[A-Z]/u.test(character) ? String.fromCodePoint(upper + character.charCodeAt(0) - 65) : /[a-z]/u.test(character) ? String.fromCodePoint(lower + character.charCodeAt(0) - 97) : /[0-9]/u.test(character) ? String.fromCodePoint(digit + character.charCodeAt(0) - 48) : character).join('');
};

const morsePairs = ['A .-', 'B -...', 'C -.-.', 'D -..', 'E .', 'F ..-.', 'G --.', 'H ....', 'I ..', 'J .---', 'K -.-', 'L .-..', 'M --', 'N -.', 'O ---', 'P .--.', 'Q --.-', 'R .-.', 'S ...', 'T -', 'U ..-', 'V ...-', 'W .--', 'X -..-', 'Y -.--', 'Z --..', '0 -----', '1 .----', '2 ..---', '3 ...--', '4 ....-', '5 .....', '6 -....', '7 --...', '8 ---..', '9 ----.', '. .-.-.-', ', --..--', '? ..--..', '! -.-.--'];
const morse = new Map(morsePairs.map((pair) => [pair.slice(0, pair.indexOf(' ')), pair.slice(pair.indexOf(' ') + 1)]));
const fromMorse = new Map([...morse].map(([key, value]) => [value, key]));
export const runMorseCode = (input: string, options: { mode: TransformMode } = { mode: 'encode' }) => {
  if (!input.trim()) return error('Enter text or Morse code.');
  if (options.mode === 'encode') {
    const characters = Array.from(input.toUpperCase()).filter((character) => !/\s/u.test(character));
    if (characters.some((character) => !morse.has(character))) return error('The text contains a character that is not in this Morse reference.');
    return input.toUpperCase().split(/\s+/u).map((word) => Array.from(word).map((character) => morse.get(character)).join(' ')).join(' / ');
  }
  const codes = input.trim().split(/\s*\/\s*/u).flatMap((word) => word.split(/\s+/u));
  if (codes.some((code) => !fromMorse.has(code))) return error('Enter valid Morse code using dots, dashes and slashes.');
  return input.trim().split(/\s*\/\s*/u).map((word) => word.split(/\s+/u).map((code) => fromMorse.get(code)).join('')).join(' ');
};

const encoder = new TextEncoder(); const decoder = new TextDecoder('utf-8', { fatal: true });
export const runBinaryText = (input: string, options: { mode: TransformMode } = { mode: 'encode' }) => {
  if (!input.trim()) return error('Enter text or binary bytes.');
  if (options.mode === 'encode') return [...encoder.encode(input)].map((byte) => byte.toString(2).padStart(8, '0')).join(' ');
  const bytes = input.trim().split(/\s+/u); if (bytes.some((byte) => !/^[01]{8}$/u.test(byte))) return error('Enter 8-bit binary bytes separated by spaces.');
  try { return decoder.decode(Uint8Array.from(bytes, (byte) => Number.parseInt(byte, 2))); } catch { return error('The binary bytes are not valid UTF-8 text.'); }
};

const shiftLetter = (character: string, shift: number) => {
  const code = character.charCodeAt(0); const base = code >= 97 ? 97 : 65;
  return String.fromCharCode(base + ((code - base + shift) % 26 + 26) % 26);
};
export const runCaesar = (input: string, options: { mode: TransformMode; shift: number } = { mode: 'encode', shift: 13 }) => {
  if (!input) return error('Enter text to transform.');
  if (!Number.isInteger(options.shift)) return error('Shift must be an integer.');
  const shift = options.mode === 'decode' ? -options.shift : options.shift;
  return input.replace(/[A-Za-z]/gu, (character) => shiftLetter(character, shift));
};

export const runVigenere = (input: string, options: { mode: TransformMode; key: string } = { mode: 'encode', key: '' }) => {
  if (!input) return error('Enter text to transform.');
  const key = options.key.replace(/\s/gu, ''); if (!/^[A-Za-z]+$/u.test(key)) return error('Enter a keyword containing letters only.');
  let index = 0; const direction = options.mode === 'decode' ? -1 : 1;
  return input.replace(/[A-Za-z]/gu, (character) => { const shift = key[index++ % key.length].toUpperCase().charCodeAt(0) - 65; return shiftLetter(character, direction * shift); });
};

const small = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const integerWords = (value: number): string => {
  if (value < 20) return small[value];
  if (value < 100) return `${tens[Math.floor(value / 10)]}${value % 10 ? `-${small[value % 10]}` : ''}`;
  if (value < 1000) return `${small[Math.floor(value / 100)]} Hundred${value % 100 ? ` ${integerWords(value % 100)}` : ''}`;
  for (const [size, name] of [[1_000_000_000, 'Billion'], [1_000_000, 'Million'], [1_000, 'Thousand']] as const) if (value >= size) return `${integerWords(Math.floor(value / size))} ${name}${value % size ? ` ${integerWords(value % size)}` : ''}`;
  return small[0];
};
export const runNumberToWords = (input: string) => {
  if (!input.trim()) return error('Enter a whole number from -999999999999 to 999999999999.');
  const value = Number(input); if (!Number.isSafeInteger(value) || Math.abs(value) > 999_999_999_999) return error('Enter a whole number from -999999999999 to 999999999999.');
  return value < 0 ? `Negative ${integerWords(Math.abs(value))}` : integerWords(value);
};

const romanValues = [['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]] as const;
const toRoman = (value: number) => { let remainder = value; let output = ''; for (const [symbol, amount] of romanValues) while (remainder >= amount) { output += symbol; remainder -= amount; } return output; };
export const runRomanNumeral = (input: string, options: { mode: 'to-roman' | 'from-roman' } = { mode: 'to-roman' }) => {
  const value = input.trim().toUpperCase(); if (!value) return error('Enter a number or Roman numeral.');
  if (options.mode === 'to-roman') { const number = Number(value); return Number.isInteger(number) && number >= 1 && number <= 3999 ? toRoman(number) : error('Enter an integer from 1 to 3999.'); }
  if (!/^[MDCLXVI]+$/u.test(value)) return error('Enter a valid Roman numeral.');
  let total = 0; for (let index = 0; index < value.length; index += 1) { const current = romanValues.find(([symbol]) => symbol === value[index])?.[1] ?? 0; const next = romanValues.find(([symbol]) => symbol === value[index + 1])?.[1] ?? 0; total += current < next ? -current : current; }
  return total <= 3999 && toRoman(total) === value ? String(total) : error('Enter a canonical Roman numeral from I to MMMCMXCIX.');
};

const natoWords = ['Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliett', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
export const runNatoPhonetic = (input: string) => input.trim() ? Array.from(input.toUpperCase()).map((character) => /[A-Z]/u.test(character) ? natoWords[character.charCodeAt(0) - 65] : character === ' ' ? '/' : character).join(' ') : error('Enter text to spell.');

export const runHtmlToText = (input: string) => {
  if (!input.trim()) return error('Enter HTML to convert.');
  const document = new DOMParser().parseFromString(input, 'text/html'); document.querySelectorAll('script, style, noscript').forEach((node) => node.remove());
  document.querySelectorAll('br').forEach((node) => node.replaceWith('\n')); document.querySelectorAll('p, div, li, article, section, header, footer, h1, h2, h3, h4, h5, h6').forEach((node) => node.append('\n'));
  return (document.body.textContent ?? '').replace(/[ \t]+/gu, ' ').replace(/\s*\n+\s*/gu, '\n').trim() || error('The HTML does not contain readable text.');
};

const comparable = (input: string) => Array.from(input.normalize('NFKD').toLocaleLowerCase()).filter((character) => /[\p{L}\p{N}]/u.test(character)).join('');
export const runPalindrome = (input: string) => { const value = comparable(input); return value ? value === Array.from(value).reverse().join('') ? 'Palindrome.' : 'Not a palindrome.' : error('Enter letters or numbers to check.'); };
export const runAnagram = (input: { first: string; second: string }) => { const first = Array.from(comparable(input.first)).sort().join(''); const second = Array.from(comparable(input.second)).sort().join(''); return first && second ? first === second ? 'Anagram.' : 'Not an anagram.' : error('Enter two words or phrases to compare.'); };

export const filterTextReference = (entries: readonly ReferenceEntry[], input: string): ReferenceEntry[] | string => {
  const query = input.trim().toLocaleLowerCase(); const matches = entries.filter((entry) => !query || `${entry.key} ${entry.name} ${entry.description}`.toLocaleLowerCase().includes(query));
  return matches.length ? matches : error('No matching entries were found.');
};

export type SocialPlatform = 'x' | 'linkedin' | 'youtube';
export const socialLimits: Record<SocialPlatform, { name: string; limit: number }> = { x: { name: 'X standard post', limit: 280 }, linkedin: { name: 'LinkedIn post', limit: 3000 }, youtube: { name: 'YouTube description', limit: 5000 } };
export const runSocialLimit = (input: string, options: { platform: SocialPlatform } = { platform: 'x' }) => {
  if (!input) return error('Enter text to check.'); const count = Array.from(input).length; const platform = socialLimits[options.platform]; const remaining = platform.limit - count;
  return `${platform.name}: ${count}/${platform.limit} characters\n${remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over limit`}`;
};

const escapeHtml = (input: string) => input.replace(/[&<>"']/gu, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
export const runBionicReading = (input: string) => input.trim() ? input.split(/([\p{L}\p{N}]+)/gu).map((part) => {
  if (!/^[\p{L}\p{N}]+$/u.test(part)) return escapeHtml(part);
  const characters = Array.from(part); const split = Math.ceil(characters.length / 2);
  return `<strong>${escapeHtml(characters.slice(0, split).join(''))}</strong>${escapeHtml(characters.slice(split).join(''))}`;
}).join('') : error('Enter text to convert.');

export const runPesoWords = (input: string) => {
  if (!input.trim()) return error('Enter a peso amount from 0 to 999999999999.99.');
  const value = Number(input); if (!Number.isFinite(value) || value < 0 || value > 999_999_999_999.99) return error('Enter a peso amount from 0 to 999999999999.99.');
  const centavosTotal = Math.round(value * 100); const pesos = Math.floor(centavosTotal / 100); const centavos = centavosTotal % 100;
  const pesoLabel = pesos === 1 ? 'Peso' : 'Pesos'; const centavoText = centavos ? ` and ${integerWords(centavos)} Centavos` : '';
  return `${integerWords(pesos)} ${pesoLabel}${centavoText} Only`;
};
