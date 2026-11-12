export type TextMode = 'encode' | 'decode';

export const runUrlCodec = (input: string, options: { mode: TextMode } = { mode: 'encode' }) => {
  if (!input) return 'Error: Enter a URL or query string.';
  try {
    return options.mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    return 'Error: The encoded value is invalid.';
  }
};

export interface WordCounts { words: number; characters: number; sentences: number; paragraphs: number }
export const runWordCounter = (input: string): WordCounts | string => {
  const trimmed = input.trim();
  if (!trimmed) return 'Error: Enter text to count.';
  return {
    words: trimmed.split(/\s+/u).length,
    characters: input.length,
    sentences: (trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/gu) ?? []).length,
    paragraphs: trimmed.split(/\n\s*\n/u).filter(Boolean).length,
  };
};

export type CaseMode = 'upper' | 'lower' | 'title' | 'camel' | 'snake';
const words = (input: string) => input.trim().replace(/([a-z\d])([A-Z])/g, '$1 $2').split(/[^a-z\d]+/iu).filter(Boolean);
export const runCaseConverter = (input: string, options: { mode: CaseMode } = { mode: 'upper' }) => {
  if (!input.trim()) return 'Error: Enter text to convert.';
  const parts = words(input);
  if (options.mode === 'upper') return input.toUpperCase();
  if (options.mode === 'lower') return input.toLowerCase();
  if (options.mode === 'title') return parts.map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase()).join(' ');
  if (options.mode === 'snake') return parts.map((part) => part.toLowerCase()).join('_');
  return parts.map((part, index) => index ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part.toLowerCase()).join('');
};

export const runQueryParser = (input: string) => {
  const value = input.trim().replace(/^\?/, '');
  if (!value) return 'Error: Enter a query string.';
  try {
    const result: Record<string, string | string[]> = {};
    for (const [key, item] of new URLSearchParams(value)) {
      const current = result[key];
      result[key] = current === undefined ? item : Array.isArray(current) ? [...current, item] : [current, item];
    }
    return Object.keys(result).length ? JSON.stringify(result, null, 2) : 'Error: No query parameters were found.';
  } catch {
    return 'Error: The query string is invalid.';
  }
};

export type TimestampMode = 'to-date' | 'to-timestamp';
export const runTimestamp = (input: string, options: { mode: TimestampMode } = { mode: 'to-date' }) => {
  if (!input.trim()) return 'Error: Enter a timestamp or date.';
  if (options.mode === 'to-date') {
    const seconds = Number(input);
    if (!Number.isFinite(seconds)) return 'Error: Enter a valid Unix timestamp.';
    const date = new Date(seconds * 1000);
    return Number.isNaN(date.getTime()) ? 'Error: The timestamp is outside the supported range.' : date.toISOString();
  }
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? 'Error: Enter a valid date.' : String(Math.floor(date.getTime() / 1000));
};

export type PercentageMode = 'percent-of' | 'change' | 'difference';
export const runPercentage = (input: { first: number; second: number }, options: { mode: PercentageMode } = { mode: 'percent-of' }) => {
  const { first, second } = input;
  if (!Number.isFinite(first) || !Number.isFinite(second)) return 'Error: Enter two valid numbers.';
  if (options.mode === 'percent-of') return `${formatNumber((first / 100) * second)}`;
  if (options.mode === 'change') return first === 0 ? 'Error: The starting value cannot be zero.' : `${formatNumber(((second - first) / Math.abs(first)) * 100)}%`;
  const average = (Math.abs(first) + Math.abs(second)) / 2;
  return average === 0 ? '0%' : `${formatNumber((Math.abs(first - second) / average) * 100)}%`;
};

