interface DangerFiles {
  readonly createdFiles?: readonly string[];
  readonly modifiedFiles?: readonly string[];
  readonly deletedFiles?: readonly string[];
}

interface DangerCheckResult {
  readonly failures: readonly string[];
  readonly warnings: readonly string[];
}

type TestDangerGlobals = typeof globalThis & {
  danger?: {
    git: {
      created_files: string[];
      deleted_files: string[];
      modified_files: string[];
    };
    github: {
      pr: {
        title: string;
      };
    };
  };
  fail?: (message: string) => void;
  warn?: (message: string) => void;
  message?: (message: string) => void;
};

const runCheckSourceFilesHaveTests = async ({
  createdFiles = [],
  modifiedFiles = [],
  deletedFiles = [],
}: DangerFiles = {}): Promise<DangerCheckResult> => {
  const failures: string[] = [];
  const warnings: string[] = [];
  const messages: string[] = [];
  const testGlobal = globalThis as TestDangerGlobals;

  testGlobal.danger = {
    git: {
      created_files: [...createdFiles],
      deleted_files: [...deletedFiles],
      modified_files: [...modifiedFiles],
    },
    github: {
      pr: {
        title: 'feat: add component',
      },
    },
  };
  testGlobal.fail = (message: string) => failures.push(message);
  testGlobal.warn = (message: string) => warnings.push(message);
  testGlobal.message = (message: string) => messages.push(message);

  try {
    const { checkSourceFilesHaveTests } = await import('../src/code');

    checkSourceFilesHaveTests({ fail: true });
  } finally {
    // The production module reads Danger globals at import time.
    vi.resetModules();
    delete testGlobal.danger;
    delete testGlobal.fail;
    delete testGlobal.warn;
    delete testGlobal.message;
  }

  return { failures, warnings };
};

describe('checkSourceFilesHaveTests', () => {
  it('does not fail when a matching test changed', async () => {
    const { failures, warnings } = await runCheckSourceFilesHaveTests({
      createdFiles: ['src/Button.ts', 'tests/Button.test.ts'],
    });

    expect(failures).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it('fails when no matching test changed', async () => {
    const { failures, warnings } = await runCheckSourceFilesHaveTests({
      createdFiles: ['src/Button.ts'],
    });

    expect(warnings).toHaveLength(0);
    expect(failures).toHaveLength(1);
    expect(failures[0]).toMatch(/Button\.ts/);
  });

  it('does not treat a snapshot as a matching test change', async () => {
    const { failures, warnings } = await runCheckSourceFilesHaveTests({
      createdFiles: ['src/Button.ts', 'tests/Button.test.ts.snap'],
    });

    expect(warnings).toHaveLength(0);
    expect(failures).toHaveLength(1);
    expect(failures[0]).toMatch(/Button\.ts/);
  });
});
