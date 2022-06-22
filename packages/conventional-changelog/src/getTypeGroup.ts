import { GROUPS } from '@rajzik/conventional-changelog-types';

import type { CommitType, Group } from '@rajzik/conventional-changelog-types';

export default function getTypeGroup(type: CommitType): Group {
  const group = GROUPS.find((g) => g.types.includes(type));

  if (!group) {
    throw new Error(`Cannot find group for type "${type}".`);
  }

  return group;
}
