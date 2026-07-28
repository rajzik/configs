import { execFileSync } from 'node:child_process';
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const changesetConfigPath = path.join(repoRoot, '.changeset', 'config.json');
const generatedPrefix = 'renovate-';
const summary = 'chore: update Renovate-managed dependencies.';
const sharedDependencyFiles = new Set(['package.json', 'pnpm-workspace.yaml']);
const packageDirectoryPrefix = 'packages/';

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {string}
 */
function run(command, args) {
  return execFileSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim();
}

/**
 * @returns {string[]}
 */
function getChangedFiles() {
  let output = run('git', ['diff', '--name-only', 'origin/main...HEAD']);

  if (!output) {
    return [];
  }

  return output
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);
}

/**
 * @returns {string[]}
 */
function getFixedPackages() {
  /** @type {{ fixed?: string[][] }} */
  let changesetConfig = JSON.parse(readFileSync(changesetConfigPath, 'utf8'));
  let fixedPackages = changesetConfig.fixed?.flat() ?? [];

  if (fixedPackages.length === 0) {
    throw new Error('No fixed packages configured in .changeset/config.json');
  }

  return [...new Set(fixedPackages)].sort();
}

/**
 * @returns {Map<string, string>}
 */
function getPackageNameByDirectory() {
  let packageNames = new Map();
  let fixedPackages = new Set(getFixedPackages());
  let packageDirectories = readdirSync(path.join(repoRoot, 'packages'), {
    withFileTypes: true,
  });

  for (let entry of packageDirectories) {
    if (!entry.isDirectory()) {
      continue;
    }

    let packageJsonPath = path.join(repoRoot, 'packages', entry.name, 'package.json');

    if (!existsSync(packageJsonPath)) {
      continue;
    }

    /** @type {{ name?: string }} */
    let packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    if (!packageJson.name) {
      throw new Error(`Package manifest ${packageJsonPath} is missing a name`);
    }

    if (fixedPackages.has(packageJson.name)) {
      packageNames.set(entry.name, packageJson.name);
    }
  }

  if (packageNames.size !== fixedPackages.size) {
    let missingPackages = [...fixedPackages].filter(
      (packageName) => ![...packageNames.values()].includes(packageName),
    );
    throw new Error(`Package manifests not found for: ${missingPackages.join(', ')}`);
  }

  return packageNames;
}

/**
 * @param {string[]} changedFiles
 * @returns {string[]}
 */
function detectAffectedPackages(changedFiles) {
  let fixedPackages = getFixedPackages();
  let packageNameByDirectory = getPackageNameByDirectory();
  let hasSharedDependencyChange = changedFiles.some((file) =>
    sharedDependencyFiles.has(file),
  );

  if (hasSharedDependencyChange) {
    return fixedPackages;
  }

  let affectedPackages = new Set();

  for (let changedFile of changedFiles) {
    if (
      !changedFile.startsWith(packageDirectoryPrefix) ||
      !changedFile.endsWith('package.json')
    ) {
      continue;
    }

    let relativeToPackages = changedFile.slice(packageDirectoryPrefix.length);
    let [directoryName] = relativeToPackages.split('/');
    let packageName = packageNameByDirectory.get(directoryName);

    if (!packageName) {
      throw new Error(`Unknown package directory ${directoryName}`);
    }

    affectedPackages.add(packageName);
  }

  return [...affectedPackages].sort();
}

/**
 * @param {string} value
 * @returns {string}
 */
function sanitize(value) {
  let sanitized = value
    .toLowerCase()
    .replace(/^renovate\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!sanitized) {
    throw new Error(`Could not derive a valid identifier from "${value}"`);
  }

  return sanitized;
}

/**
 * @returns {string}
 */
function resolveIdentifier() {
  let branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME;

  if (branchName) {
    return sanitize(branchName);
  }

  let fallbackBranch = run('git', ['branch', '--show-current']);

  if (!fallbackBranch) {
    throw new Error('Could not determine the current branch name');
  }

  return sanitize(fallbackBranch);
}

/**
 * @param {string} identifier
 * @returns {string}
 */
function getChangesetPath(identifier) {
  return path.join(repoRoot, '.changeset', `${generatedPrefix}${identifier}.md`);
}

/**
 * @param {string[]} packages
 * @returns {string}
 */
function buildChangeset(packages) {
  let releases = packages.map((packageName) => `"${packageName}": patch`).join('\n');

  return `---\n${releases}\n---\n\n${summary}\n`;
}

/**
 * @param {string} identifier
 * @returns {boolean}
 */
function removeChangeset(identifier) {
  let changesetPath = getChangesetPath(identifier);

  if (!existsSync(changesetPath)) {
    console.log('No generated changeset required');
    return false;
  }

  rmSync(changesetPath);
  console.log(`Removed ${path.relative(repoRoot, changesetPath)}`);
  return true;
}

/**
 * @param {string} identifier
 * @param {string[]} packages
 * @returns {boolean}
 */
function writeChangeset(identifier, packages) {
  let changesetPath = getChangesetPath(identifier);
  let nextContent = buildChangeset(packages);
  let currentContent = existsSync(changesetPath)
    ? readFileSync(changesetPath, 'utf8')
    : null;

  if (currentContent === nextContent) {
    console.log(`Generated changeset unchanged: ${path.basename(changesetPath)}`);
    return false;
  }

  writeFileSync(changesetPath, nextContent);
  console.log(`Wrote ${path.relative(repoRoot, changesetPath)}`);
  return true;
}

function main() {
  let changedFiles = getChangedFiles();
  let affectedPackages = detectAffectedPackages(changedFiles);
  let identifier = resolveIdentifier();

  if (affectedPackages.length === 0) {
    removeChangeset(identifier);
    return;
  }

  console.log(`Affected packages: ${affectedPackages.join(', ')}`);
  writeChangeset(identifier, affectedPackages);
}

main();
