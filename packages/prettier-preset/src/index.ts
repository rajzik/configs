/** @typedef {import('prettier').Config} PrettierConfig */
/** @typedef {import('prettier-plugin-tailwindcss').PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import('prettier-plugin-sort-json').SortJsonOptions} SortJsonConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig | SortJsonConfig } */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: ['prettier-plugin-packagejson', '@ianvs/prettier-plugin-sort-imports'],
  printWidth: 100,
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
