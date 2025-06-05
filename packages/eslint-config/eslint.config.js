import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import prettierConfig from '@rajzik/eslint-config/prettier';
import turboConfig from '@rajzik/eslint-config/turbo';
import migratePlugin from '@stylistic/eslint-plugin-migrate';

/** @type {import('@rajzik/eslint-config').Config} */
const config = [
  {
    plugins: {
      '@stylistic/migrate': migratePlugin,
    },
  },
  ...baseConfig,
  ...nodeConfig,
  ...turboConfig,
  ...prettierConfig,
];

export default config;
