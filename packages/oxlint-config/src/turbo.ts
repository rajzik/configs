import { defineConfig } from 'oxlint';

/**
 * Turborepo specific configuration. To build fully configured oxlint
 * configuration @see {buildOxlintConfig}.
 *
 * @since 1.0.0
 * @example
 *   ```ts
 *   import { turboConfig } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [turboConfig],
 *   });
 *   ```;
 */
export const turboConfig = defineConfig({
  jsPlugins: ['eslint-plugin-turbo'],
  rules: {
    // Turbo enabled rules
    'turbo/no-undeclared-env-vars': 'error',
  },
});
