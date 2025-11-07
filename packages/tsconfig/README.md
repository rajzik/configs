# `@rajzik/tsconfig`

Shareable TypeScript configuration with strict type checking and modern JavaScript support.

## Installation

```sh
npm install --save-dev @rajzik/tsconfig typescript
pnpm install --save-dev @rajzik/tsconfig typescript
yarn add --dev @rajzik/tsconfig typescript
```

## Usage

### Base Configuration

Extend the base configuration in your `tsconfig.json`:

```json
{
  "extends": "@rajzik/tsconfig"
}
```

### Package Configuration

For packages that need to emit declaration files:

```json
{
  "extends": "@rajzik/tsconfig/tsconfig.package.json"
}
```

Or reference the file directly:

```json
{
  "extends": "@rajzik/tsconfig/tsconfig.package.json"
}
```

## API Reference

### Base Configuration (`@rajzik/tsconfig`)

The base configuration provides a modern TypeScript setup optimized for bundlers and modern tooling.

**Configuration:**
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Rajzik config",
  "compilerOptions": {
    /* Base options */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2024",
    "lib": ["ES2024"],
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "allowArbitraryExtensions": true,
    "jsx": "preserve",

    /* Keep TSC performant in monorepos */
    "incremental": true,
    "disableSourceOfProjectReferenceRedirect": true,
    "tsBuildInfoFile": "${configDir}/.cache/tsbuildinfo.json",

    /* Strictness */
    "strict": true,
    "checkJs": true,
    "noUncheckedIndexedAccess": true,

    /* Transpile using bundler */
    "module": "preserve",
    "moduleResolution": "bundler",
    "noEmit": true
  },
  "exclude": ["node_modules", "dist", "dts", ".next", "build"]
}
```

**Key Features:**

#### Base Options

- **`esModuleInterop`**: Enables interoperability between CommonJS and ES Modules
- **`skipLibCheck`**: Skips type checking of declaration files for faster compilation
- **`target`**: `es2024` - Latest ECMAScript features
- **`lib`**: `["ES2024"]` - Latest standard library types
- **`allowJs`**: Allows JavaScript files to be imported
- **`resolveJsonModule`**: Allows importing JSON files
- **`moduleDetection`**: `"force"` - Treats all files as modules
- **`isolatedModules`**: Ensures each file can be safely transpiled independently
- **`allowArbitraryExtensions`**: Allows importing files with arbitrary extensions
- **`jsx`**: `"preserve"` - Preserves JSX for bundler processing

#### Performance (Monorepo Optimized)

- **`incremental`**: Enables incremental compilation
- **`disableSourceOfProjectReferenceRedirect`**: Improves performance in monorepos
- **`tsBuildInfoFile`**: Stores incremental compilation info in `.cache/tsbuildinfo.json`

#### Strictness

- **`strict`**: Enables all strict type checking options
  - `strictNullChecks`
  - `strictFunctionTypes`
  - `strictBindCallApply`
  - `strictPropertyInitialization`
  - `noImplicitThis`
  - `alwaysStrict`
- **`checkJs`**: Type checks JavaScript files
- **`noUncheckedIndexedAccess`**: Requires explicit checks for array/object access

#### Bundler Mode

- **`module`**: `"preserve"` - Preserves module syntax for bundlers
- **`moduleResolution`**: `"bundler"` - Modern resolution strategy for bundlers
- **`noEmit`**: Doesn't emit files (bundler handles transpilation)

#### Exclusions

Excludes common build and dependency directories:
- `node_modules`
- `dist`
- `dts`
- `.next`
- `build`

---

### Package Configuration (`@rajzik/tsconfig/tsconfig.package.json`)

Extended configuration for packages that need to emit TypeScript declaration files.

**Configuration:**
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    /** Emit types for internal packages to speed up editor performance. */
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "noEmit": false,
    "outDir": "${configDir}/dist"
  }
}
```

**Additional Options:**

- **`declaration`**: Generates `.d.ts` declaration files
- **`declarationMap`**: Generates `.d.ts.map` source maps for better IDE support
- **`emitDeclarationOnly`**: Only emits declaration files (no JavaScript)
- **`noEmit`**: `false` - Allows emitting files
- **`outDir`**: Output directory for declaration files

