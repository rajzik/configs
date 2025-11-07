import type { Linter } from 'eslint';

import reactCompiler from 'eslint-plugin-react-compiler';

/**
 * ESLint configuration for React Compiler.
 */
const config: Linter.Config[] = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactCompiler.configs.recommended.rules,
    },
  },
];

export default config;
