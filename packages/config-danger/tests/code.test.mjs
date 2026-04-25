import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const runCheckSourceFilesHaveTests = ({
  createdFiles = [],
  modifiedFiles = [],
  deletedFiles = [],
} = {}) => {
  const script = `
    const failures = [];
    const warnings = [];
    globalThis.danger = {
      git: {
        created_files: ${JSON.stringify(createdFiles)},
        deleted_files: ${JSON.stringify(deletedFiles)},
        modified_files: ${JSON.stringify(modifiedFiles)},
      },
      github: {
        pr: {
          title: 'feat: add component',
        },
      },
    };
    globalThis.fail = (message) => failures.push(message);
    globalThis.warn = (message) => warnings.push(message);
    globalThis.message = () => {};
    const { checkSourceFilesHaveTests } = await import('./dist/code.mjs');
    checkSourceFilesHaveTests({ fail: true });
    console.log(JSON.stringify({ failures, warnings }));
  `;
  const result = spawnSync(
    process.execPath,
    ['--input-type=module', '-e', script],
    {
      cwd: new URL('..', import.meta.url),
      encoding: 'utf8',
    },
  );

  assert.equal(result.status, 0, result.stderr);

  return JSON.parse(result.stdout);
};

{
  const { failures, warnings } = runCheckSourceFilesHaveTests({
    createdFiles: ['src/Button.ts', 'tests/Button.test.ts'],
  });

  assert.deepEqual(failures, []);
  assert.deepEqual(warnings, []);
}

{
  const { failures, warnings } = runCheckSourceFilesHaveTests({
    createdFiles: ['src/Button.ts'],
  });

  assert.equal(warnings.length, 0);
  assert.equal(failures.length, 1);
  assert.match(failures[0], /Button\.ts/);
}
