import type { PluginConfig } from '@ianvs/prettier-plugin-sort-imports';
import type { Config } from 'prettier';
import type { PluginOptions } from 'prettier-plugin-tailwindcss';

import baseConfig from './index';

/**
 * Extended Prettier configuration type that includes Tailwind CSS plugin options.
 */
export type ExtendedConfig = Config | PluginOptions | PluginConfig;

/**
 * Prettier configuration with Tailwind CSS class sorting.
 */
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
} as const satisfies ExtendedConfig;

export default config;
