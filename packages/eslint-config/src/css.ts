import type { Linter } from 'eslint';

import css from '@eslint/css';
import { tailwind3, tailwind4 } from 'tailwind-csstree';

export const cssTailwindConfig3: Linter.Config[] = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwind3,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];

export const cssTailwindConfig4: Linter.Config[] = [
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwind4,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
];

const config: Linter.Config[] = [
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
