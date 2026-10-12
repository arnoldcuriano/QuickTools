import type { FreeApiPreset } from '../data/freeApis';

const CACHE_TTL = 60_000;
const REQUEST_TIMEOUT = 10_000;

export type ApiExplorerErrorKind = 'cors' | 'network' | 'rate-limit' | 'timeout' | 'invalid-json' | 'request';

export class ApiExplorerError extends Error {
  constructor(public kind: ApiExplorerErrorKind, message: string) { super(message); }
}

export interface ApiExplorerResult {
  status: number;
  timeMs: number;
  size: number;
  cached: boolean;
  responseType: 'json' | 'image';
  text?: string;
  blob?: Blob;
}

type CachedResult = Omit<ApiExplorerResult, 'cached'> & { expiresAt: number };
const responseCache = new Map<string, CachedResult>();

export const createParameterValues = (preset: FreeApiPreset) => Object.fromEntries(
  preset.parameters.map((parameter) => [parameter.name, parameter.default]),
);

export const buildApiUrl = (preset: FreeApiPreset, values: Record<string, string>) => {
  let requestUrl = preset.baseUrl;
  for (const parameter of preset.parameters.filter((item) => item.placement === 'path')) {
    requestUrl = requestUrl.replace(`{${parameter.name}}`, encodeURIComponent(values[parameter.name] ?? ''));
  }
  const url = new URL(requestUrl);
  for (const parameter of preset.parameters.filter((item) => item.placement === 'query')) {
    const value = values[parameter.name]?.trim();
    if (value) url.searchParams.set(parameter.name, value);
  }
  return url.toString();
};

export const buildRequestSnippet = (preset: FreeApiPreset, values: Record<string, string>, format: 'fetch' | 'curl') => {
  const url = buildApiUrl(preset, values);
  return format === 'fetch'
    ? `fetch('${url}')\n  .then((response) => response.${preset.responseType === 'image' ? 'blob' : 'json'}())\n  .then(console.log);`
    : `curl '${url}'`;
};

export const sendApiRequest = async (preset: FreeApiPreset, values: Record<string, string>): Promise<ApiExplorerResult> => {
  if (preset.cors !== 'yes') throw new ApiExplorerError('cors', `${preset.name} cannot be called from QuickTools without a provider key and an allowed browser origin.`);

  const url = buildApiUrl(preset, values);
  const cached = responseCache.get(url);
  if (cached && cached.expiresAt > Date.now()) return { ...cached, cached: true };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const startedAt = performance.now();
  try {
    const response = await fetch(url, { method: preset.method, signal: controller.signal });
    const timeMs = Math.round(performance.now() - startedAt);
    if (response.status === 429) throw new ApiExplorerError('rate-limit', `${preset.name} returned 429 Too Many Requests.`);
    if (!response.ok) throw new ApiExplorerError('request', `${preset.name} returned HTTP ${response.status}.`);

    let result: Omit<ApiExplorerResult, 'cached'>;
    if (preset.responseType === 'image') {
      const blob = await response.blob();
      result = { status: response.status, timeMs, size: blob.size, responseType: 'image', blob };
    } else {
      const body = await response.text();
      let formatted: string;
      try { formatted = JSON.stringify(JSON.parse(body), null, 2); }
      catch { throw new ApiExplorerError('invalid-json', `${preset.name} returned a response that is not valid JSON.`); }
      result = { status: response.status, timeMs, size: new Blob([body]).size, responseType: 'json', text: formatted };
    }
    responseCache.set(url, { ...result, expiresAt: Date.now() + CACHE_TTL });
    return { ...result, cached: false };
  } catch (error) {
    if (error instanceof ApiExplorerError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') throw new ApiExplorerError('timeout', `${preset.name} did not respond within 10 seconds.`);
    throw new ApiExplorerError('network', `The request to ${preset.name} failed. Check your connection or the provider's CORS policy.`);
  } finally { window.clearTimeout(timeout); }
};
