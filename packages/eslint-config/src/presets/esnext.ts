import type eslint from 'eslint';

import unicornRules from '../rules/esnext';

const config: eslint.Linter.Config = {
  rules: unicornRules,
};

export default config;
