import type { PluginConfig } from '@ianvs/prettier-plugin-sort-imports';
import type { Config } from 'prettier';
import type { PluginOptions } from 'prettier-plugin-tailwindcss';

export type ExtendedConfig = Config | PluginOptions | PluginConfig;

const config: ExtendedConfig = {
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
};

export default config;
