/* eslint @stylistic/migrate/migrate-js: "error" */
// @ts-check
/// <reference types="./types.d.ts" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import tailwind from 'eslint-plugin-tailwindcss';
import testingLibrary from 'eslint-plugin-testing-library';
import turboPlugin from 'eslint-plugin-turbo';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config(
  { ignores: ['**/env.ts'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'process',
          importNames: ['env'],
          message: "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
    },
  },
);

export default tseslint.config(
  includeIgnoreFile(path.join(import.meta.dirname, '../../../.gitignore')),
  {
    ignores: ['vitest.config.mjs*'],
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      turbo: turboPlugin,
      unicorn: eslintPluginUnicorn,
      tailwind,
      '@stylistic': stylisticPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      ...turboPlugin.configs.recommended.rules,
      ...eslintPluginUnicorn.configs.recommended.rules,
      ...stylisticPlugin.configs['disable-legacy'].rules,
      // Eslint
      camelcase: 'off', // enforce camelcase naming convention
      'default-param-last': 'off', // enforce default parameters to be last
      'dot-notation': 'off', // enforce dot notation whenever possible
      'no-array-constructor': 'off', // disallow Array constructors
      'no-dupe-class-members': 'off', // disallow duplicate class members
      'no-duplicate-imports': 'off', // disallow duplicate module imports
      'no-empty-function': 'off', // disallow empty functions
      'no-implied-eval': 'off', // disallow the use of eval()-like methods
      'no-invalid-this': 'off', // disallow this keywords outside of classes or class-like objects
      'no-loop-func': 'off', // disallow function declarations and expressions inside loop statements
      'no-loss-of-precision': 'off', // disallow literal numbers that lose precision
      'no-magic-numbers': 'off', // disallow magic numbers
      'no-redeclare': 'off', // disallow variable redeclaration
      'no-return-await': 'off', // disallow unnecessary return await
      'no-shadow': 'off', // disallow variable declarations from shadowing variables declared in the outer scope
      'no-throw-literal': 'off', // disallow throwing literals as exceptions
      'no-undef': 'off', // disallow the use of undeclared variables unless mentioned in /* global */ comments
      'no-underscore-dangle': 'off', // disallow dangling underscores in identifiers
      'no-unused-expressions': 'off', // disallow unused expressions
      'no-unused-vars': 'off', // disallow unused variables
      'no-use-before-define': 'off', // disallow the use of variables before they are defined
      'no-useless-constructor': 'off', // disallow unnecessary constructors
      'require-await': 'off', // disallow async functions which have no await expression

      'arrow-body-style': 'error',
      'prefer-template': 'error',
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],

      'no-console': ['error', { allow: ['error'] }],
      'no-constant-condition': 'error',

      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

      // Typescript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'enum',
          format: ['PascalCase', 'UPPER_CASE'],
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/consistent-type-exports': [
        'warn',
        { fixMixedExportsWithInlineTypeSpecifier: false },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/unbound-method': 'off',

      // TODO: Enable following rules in the future
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // Unicorn
      'unicorn/prefer-ternary': 'off',
      'unicorn/no-useless-undefined': ['off', { checkArguments: false }],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': [
        'warn',
        {
          cases: {
            pascalCase: true,
            camelCase: true,
            kebabCase: true,
          },
        },
      ],
      'unicorn/prefer-at': [
        'error',
        {
          checkAllIndexAccess: true,
        },
      ],
      // TODO: Remove in the future
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',

      // Import
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      // Tailwind
      'tailwind/no-custom-classname': [
        'warn',
        {
          callees: ['twMerge', 'classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
          whitelist: [
            'ag-theme-balham',
            'ag-grid',
            'icon-cell-renderer',
            'border-left-1px',
            'border-left-2px',
            'ag-row-checkbox-disable',
            'ag-overlay-loading-center',
          ],
        },
      ],
      'tailwind/no-unnecessary-arbitrary-value': 'error',
      'tailwind/no-contradicting-classname': 'error',
      'tailwind/enforces-shorthand': 'error',
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
    settings: {
      tailwindcss: {
        callees: ['twMerge', 'classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn'],
        config: fileURLToPath(new URL('../../../tooling/tailwind/index.ts', import.meta.url)),
      },
    },
  },
  {
    files: ['*.test.{ts,js,tsx,jsx}'],
    plugins: {
      testingLibrary,
      vitest,
    },
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      ...vitest.configs.recommended.rules,
    },
    settings: {
      'testing-library/custom-queries': 'off',
      'testing-library/custom-renders': 'off',
      'testing-library/utils-module': 'off',
    },
  },
);
