import fs from 'node:fs';
import path from 'node:path';

import type {
  CommitGroupLabel,
  Context,
  Reference,
  WriterOptions,
} from '@rajzik/conventional-changelog-types';

import { getTypeGroup } from '@rajzik/conventional-changelog-types';

const groupEmojis = new Map<CommitGroupLabel, string>([
  ['Breaking', '💥'],
  ['Dependencies', '📦'],
  ['Docs', '📘'],
  ['Fixes', '🐞'],
  ['Internals', '🛠'],
  ['Misc', '📋'],
  ['Release', '🎉'],
  ['Reverts', '↩️'],
  ['Security', '🔑'],
  ['Styles', '🎨'],
  ['Types', '⚙️'],
  ['Updates', '🚀'],
]);

const sortWeights = new Map<CommitGroupLabel, number>([
  ['Release', 4],
  ['Breaking', 3],
  ['Updates', 2],
  ['Fixes', 1],
  ['Security', 0],
  ['Styles', -1],
  ['Types', -1],
  ['Docs', -2],
  ['Dependencies', -3],
  ['Misc', -3],
  ['Reverts', -4],
  ['Internals', -5],
]);

const templateDirectory = path.join(import.meta.dirname, '../templates');

const getEnvironmentValue = (name: string): string | undefined =>
  globalThis.process?.env[name];

const SYSTEM_TASKDEFINITIONSURI = getEnvironmentValue(
  'SYSTEM_TASKDEFINITIONSURI',
);

/**
 * Create a link to an Azure DevOps work item.
 *
 * @param {string} workItemId - The work item ID
 * @returns {string} The work item URL, or empty string if workItemId is not
 *   provided
 */
function createWorkItemLink(workItemId: string) {
  // oxlint-disable-next-line typescript/no-non-null-assertion
  const serverUrl = SYSTEM_TASKDEFINITIONSURI!;

  if (workItemId) {
    return new URL(`/_workitems/edit/${workItemId}`, serverUrl).toString();
  }

  return '';
}

/**
 * Create a URL link from path segments, context, and optional reference.
 *
 * @param {string[]} paths - Array of path segments to append
 * @param {Context} context - Changelog context with repository information
 * @param {Partial<Reference>} [reference] - Optional reference to override
 *   context values
 * @returns {string} The constructed URL string
 */
function createLink(
  paths: readonly string[],
  context: Context,
  reference: Partial<Reference> = {},
): string {
  const owner = reference.owner ?? context.owner;
  const repository = reference.repository ?? context.repository;
  const url: string[] = [];

  if (repository) {
    if (context.host) {
      url.push(context.host);
    }

    if (owner) {
      url.push(owner);
    }

    url.push(repository);
  } else {
    url.push(context.repoUrl);
  }
  let base = url.join('/');

  // If deep linking to a sub-folder (monorepo project, etc),
  // extract the base URL if possible.
  [
    // github, gitlab
    'tree',
    'blob',
    // bitbucket
    'src',
  ].forEach((browsePart) => {
    if (base.includes(`/${browsePart}/`)) {
      // oxlint-disable-next-line typescript/no-non-null-assertion
      base = base.split(`/${browsePart}/`).at(0)!;
    }
  });

  return [base, ...paths].join('/');
}

/**
 * Writer options for conventional changelog. Configures how changelog entries
 * are formatted and transformed.
 */
const options: Partial<WriterOptions> = {
  mainTemplate: fs.readFileSync(
    path.join(templateDirectory, 'template.hbs'),
    'utf8',
  ),
  commitPartial: fs.readFileSync(
    path.join(templateDirectory, 'commit.hbs'),
    'utf8',
  ),
  headerPartial: fs.readFileSync(
    path.join(templateDirectory, 'header.hbs'),
    'utf8',
  ),
  footerPartial: fs.readFileSync(
    path.join(templateDirectory, 'footer.hbs'),
    'utf8',
  ),

  // Commits
  groupBy: 'label',
  commitsSort: ['scope', 'message'],
  commitGroupsSort(groupA, groupB) {
    const aWeight = sortWeights.get(groupA.title) ?? 0;
    const bWeight = sortWeights.get(groupB.title) ?? 0;

    if (aWeight === 0 && bWeight === 0) {
      return groupA.title.localeCompare(groupB.title);
    }

    return bWeight - aWeight;
  },

  // Notes
  noteGroupsSort: 'title',

  // Add metadata
  transform(commit, context) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    context.groupEmojis = Object.fromEntries(groupEmojis.entries()) as Record<
      CommitGroupLabel,
      string
    >;

    if (!commit.type) {
      return undefined;
    }
    const nodeEnv = getEnvironmentValue('NODE_ENV');

    // Use consistent values for snapshots
    if (nodeEnv === 'test') {
      commit.hash = 'a1b2c3d';
      context.date = '2019-02-26';
    }

    // Override type for specific scenarios
    if (commit.revert) {
      commit.type = 'revert';
    } else if (commit.merge) {
      commit.type = 'misc';
    }

    // Define metadata based on type
    const group = getTypeGroup(commit.type);

    commit.label = group.label;

    if (group.bump === 'major') {
      context.isMajor = true;
    } else if (group.bump === 'minor') {
      context.isMinor = true;
    }

    commit.hashLink = context.commit.endsWith('s')
      ? createLink(['commit', commit.hash], context)
      : createLink([context.commit, commit.hash], context);

    // Use shorthand hashes
    if (typeof commit.hash === 'string') {
      commit.hash = commit.hash.slice(0, 7);
    }

    commit.references.forEach((reference) => {
      // Azure devops
      reference.issueLink = SYSTEM_TASKDEFINITIONSURI
        ? createWorkItemLink(reference.issue)
        : createLink([context.issue, reference.issue], context, reference);

      let source = `${reference.repository ?? ''}#${reference.issue}`;

      if (reference.owner) {
        source = `${reference.owner}/${source}`;
      }

      reference.source = source;
    });

    // Link users
    if (context.host) {
      commit.message = commit.message.replaceAll(
        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/gu,
        (match, username: string, index: number) => {
          if (
            username.includes('/') ||
            // Avoid when wrapped in backticks (inline code)
            commit.message.at(index - 1) === '`' ||
            commit.message.at(index + match.length + 1) === '`'
          ) {
            return match;
          }

          return `[@${username}](${context.host}/${username})`;
        },
      );
    }

    return commit;
  },
};

export default options;