**Use Case:**
- Internal packages in monorepos
- Libraries that need to provide types to consumers
- Packages where type-only emission improves editor performance

---

## Configuration Options Explained

### `target: "es2024"`

Compiles to ES2024 syntax. Modern bundlers will further transpile as needed for target environments.

**Benefits:**
- Access to latest JavaScript features
- Smaller output when targeting modern environments
- Better tree-shaking support

---

### `module: "preserve"`

Preserves module syntax (`import`/`export`) for bundler processing.

**Benefits:**
- Bundlers can optimize module resolution
- Better tree-shaking
- Supports modern module formats

---

### `moduleResolution: "bundler"`

Uses bundler-friendly module resolution strategy.

**Features:**
- Supports `package.json` `exports` field
- Handles modern module formats
- Optimized for bundler tooling

**Note:** Requires TypeScript 5.0+

---

### `strict: true`

Enables all strict type checking options:

- **`strictNullChecks`**: `null` and `undefined` are separate types
- **`strictFunctionTypes`**: Stricter function type checking
- **`strictBindCallApply`**: Stricter `bind`, `call`, `apply` checking
- **`strictPropertyInitialization`**: Requires class properties to be initialized
- **`noImplicitThis`**: Error on implicit `this` usage
- **`alwaysStrict`**: Parses in strict mode

**Benefits:**
- Catches more errors at compile time
- Better type safety
- Prevents common runtime errors

---

### `noUncheckedIndexedAccess: true`

Requires explicit checks when accessing arrays or objects by index.

**Example:**
```typescript
// ❌ Error: Object is possibly 'undefined'
const value = obj['key'];

// ✅ Valid: Explicit check
const value = obj['key'] ?? defaultValue;

// ✅ Valid: Type guard
if ('key' in obj) {
  const value = obj['key']; // Now safe
}
```

**Benefits:**
- Prevents `undefined` access errors
- Encourages defensive programming
- Better runtime safety

---

### `jsx: "preserve"`

Preserves JSX syntax for bundler/transformer processing.

**Use Cases:**
- React with modern bundlers (Vite, esbuild, etc.)
- Next.js
- Other JSX transformers

**Alternatives:**
- `"react"` - For React 17+
- `"react-jsx"` - For React 17+ with new JSX transform
- `"react-native"` - For React Native

---

## Extending the Configuration

### Override Options

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "target": "es2022",
    "jsx": "react-jsx",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Add Path Mappings

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

### Include/Exclude Files

```json
{
  "extends": "@rajzik/tsconfig",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## Monorepo Usage

### Root `tsconfig.json`

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "composite": true,
    "references": [
      { "path": "./packages/package-a" },
      { "path": "./packages/package-b" }
    ]
  }
}
```

### Package `tsconfig.json`

```json
{
  "extends": "@rajzik/tsconfig/tsconfig.package.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../shared" }
  ]
}
```

**Benefits:**
- Incremental compilation
- Project references for faster builds
- Shared type definitions

---

## Migration Guide

### From Older Configurations

If migrating from a different TypeScript config:

1. **Update `moduleResolution`**: Change from `"node"` to `"bundler"` (if using modern bundlers)
2. **Update `module`**: Change from `"esnext"` to `"preserve"` (if using bundlers)
3. **Enable `noUncheckedIndexedAccess`**: May require adding null checks
4. **Review `target`**: Update to `"es2024"` if targeting modern environments

### Common Issues

**Issue:** `Cannot find module` errors
**Solution:** Ensure `moduleResolution: "bundler"` and check `package.json` `exports` field

**Issue:** JSX not working
**Solution:** Set `jsx: "react-jsx"` or `jsx: "preserve"` based on your setup

**Issue:** Slow compilation in monorepos
**Solution:** Enable `incremental: true` and use project references

---

## Examples

### React Application

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src"]
}
```

### Next.js Application

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### Node.js Library

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "module": "node16",
    "moduleResolution": "node16",
    "target": "es2022"
  }
}
```

### Monorepo Package

```json
{
  "extends": "@rajzik/tsconfig/tsconfig.package.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../shared" }
  ]
}
```

---

## Related Packages

- [`@rajzik/eslint-config`](../eslint-config) - ESLint configuration
- [`@rajzik/prettier-config`](../prettier-preset) - Prettier configuration
