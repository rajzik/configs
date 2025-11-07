# `@rajzik/conventional-commit-lint-config`

Commitlint configuration for the
[rajzik conventional changelog preset](../conventional-changelog). Enforces
conventional commit message format in your repository.

## Installation

```sh
npm install --save-dev @commitlint/cli @rajzik/conventional-commit-lint-config
pnpm install --save-dev @commitlint/cli @rajzik/conventional-commit-lint-config
yarn add --dev @commitlint/cli @rajzik/conventional-commit-lint-config
```

## Usage

### Configuration

Create a `commitlint.config.cjs` (CommonJS) or `commitlint.config.mjs` (ESM)
file:

**CommonJS (`commitlint.config.cjs`):**

```javascript
module.exports = {
  extends: ['@rajzik/conventional-commit-lint-config'],
};
```

**ESM (`commitlint.config.mjs`):**

```javascript
export default {
  extends: ['@rajzik/conventional-commit-lint-config'],
};
```

### Integration with Git Hooks

#### Using Husky

```sh
npm install --save-dev husky
npx husky init
```

Add to `.husky/commit-msg`:

```bash
npx --no -- commitlint --edit $1
```

#### Using lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["commitlint --edit"]
  }
}
```

### CLI Usage

```sh
# Check a commit message
echo "fix: Fix bug" | npx commitlint

# Check from stdin
npx commitlint --edit

# Check last commit
git log -1 --pretty=%B | npx commitlint
```

## API Reference

### Default Export

The default export is a commitlint configuration object:

```typescript
{
  rules: {
    'body-max-length': [0],
    'scope-case': [0, 'never', 'start-case'],
    'subject-full-stop': [2, 'always', '.'],
    'subject-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', CommitType[]],
  };
}
```

### Rules

#### `type-enum`

Enforces that commit types match the conventional changelog types.

**Severity:** `2` (error)

**Valid Types:**

- `break`, `breaking` - Breaking changes
- `build` - Build system changes
- `ci`, `cd` - CI/CD changes
- `deps` - Dependency updates
- `docs` - Documentation changes
- `feature` - New features
- `fix` - Bug fixes
- `internal` - Internal changes
- `misc` - Miscellaneous changes
- `new` - New features
- `patch` - Patch fixes
- `release` - Release commits
- `revert` - Revert commits
- `security` - Security fixes
- `style`, `styles` - Style changes
- `test`, `tests` - Test changes
- `type`, `types` - Type system changes
- `update` - Feature updates

**Example:**

```bash
# ✅ Valid
fix: Fix button styling
new(Button): Add Button component
ci: Update GitHub Actions

# ❌ Invalid
invalid: Invalid commit type
feat: Use 'new' or 'feature' instead
```

---

#### `subject-case`

Enforces sentence-case for commit subjects.

**Severity:** `2` (error)

**Format:** `sentence-case` (first letter capitalized, rest lowercase)

**Example:**

```bash
# ✅ Valid
fix: Fix button styling
new(Button): Add Button component

# ❌ Invalid
fix: fix button styling
new(Button): add Button component
```

---

#### `subject-full-stop`

Enforces trailing period in commit subjects.

**Severity:** `2` (error)

**Format:** Always require trailing period

**Example:**

```bash
# ✅ Valid
fix: Fix button styling.
new(Button): Add Button component.

# ❌ Invalid
fix: Fix button styling
new(Button): Add Button component
```

---

#### `scope-case`

Allows flexible scope casing (disabled by default).

**Severity:** `0` (disabled)

**Format:** `start-case` (when enabled)

**Example:**

```bash
# All of these are valid:
fix(Button): Fix styling.
fix(button): Fix styling.
fix(BUTTON): Fix styling.
```

---

#### `body-max-length`

No limit on commit body length (disabled by default).

**Severity:** `0` (disabled)

## Commit Message Format

This config enforces the following format:

```
<type>(<scope>): <subject>.
```

Where:

- `<type>`: One of the valid commit types (see above)
- `<scope>`: Optional scope in parentheses
- `<subject>`: Sentence-case description ending with a period

### Examples

**Valid commits:**

```
fix: Fix authentication bug.
new(Button): Add new Button component.
update(Modal): Refactor accessibility support.
ci: Add DangerJS to pipeline.
fix(auth): Fixed a bug with the authentication flow.
```

**Invalid commits:**

```
fix: fix bug                    # Wrong case, missing period
feat: Add feature              # Invalid type, missing period
new(Button): add button        # Wrong case, missing period
fix: Fix bug                   # Missing period
```

## Customization

You can extend and override the configuration:

```javascript
export default {
  extends: ['@rajzik/conventional-commit-lint-config'],
  rules: {
    'subject-full-stop': [2, 'always', '.'], // Keep default
    'subject-case': [2, 'always', 'lower-case'], // Override to lowercase
  },
};
```

## Integration Examples

### GitHub Actions

```yaml
name: Lint Commits

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
      - run: npm install
      - run:
          npx commitlint --from ${{ github.event.pull_request.base.sha }} --to
          ${{ github.sha }} --verbose
```

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_msg=$(cat "$1")
npx commitlint --edit "$1" || exit 1
```

## Related Packages

- [`@rajzik/conventional-changelog`](../conventional-changelog) - Changelog
  generation
- [`@rajzik/conventional-changelog-types`](../conventional-changelog-types) -
  Type definitions
- [`@rajzik/danger-configuration`](../config-danger) - PR validation

## Further Reading

- [commitlint Documentation](https://github.com/conventional-changelog/commitlint)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
