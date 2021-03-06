import { COMMIT_FORMAT_PREFIX } from './constants';

import type { CommitType } from './types';

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
