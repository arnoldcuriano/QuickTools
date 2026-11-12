import type { ComponentType } from 'react';
import type { ToolMeta, ToolTemplate } from '../generated/toolRegistry';

export interface ToolExample<Input = unknown, Options = unknown, Output = unknown> {
  name: string;
  input: Input;
  options?: Options;
  expected?: Output;
  validate?: (output: Output) => boolean;
}

export interface ToolTemplateConfig {
  template: ToolTemplate;
  inputLabel?: string;
  outputLabel?: string;
  live?: boolean;
}

export interface ToolModule<Input = unknown, Options = unknown, Output = unknown> {
  meta: ToolMeta;
  run: (input: Input, options?: Options) => Output | Promise<Output>;
  examples: readonly ToolExample<Input, Options, Output>[];
  config: ToolTemplateConfig;
  Page: ComponentType;
}
