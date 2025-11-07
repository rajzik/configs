import type { CommitType, Group } from './types';
import { GROUPS } from './constants';

/**
 * Get the group configuration for a given commit type.
 *
 * @param type - The commit type to look up
 * @returns The group configuration for the commit type
 * @throws Error if the type is not found in any group
 */
export function getTypeGroup(type: CommitType): Group {
  const group = GROUPS.find((g) => g.types.includes(type));

  if (!group) {
    throw new Error(`Cannot find group for type "${type}".`);
  }

  return group;
}
