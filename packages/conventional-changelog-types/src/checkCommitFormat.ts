import type { CommitType } from './types';

import { COMMIT_FORMAT_PREFIX } from './constants';

const COMMIT_TYPES = new Set<string>([
  'break',
  'breaking',
  'build',
  'cd',
  'ci',
  'deps',
  'docs',
  'feature',
  'fix',
  'internal',
  'misc',
  'new',
  'patch',
  'release',
  'revert',
  'security',
  'style',
  'styles',
  'test',
  'tests',
  'type',
  'types',
  'update',
]);

const isCommitType = (value: string): value is CommitType =>
  COMMIT_TYPES.has(value);

/**
 * Check if a commit message follows the conventional commit format.
 *
 * @param {string} commit - The commit message to check
 * @returns {{ scope: string; type: CommitType } | null} Object with type and
 *   scope if format is valid, null otherwise
 */
export function checkCommitFormat(
  commit: string,
): { scope: string; type: CommitType } | null {
  const match = new RegExp(COMMIT_FORMAT_PREFIX.source, 'u').exec(commit);

  if (!match) {
    return null;
  }
  const [, type, scope = ''] = match;

  if (typeof type !== 'string' || !isCommitType(type)) {
    return null;
  }

  return {
    scope: scope || '',
    type,
  };
}
