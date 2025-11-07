import type { PluginConfig } from '@ianvs/prettier-plugin-sort-imports';
import type { Config } from 'prettier';

/**
 * Extended Prettier configuration type that includes plugin-specific options.
 */
export type ExtendedConfig = Config | PluginConfig;

/**
 * Base Prettier configuration with import sorting.
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  printWidth: 80,
  proseWrap: 'always',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '',
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '',
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '',
    '<TYPES>^@org',
    '^@org/(.*)$',
    '',
    '<TYPES>^[.|..|~]',
    '^~/',
    '^[../]',
    '^[./]',
  ],
} as const satisfies ExtendedConfig;

export default config;
