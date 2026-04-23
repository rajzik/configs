import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  format: 'esm',
  entry: ['./src/**/*.ts'],
  sourcemap: true,
  deps: {
    neverBundle: ['oxfmt'],
  },
});
