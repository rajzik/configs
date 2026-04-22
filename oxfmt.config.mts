import { defineConfig } from 'oxfmt';

import config from './packages/oxfmt-config/src/index.ts';

/**
 * Repo-wide Oxfmt config shared by all workspace packages.
 */
export default defineConfig(config);
