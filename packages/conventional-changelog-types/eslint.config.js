import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import prettierConfig from '@rajzik/eslint-config/prettier';
import turboConfig from '@rajzik/eslint-config/turbo';

/** @type {import('@rajzik/eslint-config').Config} */
const config = [...baseConfig, ...nodeConfig, ...turboConfig, ...prettierConfig];

export default config;
