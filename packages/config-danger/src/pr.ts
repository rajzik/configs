import { checkCommitFormat } from '@rajzik/conventional-changelog-types';

// Verify the PR title contains the conventional-changelog required prefix.
/**
 * Check for conventional changelog prefix in the PR title.
 * @see https://github.com/rajzik/configs/tree/main/packages/conventional-changelog#commit-message-format
 */
export function checkForConventionalPrefix() {
  if (!checkCommitFormat(danger.github.pr.title)) {
    fail(
      'Pull request title requires a conventional changelog prefix. [View commit message format](https://github.com/rajzik/configs/tree/main/packages/conventional-changelog#commit-message-format).',
    );
  }
}

/**
 * Check for conventional changelog prefix in the commit message when PR has only 1 commit.
 * When a PR only has 1 commit and a squash merge occurs, the commit is used as-is,
 * and the PR title is lost, resulting in the semver prefix also being lost.
 *
 * @see https://github.com/rajzik/configs/tree/main/packages/conventional-changelog#commit-message-format
 */
export function checkForConventionalSquashCommit() {
  if (
    danger.github.pr.commits <= 1 &&
    !danger.github.commits
      .at(0)
      ?.commit.message.includes(danger.github.pr.title)
  ) {
    fail(
      'Automatic releases requires commit message to match PR title if PR contains only 1 commit.',
    );
  }
}
