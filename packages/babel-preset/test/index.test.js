import { create } from 'babel-test';
import { toMatchFile } from 'jest-file-snapshot';
import path from 'node:path';

import { getConfig } from './test-utils';

const { fixtures } = create({ configFile: true });
const { test } = create({
  ...getConfig({ library: true, node: true, esm: false }),
  configFile: false,
  babelrc: false,
});

expect.extend({ toMatchFile });
fixtures('babel-config', path.join(__dirname, 'fixtures'));

describe('babel typescript test', () => {
  test('typescript transpilation', async ({ transform }) => {
    const { code } = await transform(
      `
      class Cls {
        #initialized = false;
        constructor() {
          this.#initialized = true
        }
      };
      export default Cls;`,
      { filename: 'index.ts' },
    );

    expect(code).toMatchSnapshot();
  });

  test('typescript decorators', async ({ transform }) => {
    const { code } = await transform(
      `
      class Cls {
        @decorator
        foo() {
          console.log('Test');
        }
      };
      export default Cls;`,
      { filename: 'index.ts' },
    );

    expect(code).toMatchSnapshot();
  });
});
