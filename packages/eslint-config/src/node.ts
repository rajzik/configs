import type { ConfigArray } from 'typescript-eslint';

import { EXTS } from '@rajzik/configs-shared';
import node from 'eslint-plugin-n';

const config: ConfigArray = [
  {
    plugins: {
      n: node,
    },
    rules: {
      ...node.configs['flat/recommended'].rules,
    },
  },
  {
    settings: {
      n: {
        tryExtensions: EXTS,
      },
    },
  },
];

export default config;
