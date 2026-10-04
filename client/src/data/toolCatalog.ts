export const toolCategories = ['All', 'Developer', 'Data', 'Content', 'Media'] as const;
export const toolTemplates = ['file', 'text', 'data'] as const;

export type ToolCategory = Exclude<(typeof toolCategories)[number], 'All'>;

export interface ToolCatalogItem {
  id: string;
  name: string;
  path: string;
  description: string;
  category: ToolCategory;
  template: (typeof toolTemplates)[number];
  tags: string[];
}

export const toolCatalog: ToolCatalogItem[] = [
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    path: '/tools/base64',
    description: 'Encode readable text or decode valid Base64 strings directly in the browser.',
    category: 'Developer',
    template: 'text',
    tags: ['encode', 'decode', 'text'],
  },
  {
    id: 'json-converter',
    name: 'JSON Converter',
    path: '/tools/json-converter',
    description: 'Beautify or minify JSON with immediate validation feedback.',
    category: 'Data',
    template: 'data',
    tags: ['json', 'beautify', 'minify'],
  },
  {
    id: 'text-formatter',
    name: 'Text Formatter',
    path: '/tools/text-formatter',
    description: 'Clean JSON, XML, HTML, and plain text into readable output.',
    category: 'Content',
    template: 'text',
    tags: ['format', 'xml', 'html', 'writing'],
  },
  {
    id: 'webp-converter',
    name: 'WebP Converter',
    path: '/tools/webp-converter',
    description: 'Convert JPG and PNG images to WebP for smaller files and faster pages. Up to 20 images at a time, downloaded together as a ZIP.',
    category: 'Media',
    template: 'file',
    tags: ['image', 'webp', 'optimize'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    path: '/tools/qr-code-generator',
    description: 'Generate browser-only QR codes with styling, logo overlays, and download support.',
    category: 'Media',
    template: 'data',
    tags: ['qr', 'link', 'download', 'marketing'],
  },
  {
    id: 'json-compare',
    name: 'JSON Compare',
    path: '/tools/json-compare',
    description: 'Compare two JSON documents and inspect nested additions, removals, and changes.',
    category: 'Developer',
    template: 'data',
    tags: ['json', 'diff', 'compare'],
  },
  {
    id: 'csv-tsv-converter',
    name: 'CSV / TSV Converter',
    path: '/tools/csv-tsv-converter',
    description: 'Convert quoted delimited data locally between CSV and TSV with table previews.',
    category: 'Data',
    template: 'data',
    tags: ['csv', 'tsv', 'table', 'convert'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    path: '/tools/regex-tester',
    description: 'Test expressions, view captured groups, and highlight matches in place.',
    category: 'Developer',
    template: 'text',
    tags: ['regex', 'pattern', 'match'],
  },
];

export const getTool = (id: ToolCatalogItem['id']) => {
  const tool = toolCatalog.find((item) => item.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
};
