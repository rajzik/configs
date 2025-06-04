import type { Group, SemverLevel } from '@rajzik/conventional-changelog-types';

import { getTypeGroup } from '@rajzik/conventional-changelog-types';

import type { BumpOptions } from './types';
import parserOpts from './parserOpts';

const options: BumpOptions = {
  parserOpts,

  whatBump(commits) {
    let level: SemverLevel = null;
    let breakings = 0;
    let features = 0;
    let fixes = 0;

    commits.forEach((commit) => {
      let group: Group;

      try {
        group = getTypeGroup(commit.type);
      } catch {
        return;
      }

      switch (group.bump) {
        case 'major': {
          breakings += 1;
          level = 0;

          break;
        }
        case 'minor': {
          features += 1;
          if (level === null || level === 2) {
            level = 1;
          }

          break;
        }
        case 'patch': {
          fixes += 1;
          level ??= 2;

          break;
        }
        // No default
      }
    });

    return {
      level,
      reason: `There are ${breakings} breaking changes and ${features} new features, also ${fixes} fixes`,
    };
  },
};

export default options;
