import fs from 'node:fs';
import path from 'node:path';

import type { Config } from '@jest/types';

import {
  ASSET_EXT_PATTERN,
  CSS_EXT_PATTERN,
  EXTS,
  IGNORE_PATHS,
  ROOT,
} from '@rajzik/configs-shared';

const exts = EXTS.map((ext) => ext.slice(1));
const extsWithoutJSON = exts.filter((ext) => ext !== 'json');

const setupFilesAfterEnv: string[] = [];
const jsSetupFilePath = path.join(ROOT, 'tests/setup.js');
const setupFilePath = path.join(ROOT, 'tests/setup.ts');

// Only include the file if it exists, otherwise Jest throws an error
if (fs.existsSync(setupFilePath)) {
  setupFilesAfterEnv.push(setupFilePath);
}

// Only include the file if it exists, otherwise Jest throws an error
if (fs.existsSync(jsSetupFilePath)) {
  setupFilesAfterEnv.push(jsSetupFilePath);
}

const config: Config.InitialOptions = {
  collectCoverage: false, // Enabled by consumers
  collectCoverageFrom: [`**/{src,tests,__tests__}/**/*.{${extsWithoutJSON.join(',')}}`],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: IGNORE_PATHS.filter((ignore) => !ignore.startsWith('*')),
  coverageReporters: ['lcov', 'json-summary', 'html', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    [`__DEV__`]: true,
    [`__PROD__`]: true,
  },
  moduleNameMapper: {
    // eslint-disable-next-line unicorn/prefer-module
    [`^.+${ASSET_EXT_PATTERN.source}`]: require.resolve('./fileMock.js'),
    // eslint-disable-next-line unicorn/prefer-module
    [`^.+${CSS_EXT_PATTERN.source}`]: require.resolve('./fileMock.js'),
  },
  setupFilesAfterEnv,
  testEnvironment: 'node',
  verbose: false,
  transformIgnorePatterns: ['/node_modules/', '/esm/', '/lib/'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  fakeTimers: {
    enableGlobally: true,
  },
};

export default config;
