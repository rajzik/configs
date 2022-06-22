const { getConfig } = require('../../test-utils');
const config = getConfig({ srcFolder: '.', esm: true, node: true });
module.exports = config;
