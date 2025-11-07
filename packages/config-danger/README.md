# `@rajzik/danger-configuration`

A comprehensive DangerJS configuration package providing utilities for automated code review checks in pull requests.

## Installation

```sh
npm install --save-dev @rajzik/danger-configuration danger
pnpm install --save-dev @rajzik/danger-configuration danger
yarn add --dev @rajzik/danger-configuration danger
```

## Usage

Create a `dangerfile.js` in your repository root:

```javascript
import {
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
  checkForInvalidLocks,
  checkForADR,
  checkForAnyTests,
  checkSourceFilesHaveTests,
  disableComponentSnapshots,
  disableNewJavaScript,
} from '@rajzik/danger-configuration';

// Check for conventional commit prefix in PR title
checkForConventionalPrefix();

// Check for squash commit format
checkForConventionalSquashCommit();

// Validate lock file changes
checkForInvalidLocks();

// Check for ADR documentation on large PRs
checkForADR('docs/adr', {
  changeThreshold: 200,
  docsUrl: 'https://example.com/docs/adr',
  fail: true,
});

// Check for test files
checkForAnyTests({ root: 'src', fail: true });

// Ensure all source files have tests
checkSourceFilesHaveTests({
  root: 'src',
  ignorePattern: /Icon[A-Z][A-Za-z]+\.tsx$/,
  fail: true,
});

// Disable component snapshots
disableComponentSnapshots({
  docsUrl: 'https://example.com/docs/testing',
});

// Disable new JavaScript files
disableNewJavaScript();
```

## API Reference

### `checkForConventionalPrefix()`

