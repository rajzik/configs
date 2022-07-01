/* eslint-disable import/extensions */
const {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} = require('./packages/config-danger/lib/index.js');

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
