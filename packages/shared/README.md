# `@rajzik/configs-shared`

Internal package providing shared constants and utilities used across other `@rajzik/configs` packages.

## Installation

This package is primarily used internally by other `@rajzik/configs` packages. If you need to use it directly:

```sh
npm install --save-dev @rajzik/configs-shared
pnpm install --save-dev @rajzik/configs-shared
yarn add --dev @rajzik/configs-shared
```

## Usage

```typescript
import {
  ROOT,
  EXTS,
  IGNORE_PATHS,
  TSX_EXTS_GROUP,
  ASSET_EXT_PATTERN,
  CSS_EXT_PATTERN,
  GQL_EXT_PATTERN,
  TJSX_EXTS_GROUP,
  JSX_EXTS_GROUP,
  ALIAS_PATTERN,
  TSCONFIG_JSON_PATH,
  PACKAGE_JSON_PATH,
  parseJSON,
  getRootTSConfig,
  getRootPackageJson,
  getRootProjectReferences,
} from '@rajzik/configs-shared';
```

## API Reference

### Constants

#### `ROOT`

Current working directory path.

**Type:** `string`

**Example:**
```typescript
import { ROOT } from '@rajzik/configs-shared';

console.log(ROOT); // '/path/to/project'
```

---

#### `EXTS`

Array of supported file extensions.

**Type:** `string[]`

**Value:**
```typescript
[
  '.ts',
  '.tsx',
  '.mts',
  '.mtsx',
  '.cts',
  '.ctsx',
  '.js',
  '.jsx',
  '.cjs',
  '.cjsx',
  '.js',
  '.jsx',
  '.json',
]
```

**Example:**
```typescript
import { EXTS } from '@rajzik/configs-shared';

const isSupported = (file: string) => {
  return EXTS.some((ext) => file.endsWith(ext));
};
```

---

#### `IGNORE_PATHS`

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
]
```

**Example:**
```typescript
import { IGNORE_PATHS } from '@rajzik/configs-shared';

// Use with glob patterns
const files = glob('**/*.ts', {
  ignore: IGNORE_PATHS,
});
```

---

#### `TSX_EXTS_GROUP`

Glob pattern group for TypeScript/TSX extensions.

**Type:** `string`

**Value:** `'{ts,tsx,mts,mtsx,cts,ctsx}'`

**Example:**
```typescript
import { TSX_EXTS_GROUP } from '@rajzik/configs-shared';

const pattern = `**/*.${TSX_EXTS_GROUP}`;
// '**/*.{ts,tsx,mts,mtsx,cts,ctsx}'
```

---

#### `ASSET_EXT_PATTERN`

Regular expression matching asset file extensions.

**Type:** `RegExp`

**Pattern:** `/\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico)$/`

**Example:**
```typescript
import { ASSET_EXT_PATTERN } from '@rajzik/configs-shared';

const isAsset = (file: string) => ASSET_EXT_PATTERN.test(file);

isAsset('image.png'); // true
isAsset('styles.css'); // false
```

**Matches:**
- Font files: `.ttf`, `.eot`, `.otf`, `.woff`, `.woff2`
- Images: `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.ico`
- Audio: `.mp3`

---

#### `CSS_EXT_PATTERN`

Regular expression matching CSS file extensions.

**Type:** `RegExp`

**Pattern:** `/\.(css|scss)$/`

**Example:**
```typescript
import { CSS_EXT_PATTERN } from '@rajzik/configs-shared';

const isStylesheet = (file: string) => CSS_EXT_PATTERN.test(file);

isStylesheet('styles.css'); // true
isStylesheet('styles.scss'); // true
isStylesheet('styles.ts'); // false
```

---

#### `GQL_EXT_PATTERN`

Regular expression matching GraphQL file extensions.

**Type:** `RegExp`

**Pattern:** `/\.(gql|graphql)$/`

**Example:**
```typescript
import { GQL_EXT_PATTERN } from '@rajzik/configs-shared';

const isGraphQL = (file: string) => GQL_EXT_PATTERN.test(file);

isGraphQL('schema.gql'); // true
isGraphQL('query.graphql'); // true
isGraphQL('query.ts'); // false
```

---

#### `TJSX_EXTS_GROUP`

Glob pattern group for TypeScript and JavaScript extensions.

**Type:** `string`

**Value:** `'{ts,tsx,mts,mtsx,cts,ctsx,mjs,mjsx,cjs,cjsx,js,jsx}'`

**Example:**
```typescript
import { TJSX_EXTS_GROUP } from '@rajzik/configs-shared';

const pattern = `**/*.${TJSX_EXTS_GROUP}`;
// '**/*.{ts,tsx,mts,mtsx,cts,ctsx,mjs,mjsx,cjs,cjsx,js,jsx}'
```

---

#### `JSX_EXTS_GROUP`

Glob pattern group for JavaScript extensions only.

**Type:** `string`

**Value:** `'{js,jsx,mjs,mjsx,cjs,cjsx}'`

**Example:**
```typescript
import { JSX_EXTS_GROUP } from '@rajzik/configs-shared';

const pattern = `**/*.${JSX_EXTS_GROUP}`;
// '**/*.{js,jsx,mjs,mjsx,cjs,cjsx}'
```

---

#### `ALIAS_PATTERN`

Pattern for import aliases (typically `~`).

**Type:** `string`

**Value:** `'~'`

**Example:**
```typescript
import { ALIAS_PATTERN } from '@rajzik/configs-shared';

