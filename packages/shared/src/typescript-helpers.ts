import fs from 'node:fs';

import type { CompilerOptions, ProjectReference } from 'typescript';

import { PACKAGE_JSON_PATH, TSCONFIG_JSON_PATH } from './constants';

/**
 * Parse a JSON file, removing comments and blank lines.
 *
 * @param filePath - Path to the JSON file to parse
 * @returns Parsed JSON object
 * @template T - The expected type of the parsed JSON
 */
export function parseJSON<T>(filePath: string): T {
  const content = fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    // Remove comments from JSON files
    .filter((line) => !/^\s*(#|\/)/.test(line))
    .join('\n');

  return JSON.parse(content) as T;
}

interface TSConfigJSON {
  compilerOptions?: CompilerOptions;
  references?: ProjectReference[];
}

let tsconfigJson: TSConfigJSON | undefined;

/**
 * Get the root tsconfig.json file, cached after first read.
 *
 * @returns The parsed tsconfig.json object
 */
export function getRootTSConfig(): TSConfigJSON {
  tsconfigJson ??= parseJSON(TSCONFIG_JSON_PATH);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return tsconfigJson!;
}

type PackageDeps = Record<string, string>;

interface PackageJSON {
  name: string;
  engines?: { node?: string };
  dependencies?: PackageDeps;
  devDependencies?: PackageDeps;
  peerDependencies?: PackageDeps;
}

let packageJson: PackageJSON | undefined;

/**
 * Get the root package.json file, cached after first read.
 *
 * @returns The parsed package.json object
 */
export function getRootPackageJson(): PackageJSON {
  packageJson ??= parseJSON(PACKAGE_JSON_PATH);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return packageJson!;
}

/**
 * Get the project references from the root tsconfig.json.
 *
 * @returns Array of project references, or undefined if not present
 */
export function getRootProjectReferences(): ProjectReference[] | undefined {
  return getRootTSConfig().references;
}
