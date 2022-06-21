import futureRules from '../rules/future';

import type eslint from 'eslint';

const config: eslint.Linter.Config = {
  rules: futureRules,
};

export default config;
