import fs from 'node:fs';

import type { CompilerOptions, ProjectReference } from 'typescript';

import { PACKAGE_JSON_PATH, TSCONFIG_JSON_PATH } from './constants';

/**
 * Parse a JSON file, removing comments and blank lines.
 *
 * @param {string} filePath - Path to the JSON file to parse
 * @returns {unknown} Parsed JSON object
 */
export function parseJSON(filePath: string): unknown {
  const content = fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    // Remove comments from JSON files
    .filter((line: string) => !/^\s*(#|\/)/.test(line))
    .join('\n');

  const parsed: unknown = JSON.parse(content);

  return parsed;
}

interface TSConfigJSON {
  compilerOptions?: CompilerOptions;
  references?: ProjectReference[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isTSConfigJSON = (value: unknown): value is TSConfigJSON =>
  isRecord(value);

let tsconfigJson: TSConfigJSON | undefined = undefined;

/**
 * Get the root tsconfig.json file, cached after first read.
 *
 * @returns {TSConfigJSON} The parsed tsconfig.json object
 */
export function getRootTSConfig(): TSConfigJSON {
  if (!tsconfigJson) {
    const parsed = parseJSON(TSCONFIG_JSON_PATH);

    if (!isTSConfigJSON(parsed)) {
      throw new TypeError('Root tsconfig.json must contain an object.');
    }

    tsconfigJson = parsed;
  }

  return tsconfigJson;
}

type PackageDeps = Record<string, string>;

interface PackageJSON {
  name: string;
  engines?: { node?: string };
  dependencies?: PackageDeps;
  devDependencies?: PackageDeps;
  peerDependencies?: PackageDeps;
}

const isPackageJSON = (value: unknown): value is PackageJSON =>
  isRecord(value) && typeof value.name === 'string';

let packageJson: PackageJSON | undefined = undefined;

/**
 * Get the root package.json file, cached after first read.
 *
 * @returns {PackageJSON} The parsed package.json object
 */
export function getRootPackageJson(): PackageJSON {
  if (!packageJson) {
    const parsed = parseJSON(PACKAGE_JSON_PATH);

    if (!isPackageJSON(parsed)) {
      throw new TypeError('Root package.json must contain a name.');
    }

    packageJson = parsed;
  }

  return packageJson;
}

/**
 * Get the project references from the root tsconfig.json.
 *
 * @returns {ProjectReference[] | undefined} Array of project references, or
 *   undefined if not present
 */
export function getRootProjectReferences(): ProjectReference[] | undefined {
  return getRootTSConfig().references;
}
