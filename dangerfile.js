/* eslint-disable import/extensions, unicorn/import-index */
const {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} = require('./packages/config-danger/lib/index.js');

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
