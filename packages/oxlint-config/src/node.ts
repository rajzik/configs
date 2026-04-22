import { defineConfig } from 'oxlint';

/**
 * Node specific configuration. To build fully configured oxlint configuration
 *
 * @since 1.0.0
 * @example
 *   ```ts
 *   import { nodeConfig } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [nodeConfig],
 *   });
 *   ```;
 *
 * @see {buildOxlintConfig}.
 */
export const nodeConfig = defineConfig({
  plugins: ['node'],
  env: {
    node: true,
  },
  rules: {
    // Node enabled rules
    'node/global-require': 'warn',
  },
});
