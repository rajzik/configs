import type { Linter } from 'eslint';

import turbo from 'eslint-plugin-turbo';

const config: Linter.Config[] = [
  {
    plugins: {
      turbo,
    },
    rules: {
      ...turbo.configs['flat/recommended'].rules,
    },
  },
];

export default config;
