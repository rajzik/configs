import conventionalChangelog from './conventionalChangelog';
import parserOpts from './parserOpts';
import recommendedBumpOpts from './recommendedBumpOpts';
import writerOpts from './writerOpts';

export * from './types';

export const config = Promise.resolve({
  conventionalChangelog,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
});

export { COMMIT_FORMAT_PREFIX } from '@rajzik/conventional-changelog-types';
export { default as getTypeGroup } from './getTypeGroup';
export { default as checkCommitFormat } from './checkCommitFormat';
