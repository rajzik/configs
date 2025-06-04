import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  eslintConfigPrettier,
  {
    rules: {
      // re-enable ESLint rules
      curly: ['error', 'all'],
    },
  },
];
