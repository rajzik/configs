# `@rajzik/conventional-changelog-types`

Internal types and utilities for the [conventional-changelog](../conventional-changelog) package. Provides type definitions, constants, and helper functions for working with conventional commits.

## Installation

```sh
npm install --save-dev @rajzik/conventional-changelog-types
pnpm install --save-dev @rajzik/conventional-changelog-types
yarn add --dev @rajzik/conventional-changelog-types
```

## Usage

```typescript
import {
  GROUPS,
  COMMIT_FORMAT_PREFIX,
  getTypeGroup,
  checkCommitFormat,
  type CommitType,
  type Group,
  type Commit,
} from '@rajzik/conventional-changelog-types';

// Check if a commit message matches the format
const result = checkCommitFormat('fix(Button): Fix button styling');
// { type: 'fix', scope: 'Button' } | null

// Get the group for a commit type
const group = getTypeGroup('fix');
// { bump: 'patch', emoji: '🐞', label: 'Fixes', types: ['fix', 'patch'] }

// Access commit type groups
GROUPS.forEach((group) => {
  console.log(group.label, group.emoji, group.types);
});
```

## API Reference

### `checkCommitFormat(commit: string)`

Validates and parses a commit message to extract the type and scope.

**Parameters:**
- `commit` (string): The commit message to check

**Returns:**
- `{ type: CommitType; scope: string } | null`: Parsed commit type and scope, or `null` if invalid

**Example:**
```typescript
import { checkCommitFormat } from '@rajzik/conventional-changelog-types';

checkCommitFormat('fix: Fix bug');
// { type: 'fix', scope: '' }

checkCommitFormat('new(Button): Add Button component');
// { type: 'new', scope: 'Button' }

checkCommitFormat('invalid commit message');
// null
```

---

### `getTypeGroup(type: CommitType)`

Retrieves the group configuration for a given commit type.

**Parameters:**
- `type` (CommitType): The commit type to look up

**Returns:**
- `Group`: The group configuration object

**Throws:**
- `Error`: If the type is not found in any group

**Example:**
```typescript
import { getTypeGroup } from '@rajzik/conventional-changelog-types';

const group = getTypeGroup('fix');
// {
//   bump: 'patch',
//   emoji: '🐞',
//   label: 'Fixes',
//   types: ['fix', 'patch']
// }

const breakingGroup = getTypeGroup('breaking');
// {
//   bump: 'major',
//   emoji: '💥',
//   label: 'Breaking',
//   types: ['break', 'breaking']
// }
```

---

### `GROUPS`

Array of all commit type groups with their configuration.

**Type:**
```typescript
const GROUPS: Group[];
```

**Example:**
```typescript
import { GROUPS } from '@rajzik/conventional-changelog-types';

GROUPS.forEach((group) => {
  console.log(`${group.emoji} ${group.label}: ${group.types.join(', ')}`);
  if (group.bump) {
    console.log(`  Bump: ${group.bump}`);
  }
});
```

**Group Definitions:**

1. **Breaking** 💥
   - Types: `break`, `breaking`
   - Bump: `major`

2. **Dependencies** 📦
   - Types: `deps`
   - Bump: `patch`

3. **Docs** 📘
   - Types: `docs`
   - Bump: `patch`

4. **Fixes** 🐞
   - Types: `fix`, `patch`
   - Bump: `patch`

5. **Internals** 🛠
   - Types: `ci`, `cd`, `build`, `test`, `tests`, `internal`
   - Bump: (none - skipped)

6. **Misc** 📋
   - Types: `misc`
   - Bump: `patch`

7. **Release** 🎉
   - Types: `release`
   - Bump: `major`

8. **Reverts** ↩️
   - Types: `revert`
   - Bump: `patch`

9. **Security** 🔑
   - Types: `security`
   - Bump: `patch`

10. **Styles** 🎨
    - Types: `style`, `styles`
    - Bump: `patch`

11. **Types** ⚙️
    - Types: `type`, `types`
    - Bump: `patch`

12. **Updates** 🚀
    - Types: `new`, `update`, `feature`
    - Bump: `minor`

---

### `COMMIT_FORMAT_PREFIX`

Regular expression matching the commit format prefix (type and optional scope).

**Type:**
```typescript
const COMMIT_FORMAT_PREFIX: RegExp;
```

**Pattern:**
```
/(break|breaking|build|ci|cd|deps|docs|feature|fix|internal|misc|new|patch|release|revert|security|style|styles|test|tests|type|types|update)(?:\(([a-zA-Z0-9\-., ]+)\))?:/u
```

