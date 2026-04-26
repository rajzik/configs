import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  turbo: true,
  jsdoc: true,
  library: true,
  overrides: {
    ignorePatterns: [
      '**/fixtures/**',
      '**/dist/**',
      'node_modules',
      '**/coverage/**',
    ],
  },
});
