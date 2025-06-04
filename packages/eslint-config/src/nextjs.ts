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
      // TypeError: context.getAncestors is not a function
      '@next/next/no-duplicate-head': 'off',
    },
  },
];

export default config;
