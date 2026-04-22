import { defineConfig } from 'oxlint';

/**
 * Library specific rules. To build fully configured oxlint configuration @see
 * {buildOxlintConfig}.
 *
 * > This config must be last in extends array to work properly.
 *
 * @since 1.1.0
 * @example
 *   ```ts
 *   import { libraryConfig } from '@epa/oxlint-config';
 *   import { defineConfig } from 'oxlint';
 *
 *   export default defineConfig({
 *     extends: [libraryConfig],
 *   });
 *   ```;
 */
export const libraryConfig = defineConfig({
  rules: {
    // Typescript disabled rules
    'typescript/prefer-readonly-parameter-types': 'allow',
  },
});
