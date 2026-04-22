import type { SemverLevel } from '@rajzik/conventional-changelog-types';

import { getTypeGroup } from '@rajzik/conventional-changelog-types';

import type { BumpOptions } from './types';

import parserOpts from './parserOpts';

/**
 * Options for determining recommended version bumps based on commit types.
 * Analyzes commits to determine if a major, minor, or patch version bump is
 * needed.
 */
const options: BumpOptions = {
  parserOpts,

  whatBump(commits) {
    let level: SemverLevel = null;
    let breakings = 0;
    let features = 0;
    let fixes = 0;

    commits.forEach((commit) => {
      try {
        const { bump } = getTypeGroup(commit.type);

        if (!bump) {
          return;
        }

        if (bump === 'major') {
          breakings += 1;
          level = 0;

          return;
        }

        if (bump === 'minor') {
          features += 1;
          if (level === null || level === 2) {
            level = 1;
          }

          return;
        }

        fixes += 1;
        level ??= 2;
      } catch {
        // Ignore commit types that are not part of the supported release groups.
      }
    });

    return {
      level,
      reason: `There are ${breakings} breaking changes and ${features} new features, also ${fixes} fixes`,
    };
  },
};

export default options;
