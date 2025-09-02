import type { Linter } from 'eslint';

import eslintConfigPrettier from 'eslint-config-prettier';

const config: Linter.Config[] = [
  eslintConfigPrettier,
  {
    rules: {
      // re-enable ESLint rules
      curly: ['error', 'all'],
    },
  },
] as Linter.Config[];

export default config;
