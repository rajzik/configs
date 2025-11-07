import type { CommonOptions } from './types';
import {
  countChangesInFile,
  debug,
  isRevert,
  SNAP_EXT,
  TEST_EXT,
  touchedFiles,
} from './helpers';

/**
 * Options for checking ADR (Architecture Decision Record) requirements.
 */
export type CheckAdrOptions = CommonOptions & {
  /** Threshold for number of line changes before requiring ADR. Defaults to 200. */
  changeThreshold?: number;
  /** URL to documentation about ADR requirements. */
  docsUrl?: string;
  /** Additional file patterns to exclude from change count calculation. */
  exclusions?: string[];
};

/**
 * Check that large PRs have an associated ADR file documenting the change.
 * Ignores lock, tests, and snapshot files in the calculation.
 *
 * @param {string} docsPath - Path to the documentation directory (e.g., 'docs/adr')
 * @param {CheckAdrOptions} options - Configuration options for the ADR check
 * @param {number} [options.changeThreshold=200] - Threshold for number of line changes before requiring ADR
 * @param {string} [options.docsUrl=''] - URL to documentation about ADR requirements
 * @param {string[]} [options.exclusions=[]] - Additional file patterns to exclude from change count calculation
 * @param {boolean} [options.fail=false] - If true, fail the check instead of warning
 */
export function checkForADR(docsPath: string, options: CheckAdrOptions = {}) {
  if (isRevert()) {
    return;
  }

  const { changeThreshold = 200, docsUrl = '', exclusions = [] } = options;
  const hasDocsFiles = touchedFiles.some((file) => file.includes(docsPath));
  const docsExclusions = [
    ...exclusions,
    'package-lock.json',
    'yarn.lock',
    TEST_EXT,
    SNAP_EXT,
  ];
  const modifiedExclusions = danger.git.modified_files.filter((file) =>
    // eslint-disable-next-line unicorn/prefer-regexp-test
    docsExclusions.some((ex) => Boolean(file.match(ex))),
  );

  void Promise.all(modifiedExclusions.map(countChangesInFile)).then((vals) => {
    const totalChangeCount =
      danger.github.pr.additions + danger.github.pr.deletions;
    const exclusionChangeCount = vals.reduce((acc, val) => acc + val, 0);
    const changeCount = totalChangeCount - exclusionChangeCount;

    debug(
      `checkForADR: lines changed total=${totalChangeCount} excluded=${exclusionChangeCount} adjusted=${changeCount}`,
    );

    if (hasDocsFiles) {
      message('Thank you for adding documentation! :tada:');
    } else if (changeCount > changeThreshold) {
      let msg = `This PR has over ${changeThreshold} additions/deletions, but no documentation which describes the changes.`;

      if (docsUrl) {
        msg += ` Consider adding an [ADR](${docsUrl}).`;
      }

      if (options.fail) {
        fail(msg);
      } else {
        warn(msg);
      }
    }

    return vals;
  });
}
