import type { Linter } from 'eslint';

import css from '@eslint/css';
import { tailwind3, tailwind4 } from 'tailwind-csstree';

/**
 * ESLint configuration for CSS files with Tailwind CSS v3 support.
 */
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

/**
 * ESLint configuration for CSS files with Tailwind CSS v4 support.
 */
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

/**
 * ESLint configuration for CSS files.
 */
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
