/* eslint-disable @typescript-eslint/no-non-null-assertion -- needed */

import fs from 'node:fs';
import path from 'node:path';

import type {
  CommitGroupLabel,
  Context,
  Reference,
  WriterOptions,
} from '@rajzik/conventional-changelog-types';

import { getTypeGroup, GROUPS } from '@rajzik/conventional-changelog-types';

type GroupMap<T> = Record<CommitGroupLabel, T>;

const groupEmojis = Object.fromEntries(
  GROUPS.map((group) => [group.label, group.emoji]),
) as GroupMap<string>;

const sortWeights: GroupMap<number> = {
  Release: 4,
  Breaking: 3,
  Updates: 2,
  Fixes: 1,
  Security: 0,
  Styles: -1,
  Types: -1,
  Docs: -2,
  Dependencies: -3,
  Misc: -3,
  Reverts: -4,
  Internals: -5,
};

const { SYSTEM_TASKDEFINITIONSURI } = process.env;

function createWorkItemLink(workItemId: string) {
  const serverUrl = SYSTEM_TASKDEFINITIONSURI!;

  if (workItemId) {
    return new URL(`/_workitems/edit/${workItemId}`, serverUrl).toString();
  }

  return '';
}

function createLink(
  paths: string[],
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
      base = base.split(`/${browsePart}/`).at(0)!;
    }
  });

  return [base, ...paths].join('/');
}

const options: Partial<WriterOptions> = {
  mainTemplate: fs.readFileSync(
    path.join(import.meta.dirname, '../templates/template.hbs'),
    'utf8',
  ),
  commitPartial: fs.readFileSync(
    path.join(import.meta.dirname, '../templates/commit.hbs'),
    'utf8',
  ),
  headerPartial: fs.readFileSync(
    path.join(import.meta.dirname, '../templates/header.hbs'),
    'utf8',
  ),
  footerPartial: fs.readFileSync(
    path.join(import.meta.dirname, '../templates/footer.hbs'),
    'utf8',
  ),

  // Commits
  groupBy: 'label',
  commitsSort: ['scope', 'message'],
  commitGroupsSort(groupA, groupB) {
    const aWeight = sortWeights[groupA.title] || 0;
    const bWeight = sortWeights[groupB.title] || 0;

    if (aWeight === 0 && bWeight === 0) {
      return groupA.title.localeCompare(groupB.title);
    }

    return bWeight - aWeight;
  },

  // Notes
  noteGroupsSort: 'title',

  // Add metadata
  transform(commit, context) {
    context.groupEmojis = groupEmojis;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (!commit.type) {
      return undefined;
    }
    const { NODE_ENV } = process.env;

    // Use consistent values for snapshots
    if (NODE_ENV === 'test') {
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

    if (context.commit.endsWith('s')) {
      // Workaround for azure devops
      commit.hashLink = createLink(['commit', commit.hash], context);
    } else {
      // Pre-generate links instead of doing it in handlebars
      commit.hashLink = createLink([context.commit, commit.hash], context);
    }

    // Use shorthand hashes
    if (typeof commit.hash === 'string') {
      commit.hash = commit.hash.slice(0, 7);
    }

    commit.references.forEach((reference) => {
      // Azure devops
      if (SYSTEM_TASKDEFINITIONSURI) {
        reference.issueLink = createWorkItemLink(reference.issue);
      } else {
        reference.issueLink = createLink(
          [context.issue, reference.issue],
          context,
          reference,
        );
      }

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
