import type { ConfigArray } from 'typescript-eslint';

import css from '@eslint/css';
import { tailwindSyntax } from '@eslint/css/syntax';

export const cssTailwindConfig: ConfigArray = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      // @ts-expect-error - customSyntax is not typed
      customSyntax: tailwindSyntax,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];

const config: ConfigArray = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];

export default config;
