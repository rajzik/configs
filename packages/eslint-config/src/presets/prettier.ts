import prettierRules from '../rules/prettier';

import type eslint from 'eslint';

const config: eslint.Linter.Config = {
  extends: ['eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  rules: prettierRules,
};

export default config;
