import type { Commit, ParserOptions, SemverLevel } from '@rajzik/conventional-changelog-types';

export interface BumpOptions {
  parserOpts: Partial<ParserOptions>;
  whatBump: (commits: Commit[]) => { level: SemverLevel; reason: string };
}
