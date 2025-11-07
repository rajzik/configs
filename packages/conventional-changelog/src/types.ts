import type {
  Commit,
  ParserOptions,
  SemverLevel,
} from '@rajzik/conventional-changelog-types';

/**
 * Options for determining version bumps from commits.
 */
export interface BumpOptions {
  /** Parser options for parsing commit messages. */
  parserOpts: Partial<ParserOptions>;
  /** Function that analyzes commits and returns the recommended version bump level. */
  whatBump: (commits: Commit[]) => { level: SemverLevel; reason: string };
}
