import type { OxlintConfig } from 'oxlint';

import { defineConfig } from 'oxlint';

import { baseConfig } from './base';
import { jsdocConfig } from './jsdoc';
import { libraryConfig } from './library';
import { nodeConfig } from './node';
import { reactConfig } from './react';
import { turboConfig } from './turbo';

/**
 * @private
 * @param {boolean | undefined | OxlintConfig} input Input
 * @returns {boolean} IsDefined
 */
const isDefined = (
  input: OxlintConfig | boolean | undefined,
): input is OxlintConfig => input !== undefined && typeof input !== 'boolean';

export interface BuildOxlintConfigArgs {
  /**
   * When `react: true` enables react specific rules. Requires react 19 and
   * enables react-compiler rules.
   *
   * @default false
   */
  react?: boolean;
  /**
   * When `node: true` enables node specific rules.
   *
   * @default false
   */
  node?: boolean;
  /**
   * When `turbo: true` enables turborepo specific rules.
   *
   * @default false
   */
  turbo?: boolean;
  /**
   * When `jsdoc: true` enables jsdoc specific rules.
   *
   * @default false
   */
  jsdoc?: boolean;
  /**
   * When `library: true` enables library specific rules.
   *
   * @default false;
   */
  library?: boolean;
  /**
   * Overrides of the configuration, supports all possible overrides. Extends
   * array is appended not overridden.
   */
  overrides?: OxlintConfig;
}

/**
 * Build specific project specific oxlint configuration. Do not use this
 * function when building configuration from scratch.
 *
 * @example
 *   ```ts
 *   import { buildOxlintConfig } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default buildOxlintConfig({
 *     react: true,
 *     turbo: true,
 *     override: {
 *       rules: {
 *         'eslint/eqeqeq': 'error',
 *       },
 *     },
 *   });
 *   ```;
 *
 * @function buildOxlintConfig
 * @param {BuildOxlintConfigArgs} configuration Configuration
 * @returns {OxlintConfig} Oxlint config
 */
export const buildOxlintConfig = (
  configuration: BuildOxlintConfigArgs = {},
): OxlintConfig => {
  const {
    react = false,
    node = false,
    turbo = false,
    jsdoc = false,
    library = false,
    overrides,
  } = configuration;

  return defineConfig({
    ...overrides,
    extends: [
      baseConfig,
      react && reactConfig,
      node && nodeConfig,
      turbo && turboConfig,
      jsdoc && jsdocConfig,
      ...(overrides?.extends ?? []),
      library && libraryConfig,
    ].filter((item) => isDefined(item)),
  });
};
