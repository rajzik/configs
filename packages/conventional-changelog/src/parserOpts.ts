import type { ParserOptions } from '@rajzik/conventional-changelog-types';

import { COMMIT_FORMAT_PREFIX } from '@rajzik/conventional-changelog-types';

/**
 * Parser options for conventional changelog.
 * Configures how commit messages are parsed and structured.
 */
const options: Partial<ParserOptions> = {
  headerCorrespondence: ['azure', 'type', 'scope', 'message'],
  // Keep in sync with checkCommitFormat
  headerPattern: new RegExp(
    String.raw`^(Merged? PR \d+: )?${COMMIT_FORMAT_PREFIX.source} (.*)$`,
    'u',
  ),
  mergeCorrespondence: ['id', 'source'],
  mergePattern: /^Merge pull request #(\\d+) from (.*)/u,

  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'Note'],
  revertCorrespondence: ['header'],
  revertPattern: /^Revert\s"(.*)"?/u,
};

export default options;
