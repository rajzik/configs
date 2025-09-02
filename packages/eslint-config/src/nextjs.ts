import type { Linter } from 'eslint';

import nextPlugin from '@next/eslint-plugin-next';

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
