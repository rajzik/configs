import path from 'node:path';

export const ROOT = process.cwd();

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

export const TSX_EXTS_GROUP = '{ts,tsx,mts,mtsx,cts,ctsx}';

export const ASSET_EXT_PATTERN = /\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico)$/;

export const CSS_EXT_PATTERN = /\.(css|scss)$/;

export const GQL_EXT_PATTERN = /\.(gql|graphql)$/;

export const TJSX_EXTS_GROUP = '{ts,tsx,mts,mtsx,cts,ctsx,mjs,mjsx,cjs,cjsx,js,jsx}';

export const JSX_EXTS_GROUP = '{js,jsx,mjs,mjsx,cjs,cjsx}';

export const ALIAS_PATTERN = '~';

export const TSCONFIG_JSON_PATH = path.join(ROOT, 'tsconfig.json');

export const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
