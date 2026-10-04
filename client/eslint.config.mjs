import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const hardcodedDesignRule = {
  meta: { type: 'problem', schema: [], messages: { color: 'Use a value from the design token file instead of a hardcoded color.', shadow: 'box-shadow is prohibited outside the design token file.' } },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string' && /(?:#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\()/i.test(node.value)) context.report({ node, messageId: 'color' });
      },
      Property(node) {
        const name = node.key.type === 'Identifier' ? node.key.name : node.key.value;
        if (name === 'boxShadow' || name === 'box-shadow') context.report({ node, messageId: 'shadow' });
      },
    };
  },
};

export default tseslint.config(
  { ignores: ['build/**', 'coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'quicktools-design': { rules: { 'no-hardcoded-design-values': hardcodedDesignRule } },
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      'quicktools-design/no-hardcoded-design-values': 'error',
    },
  },
  { files: ['src/data/designTokens.ts'], rules: { 'quicktools-design/no-hardcoded-design-values': 'off' } },
);