// Used in import resolution
const resolveAlias = (importPath: string) => {
  if (importPath.startsWith(ALIAS_PATTERN)) {
    return importPath.replace(ALIAS_PATTERN, './src');
  }
  return importPath;
};
```

---

#### `TSCONFIG_JSON_PATH`

Path to `tsconfig.json` file in the project root.

**Type:** `string`

**Value:** `path.join(ROOT, 'tsconfig.json')`

**Example:**
```typescript
import { TSCONFIG_JSON_PATH } from '@rajzik/configs-shared';
import fs from 'fs';

const tsconfig = JSON.parse(fs.readFileSync(TSCONFIG_JSON_PATH, 'utf8'));
```

---

#### `PACKAGE_JSON_PATH`

Path to `package.json` file in the project root.

**Type:** `string`

**Value:** `path.join(ROOT, 'package.json')`

**Example:**
```typescript
import { PACKAGE_JSON_PATH } from '@rajzik/configs-shared';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
```

---

### Functions

#### `parseJSON<T>(filePath: string): T`

Parses a JSON file, removing comments and handling common JSON-with-comments formats.

**Parameters:**
- `filePath` (string): Path to the JSON file

**Returns:**
- `T`: Parsed JSON object

**Example:**
```typescript
import { parseJSON } from '@rajzik/configs-shared';

interface Config {
  name: string;
  version: string;
}

const config = parseJSON<Config>('./config.json');
```

**Features:**
- Removes lines starting with `#` or `//` (comments)
- Handles JSONC (JSON with Comments) format
- Type-safe parsing with generics

---

#### `getRootTSConfig(): TSConfigJSON`

Gets and caches the root `tsconfig.json` file.

**Returns:**
```typescript
interface TSConfigJSON {
  compilerOptions?: CompilerOptions;
  references?: ProjectReference[];
}
```

**Example:**
```typescript
import { getRootTSConfig } from '@rajzik/configs-shared';

const tsconfig = getRootTSConfig();
console.log(tsconfig.compilerOptions?.target); // 'es2024'
```

**Features:**
- Caches the result after first read
- Returns parsed `tsconfig.json` with TypeScript types
- Handles project references for monorepos

---

#### `getRootPackageJson(): PackageJSON`

Gets and caches the root `package.json` file.

**Returns:**
```typescript
interface PackageJSON {
  name: string;
  engines?: { node?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}
```

**Example:**
```typescript
import { getRootPackageJson } from '@rajzik/configs-shared';

const pkg = getRootPackageJson();
console.log(pkg.name); // '@rajzik/configs-shared'
console.log(pkg.devDependencies); // { ... }
```

**Features:**
- Caches the result after first read
- Returns parsed `package.json` with typed structure
- Includes common package.json fields

---

#### `getRootProjectReferences(): ProjectReference[] | undefined`

Gets TypeScript project references from the root `tsconfig.json`.

**Returns:**
- `ProjectReference[] | undefined`: Array of project references, or `undefined` if not present

**Example:**
```typescript
import { getRootProjectReferences } from '@rajzik/configs-shared';

const references = getRootProjectReferences();
if (references) {
  references.forEach((ref) => {
    console.log(ref.path); // './packages/package-name'
  });
}
```

**Use Case:**
- Monorepo project reference resolution
- TypeScript project dependency management

---

## Type Definitions

### `TSConfigJSON`

```typescript
interface TSConfigJSON {
  compilerOptions?: CompilerOptions; // TypeScript compiler options
  references?: ProjectReference[]; // Project references for monorepos
}
```

### `PackageJSON`

```typescript
interface PackageJSON {
  name: string;
  engines?: { node?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}
```

---

## Examples

### Check File Extension

```typescript
import { EXTS, ASSET_EXT_PATTERN } from '@rajzik/configs-shared';

function isSupportedFile(file: string): boolean {
  return EXTS.some((ext) => file.endsWith(ext));
}

function isAssetFile(file: string): boolean {
  return ASSET_EXT_PATTERN.test(file);
}
```

### Read Configuration Files

```typescript
import {
  getRootTSConfig,
  getRootPackageJson,
  parseJSON,
} from '@rajzik/configs-shared';

// Cached reads
const tsconfig = getRootTSConfig();
const pkg = getRootPackageJson();

// Direct parse
const customConfig = parseJSON<CustomConfig>('./custom.config.json');
```

### Build Glob Patterns

```typescript
import { TSX_EXTS_GROUP, TJSX_EXTS_GROUP } from '@rajzik/configs-shared';

const tsFiles = `src/**/*.${TSX_EXTS_GROUP}`;
const allJsFiles = `**/*.${TJSX_EXTS_GROUP}`;
```

### Filter Files

```typescript
import { IGNORE_PATHS, CSS_EXT_PATTERN } from '@rajzik/configs-shared';

function filterFiles(files: string[]): string[] {
  return files.filter((file) => {
    // Exclude ignored paths
    if (IGNORE_PATHS.some((path) => file.includes(path))) {
      return false;
    }
    // Only CSS files
    return CSS_EXT_PATTERN.test(file);
  });
}
```

---

## Internal Usage

This package is primarily used internally by:

- `@rajzik/eslint-config` - For file extension patterns and path resolution
- Other `@rajzik/configs` packages - For shared constants and utilities

If you're building a tool that integrates with the `@rajzik/configs` ecosystem, you may find these utilities helpful.
