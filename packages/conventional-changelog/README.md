# `conventional-changelog-rajzik`

Commit message guidelines and changelog structure with emoji support. Provides configuration for generating changelogs from conventional commits, with support for Azure DevOps PR message format.

## Installation

```sh
npm install --save-dev conventional-changelog-rajzik
pnpm install --save-dev conventional-changelog-rajzik
yarn add --dev conventional-changelog-rajzik
```

## Usage

### With conventional-changelog CLI

```javascript
import changelog from 'conventional-changelog-rajzik';

const config = await changelog;

// Use with conventional-changelog
import conventionalChangelog from 'conventional-changelog';

conventionalChangelog({
  config: config.conventionalChangelog,
  releaseCount: 0,
}).pipe(process.stdout);
```

### With standard-version

```json
{
  "standard-version": {
    "scripts": {
      "postchangelog": "prettier --write CHANGELOG.md"
    }
  }
}
```

## API Reference

### Default Export

The default export is a Promise that resolves to a configuration object:

```typescript
{
  conventionalChangelog: {
    parserOpts: ParserOptions;
    writerOpts: WriterOptions;
  };
  parserOpts: Partial<ParserOptions>;
  recommendedBumpOpts: BumpOptions;
  writerOpts: Partial<WriterOptions>;
}
```

### `conventionalChangelog`

Main changelog configuration object containing `parserOpts` and `writerOpts`.

**Example:**
```javascript
import changelog from 'conventional-changelog-rajzik';

const config = await changelog;
// config.conventionalChangelog.parserOpts
// config.conventionalChangelog.writerOpts
```

### `parserOpts`

Parser options for parsing commit messages. Supports Azure DevOps PR format and standard conventional commits.

**Features:**
- Supports Azure DevOps format: `Merged PR 123: type(scope): message`
- Standard format: `type(scope): message`
- Merge commit parsing
- Revert commit parsing
- Breaking change detection

**Example:**
```javascript
import { parserOpts } from 'conventional-changelog-rajzik';

// parserOpts.headerPattern matches:
// - "fix: Fix bug"
// - "new(Button): Add Button component"
// - "Merged PR 123: update(Modal): Refactor"
```

**Configuration:**
- `headerPattern`: Regex matching commit format with optional Azure DevOps prefix
- `headerCorrespondence`: Maps to `['azure', 'type', 'scope', 'message']`
- `mergePattern`: Matches merge commits
- `revertPattern`: Matches revert commits
- `noteKeywords`: `['BREAKING CHANGE', 'BREAKING CHANGES', 'Note']`

### `recommendedBumpOpts`

Options for determining semantic version bumps based on commit types.

**Example:**
```javascript
import { recommendedBumpOpts } from 'conventional-changelog-rajzik';

// Automatically determines version bump level:
// - Major: break, breaking, release
// - Minor: new, update, feature
// - Patch: fix, deps, docs, revert, style, security, type, misc
```

**Behavior:**
- Analyzes commits and determines highest required version bump
- Returns `{ level: 0|1|2|null, reason: string }`
- Level `0` = major, `1` = minor, `2` = patch, `null` = no bump

### `writerOpts`

Writer options for formatting changelog output with emojis and custom templates.

**Features:**
- Emoji support for each commit group
- Custom Handlebars templates
- Azure DevOps work item linking
- GitHub/GitLab user mention linking
- Commit hash linking
- Grouped and sorted commits

**Example:**
```javascript
import { writerOpts } from 'conventional-changelog-rajzik';

// Generates changelog with:
// - Emoji prefixes (🚀 Updates, 🐞 Fixes, etc.)
// - Grouped by type
// - Sorted by importance
// - Linked commit hashes
```

**Templates:**
- `mainTemplate`: Main changelog template
- `commitPartial`: Individual commit template
- `headerPartial`: Version header template
- `footerPartial`: Footer template

**Group Emojis:**
- 💥 Breaking
- 📦 Dependencies
- 📘 Docs
- 🐞 Fixes
- 🛠 Internals
- 📋 Misc
- 🎉 Release
- ↩️ Reverts
- 🔑 Security
- 🎨 Styles
- ⚙️ Types
- 🚀 Updates

## Commit Message Format

The commit message format consists of a **type**, optional **scope** in parenthesis, and a required **message**:

```
<type>: <message>
<type>(<scope>): <message>
Merged PR 1: <type>(<scope>): <message>
Merged PR 1: <type>: <message>
```

> ⚠️ Azure DevOps message format is allowed but not required.

### Type

The type determines the commit group and semver bump level.

#### Major Version Bumps

- `break`, `breaking` - A _major_ breaking change
- `release` - Not a breaking change but bumps the _major_ version

#### Minor Version Bumps

- `new` - Introduces a new feature
- `update` - Updates an existing feature
- `feature` - Both a new and update

#### Patch Version Bumps

- `fix` - Fixes existing functionality
- `deps` - Bumps dependencies
- `docs` - Updates documentation
- `revert` - Reverts previous or broken code
- `style`, `styles` - Updates visual styles, like CSS
- `security` - Improves security
- `type`, `types` - Updates type system related syntax (TS/Flow)
- `misc` - Catch all for commits that don't align with other types

#### Skip (No Version Bump)

- `ci`, `cd` - Changes to the CI pipeline
- `build` - Changes to the build system
- `test`, `tests` - Changes to tests or the testing framework
- `internal` - Internal changes not critical for the consumer

### Scope

The scope is optional but useful in defining granularity in a commit message. Scope is ideally used to target a specific feature or module within the project, for example: `new(Button): Add a new Button component`.

Scopes will appear in the changelog before each line item and accept the following characters: `A-Z`, `a-z`, `0-9`, `-`, `.`, `,`, and spaces.

### Message

The message contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Capitalize first letter of message
- Trailing punctuation (period) is not required, but preferred

## Example

Given the following commit messages:

```
new(Button): Add new Button component
update(Modal,Tooltip): Refactor accessibility support
ci: Add DangerJS to pipeline
test: Add missing tests for a handful of files
fix(auth): Fixed a bug with the authentication flow
```

Would generate the following changelog:

---

## 1.2.3 - 2019-01-01

#### 🚀 Updates

- **[Button]** Add new Button component ([a1b2c3d][fake-commit])
- **[Modal,Tooltip]** Refactor accessibility support ([a1b2c3d][fake-commit])

#### 🐞 Fixes

- **[auth]** Fixed a bug with the authentication flow ([a1b2c3d][fake-commit])

#### 🛠 Internals

- Add DangerJS to pipeline ([a1b2c3d][fake-commit])
- Add missing tests for a handful of files ([a1b2c3d][fake-commit])

[fake-commit]: #example

## Types

### `BumpOptions`

```typescript
interface BumpOptions {
  parserOpts: Partial<ParserOptions>;
  whatBump: (commits: Commit[]) => {
    level: SemverLevel; // 0 | 1 | 2 | null
    reason: string;
  };
}
```

All types are exported from `@rajzik/conventional-changelog-types`. See that package's documentation for complete type definitions.

## Azure DevOps Integration

When running in Azure DevOps pipelines, the changelog generator automatically:

- Links to Azure DevOps work items using `SYSTEM_TASKDEFINITIONSURI`
- Handles Azure DevOps PR merge commit format
- Creates work item links in the format: `{SYSTEM_TASKDEFINITIONSURI}/_workitems/edit/{workItemId}`

Set the `SYSTEM_TASKDEFINITIONSURI` environment variable in your Azure DevOps pipeline.
