import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  turbo: true,
  jsdoc: true,
  overrides: {
    ignorePatterns: [
      '**/fixtures/**',
      '**/dist/**',
      '**/lib/**',
      'node_modules',
      '**/coverage/**',
    ],
  },
});
