import type { Linter } from 'eslint';

import { EXTS } from '@rajzik/configs-shared';
import node from 'eslint-plugin-n';

/**
 * ESLint configuration for Node.js projects.
 */
const config: Linter.Config[] = [
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
