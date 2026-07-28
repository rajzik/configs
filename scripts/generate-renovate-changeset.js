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
 * @param {string} message Message to print to stdout.
 * @returns {void} Writes a single line to stdout.
 */
function log(message) {
  process.stdout.write(`${message}\n`);
}

/**
 * @param {string} command Executable name.
 * @param {string[]} args Arguments passed to the executable.
 * @returns {string} Trimmed stdout from the command.
 */
function run(command, args) {
  return execFileSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim();
}

/**
 * @returns {string[]} Changed files between `origin/main` and `HEAD`.
 */
function getChangedFiles() {
  const output = run('git', ['diff', '--name-only', 'origin/main...HEAD']);

  if (!output) {
    return [];
  }

  return output
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);
}

/**
 * @returns {string[]} Sorted package names from the fixed Changesets group.
 */
function getFixedPackages() {
  /** @type {{ fixed?: string[][] }} */
  const changesetConfig = JSON.parse(readFileSync(changesetConfigPath, 'utf8'));
  const fixedPackages = changesetConfig.fixed?.flat() ?? [];

  if (fixedPackages.length === 0) {
    throw new Error('No fixed packages configured in .changeset/config.json');
  }

  return [...new Set(fixedPackages)].toSorted();
}

/**
 * @returns {Map<string, string>} Map of workspace directory names to package names.
 */
function getPackageNameByDirectory() {
  const packageNames = new Map();
  const fixedPackages = new Set(getFixedPackages());
  const packageDirectories = readdirSync(path.join(repoRoot, 'packages'), {
    withFileTypes: true,
  });

  for (const entry of packageDirectories) {
    if (entry.isDirectory()) {
      const packageJsonPath = path.join(
        repoRoot,
        'packages',
        entry.name,
        'package.json',
      );

      if (existsSync(packageJsonPath)) {
        /** @type {{ name?: string }} */
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

        if (!packageJson.name) {
          throw new Error(`Package manifest ${packageJsonPath} is missing a name`);
        }

        if (fixedPackages.has(packageJson.name)) {
          packageNames.set(entry.name, packageJson.name);
        }
      }
    }
  }

  if (packageNames.size !== fixedPackages.size) {
    const resolvedPackageNames = new Set(packageNames.values());
    const missingPackages = [...fixedPackages].filter(
      (packageName) => !resolvedPackageNames.has(packageName),
    );
    throw new Error(`Package manifests not found for: ${missingPackages.join(', ')}`);
  }

  return packageNames;
}

/**
 * @param {string[]} changedFiles Files changed in the current diff.
 * @returns {string[]} Sorted package names that need a changeset entry.
 */
function detectAffectedPackages(changedFiles) {
  const fixedPackages = getFixedPackages();
  const packageNameByDirectory = getPackageNameByDirectory();
  const hasSharedDependencyChange = changedFiles.some((file) =>
    sharedDependencyFiles.has(file),
  );

  if (hasSharedDependencyChange) {
    return fixedPackages;
  }

  const affectedPackages = new Set();

  for (const changedFile of changedFiles) {
    if (
      changedFile.startsWith(packageDirectoryPrefix) &&
      changedFile.endsWith('package.json')
    ) {
      const relativeToPackages = changedFile.slice(packageDirectoryPrefix.length);
      const [directoryName, ...rest] = relativeToPackages.split('/');

      // Only match direct package.json files (packages/<dir>/package.json)
      if (rest.length === 1 && rest[0] === 'package.json') {
        const packageName = packageNameByDirectory.get(directoryName);

        if (!packageName) {
          throw new Error(`Unknown package directory ${directoryName}`);
        }

        affectedPackages.add(packageName);
      }
    }
  }

  return [...affectedPackages].toSorted();
}

/**
 * @param {string} value Branch name or identifier candidate.
 * @returns {string} Sanitized identifier safe for a filename.
 */
function sanitize(value) {
  const sanitized = value
    .toLowerCase()
    .replace(/^renovate\//u, '')
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '');

  if (!sanitized) {
    throw new Error(`Could not derive a valid identifier from "${value}"`);
  }

  return sanitized;
}

/**
 * @returns {string} Identifier derived from PR number or current git branch.
 */
function resolveIdentifier() {
  // Check for PR number from GitHub Actions environment
  const prNumber = process.env.GITHUB_PR_NUMBER;
  if (prNumber) {
    return sanitize(`pr-${prNumber}`);
  }

  // Fallback to GitHub Actions environment variables
  const githubHeadRef = process.env.GITHUB_HEAD_REF;
  const githubRefName = process.env.GITHUB_REF_NAME;

  if (githubHeadRef) {
    return sanitize(githubHeadRef);
  }

  if (githubRefName) {
    return sanitize(githubRefName);
  }

  // Final fallback to git command
  const fallbackBranch = run('git', ['branch', '--show-current']);

  if (!fallbackBranch) {
    throw new Error('Could not determine the current branch name');
  }

  return sanitize(fallbackBranch);
}

/**
 * @param {string} identifier Generated file identifier.
 * @returns {string} Absolute path to the generated changeset file.
 */
function getChangesetPath(identifier) {
  return path.join(repoRoot, '.changeset', `${generatedPrefix}${identifier}.md`);
}

/**
 * @param {string[]} packages Packages to include in the changeset.
 * @returns {string} Full markdown contents for the generated changeset.
 */
function buildChangeset(packages) {
  const releases = packages.map((packageName) => `"${packageName}": patch`).join('\n');

  return `---\n${releases}\n---\n\n${summary}\n`;
}

/**
 * @param {string} identifier Generated file identifier.
 * @returns {boolean} Whether a file was removed.
 */
function removeChangeset(identifier) {
  const changesetPath = getChangesetPath(identifier);

  if (!existsSync(changesetPath)) {
    log('No generated changeset required');
    return false;
  }

  rmSync(changesetPath);
  log(`Removed ${path.relative(repoRoot, changesetPath)}`);
  return true;
}

/**
 * @param {string} identifier Generated file identifier.
 * @param {string[]} packages Packages to include in the changeset.
 * @returns {boolean} Whether the file contents changed.
 */
function writeChangeset(identifier, packages) {
  const changesetPath = getChangesetPath(identifier);
  const nextContent = buildChangeset(packages);
  const currentContent = existsSync(changesetPath)
    ? readFileSync(changesetPath, 'utf8')
    : null;

  if (currentContent === nextContent) {
    log(`Generated changeset unchanged: ${path.basename(changesetPath)}`);
    return false;
  }

  writeFileSync(changesetPath, nextContent);
  log(`Wrote ${path.relative(repoRoot, changesetPath)}`);
  return true;
}

function main() {
  const changedFiles = getChangedFiles();
  const affectedPackages = detectAffectedPackages(changedFiles);
  const identifier = resolveIdentifier();

  if (affectedPackages.length === 0) {
    removeChangeset(identifier);
    return;
  }

  log(`Affected packages: ${affectedPackages.join(', ')}`);
  writeChangeset(identifier, affectedPackages);
}

main();
