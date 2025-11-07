/** Regular expression matching files in src/ directory. */
export const IS_SRC = /src\//;
/** Regular expression matching files in tests?/ directory. */
export const IS_TEST = /tests?\//;
/** Regular expression matching JavaScript file extensions (.js, .jsx). */
export const JS_EXT = /\.jsx?$/;
/** Regular expression matching source file extensions (.ts, .tsx, .js, .jsx). */
export const SRC_EXT = /\.(t|j)sx?$/;
/** Regular expression matching test file extensions (.test.ts, .test.tsx, etc.). */
export const TEST_EXT = /\.test\.(t|j)sx?$/;
/** Regular expression matching snapshot file extensions (.snap). */
export const SNAP_EXT = /\.snap$/;
/** Regular expression matching icon component files to ignore in test checks. */
export const GLOBAL_IGNORE = /Icon[A-Z][A-Za-z]+\.(t|j)sx$/;

/** Array of files that were created or modified in the PR. */
export const updatedFiles = [
  ...danger.git.created_files,
  ...danger.git.modified_files,
];

/** Array of files that were created, deleted, or modified in the PR. */
export const touchedFiles = [
  ...danger.git.created_files,
  ...danger.git.deleted_files,
  ...danger.git.modified_files,
];

/**
 * Debug logging function that only outputs when dangerfile.js is modified.
 *
 * @param {string} msg - Debug message to log
 * @param {...string} args - Additional arguments to include in the message
 */
export function debug(msg: string, ...args: string[]) {
  if (danger.git.modified_files.includes('dangerfile.js')) {
    message(`[debug] ${msg}`, ...args);
  }
}

/**
 * Check if the current PR is a revert commit.
 *
 * @returns True if the PR title starts with "Revert" or includes "Automatic revert"
 */
export function isRevert(): boolean {
  return (
    danger.github.pr.title.startsWith('Revert') ||
    danger.github.pr.title.includes('Automatic revert')
  );
}

/**
 * Count the number of line changes (additions + deletions) in a specific file.
 *
 * @param {string} file - Path to the file to analyze
 * @returns {Promise<number>} Promise resolving to the total number of line changes
 */
export async function countChangesInFile(file: string): Promise<number> {
  return new Promise((resolve) => {
    void danger.git.diffForFile(file).then((d) => {
      const added = d?.added.split('\n').length ?? 0;
      const removed = d?.removed.split('\n').length ?? 0;

      resolve(added + removed);

      return d;
    });
  });
}
