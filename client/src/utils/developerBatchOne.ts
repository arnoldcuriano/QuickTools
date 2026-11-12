import type { ReferenceEntry } from '../data/developerReferences';

export type EncodeMode = 'encode' | 'decode';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8', { fatal: true });
const error = (message: string) => `Error: ${message}`;

const entityMap: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const runHtmlEntities = (input: string, options: { mode: EncodeMode } = { mode: 'encode' }) => {
  if (!input) return error('Enter text to transform.');
  if (options.mode === 'encode') return input.replace(/[&<>"']/gu, (character) => entityMap[character] ?? character);
  return input.replace(/&(?:amp|lt|gt|quot|apos|#39|#(\d+)|#x([\da-f]+));/giu, (entity, decimal?: string, hexadecimal?: string) => {
    if (decimal || hexadecimal) {
      const point = Number.parseInt(decimal ?? hexadecimal ?? '', hexadecimal ? 16 : 10);
      return Number.isSafeInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#39;': "'" } as Record<string, string>)[entity.toLowerCase()] ?? entity;
  });
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/gu, '+').replace(/_/gu, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(normalized);
  return textDecoder.decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
};
export const runJwtDecoder = (input: string) => {
  const parts = input.trim().split('.');
  if (parts.length !== 3 || parts.some((part) => !part)) return error('Enter a JWT with three dot-separated sections.');
  try {
    const header = JSON.parse(decodeBase64Url(parts[0])); const payload = JSON.parse(decodeBase64Url(parts[1]));
    return JSON.stringify({ header, payload }, null, 2);
  } catch {
    return error('The JWT header or payload is not valid Base64URL JSON.');
  }
};

export type HmacAlgorithm = 'SHA-256' | 'SHA-512';
export const runHmac = async (input: string, options: { secret: string; algorithm: HmacAlgorithm } = { secret: '', algorithm: 'SHA-256' }) => {
  if (!input) return error('Enter text to sign.');
  if (!options.secret) return error('Enter a secret key.');
  try {
    const key = await crypto.subtle.importKey('raw', textEncoder.encode(options.secret), { name: 'HMAC', hash: options.algorithm }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(input));
    return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    return error('WebCrypto could not generate the HMAC.');
  }
};

const transformCss = (input: string, compact: boolean) => {
  let output = ''; let quote = ''; let comment = false; let whitespace = false; let depth = 0;
  const indent = () => '  '.repeat(Math.max(0, depth));
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]; const next = input[index + 1];
    if (comment) { if (character === '*' && next === '/') { comment = false; index += 1; } continue; }
    if (!quote && character === '/' && next === '*') { comment = true; index += 1; continue; }
    if (quote) { output += character; if (character === '\\' && next) output += input[++index]; else if (character === quote) quote = ''; continue; }
    if (character === '"' || character === "'") { if (whitespace && output && !/[\s{(:,;]/u.test(output.at(-1) ?? '')) output += ' '; whitespace = false; quote = character; output += character; continue; }
    if (/\s/u.test(character)) { whitespace = true; continue; }
    if (compact) {
      if (whitespace && output && !/[{}:;,>+~(]/u.test(character) && !/[{}:;,>+~(]/u.test(output.at(-1) ?? '')) output += ' ';
      whitespace = false; output += character; continue;
    }
    if (character === '{') { output = output.trimEnd() + ' {\n'; depth += 1; output += indent(); }
    else if (character === '}') { depth -= 1; output = output.trimEnd() + `\n${indent()}}`; if (next && next !== ';') output += '\n' + indent(); }
    else if (character === ';') output = output.trimEnd() + ';\n' + indent();
    else { if (whitespace && output && !output.endsWith('\n') && !/[(:,]/u.test(character) && !/[(:,]/u.test(output.at(-1) ?? '')) output += ' '; output += character; }
    whitespace = false;
  }
  if (quote) return error('The CSS contains an unterminated string.');
  if (comment) return error('The CSS contains an unterminated comment.');
  if (depth !== 0) return error('The CSS has unbalanced braces.');
  return output.trim();
};
export const runCssFormatter = (input: string, options: { mode: 'beautify' | 'minify' } = { mode: 'beautify' }) => input.trim() ? transformCss(input, options.mode === 'minify') : error('Enter CSS to format.');

export const filterReference = (entries: readonly ReferenceEntry[], input: string): ReferenceEntry[] | string => {
  const query = input.trim().toLowerCase();
  const matches = entries.filter((entry) => !query || `${entry.key} ${entry.name} ${entry.description}`.toLowerCase().includes(query));
  return query && !matches.length ? error('No matching entries were found.') : matches;
};

export const runChmod = (input: string, options: { mode: 'to-octal' | 'to-symbolic' } = { mode: 'to-symbolic' }) => {
  const value = input.trim();
  if (!value) return error('Enter an octal or symbolic permission value.');
  if (options.mode === 'to-symbolic') {
    if (!/^[0-7]{3}$/u.test(value)) return error('Enter exactly three octal digits from 0 through 7.');
    return [...value].map((digit) => { const number = Number(digit); return `${number & 4 ? 'r' : '-'}${number & 2 ? 'w' : '-'}${number & 1 ? 'x' : '-'}`; }).join('');
  }
  if (!/^[r-][w-][x-][r-][w-][x-][r-][w-][x-]$/u.test(value)) return error('Enter nine symbolic permission characters.');
  return [0, 3, 6].map((offset) => String((value[offset] === 'r' ? 4 : 0) + (value[offset + 1] === 'w' ? 2 : 0) + (value[offset + 2] === 'x' ? 1 : 0))).join('');
};

const shellTokens = (input: string) => {
  const tokens: string[] = []; let token = ''; let quote = ''; let escaped = false;
  for (const character of input.trim()) {
    if (escaped) { token += character; escaped = false; continue; }
    if (character === '\\' && quote !== "'") { escaped = true; continue; }
    if (quote) { if (character === quote) quote = ''; else token += character; continue; }
    if (character === '"' || character === "'") quote = character;
    else if (/\s/u.test(character)) { if (token) { tokens.push(token); token = ''; } }
    else token += character;
  }
  if (quote || escaped) return null;
  if (token) tokens.push(token);
  return tokens;
};
export const runCurlToFetch = (input: string) => {
  const tokens = shellTokens(input); if (!tokens || tokens[0]?.toLowerCase() !== 'curl') return error('Enter a valid cURL command beginning with curl.');
  let url = ''; let method = ''; let body = ''; const headers: Record<string, string> = {};
  for (let index = 1; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (['-X', '--request'].includes(token)) method = tokens[++index] ?? '';
    else if (['-H', '--header'].includes(token)) { const header = tokens[++index] ?? ''; const separator = header.indexOf(':'); if (separator < 1) return error('Each cURL header must contain a name and value.'); headers[header.slice(0, separator).trim()] = header.slice(separator + 1).trim(); }
    else if (['-d', '--data', '--data-raw'].includes(token)) { body = tokens[++index] ?? ''; if (!method) method = 'POST'; }
    else if (['-L', '--location', '-s', '--silent'].includes(token)) continue;
    else if (token.startsWith('-')) return error(`Unsupported cURL option: ${token}.`);
    else if (!url) url = token;
    else return error('The cURL command contains an unexpected value.');
  }
  if (!url) return error('The cURL command does not include a URL.');
  const options: string[] = []; if (method) options.push(`method: ${JSON.stringify(method.toUpperCase())}`);
  if (Object.keys(headers).length) options.push(`headers: ${JSON.stringify(headers, null, 2).replace(/\n/gu, '\n  ')}`);
  if (body) options.push(`body: ${JSON.stringify(body)}`);
  return options.length ? `fetch(${JSON.stringify(url)}, {\n  ${options.join(',\n  ')}\n});` : `fetch(${JSON.stringify(url)});`;
};

export const runCookieParser = (input: string) => {
  if (!input.trim()) return error('Enter a Cookie header.');
  const result: Record<string, string> = {};
  for (const part of input.split(';')) { const separator = part.indexOf('='); if (separator < 1) return error('Each cookie must use name=value syntax.'); const name = part.slice(0, separator).trim(); if (!name) return error('Cookie names cannot be empty.'); result[name] = part.slice(separator + 1).trim(); }
  return JSON.stringify(result, null, 2);
};

export type NumberBase = 2 | 8 | 10 | 16;
const parseBigInt = (input: string, base: NumberBase) => {
  const value = input.trim().toLowerCase(); const negative = value.startsWith('-'); const digits = negative ? value.slice(1) : value;
  const alphabet = '0123456789abcdef'; if (!digits || [...digits].some((digit) => alphabet.indexOf(digit) < 0 || alphabet.indexOf(digit) >= base)) return null;
  let result = 0n; for (const digit of digits) result = result * BigInt(base) + BigInt(alphabet.indexOf(digit));
  return negative ? -result : result;
};
export const runNumberBase = (input: string, options: { from: NumberBase; to: NumberBase } = { from: 10, to: 16 }) => {
  const value = parseBigInt(input, options.from); return value === null ? error(`Enter a valid base-${options.from} integer.`) : value.toString(options.to);
};

export const runUnicodeLookup = (input: string): ReferenceEntry[] | string => {
  const query = input.trim(); if (!query) return error('Enter a character or code point.');
  const match = query.match(/^(?:U\+|0x)([\da-f]{1,6})$/iu); const point = match ? Number.parseInt(match[1], 16) : query.codePointAt(0);
  if (point === undefined || point > 0x10ffff || (point >= 0xd800 && point <= 0xdfff)) return error('Enter a valid Unicode scalar value.');
  const character = String.fromCodePoint(point);
  return [{ key: `U+${point.toString(16).toUpperCase().padStart(4, '0')}`, name: character, description: `Decimal ${point} - UTF-16 ${character.split('').map((item) => item.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ')}` }];
};

export const runStringEscape = (input: string, options: { mode: EncodeMode } = { mode: 'encode' }) => {
  if (!input) return error('Enter a string to transform.');
  if (options.mode === 'encode') return JSON.stringify(input).slice(1, -1);
  try { return JSON.parse(`"${input}"`); } catch { return error('The escaped string is invalid.'); }
};

export const runSlug = (input: string, options: { separator: '-' | '_' } = { separator: '-' }) => {
  if (!input.trim()) return error('Enter a title to convert.');
  const slug = input.normalize('NFKD').replace(/[\u0300-\u036f]/gu, '').toLowerCase().replace(/[^a-z0-9]+/gu, options.separator).replace(new RegExp(`^${options.separator}+|${options.separator}+$`, 'gu'), '');
  return slug || error('The title does not contain slug-compatible characters.');
};

const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export const runBase32 = (input: string, options: { mode: EncodeMode } = { mode: 'encode' }) => {
  if (!input) return error('Enter text to transform.');
  if (options.mode === 'encode') {
    let bits = ''; for (const byte of textEncoder.encode(input)) bits += byte.toString(2).padStart(8, '0');
    let output = ''; for (let index = 0; index < bits.length; index += 5) output += base32Alphabet[Number.parseInt(bits.slice(index, index + 5).padEnd(5, '0'), 2)];
    return output.padEnd(Math.ceil(output.length / 8) * 8, '=');
  }
  const value = input.toUpperCase().replace(/=+$/u, ''); if (!/^[A-Z2-7]+$/u.test(value)) return error('Enter valid RFC 4648 Base32 text.');
  let bits = ''; for (const character of value) bits += base32Alphabet.indexOf(character).toString(2).padStart(5, '0');
  const bytes = Array.from({ length: Math.floor(bits.length / 8) }, (_, index) => Number.parseInt(bits.slice(index * 8, index * 8 + 8), 2));
  try { return textDecoder.decode(Uint8Array.from(bytes)); } catch { return error('The Base32 value is not valid UTF-8 text.'); }
};

export const runHex = (input: string, options: { mode: EncodeMode } = { mode: 'encode' }) => {
  if (!input) return error('Enter text to transform.');
  if (options.mode === 'encode') return [...textEncoder.encode(input)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  const value = input.replace(/\s/gu, ''); if (!/^(?:[\da-f]{2})+$/iu.test(value)) return error('Enter an even number of hexadecimal digits.');
  try { return textDecoder.decode(Uint8Array.from(value.match(/../gu) ?? [], (pair) => Number.parseInt(pair, 16))); } catch { return error('The hexadecimal value is not valid UTF-8 text.'); }
};

export type DurationParts = { years?: number; months?: number; weeks?: number; days?: number; hours?: number; minutes?: number; seconds?: number };
const durationPattern = /^P(?:(\d+(?:\.\d+)?)Y)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)W)?(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/u;
export const runIsoDuration = (input: string, options: { mode: 'parse' | 'build' | 'date' } = { mode: 'parse' }) => {
  if (!input.trim()) return error('Enter an ISO 8601 duration or a JSON object.');
  if (options.mode === 'date') {
    const date = new Date(input); return Number.isNaN(date.getTime()) ? error('Enter a valid ISO 8601 date.') : date.toISOString();
  }
  if (options.mode === 'parse') {
    const match = input.trim().match(durationPattern); if (!match || match.slice(1).every((value) => value === undefined)) return error('Enter a valid ISO 8601 duration.');
    const names = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']; const parts: DurationParts = {};
    match.slice(1).forEach((value, index) => { if (value !== undefined) parts[names[index] as keyof DurationParts] = Number(value); });
    return JSON.stringify(parts, null, 2);
  }
  try {
    const parts = JSON.parse(input) as DurationParts; const values = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'] as const;
    if (!values.some((name) => Number(parts[name]) > 0) || values.some((name) => parts[name] !== undefined && (!Number.isFinite(Number(parts[name])) || Number(parts[name]) < 0))) return error('Duration fields must be nonnegative numbers with at least one value.');
    const date = `${parts.years ? `${parts.years}Y` : ''}${parts.months ? `${parts.months}M` : ''}${parts.weeks ? `${parts.weeks}W` : ''}${parts.days ? `${parts.days}D` : ''}`;
    const time = `${parts.hours ? `${parts.hours}H` : ''}${parts.minutes ? `${parts.minutes}M` : ''}${parts.seconds ? `${parts.seconds}S` : ''}`;
    return `P${date}${time ? `T${time}` : ''}`;
  } catch { return error('Enter a valid JSON duration object.'); }
};
