import {
  CodeBracketIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  QrCodeIcon,
  Square3Stack3DIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

export const toolCategories = ['All', 'Developer', 'Data', 'Content', 'Media'] as const;

export type ToolCategory = Exclude<(typeof toolCategories)[number], 'All'>;

export interface ToolCatalogItem {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  category: ToolCategory;
  tags: string[];
}

export const toolCatalog: ToolCatalogItem[] = [
  {
    name: 'Base64 Encoder/Decoder',
    path: '/tools/base64',
    icon: CodeBracketIcon,
    description: 'Encode readable text or decode valid Base64 strings directly in the browser.',
    category: 'Developer',
    tags: ['encode', 'decode', 'text'],
  },
  {
    name: 'JSON Converter',
    path: '/tools/json-converter',
    icon: Square3Stack3DIcon,
    description: 'Beautify or minify JSON with immediate validation feedback.',
    category: 'Data',
    tags: ['json', 'beautify', 'minify'],
  },
  {
    name: 'Text Formatter',
    path: '/tools/text-formatter',
    icon: DocumentTextIcon,
    description: 'Clean JSON, XML, HTML, and plain text into readable output.',
    category: 'Content',
    tags: ['format', 'xml', 'html', 'writing'],
  },
  {
    name: 'WebP Converter',
    path: '/tools/webp-converter',
    icon: PhotoIcon,
    description: 'Convert up to 20 JPG or PNG images into optimized WebP files.',
    category: 'Media',
    tags: ['image', 'webp', 'optimize'],
  },
  {
    name: 'QR Code Generator',
    path: '/tools/qr-code-generator',
    icon: QrCodeIcon,
    description: 'Generate browser-only QR codes with styling, logo overlays, and download support.',
    category: 'Media',
    tags: ['qr', 'link', 'download', 'marketing'],
  },
  {
    name: 'JSON Compare',
    path: '/tools/json-compare',
    icon: DocumentMagnifyingGlassIcon,
    description: 'Compare two JSON documents and inspect nested additions, removals, and changes.',
    category: 'Developer',
    tags: ['json', 'diff', 'compare'],
  },
  {
    name: 'CSV / TSV Converter',
    path: '/tools/csv-tsv-converter',
    icon: TableCellsIcon,
    description: 'Convert quoted delimited data locally between CSV and TSV with table previews.',
    category: 'Data',
    tags: ['csv', 'tsv', 'table', 'convert'],
  },
  {
    name: 'Regex Tester',
    path: '/tools/regex-tester',
    icon: MagnifyingGlassIcon,
    description: 'Test expressions, view captured groups, and highlight matches in place.',
    category: 'Developer',
    tags: ['regex', 'pattern', 'match'],
  },
];
