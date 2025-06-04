/* eslint @stylistic/migrate/migrate-js: "error" */
import stylisticPlugin from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': jsxA11y,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...stylisticPlugin.configs['disable-legacy'].rules,

      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-sort-props': 'warn',
      '@stylistic/jsx-pascal-case': 'warn',

      'react/jsx-boolean-value': ['error', 'never'],

      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'never', propElementValues: 'always', props: 'never' },
      ],

      'react/self-closing-comp': 'error',

      'react/jsx-no-leaked-render': 'warn',

      'react/jsx-fragments': 'warn',

      'react/button-has-type': 'warn',

      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],

      'react/no-array-index-key': 'warn',

      'react/no-unstable-nested-components': 'error',

      'react/hook-use-state': 'warn',
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'jsx-a11y': {
        polymorphicPropName: 'as',
        components: {
          Button: 'button',
          CancelButton: 'button',
          DeleteButton: 'button',
          SaveButton: 'button',
          EditButton: 'button',
          ShareButton: 'button',
          ImportButton: 'button',
          NumberInput: 'input',
          TextInput: 'input',
          TextField: 'input',
        },
      },
    },
  },
];
