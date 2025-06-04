import type { CommitType } from './types';
import { COMMIT_FORMAT_PREFIX } from './constants';

export function checkCommitFormat(commit: string): { scope: string; type: CommitType } | null {
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
