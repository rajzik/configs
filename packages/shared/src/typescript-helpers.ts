import fs from 'node:fs';

import type { CompilerOptions, ProjectReference } from 'typescript';

import { PACKAGE_JSON_PATH, TSCONFIG_JSON_PATH } from './constants';

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

export function getRootPackageJson(): PackageJSON {
  packageJson ??= parseJSON(PACKAGE_JSON_PATH);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return packageJson!;
}

export function getRootProjectReferences(): ProjectReference[] | undefined {
  return getRootTSConfig().references;
}
