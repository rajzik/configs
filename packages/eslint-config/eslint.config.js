import migratePlugin from '@stylistic/eslint-plugin-migrate';

import baseConfig from '@rajzik/eslint-config';
import prettierConfig from '@rajzik/eslint-config/prettier';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    plugins: {
      '@stylistic/migrate': migratePlugin,
    },
  },
  ...baseConfig,
  ...prettierConfig,
];
