import type eslint from 'eslint';

import reactRules from '../rules/react';

const config: eslint.Linter.Config = {
  rules: reactRules,
};

export default config;
