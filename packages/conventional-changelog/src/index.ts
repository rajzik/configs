import conventionalChangelog from './conventionalChangelog';
import parserOpts from './parserOpts';
import recommendedBumpOpts from './recommendedBumpOpts';
import writerOpts from './writerOpts';

export type * from './types';

export default Promise.resolve({
  conventionalChangelog,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
});
