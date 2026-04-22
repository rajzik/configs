import { IGNORE_PATHS } from '@rajzik/configs-shared';
import { defineConfig } from 'oxlint';

/**
 * Base configuration. To build fully configured oxlint configuration @see
 * {buildOxlintConfig}.
 *
 * @since 1.0.0
 * @example
 *   ```ts
 *   import { base } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [base],
 *   });
 *   ```;
 */
export const baseConfig = defineConfig({
  plugins: ['eslint', 'oxc', 'import', 'promise', 'typescript', 'unicorn'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
    pedantic: 'warn',
    restriction: 'warn',
    style: 'warn',
  },
  ignorePatterns: IGNORE_PATHS,
  rules: {
    // Eslint enabled rules
    'eslint/no-console': ['error', { allow: ['error'] }],
    'eslint/eqeqeq': ['error', 'smart'],
    'eslint/curly': ['error', 'all'],
    'eslint/prefer-template': 'warn',
    'eslint/no-useless-computed-key': 'warn',
    'eslint/prefer-destructuring': 'warn',
    'eslint/prefer-exponentiation-operator': 'warn',
    'eslint/prefer-object-spread': 'warn',
    'eslint/prefer-object-has-own': 'warn',
    'eslint/default-param-last': 'warn',
    'eslint/no-param-reassign': 'error',
    'eslint/no-plusplus': 'warn',

    // Eslint disabled rules
    'eslint/capitalized-comments': 'allow',
    'eslint/sort-imports': 'allow',
    'eslint/func-names': 'allow',
    'eslint/new-cap': 'allow',
    'eslint/no-magic-numbers': 'allow',
    'eslint/id-length': 'allow',
    'eslint/no-ternary': 'allow',
    'eslint/no-duplicate-imports': 'allow',
    'eslint/max-statements': 'allow',
    'eslint/sort-keys': 'allow',
    'eslint/func-style': 'allow',
    'eslint/no-undefined': 'allow',
    'eslint/max-lines-per-function': 'allow',
    'eslint/max-lines': 'allow',
    'eslint/max-classes-per-file': 'allow',
    'eslint/no-negated-condition': 'allow',
    'eslint/no-useless-constructor': 'allow',
    'eslint/require-await': 'allow',
    'eslint/no-inline-comments': 'allow',
    'eslint/no-await-in-loop': 'allow',
    'eslint/no-void': 'allow',

    // OXC disabled rules
    'oxc/no-rest-spread-properties': 'allow',
    'oxc/no-optional-chaining': 'allow',
    'oxc/no-async-await': 'allow',
    'oxc/no-map-spread': 'allow',

    // Typescript enabled rules
    'typescript/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': 'allow-with-description',
        'ts-check': false,
        minimumDescriptionLength: 3,
      },
    ],
    'typescript/consistent-type-definitions': ['error', 'interface'],
    'typescript/consistent-type-imports': [
      'error',
      {
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      },
    ],
    'typescript/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    'typescript/no-explicit-any': 'error',
    'typescript/no-inferrable-types': 'warn',
    'typescript/prefer-function-type': 'error',
    'typescript/consistent-generic-constructors': 'error',
    'typescript/array-type': [
      'warn',
      {
        default: 'array-simple',
      },
    ],
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/non-nullable-type-assertion-style': 'warn',
    'typescript/no-confusing-non-null-assertion': 'warn',
    'typescript/prefer-nullish-coalescing': 'warn',
    'typescript/prefer-readonly-parameter-types': [
      'warn',
      {
        ignoreInferredTypes: true,
        treatMethodsAsReadonly: true,
      },
    ],

    // Typescript disabled rules
    'typescript/unbound-method': 'allow',
    'typescript/strict-boolean-expressions': 'allow',
    'typescript/explicit-function-return-type': 'allow',
    'typescript/explicit-module-boundary-types': 'allow',
    'typescript/promise-function-async': 'allow',
    'typescript/no-misused-spread': 'allow',
    'typescript/require-await': 'allow',
    'typescript/prefer-enum-initializers': 'allow',
    'typescript/consistent-return': 'allow',
    'typescript/ban-types': 'allow',

    // Import enabled rules
    'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
    'import/no-mutable-exports': 'error',
    'import/no-cycle': 'error',

    // Import disabled rules
    'import/max-dependencies': 'allow',
    'import/no-default-export': 'allow',
    'import/no-named-as-default': 'allow',
    'import/no-unassigned-import': 'allow',
    'import/no-named-export': 'allow',
    'import/prefer-default-export': 'allow',
    'import/group-exports': 'allow',
    'import/exports-last': 'allow',
    'import/no-nodejs-modules': 'allow',
    'import/no-relative-parent-imports': 'allow',
    'import/no-namespace': 'allow',
    'import/no-duplicates': 'allow',
    'import/no-named-as-default-member': 'allow',
    'import/no-anonymous-default-export': 'allow',

    // Unicorn enabled rules
    'unicorn/no-useless-collection-argument': 'error',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/prefer-default-parameters': 'warn',
    'unicorn/prefer-global-this': 'warn',
    'unicorn/prefer-includes': 'warn',
    'unicorn/prefer-logical-operator-over-ternary': 'warn',
    'unicorn/prefer-modern-dom-apis': 'warn',
    'unicorn/prefer-negative-index': 'warn',
    'unicorn/prefer-object-from-entries': 'warn',
    'unicorn/prefer-string-raw': 'warn',
    'unicorn/prefer-string-trim-start-end': 'warn',
    'unicorn/no-length-as-slice-end': 'warn',
    'unicorn/no-magic-array-flat-depth': 'warn',
    'unicorn/prefer-modern-math-apis': 'warn',
    'unicorn/prefer-node-protocol': 'warn',
    'unicorn/prefer-number-properties': 'warn',
    'unicorn/prefer-at': 'warn',

    // Unicorn disabled rules
    'unicorn/no-array-callback-reference': 'allow',
    'unicorn/no-array-reduce': 'allow',
    'unicorn/no-useless-undefined': 'allow',
    'unicorn/explicit-length-check': 'allow',
    'unicorn/no-array-for-each': 'allow',
    'unicorn/filename-case': 'allow',
    'unicorn/no-null': 'allow',
  },
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      rules: {
        // Typescript disabled rules
        'typescript/strict-boolean-expressions': 'allow',
        'typescript/await-thenable': 'allow',
        'typescript/no-array-delete': 'allow',
        'typescript/no-base-to-string': 'allow',
        'typescript/no-confusing-void-expression': 'allow',
        'typescript/no-duplicate-type-constituents': 'allow',
        'typescript/no-floating-promises': 'allow',
        'typescript/no-for-in-array': 'allow',
        'typescript/no-implied-eval': 'allow',
        'typescript/no-meaningless-void-operator': 'allow',
        'typescript/no-misused-promises': 'allow',
        'typescript/no-misused-spread': 'allow',
        'typescript/no-mixed-enums': 'allow',
        'typescript/no-redundant-type-constituents': 'allow',
        'typescript/no-unnecessary-boolean-literal-compare': 'allow',
        'typescript/no-unnecessary-template-expression': 'allow',
        'typescript/no-unnecessary-type-arguments': 'allow',
        'typescript/no-unnecessary-type-assertion': 'allow',
        'typescript/no-unsafe-argument': 'allow',
        'typescript/no-unsafe-assignment': 'allow',
        'typescript/no-unsafe-call': 'allow',
        'typescript/no-unsafe-enum-comparison': 'allow',
        'typescript/no-unsafe-member-access': 'allow',
        'typescript/no-unsafe-return': 'allow',
        'typescript/no-unsafe-type-assertion': 'allow',
        'typescript/no-unsafe-unary-minus': 'allow',
        'typescript/non-nullable-type-assertion-style': 'allow',
        'typescript/prefer-promise-reject-errors': 'allow',
        'typescript/prefer-reduce-type-parameter': 'allow',
        'typescript/prefer-return-this-type': 'allow',
        'typescript/promise-function-async': 'allow',
        'typescript/related-getter-setter-pairs': 'allow',
        'typescript/require-array-sort-compare': 'allow',
        'typescript/require-await': 'allow',
        'typescript/restrict-plus-operands': 'allow',
        'typescript/restrict-template-expressions': 'allow',
        'typescript/return-await': 'allow',
        'typescript/switch-exhaustiveness-check': 'allow',
        'typescript/unbound-method': 'allow',
        'typescript/use-unknown-in-catch-callback-variable': 'allow',
      },
    },
    {
      files: ['*.cjs', '*.cts'],
      rules: {
        'import/no-commonjs': 'allow',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/unambiguous': 'allow',
      },
    },
    {
      files: ['**/tests/**', '**/__tests__/**', '**/*.test.{ts,tsx,js,jsx}'],
      plugins: [
        'typescript',
        'unicorn',
        'oxc',
        'import',
        'node',
        'promise',
        'vitest',
        'node',
      ],
      rules: {
        // Eslint disabled rules
        'eslint/eqeqeq': 'allow',
        'eslint/no-shadow': 'allow',

        // Import disabled rules
        'import/no-relative-parent-imports': 'allow',
        'import/unambiguous': 'allow',

        // Unicorn disabled rules
        'unicorn/consistent-function-scoping': 'allow',

        // Vitest enabled rules
        'vitest/prefer-todo': 'warn',
        'vitest/prefer-each': 'warn',

        // Vitest disabled rules
        'vitest/prefer-to-be-truthy': 'allow',
        'vitest/prefer-importing-vitest-globals': 'allow',
        'vitest/require-test-timeout': 'allow',

        // Node disabled rules
        'node/global-require': 'allow',

        // typescript disabled rules
        'typescript/unbound-method': 'allow',
        'typescript/ban-ts-comment': 'allow',
        'typescript/no-explicit-any': 'allow',
        'typescript/no-unsafe-assignment': 'allow',
        'typescript/no-unsafe-member-access': 'allow',
        'typescript/no-unsafe-argument': 'allow',
        'typescript/await-thenable': 'allow',
        'typescript/no-confusing-void-expression': 'allow',
        'typescript/promise-function-async': 'allow',
        'typescript/no-floating-promises': 'allow',
        'typescript/no-unsafe-call': 'allow',
        'consistent-type-definitions': 'allow',
        'explicit-function-return-type': 'allow',
        'typescript/no-unsafe-return': 'allow',
        'typescript/no-empty-object-type': 'allow',
        'typescript/strict-boolean-expressions': 'allow',
        'typescript/no-unnecessary-type-assertion': 'allow',
        'typescript/strict-void-return': 'allow',
        'typescript/no-non-null-assertion': 'allow',
        'typescript/prefer-nullish-coalescing': 'allow',
        'typescript/prefer-readonly-parameter-types': 'allow',
      },
    },
  ],
});
