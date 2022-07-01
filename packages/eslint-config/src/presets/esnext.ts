import unicornRules from '../rules/esnext';

import type eslint from 'eslint';

const config: eslint.Linter.Config = {
  rules: unicornRules,
};

export default config;
