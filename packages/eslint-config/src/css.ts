import type { ConfigArray } from 'typescript-eslint';

import css from '@eslint/css';
import { tailwind3, tailwind4 } from 'tailwind-csstree';

export const cssTailwindConfig3: ConfigArray = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      // @ts-expect-error - customSyntax is not typed
      customSyntax: tailwind3,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];

export const cssTailwindConfig4: ConfigArray = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      // @ts-expect-error - customSyntax is not typed
      customSyntax: tailwind4,
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