**Example:**
```typescript
import { COMMIT_FORMAT_PREFIX } from '@rajzik/conventional-changelog-types';

const match = COMMIT_FORMAT_PREFIX.exec('fix(Button): Fix styling');
// match[1] = 'fix'
// match[2] = 'Button'
```

## Types

### `CommitType`

Union type of all valid commit types.

```typescript
type CommitType =
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
```

---

### `CommitGroupLabel`

Union type of all commit group labels.

```typescript
type CommitGroupLabel =
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
```

---

### `Group`

Configuration for a commit type group.

```typescript
interface Group {
  bump?: 'major' | 'minor' | 'patch'; // Semver bump level
  emoji: string; // Emoji for the group
  label: CommitGroupLabel; // Display label
  types: CommitType[]; // Commit types in this group
}
```

---

### `Commit`

Parsed commit object.

```typescript
interface Commit {
  body: string | null;
  footer: string | null;
  header: string;
  mentions: string[];
  merge: string | null;
  notes: Note[];
  references: Reference[];
  revert: Record<string, string> | null;
  hash: string; // Short commit hash
  hashLink: string; // Link to commit
  label: CommitGroupLabel; // Group label
  message: string; // Commit message
  pr: string;
  scope: string; // Commit scope
  source: string;
  type: CommitType; // Commit type
}
```

---

### `Note`

Breaking change or other note.

```typescript
interface Note {
  title: string;
  text: string;
}
```

---

### `Reference`

Issue or PR reference.

```typescript
interface Reference {
  action: string;
  owner: string | null;
  repository: string | null;
  issue: string;
  raw: string;
  prefix: string;
  issueLink: string; // Generated link to issue
  source: string; // Formatted source string
}
```

---

### `Context`

Changelog generation context.

```typescript
interface Context {
  commit: string; // Commit URL path segment
  date: string; // Release date
  host: string; // Repository host
  isPatch: boolean;
  isMinor: boolean;
  isMajor: boolean;
  issue: string; // Issue URL path segment
  linkReferences: boolean;
  options: Record<string, unknown>;
  owner: string; // Repository owner
  repository: string; // Repository name
  repoUrl: string; // Full repository URL
  title: string; // Release title
  version: string; // Version number
  headerLevel?: '#' | '##' | '###';
  groupEmojis?: Record<CommitGroupLabel, string>;
}
```

---

### `ParserOptions`

Options for parsing commit messages.

```typescript
interface ParserOptions {
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
```

---

### `WriterOptions`

Options for writing changelog output.

```typescript
interface WriterOptions {
  commitGroupsSort: Sorter<{ title: CommitGroupLabel; commits: Commit[] }>;
  commitPartial: string;
  commitsSort: Sorter<Commit>;
  debug: () => void;
  doFlush: boolean;
  finalizeContext?: (context: Context, options: WriterOptions, commits: Commit[], keyCommit: Commit) => Context;
  footerPartial: string;
  generateOn: string | ((commit: Commit, commits: Commit[], context: Context, options: WriterOptions) => unknown);
  groupBy: string;
  headerPartial: string;
  ignoreReverted: boolean;
  includeDetails: boolean;
  mainTemplate: string;
  noteGroupsSort: Sorter<{ title: string; notes: Note[] }>;
  notesSort: Sorter<Note>;
  partials: Record<string, unknown>;
  reverse: boolean;
  transform: (commit: Commit, context: Context) => Commit | undefined;
}
```

---

### `SemverLevel`

Semantic version bump level.

```typescript
type SemverLevel = 0 | 1 | 2 | null; // major | minor | patch | none
```

## Examples

### Validating Commit Messages

```typescript
import { checkCommitFormat } from '@rajzik/conventional-changelog-types';

function validateCommitMessage(message: string): boolean {
  return checkCommitFormat(message) !== null;
}

validateCommitMessage('fix: Fix bug'); // true
validateCommitMessage('invalid'); // false
```

### Getting Bump Level

```typescript
import { getTypeGroup } from '@rajzik/conventional-changelog-types';

function getBumpLevel(type: CommitType): 'major' | 'minor' | 'patch' | null {
  const group = getTypeGroup(type);
  return group.bump ?? null;
}

getBumpLevel('breaking'); // 'major'
getBumpLevel('new'); // 'minor'
getBumpLevel('fix'); // 'patch'
getBumpLevel('ci'); // null
```

### Listing All Types

```typescript
import { GROUPS } from '@rajzik/conventional-changelog-types';

const allTypes = GROUPS.flatMap((group) => group.types);
console.log('Valid commit types:', allTypes.join(', '));
```
