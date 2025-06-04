import type eslint from 'eslint';

import { TJSX_EXTS_GROUP } from '@rajzik/configs-shared';

import baseRules from '../rules/base';
import jestRules from '../rules/jest-rules';

const config: eslint.Linter.Config = {
  rules: baseRules,
  overrides: [
    {
      files: [`*.test.${TJSX_EXTS_GROUP}`],

      plugins: ['jest', 'testing-library'],

      settings: {
        'testing-library/custom-queries': 'off',
        'testing-library/custom-renders': 'off',
        'testing-library/utils-module': 'off',
      },

      globals: {
        jsdom: 'readonly',
      },

      env: {
        jest: true,
        node: true,
      },

      rules: jestRules,
    },
  ],
};

export default config;
