import { defineConfig } from 'oxlint';

/**
 * React specific configuration. To build fully configured oxlint configuration
 *
 * @since 1.0.0
 * @example
 *   ```ts
 *   import { react } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [react],
 *   });
 *   ```;
 *
 * @see {buildOxlintConfig}.
 */
export const reactConfig = defineConfig({
  plugins: ['react', 'jsx-a11y'],
  env: {
    browser: true,
  },
  jsPlugins: [
    { name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' },
  ],
  rules: {
    // React enabled rules
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['tsx', 'jsx'],
      },
    ],
    'react/jsx-boolean-value': 'warn',
    'react/self-closing-comp': 'warn',
    'react/checked-requires-onchange-or-readonly': 'error',
    'react/forward-ref-uses-ref': 'error',
    'react/iframe-missing-sandbox': 'error',
    'jsx-curly-brace-presence': 'warn',
    'jsx-fragments': ['warn', 'syntax'],
    'react/hook-use-state': [
      'error',
      {
        allowDestructuredState: true,
      },
    ],

    // Enable once oxlint adds support for this rule.
    // https://github.com/oxc-project/oxc/issues/1022
    // 'react/function-component-definition': [
    //   'error',
    //   {
    //     NamedComponents: 'function-declaration',
    //     UnnamedComponents: 'arrow-function',
    //   },
    // ],
    // 'react/no-arrow-function-lifecycle': 'error',

    // React disabled rules
    'react/react-in-jsx-scope': 'allow',
    'react-perf/jsx-no-jsx-as-prop': 'allow',
    'react/display-name': 'allow',
    'react/rules-of-hooks': 'allow',
    'react/no-multi-comp': 'allow',
    'react/jsx-max-depth': 'allow',
    'react/jsx-props-no-spreading': 'allow',
    'react/jsx-no-constructed-context-values': 'allow',
    'react/only-export-components': 'allow',

    // React hooks enabled rules
    'react-hooks-js/rules-of-hooks': 'error',
    'react-hooks-js/exhaustive-deps': 'warn',
    'react-hooks-js/config': 'warn',
    'react-hooks-js/set-state-in-effect': 'error',
    'react-hooks-js/error-boundaries': 'error',
    'react-hooks-js/component-hook-factories': 'error',
    'react-hooks-js/gating': 'error',
    'react-hooks-js/globals': 'error',
    'react-hooks-js/immutability': 'error',
    'react-hooks-js/preserve-manual-memoization': 'error',
    'react-hooks-js/purity': 'error',
    'react-hooks-js/refs': 'error',
    'react-hooks-js/set-state-in-render': 'error',
    'react-hooks-js/static-components': 'error',
    'react-hooks-js/unsupported-syntax': 'warn',
    'react-hooks-js/use-memo': 'error',
    'react-hooks-js/incompatible-library': 'warn',
    'react-hooks-js/void-use-memo': 'warn',
  },
});