const formatNumber = (value: number) => Number(value.toFixed(6)).toString();
const clampByte = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
const hueToRgb = (p: number, q: number, hue: number) => {
  const value = hue < 0 ? hue + 1 : hue > 1 ? hue - 1 : hue;
  if (value < 1 / 6) return p + (q - p) * 6 * value;
  if (value < 1 / 2) return q;
  if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
  return p;
};
const hslToRgb = (hue: number, saturation: number, lightness: number) => {
  const h = ((hue % 360) + 360) % 360 / 360;
  const s = Math.max(0, Math.min(1, saturation)); const l = Math.max(0, Math.min(1, lightness));
  if (s === 0) { const byte = clampByte(l * 255); return [byte, byte, byte] as [number, number, number]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s; const p = 2 * l - q;
  return [hueToRgb(p, q, h + 1 / 3), hueToRgb(p, q, h), hueToRgb(p, q, h - 1 / 3)].map((value) => clampByte(value * 255)) as [number, number, number];
};
const rgbToHsl = (red: number, green: number, blueValue: number) => {
  const [r, g, b] = [red, green, blueValue].map((value) => value / 255);
  const max = Math.max(r, g, b); const min = Math.min(r, g, b); const lightness = (max + min) / 2;
  if (max === min) return [0, 0, lightness] as const;
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const hue = max === r ? ((g - b) / delta + (g < b ? 6 : 0)) : max === g ? ((b - r) / delta + 2) : ((r - g) / delta + 4);
  return [hue * 60, saturation, lightness] as const;
};
const parseColor = (input: string) => {
  const value = input.trim();
  const hex = value.match(/^#?([\da-f]{3}|[\da-f]{6})$/iu)?.[1];
  if (hex) {
    const expanded = hex.length === 3 ? [...hex].map((part) => part + part).join('') : hex;
    return [0, 2, 4].map((index) => Number.parseInt(expanded.slice(index, index + 2), 16)) as [number, number, number];
  }
  const rgb = value.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/iu);
  if (rgb) return [clampByte(Number(rgb[1])), clampByte(Number(rgb[2])), clampByte(Number(rgb[3]))] as [number, number, number];
  const hsl = value.match(/^hsl\(\s*([-\d.]+)(?:deg)?\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*\)$/iu);
  if (hsl) return hslToRgb(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100);
  const oklch = value.match(/^oklch\(\s*([\d.]+)(%)?\s+([\d.]+)\s+([-\d.]+)(?:deg)?\s*\)$/iu);
  if (oklch) {
    const lightness = Number(oklch[1]) / (oklch[2] ? 100 : 1); const chroma = Number(oklch[3]); const angle = Number(oklch[4]) * Math.PI / 180;
    const a = chroma * Math.cos(angle); const b = chroma * Math.sin(angle);
    const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
    const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
    const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
    const l = lRoot ** 3; const m = mRoot ** 3; const s = sRoot ** 3;
    const linear = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
    return linear.map((channel) => clampByte(255 * (channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055))) as [number, number, number];
  }
  return null;
};
const rgbToOklch = (red: number, green: number, blueValue: number) => {
  const linear = [red, green, blueValue].map((byte) => { const channel = byte / 255; return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4; });
  const lRoot = Math.cbrt(0.4122214708 * linear[0] + 0.5363325363 * linear[1] + 0.0514459929 * linear[2]);
  const mRoot = Math.cbrt(0.2119034982 * linear[0] + 0.6806995451 * linear[1] + 0.1073969566 * linear[2]);
  const sRoot = Math.cbrt(0.0883024619 * linear[0] + 0.2817188376 * linear[1] + 0.6299787005 * linear[2]);
  const lightness = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const b = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;
  return [lightness, Math.sqrt(a * a + b * b), (Math.atan2(b, a) * 180 / Math.PI + 360) % 360] as const;
};
export const runColorConverter = (input: string) => {
  const rgb = parseColor(input);
  if (!rgb) return 'Error: Enter a valid HEX, RGB, HSL, or OKLCH color.';
  const [red, green, blueValue] = rgb;
  const [hue, saturation, lightness] = rgbToHsl(red, green, blueValue);
  const [okLightness, chroma, okHue] = rgbToOklch(red, green, blueValue);
  const hex = [red, green, blueValue].map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `HEX: ${'#'}${hex}\nRGB: rgb(${red}, ${green}, ${blueValue})\nHSL: hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)\nOKLCH: oklch(${(okLightness * 100).toFixed(2)}% ${chroma.toFixed(4)} ${okHue.toFixed(2)})`;
};

export interface HttpStatus { code: number; name: string; meaning: string }
export const HTTP_STATUSES: readonly HttpStatus[] = [
  { code: 100, name: 'Continue', meaning: 'The client may continue the request.' },
  { code: 200, name: 'OK', meaning: 'The request succeeded.' },
  { code: 201, name: 'Created', meaning: 'A resource was created.' },
  { code: 202, name: 'Accepted', meaning: 'The request was accepted for processing.' },
  { code: 204, name: 'No Content', meaning: 'The request succeeded without a response body.' },
  { code: 301, name: 'Moved Permanently', meaning: 'The resource has a permanent new location.' },
  { code: 302, name: 'Found', meaning: 'The resource is temporarily at another location.' },
  { code: 304, name: 'Not Modified', meaning: 'The cached representation is still valid.' },
  { code: 400, name: 'Bad Request', meaning: 'The request syntax or data is invalid.' },
  { code: 401, name: 'Unauthorized', meaning: 'Authentication is required.' },
  { code: 403, name: 'Forbidden', meaning: 'The server refuses the request.' },
  { code: 404, name: 'Not Found', meaning: 'The resource was not found.' },
  { code: 405, name: 'Method Not Allowed', meaning: 'The method is not supported for this resource.' },
  { code: 409, name: 'Conflict', meaning: 'The request conflicts with current state.' },
  { code: 418, name: "I'm a Teapot", meaning: 'The server refuses to brew coffee.' },
  { code: 422, name: 'Unprocessable Content', meaning: 'The request cannot be processed semantically.' },
  { code: 429, name: 'Too Many Requests', meaning: 'The client exceeded a rate limit.' },
  { code: 500, name: 'Internal Server Error', meaning: 'The server encountered an unexpected condition.' },
  { code: 502, name: 'Bad Gateway', meaning: 'An upstream server returned an invalid response.' },
  { code: 503, name: 'Service Unavailable', meaning: 'The server is temporarily unavailable.' },
] as const;
export const runHttpStatusSearch = (input: string): HttpStatus[] | string => {
  const query = input.trim().toLowerCase();
  const matches = HTTP_STATUSES.filter(({ code, name, meaning }) => !query || `${code} ${name} ${meaning}`.toLowerCase().includes(query));
  return query && !matches.length ? 'Error: No matching HTTP status codes.' : matches;
};

const secureBytes = (length: number) => {
  const values = new Uint8Array(length);
  globalThis.crypto.getRandomValues(values);
  return values;
};
const uuidText = (bytes: Uint8Array) => {
  const value = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
};
const uuidV4 = () => {
  const bytes = secureBytes(16); bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  return uuidText(bytes);
};
const uuidV7 = () => {
  const bytes = secureBytes(16); let timestamp = Date.now();
  for (let index = 5; index >= 0; index -= 1) { bytes[index] = timestamp & 255; timestamp = Math.floor(timestamp / 256); }
  bytes[6] = (bytes[6] & 15) | 112; bytes[8] = (bytes[8] & 63) | 128;
  return uuidText(bytes);
};
export type UuidOptions = { version: 'v4' | 'v7'; count: number };
export const runUuidGenerator = (_input: string, options: UuidOptions = { version: 'v4', count: 1 }) => {
  if (!Number.isInteger(options.count) || options.count < 1 || options.count > 100) return 'Error: Count must be between 1 and 100.';
  return Array.from({ length: options.count }, () => options.version === 'v7' ? uuidV7() : uuidV4()).join('\n');
};

export interface PasswordOptions { length: number; lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean }
const secureIndex = (limit: number) => {
  const ceiling = 256 - (256 % limit); let value = secureBytes(1)[0];
  while (value >= ceiling) value = secureBytes(1)[0];
  return value % limit;
};
export const runPasswordGenerator = (_input: string, options: PasswordOptions = { length: 16, lowercase: true, uppercase: true, numbers: true, symbols: true }) => {
  if (!Number.isInteger(options.length) || options.length < 8 || options.length > 128) return 'Error: Length must be between 8 and 128.';
  const sets = [options.lowercase && 'abcdefghijklmnopqrstuvwxyz', options.uppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', options.numbers && '0123456789', options.symbols && '!@%*+-_=?:'].filter(Boolean) as string[];
  if (!sets.length) return 'Error: Select at least one character set.';
  const pool = sets.join('');
  const required = sets.map((set) => set[secureIndex(set.length)]);
  const values = [...required, ...Array.from({ length: options.length - required.length }, () => pool[secureIndex(pool.length)])];
  for (let index = values.length - 1; index > 0; index -= 1) { const swap = secureIndex(index + 1); [values[index], values[swap]] = [values[swap], values[index]]; }
  return values.join('');
};

export interface ImageInput { name: string; type: string }
export const runJpgToPng = (input: ImageInput) => {
  if (!input.name.trim()) return 'Error: Choose a JPG image.';
  if (!['image/jpeg', 'image/jpg'].includes(input.type.toLowerCase())) return 'Error: The selected file must be a JPG image.';
  return input.name.replace(/\.(?:jpe?g)$/iu, '') + '.png';
};
