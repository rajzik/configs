import type { ConfigArray } from 'typescript-eslint';

import eslintConfigPrettier from 'eslint-config-prettier';

const config: ConfigArray = [
  eslintConfigPrettier,
  {
    rules: {
      // re-enable ESLint rules
      curly: ['error', 'all'],
    },
  },
] as ConfigArray;

export default config;
