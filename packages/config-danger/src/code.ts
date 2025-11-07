import path from 'node:path';

import type { CommonOptions } from './types';
import {
  GLOBAL_IGNORE,
  IS_SRC,
  IS_TEST,
  isRevert,
  JS_EXT,
  SRC_EXT,
  TEST_EXT,
  touchedFiles,
  updatedFiles,
} from './helpers';

const changedSrcFiles = updatedFiles.filter(
  (file) => IS_SRC.test(file) && SRC_EXT.test(file),
);

/**
 * Options for test-related checks.
 */
export interface TestOptions extends CommonOptions {
  /** Regular expression pattern to ignore certain files from test checks. */
  ignorePattern?: RegExp;
  /** Root directory path to scope the check to a specific part of the codebase. */
  root?: string;
}

/**
 * Check for invalid NPM/Yarn installs by verifying the lock files.
 * Ensures that lock file changes are accompanied by package.json changes.
 */
export function checkForInvalidLocks() {
  const fileNames = new Set(touchedFiles.map((file) => path.basename(file)));

  if (fileNames.has('package-lock.json') && !fileNames.has('package.json')) {
    fail(
      'Your PR contains changes to package-lock.json, but not package.json.',
    );
  } else if (
    fileNames.has('npm-shrinkwrap.json') &&
    !fileNames.has('package.json')
  ) {
    fail(
      'Your PR contains changes to npm-shrinkwrap.json, but not package.json.',
    );
  } else if (
    fileNames.has('pnpm-lock.yaml') &&
    !fileNames.has('package.json') &&
    !fileNames.has('pnpm-workspace.yaml')
  ) {
    fail(
      'Your PR contains changes to pnpm-lock.yaml, but not package.json or pnpm-workspace.yaml.',
    );
  }
}

/**
 * Check that any test file exists when source files are updated.
 * Warns or fails if source files are changed but no test files are modified.
 *
 * @param {TestOptions} options - Configuration options for the test check
 * @param {string} [options.root] - Root directory path to scope the check to a specific part of the codebase
 * @param {RegExp} [options.ignorePattern] - Regular expression pattern to ignore certain files from test checks
 * @param {boolean} [options.fail=false] - If true, fail the check instead of warning
 */
export function checkForAnyTests({ root, ...options }: TestOptions = {}) {
  if (isRevert()) {
    return;
  }

  const hasTestFiles = touchedFiles.some((file) =>
    Boolean(TEST_EXT.test(file)),
  );
  const srcFiles = root
    ? changedSrcFiles.filter((srcFile) => srcFile.startsWith(root))
    : changedSrcFiles;

  if (srcFiles.length > 0 && !hasTestFiles) {
    const msg =
      'Your PR contains changes to source files, but no test changes were found.';

    if (options.fail) {
      fail(msg);
    } else {
      warn(msg);
    }
  }
}

/**
 * Check that all touched source files have an accompanying test file change.
 * More strict than checkForAnyTests - ensures each source file has a corresponding test.
 *
 * @param {TestOptions} options - Configuration options for the test check
 * @param {RegExp} [options.ignorePattern] - Regular expression pattern to ignore certain files from test checks
 * @param {string} [options.root] - Root directory path to scope the check to a specific part of the codebase
 * @param {boolean} [options.fail=false] - If true, fail the check instead of warning
 */
export function checkSourceFilesHaveTests({
  ignorePattern,
  root,
  ...options
}: TestOptions = {}) {
  if (isRevert()) {
    return;
  }

  const missingTestFiles: string[] = [];
  const srcFiles = root
    ? changedSrcFiles.filter((srcFile) => srcFile.startsWith(root))
    : changedSrcFiles;

  srcFiles.forEach((srcFile) => {
    if (ignorePattern?.exec(srcFile) ?? GLOBAL_IGNORE.exec(srcFile)) {
      return;
    }

    const testFile = srcFile
      .replace(IS_SRC, 'tests?/')
      // Foo/index.tsx -> Foo.test.tsx | Foo/index.test.tsx
      .replace(
        /(\w+)\/index\.((t|j)sx?)$/,
        (match, name, ext) =>
          `(?:(${name}.test.${ext})|(${name}/index.test.${ext}))`,
      )
      // Foo.tsx -> Foo.test.tsx
      .replace(/(\w+)\.((t|j)sx?)$/, (match, name, ext) =>
        name === 'test' ? match : `${name}.test.${ext}`,
      );

    const regex = new RegExp(testFile);

    updatedFiles.forEach((file) => {
      if (regex.test(file)) {
        missingTestFiles.push(`- ${srcFile.split(IS_SRC).at(1)}`);
      }
    });
  });

  if (missingTestFiles.length > 0) {
    const msg = `Your PR contains changes to the following source files, but no test changes were found.\n\n\n${missingTestFiles.join(
      '\n',
    )}`;

    if (options.fail) {
      fail(msg);
    } else {
      warn(msg);
    }
  }
}

/**
 * Options for snapshot testing checks.
 */
export interface SnapshotOptions {
  /** URL to documentation about snapshot testing deprecation. */
  docsUrl?: string;
}

const fileFilter = (file: string) =>
  file.endsWith('jsx.snap') || file.endsWith('tsx.snap');

/**
 * Component snapshot testing is deprecated, so disallow new snapshots.
 * Fails on new snapshots, warns on updated snapshots.
 *
 * @param {SnapshotOptions} options - Configuration options for the snapshot check
 * @param {string} [options.docsUrl] - URL to documentation about snapshot testing deprecation
 */
export function disableComponentSnapshots(options: SnapshotOptions = {}) {
  if (isRevert()) {
    return;
  }

  const hasCreatedSnapshot = danger.git.created_files.some(fileFilter);
  const hasUpdatedSnapshots = danger.git.modified_files.some(fileFilter);

  if (!hasCreatedSnapshot && !hasUpdatedSnapshots) {
    return;
  }

  let message =
    'Snapshot testing has been deprecated. Please migrate to standard React testing.';

  if (options.docsUrl) {
    message += ` [View for more information](${options.docsUrl})`;
  }

  if (hasCreatedSnapshot) {
    fail(message);
  } else {
    warn(message);
  }
}

/**
 * Disable new JavaScript files from being created.
 * Ensures all new files in src/ or tests/ directories are TypeScript.
 */
export function disableNewJavaScript() {
  const hasJS = danger.git.created_files.some(
    (file) => (IS_SRC.test(file) || IS_TEST.test(file)) && JS_EXT.test(file),
  );

  if (hasJS) {
    fail('JavaScript detected. All new files must be TypeScript.');
  }
}
