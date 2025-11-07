import path from 'node:path';

/** Root directory of the current working directory. */
export const ROOT = process.cwd();

/** Array of supported file extensions for various tools. */
export const EXTS = [
  '.ts',
  '.tsx',
  '.mts',
  '.mtsx',
  '.cts',
  '.ctsx',
  '.js',
  '.jsx',
  '.cjs',
  '.cjsx',
  '.js',
  '.jsx',
  '.json',
];

/** Array of directory patterns to ignore in various build tools. */
export const IGNORE_PATHS = [
  '.next/',
  'coverage/',
  'node_modules/',
  'public/',
  'esm/',
  'lib/',
  '!src/lib',
  'tmp/',
  'dist/',
  'build/',
];

/** Glob pattern for TypeScript and TSX file extensions. */
export const TSX_EXTS_GROUP = '{ts,tsx,mts,mtsx,cts,ctsx}';

/** Regular expression matching asset file extensions. */
export const ASSET_EXT_PATTERN =
  /\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico)$/;

/** Regular expression matching CSS file extensions. */
export const CSS_EXT_PATTERN = /\.(css|scss)$/;

/** Regular expression matching GraphQL file extensions. */
export const GQL_EXT_PATTERN = /\.(gql|graphql)$/;

/** Glob pattern for TypeScript, JavaScript, and JSX file extensions. */
export const TJSX_EXTS_GROUP =
  '{ts,tsx,mts,mtsx,cts,ctsx,mjs,mjsx,cjs,cjsx,js,jsx}';

/** Glob pattern for JavaScript and JSX file extensions. */
export const JSX_EXTS_GROUP = '{js,jsx,mjs,mjsx,cjs,cjsx}';

/** Path alias pattern used for module resolution. */
export const ALIAS_PATTERN = '~';

/** Absolute path to tsconfig.json in the root directory. */
export const TSCONFIG_JSON_PATH = path.join(ROOT, 'tsconfig.json');

/** Absolute path to package.json in the root directory. */
export const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
