export interface Note {
  readonly title: string;
  readonly text: string;
}

export interface Reference {
  readonly action: string;
  readonly owner: string | null;
  readonly repository: string | null;
  readonly issue: string;
  readonly raw: string;
  readonly prefix: string;
  readonly issueLink: string;
  readonly source: string;
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
  readonly bump?: 'major' | 'minor' | 'patch';
  readonly emoji: string;
  readonly label: Readonly<CommitGroupLabel>;
  readonly types: readonly CommitType[];
}

export interface Commit {
  readonly body: string | null;
  readonly footer: string | null;
  readonly header: string;
  readonly mentions: readonly string[];
  readonly merge: string | null;
  readonly notes: readonly Note[];
  readonly references: readonly Reference[];
  readonly revert: Readonly<Record<string, string>> | null;
  readonly hash: string;
  readonly hashLink: string;
  readonly label: CommitGroupLabel;
  readonly message: string;
  readonly pr: string;
  readonly scope: string;
  readonly source: string;
  readonly type: CommitType;
}

export interface Context {
  readonly commit: string;
  readonly date: string;
  readonly host: string;
  readonly isPatch: boolean;
  readonly isMinor: boolean;
  readonly isMajor: boolean;
  readonly issue: string;
  readonly linkReferences: boolean;
  readonly options: Readonly<Record<string, unknown>>;
  readonly owner: string;
  readonly repository: string;
  readonly repoUrl: string;
  readonly title: string;
  readonly version: string;
  readonly headerLevel?: '#' | '##' | '###';
  readonly groupEmojis?: Record<CommitGroupLabel, string>;
}

export type Pattern = Readonly<RegExp> | string | null;

export type Correspondence = readonly string[] | string;

export type Sorter<T> = readonly string[] | string | ((a: T, b: T) => number);

// oxlint-disable-next-line eslint/max-params
export type FinalizeContext = (
  context: Readonly<Context>,
  options: Readonly<WriterOptions>,
  commits: readonly Commit[],
  keyCommit: Readonly<Commit>,
) => Readonly<Context>;

// oxlint-disable-next-line eslint/max-params
export type GenerateOn = (
  commit: Readonly<Commit>,
  commits: readonly Commit[],
  context: Readonly<Context>,
  options: Readonly<WriterOptions>,
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
  readonly commitGroupsSort: Sorter<{
    readonly title: CommitGroupLabel;
    readonly commits: readonly Commit[];
  }>;
  readonly commitPartial: string;
  readonly commitsSort: Sorter<Commit>;
  readonly debug: () => void;
  readonly doFlush: boolean;
  readonly finalizeContext: FinalizeContext | undefined;
  readonly footerPartial: string;
  readonly generateOn: string | GenerateOn;
  readonly groupBy: string;
  readonly headerPartial: string;
  readonly ignoreReverted: boolean;
  includeDetails: boolean;
  readonly mainTemplate: string;
  noteGroupsSort: Sorter<{
    readonly title: string;
    readonly notes: readonly Note[];
  }>;
  readonly notesSort: Sorter<Readonly<Note>>;
  readonly partials: Readonly<Record<string, unknown>>;
  readonly reverse: boolean;
  transform: (
    commit: Readonly<Commit>,
    context: Readonly<Context>,
  ) => Commit | undefined;
}

export type SemverLevel = 0 | 1 | 2 | null; // major | minor | patch
