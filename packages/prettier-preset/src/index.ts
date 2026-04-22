import type { PluginConfig } from "@ianvs/prettier-plugin-sort-imports";
import type { Config } from "prettier";

import { fmt } from "@rajzik/oxfmt-config";

const {
  sortImports: _sortImports,
  sortPackageJson: _sortPackageJson,
  sortTailwindcss: _sortTailwindcss,
  jsdoc: _jsdoc,
  ...prettierConfig
} = fmt;

/**
 * Extended Prettier configuration type that includes plugin-specific options.
 */
export type ExtendedConfig = Config | PluginConfig;

/**
 * Base Prettier configuration with import sorting.
 */
const config: ExtendedConfig = {
  ...prettierConfig,
  plugins: ["prettier-plugin-packagejson", "@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "",
    "<TYPES>",
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "",
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    "<TYPES>^@org",
    "^@org/(.*)$",
    "",
    "<TYPES>^[.|..|~]",
    "^~/",
    "^[../]",
    "^[./]",
  ],
};

export default config;
