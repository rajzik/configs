/* eslint @stylistic/migrate/migrate-js: "error" */

import type { ConfigArray } from 'typescript-eslint';

import nextPlugin from '@next/eslint-plugin-next';

const config: ConfigArray = [
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
