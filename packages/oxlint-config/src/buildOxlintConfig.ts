/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types */

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
  input: Readonly<OxlintConfig> | boolean | undefined,
): input is Readonly<OxlintConfig> =>
  input !== undefined && typeof input !== 'boolean';

export interface BuildOxlintConfigArgs {
  /**
   * When `react: true` enables react specific rules. Requires react 19 and
   * enables react-compiler rules.
   *
   * @default false
   */
  readonly react?: boolean;
  /**
   * When `node: true` enables node specific rules.
   *
   * @default false
   */
  readonly node?: boolean;
  /**
   * When `turbo: true` enables turborepo specific rules.
   *
   * @default false
   */
  readonly turbo?: boolean;
  /**
   * When `epa: true` enables epa specific rules.
   *
   * @default true
   */
  readonly epa?: boolean;
  /**
   * When `jsdoc: true` enables jsdoc specific rules.
   *
   * @default false
   */
  readonly jsdoc?: boolean;
  /**
   * When `library: true` enables library specific rules.
   *
   * @default false;
   */
  readonly library?: boolean;
  /**
   * Overrides of the configuration, supports all possible overrides. Extends
   * array is appended not overridden.
   */
  readonly overrides?: Readonly<OxlintConfig>;
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
 *   ```
 *
 * @function buildOxlintConfig
 * @param {BuildOxlintConfigArgs} configuration Configuration
 * @returns {OxlintConfig} Oxlint config
 */
export const buildOxlintConfig = (
  configuration: Readonly<BuildOxlintConfigArgs> = {},
): OxlintConfig => {
  const {
    react = false,
    node = false,
    turbo = false,
    jsdoc = false,
    epa: _epa = true,
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
