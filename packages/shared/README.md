# `@rajzik/configs-shared`

Internal package providing shared constants used across other `@rajzik/configs`
packages.

## Installation

This package is primarily used internally by other `@rajzik/configs` packages.
If you need to use it directly:

```sh
npm install --save-dev @rajzik/configs-shared
pnpm install --save-dev @rajzik/configs-shared
yarn add --dev @rajzik/configs-shared
```

## Usage

```typescript
import { IGNORE_PATHS } from '@rajzik/configs-shared';
```

## API Reference

### `IGNORE_PATHS`

Array of paths to ignore in various tools.

**Type:** `string[]`

**Value:**

```typescript
[
  '.next/',
  'coverage/',
  'node_modules/',
  'public/',
  'esm/',
  'lib/',
  '!src/lib',
  'tmp/',
  'dist/',
  'build/',
  '.turbo/',
  '.cache',
];
```

**Example:**

```typescript
import { IGNORE_PATHS } from '@rajzik/configs-shared';

// Use with glob patterns
const files = glob('**/*.ts', {
  ignore: IGNORE_PATHS,
});
```

## Internal Usage

This package is primarily used internally by:

- Other `@rajzik/configs` packages - For shared ignore patterns

If you need a small shared ignore list for tooling in the same ecosystem, this
package exposes that list directly.