Verifies that the PR title contains a conventional changelog prefix according to the [conventional-changelog format](https://github.com/rajzik/configs/tree/main/packages/conventional-changelog#commit-message-format).

**Example:**
```javascript
checkForConventionalPrefix();
```

**Behavior:**
- Fails the PR if the title doesn't match the conventional commit format
- Valid formats include: `fix:`, `new(scope):`, `update(Button):`, etc.

---

### `checkForConventionalSquashCommit()`

Ensures that when a PR has only 1 commit and will be squash-merged, the commit message matches the PR title. This prevents losing the semver prefix during automatic releases.

**Example:**
```javascript
checkForConventionalSquashCommit();
```

**Behavior:**
- Fails if PR has exactly 1 commit and the commit message doesn't include the PR title
- Prevents semver prefix loss during squash merges

---

### `checkForInvalidLocks()`

Validates that lock file changes are accompanied by corresponding `package.json` changes.

**Example:**
```javascript
checkForInvalidLocks();
```

**Behavior:**
- Fails if `package-lock.json` is changed without `package.json`
- Fails if `npm-shrinkwrap.json` is changed without `package.json`
- Fails if `pnpm-lock.yaml` is changed without `package.json` or `pnpm-workspace.yaml`

**Supported lock files:**
- `package-lock.json` (npm)
- `npm-shrinkwrap.json` (npm)
- `pnpm-lock.yaml` (pnpm)

---

### `checkForADR(docsPath, options?)`

Checks that large PRs have an associated Architecture Decision Record (ADR) file documenting the changes.

**Parameters:**
- `docsPath` (string): Path to the ADR documentation directory (e.g., `'docs/adr'`)
- `options` (object, optional):
  - `changeThreshold` (number, default: `200`): Number of additions/deletions that trigger the check
  - `docsUrl` (string, optional): URL to ADR documentation
  - `exclusions` (string[], optional): Additional file patterns to exclude from change count
  - `fail` (boolean, default: `false`): Whether to fail the PR or just warn

**Example:**
```javascript
checkForADR('docs/adr', {
  changeThreshold: 200,
  docsUrl: 'https://example.com/docs/adr',
  exclusions: ['*.md'],
  fail: true,
});
```

**Behavior:**
- Automatically excludes lock files, test files, and snapshots from change count
- Shows a thank you message if ADR files are found
- Warns or fails if PR exceeds threshold without ADR documentation
- Skips check for revert PRs

---

### `checkForAnyTests(options?)`

Checks that test files exist when source files are updated.

**Parameters:**
- `options` (object, optional):
  - `root` (string, optional): Root directory to filter source files (e.g., `'src'`)
  - `fail` (boolean, default: `false`): Whether to fail the PR or just warn

**Example:**
```javascript
checkForAnyTests({ root: 'src', fail: true });
```

**Behavior:**
- Checks if any test files (`.test.ts`, `.test.tsx`, `.test.js`, `.test.jsx`) are present
- Warns or fails if source files changed but no test files found
- Skips check for revert PRs

---

### `checkSourceFilesHaveTests(options?)`

Ensures that all touched source files have an accompanying test file change.

**Parameters:**
- `options` (object, optional):
  - `root` (string, optional): Root directory to filter source files
  - `ignorePattern` (RegExp, optional): Pattern to ignore specific source files
  - `fail` (boolean, default: `false`): Whether to fail the PR or just warn

**Example:**
```javascript
checkSourceFilesHaveTests({
  root: 'src',
  ignorePattern: /Icon[A-Z][A-Za-z]+\.tsx$/,
  fail: true,
});
```

**Behavior:**
- Maps source files to expected test file names:
  - `src/components/Button.tsx` → `tests/components/Button.test.tsx`
  - `src/components/index.tsx` → `tests/components/index.test.tsx` or `tests/components/Button.test.tsx`
- Lists all source files missing test files
- Skips check for revert PRs

**Test file mapping rules:**
- `src/` → `tests/` or `test/`
- `Foo/index.tsx` → `Foo.test.tsx` or `Foo/index.test.tsx`
- `Foo.tsx` → `Foo.test.tsx`

---

### `disableComponentSnapshots(options?)`

Prevents creation or updates of component snapshot files (`.jsx.snap`, `.tsx.snap`).

**Parameters:**
- `options` (object, optional):
  - `docsUrl` (string, optional): URL to migration documentation

**Example:**
```javascript
disableComponentSnapshots({
  docsUrl: 'https://example.com/docs/testing',
});
```

**Behavior:**
- Fails if new snapshot files are created
- Warns if existing snapshot files are updated
- Skips check for revert PRs

---

### `disableNewJavaScript()`

Prevents creation of new JavaScript files, enforcing TypeScript usage.

**Example:**
```javascript
disableNewJavaScript();
```

**Behavior:**
- Fails if any new `.js` or `.jsx` files are created in `src/` or `tests?/` directories
- Only checks newly created files, not modified files

---

## Types

### `CommonOptions`

```typescript
interface CommonOptions {
  fail?: boolean; // Whether to fail the PR (true) or warn (false)
}
```

### `CheckAdrOptions`

```typescript
interface CheckAdrOptions extends CommonOptions {
  changeThreshold?: number; // Default: 200
  docsUrl?: string;
  exclusions?: string[];
}
```

### `TestOptions`

```typescript
interface TestOptions extends CommonOptions {
  ignorePattern?: RegExp;
  root?: string;
}
```

### `SnapshotOptions`

```typescript
interface SnapshotOptions {
  docsUrl?: string;
}
```

## Helper Functions

The following helper functions are exported but primarily used internally:

- `debug(msg, ...args)`: Debug logging (only when `dangerfile.js` is modified)
- `isRevert()`: Checks if PR is a revert
- `countChangesInFile(file)`: Counts additions/deletions in a file
- `touchedFiles`: Array of all created, deleted, and modified files
- `updatedFiles`: Array of all created and modified files

## Constants

- `IS_SRC`: Regex matching `src/` directory
- `IS_TEST`: Regex matching `tests?/` directory
- `JS_EXT`: Regex matching `.js` or `.jsx` files
- `SRC_EXT`: Regex matching `.ts`, `.tsx`, `.js`, `.jsx` files
- `TEST_EXT`: Regex matching `.test.ts`, `.test.tsx`, `.test.js`, `.test.jsx` files
- `SNAP_EXT`: Regex matching `.snap` files
- `GLOBAL_IGNORE`: Regex for globally ignored files (e.g., icon components)
