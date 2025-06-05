import type { ConfigArray } from 'typescript-eslint';

import turbo from 'eslint-plugin-turbo';

const config: ConfigArray = [
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
