export interface Note {
  title: string;
  text: string;
}

export interface Reference {
  action: string;
  owner: string | null;
  repository: string | null;
  issue: string;
  raw: string;
  prefix: string;
  issueLink: string;
  source: string;
}

export type CommitType =
  | 'break'
  | 'breaking'
  | 'build'
  | 'cd'
  | 'ci'
  | 'deps'
  | 'docs'
  | 'feature'
  | 'fix'
  | 'internal'
  | 'misc'
  | 'new'
  | 'patch'
  | 'release'
  | 'revert'
  | 'security'
  | 'style'
  | 'styles'
  | 'test'
  | 'tests'
  | 'type'
  | 'types'
  | 'update';

export type CommitGroupLabel =
  | 'Breaking'
  | 'Dependencies'
  | 'Docs'
  | 'Fixes'
  | 'Internals'
  | 'Misc'
  | 'Release'
  | 'Reverts'
  | 'Security'
  | 'Styles'
  | 'Types'
  | 'Updates';

export interface Group {
  bump?: 'major' | 'minor' | 'patch';
  emoji: string;
  label: CommitGroupLabel;
  types: CommitType[];
}

export interface Commit {
  body: string | null;
  footer: string | null;
  header: string;
  mentions: string[];
  merge: string | null;
  notes: Note[];
  references: Reference[];
  revert: Record<string, string> | null;
  hash: string;
  hashLink: string;
  label: CommitGroupLabel;
  message: string;
  pr: string;
  scope: string;
  source: string;
  type: CommitType;
}

export interface Context {
  commit: string;
  date: string;
  host: string;
  isPatch: boolean;
  isMinor: boolean;
  isMajor: boolean;
  issue: string;
  linkReferences: boolean;
  options: Record<string, unknown>;
  owner: string;
  repository: string;
  repoUrl: string;
  title: string;
  version: string;
  headerLevel?: '#' | '##' | '###';
  groupEmojis?: Record<CommitGroupLabel, string>;
}

export type Pattern = Readonly<RegExp> | string | null;

export type Correspondence = string[] | string;

export type Sorter<T> = string[] | string | ((a: T, b: T) => number);

// oxlint-disable-next-line eslint/max-params
export type FinalizeContext = (
  context: Context,
  options: WriterOptions,
  commits: Commit[],
  keyCommit: Commit,
) => Context;

// oxlint-disable-next-line eslint/max-params
export type GenerateOn = (
  commit: Commit,
  commits: Commit[],
  context: Context,
  options: WriterOptions,
) => unknown;

export interface ParserOptions {
  fieldPattern: Pattern;
  headerPattern: Pattern;
  headerCorrespondence: Correspondence;
  issuePrefixes: string[] | string;
  mergePattern: Pattern;
  mergeCorrespondence: Correspondence;
  noteKeywords: string[] | string;
  referenceActions: string[] | string | null;
  revertPattern: Pattern;
  revertCorrespondence: Correspondence;
  warn: boolean | (() => void);
}

export interface WriterOptions {
  commitGroupsSort: Sorter<{
    title: CommitGroupLabel;
    commits: Commit[];
  }>;
  commitPartial: string;
  commitsSort: Sorter<Commit>;
  debug: () => void;
  doFlush: boolean;
  finalizeContext: FinalizeContext | undefined;
  footerPartial: string;
  generateOn: string | GenerateOn;
  groupBy: string;
  headerPartial: string;
  ignoreReverted: boolean;
  includeDetails: boolean;
  mainTemplate: string;
  noteGroupsSort: Sorter<{
    title: string;
    notes: Note[];
  }>;
  notesSort: Sorter<Readonly<Note>>;
  partials: Readonly<Record<string, unknown>>;
  reverse: boolean;
  transform: (commit: Commit, context: Context) => Commit | undefined;
}

export type SemverLevel = 0 | 1 | 2 | null; // major | minor | patch
