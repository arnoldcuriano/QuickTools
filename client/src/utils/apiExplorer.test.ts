import { describe, expect, test } from 'vitest';
import { freeApiDirectory, freeApiPresets, getFreeApiPreset } from '../data/freeApis';
import { buildApiUrl, buildRequestSnippet, createParameterValues } from './apiExplorer';

describe('API Explorer request builder', () => {
  test('keeps the docs directory and executable presets intentionally separate', () => {
    expect(freeApiDirectory).toHaveLength(40);
    expect(freeApiPresets).toHaveLength(8);
    expect(Object.fromEntries(['Developer', 'Data', 'Content', 'Media'].map((category) => [category, freeApiDirectory.filter((api) => api.category === category).length]))).toEqual({
      Developer: 12,
      Data: 10,
      Content: 8,
      Media: 10,
    });
  });

  test('builds path and query parameters from the registry', () => {
    const weather = getFreeApiPreset('open-meteo');
    expect(buildApiUrl(weather, createParameterValues(weather))).toContain('latitude=14.5995');
    const image = getFreeApiPreset('lorem-picsum');
    expect(buildApiUrl(image, createParameterValues(image))).toBe('https://picsum.photos/seed/QuickTools/640/420');
  });

  test('creates fetch and curl snippets from the same URL', () => {
    const preset = getFreeApiPreset('jsonplaceholder');
    const values = createParameterValues(preset);
    expect(buildRequestSnippet(preset, values, 'fetch')).toContain('/todos/1');
    expect(buildRequestSnippet(preset, values, 'curl')).toBe("curl 'https://jsonplaceholder.typicode.com/todos/1'");

    const image = getFreeApiPreset('dicebear');
    expect(buildRequestSnippet(image, createParameterValues(image), 'fetch')).toContain('response.blob()');
  });
});
