/* eslint-disable import/extensions */
const {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
} = require('./packages/config-danger/dist/index.js');

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
