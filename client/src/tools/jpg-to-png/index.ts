import { createElement } from 'react';
import { JpgToPngPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runJpgToPng, type ImageInput } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('jpg-to-png');
export const run = runJpgToPng;
export const examples = [
  { name: 'Prepare JPG output name', input: { name: 'photo.jpg', type: 'image/jpeg' }, expected: 'photo.png' },
  { name: 'Prepare JPEG output name', input: { name: 'export.jpeg', type: 'image/jpeg' }, expected: 'export.png' },
  { name: 'Reject a non-JPG file', input: { name: 'graphic.png', type: 'image/png' }, expected: 'Error: The selected file must be a JPG image.' },
] as const;
export const config = { template: 'F', outputLabel: 'PNG', live: false } as const;
export const Page = () => createElement(JpgToPngPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<ImageInput, undefined, string>;
