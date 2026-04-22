import { defineConfig } from 'oxlint';

/**
 * Node specific configuration. To build fully configured oxlint configuration
 *
 * @since 1.0.0
 * @example
 *   ```ts
 *   import { jsdoc } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [jsdoc],
 *   });
 *   ```;
 *
 * @see {buildOxlintConfig}.
 */
export const jsdocConfig = defineConfig({
  plugins: ['jsdoc'],
  rules: {},
});
