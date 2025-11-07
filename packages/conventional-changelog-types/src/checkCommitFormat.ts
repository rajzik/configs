import type { CommitType } from './types';
import { COMMIT_FORMAT_PREFIX } from './constants';

/**
 * Check if a commit message follows the conventional commit format.
 *
 * @param {string} commit - The commit message to check
 * @returns {Object | null} Object with type and scope if format is valid, null otherwise
 * @returns {string} return.scope - The commit scope
 * @returns {CommitType} return.type - The commit type
 */
export function checkCommitFormat(
  commit: string,
): { scope: string; type: CommitType } | null {
  const match = new RegExp(`${COMMIT_FORMAT_PREFIX.source}`, 'u').exec(commit);

  if (!match) {
    return null;
  }
  const [, type, scope = ''] = match;

  return {
    scope: scope || '',
    type: type as CommitType,
  };
}
