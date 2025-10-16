
import { format as prettierFormat } from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';

export interface JSONConverterOptions {
  mode: 'beautify' | 'minify';
  indent?: number; // Only used for beautify mode
}

export const convertJson = async (input: string, options: JSONConverterOptions): Promise<{ result: string; error?: string; originalSize?: number; resultSize?: number }> => {
  try {
    // Validate input
    if (!input.trim()) {
      return { result: '', error: 'Input is empty.', originalSize: 0, resultSize: 0 };
    }

    // Parse JSON to validate
    const parsed = JSON.parse(input);
    const originalSize = input.length;

    if (options.mode === 'beautify') {
      try {
        const formatted = await prettierFormat(JSON.stringify(parsed), {
          parser: 'json',
          plugins: [babelParser],
          printWidth: 80,
          tabWidth: options.indent || 2,
          useTabs: false,
          semi: false,
          singleQuote: false,
          trailingComma: 'none',
        });
        return { result: formatted, originalSize, resultSize: formatted.length };
      } catch (prettierError) {
        // Fallback to basic JSON formatting
        const fallback = JSON.stringify(parsed, null, options.indent || 2);
        return { result: fallback, originalSize, resultSize: fallback.length };
      }
    } else {
      // Minify mode
      try {
        const minified = await prettierFormat(JSON.stringify(parsed), {
          parser: 'json',
          plugins: [babelParser],
          printWidth: Infinity, // Ensure single-line output
          semi: false,
          singleQuote: false,
          trailingComma: 'none',
          bracketSpacing: false, // Remove spaces around objects
        });
        // Additional cleanup to ensure minimal output
        const compact = minified.replace(/\s+/g, '');
        return { result: compact, originalSize, resultSize: compact.length };
      } catch (prettierError) {
        // Fallback to basic minification
        const fallback = JSON.stringify(parsed);
        return { result: fallback, originalSize, resultSize: fallback.length };
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown JSON error';
    return { result: '', error: `Invalid JSON: ${errorMessage}`, originalSize: input.length, resultSize: 0 };
  }
};
