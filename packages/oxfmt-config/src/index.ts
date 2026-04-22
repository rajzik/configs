import type { OxfmtConfig } from 'oxfmt';

import { IGNORE_PATHS } from '@rajzik/configs-shared';

/** Shared import prefixes that should be treated as internal modules. */
const internalPattern = ['~/', '@/'];

/** Base Oxfmt configuration shared across projects. */
export const fmt: OxfmtConfig = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  ignorePatterns: IGNORE_PATHS,
  objectWrap: 'preserve',
  printWidth: 80,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  sortImports: {
    groups: [
      'type-builtin',
      'value-builtin',
      'type-external',
      'value-external',
      'type-internal',
      'value-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-parent', 'value-sibling', 'value-index'],
      'style',
      'unknown',
    ],
    internalPattern,
    newlinesBetween: true,
  },
  sortPackageJson: {
    sortScripts: true,
  },
  jsdoc: true,
  sortTailwindcss: true,
  trailingComma: 'all',
};

/** Merge the shared formatter defaults with project-specific overrides. */
export function extendOxfmtConfig(config: OxfmtConfig): OxfmtConfig {
  return {
    ...fmt,
    ...config,
  };
}

export default fmt;
