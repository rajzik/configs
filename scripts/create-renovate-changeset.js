#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/**
 * Executes a git command and returns trimmed stdout.
 *
 * @param {string[]} args - Git command arguments.
 * @returns {Promise<string>} Trimmed command output.
 */
async function git(args) {
  const { stdout } = await execFileAsync('git', args);
  return stdout.trim();
}

/**
 * Reads and parses a JSON file from git at a specific revision.
 *
 * @param {string} revision - Git revision to read from.
 * @param {string} filePath - Repository-relative file path.
 * @returns {Promise<Record<string, unknown> | null>} Parsed JSON object or null when unavailable.
 */
async function readJsonFromGit(revision, filePath) {
  try {
    const { stdout } = await execFileAsync('git', ['show', `${revision}:${filePath}`]);
    return JSON.parse(stdout);
  } catch {
    return null;
  }
}

/**
 * Returns all changed files in the current working tree.
 *
 * @returns {Promise<string[]>} Changed file paths.
 */
async function getChangedFiles() {
  const output = await git(['diff', '--name-only']);
  return output ? output.split('\n').filter(Boolean) : [];
}

/**
 * Creates a changeset markdown file with package patch bumps and dependency notes.
 *
 * @param {Map<string, string>} bumps - Updated dependency/version tuples.
 * @param {string[]} packageNames - Publishable package names to bump.
 * @returns {Promise<string | null>} Created file path or null when nothing was created.
 */
async function writeChangeset(bumps, packageNames) {
  if (!packageNames.length) {
    return null;
  }

  const summary = [...bumps.entries()]
    .map(([dep, version]) => `Updated dependency \`${dep}\` to \`${version}\`.`)
    .join('\n');
  const frontmatter = packageNames.map((name) => `'${name}': patch`).join('\n');
  const body = `---\n${frontmatter}\n---\n\n${summary}\n`;

  const branch = process.env.RENOVATE_BRANCH || (await git(['branch', '--show-current']));
  const slug = branch.replace(/[^a-zA-Z0-9-]/g, '-').slice(0, 80);
  const filePath = `.changeset/renovate-${slug}.md`;

  await fs.writeFile(filePath, body, 'utf8');
  return filePath;
}

/**
 * Main entrypoint for renovate post-upgrade changeset generation.
 *
 * @returns {Promise<void>} Resolves when processing is complete.
 */
async function main() {
  const branch = process.env.RENOVATE_BRANCH || (await git(['branch', '--show-current']));
  if (!branch.startsWith('renovate/')) {
    return;
  }

  const changedFiles = await getChangedFiles();
  if (changedFiles.some((file) => file.startsWith('.changeset/'))) {
    return;
  }

  const packageJsonFiles = changedFiles
    .filter((file) => file.endsWith('package.json'))
    .filter((file) => file !== 'package.json');

  const publishablePackages = [];
  const dependencyBumps = new Map();

  for (const file of packageJsonFiles) {
    const current = JSON.parse(await fs.readFile(file, 'utf8'));
    const previous = await readJsonFromGit('HEAD', file);

    if (!current.private && typeof current.name === 'string') {
      publishablePackages.push(current.name);
    }

    for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      const currentDeps = current[section] || {};
      const previousDeps = (previous && previous[section]) || {};
      for (const [name, version] of Object.entries(currentDeps)) {
        if (previousDeps[name] !== version) {
          dependencyBumps.set(name, String(version));
        }
      }
    }
  }

  if (!dependencyBumps.size) {
    return;
  }

  const filePath = await writeChangeset(dependencyBumps, [...new Set(publishablePackages)]);
  if (!filePath) {
    return;
  }

  const absolutePath = path.resolve(filePath);
  // eslint-disable-next-line no-console
  console.log(`Generated renovate changeset: ${absolutePath}`);
}

await main();
