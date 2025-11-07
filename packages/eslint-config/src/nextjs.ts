import type { Linter } from 'eslint';

import nextPlugin from '@next/eslint-plugin-next';

/**
 * ESLint configuration for Next.js projects.
 */
const config: Linter.Config[] = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

export default config;
