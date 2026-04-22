import type { Linter } from "eslint";

import node from "eslint-plugin-n";

import { EXTS } from "@rajzik/configs-shared";

/**
 * ESLint configuration for Node.js projects.
 */
const config: Linter.Config[] = [
  {
    plugins: {
      n: node,
    },
    rules: {
      ...node.configs["flat/recommended"].rules,
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
