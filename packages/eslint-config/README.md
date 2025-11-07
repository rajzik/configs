# `@rajzik/eslint-config`

Shareable ESLint configuration for ESLint v9+ (flat config). Provides comprehensive linting rules for TypeScript, JavaScript, React, Next.js, Node.js, and more.

## Installation

```sh
npm install --save-dev @rajzik/eslint-config eslint
pnpm install --save-dev @rajzik/eslint-config eslint
yarn add --dev @rajzik/eslint-config eslint
```

## Usage

Create an `eslint.config.js` file:

```javascript
import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import prettierConfig from '@rajzik/eslint-config/prettier';
import turboConfig from '@rajzik/eslint-config/turbo';

/** @type {import('@rajzik/eslint-config').Config} */
const config = [
  ...baseConfig,
  ...nodeConfig,
  ...turboConfig,
  // Always last
  ...prettierConfig,
];

export default config;
```

## API Reference

### Default Export (`@rajzik/eslint-config`)

Base configuration with TypeScript, JavaScript, and test file support.

**Features:**
- TypeScript ESLint recommended rules
- Type-checked rules enabled
- Stylistic rules
- Import plugin rules
- Unicorn plugin rules
- Vitest and Testing Library support for test files

**Example:**
```javascript
import baseConfig from '@rajzik/eslint-config';

export default baseConfig;
```

**Included Rules:**
- TypeScript strict type checking
- Consistent type imports (`type` imports)
- Naming conventions (PascalCase for types, interfaces)
- No unsafe operations
- Arrow function preferences
- Template literal preferences
- Object shorthand
- Console restrictions (only `console.error` allowed)

---

### React Preset (`@rajzik/eslint-config/react`)

Enables React-specific linting rules.

**Installation:**
```sh
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-refresh
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import reactConfig from '@rajzik/eslint-config/react';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...reactConfig,
  ...prettierConfig,
];
```

**Rules:**
- React JSX runtime rules
- React Hooks rules
- JSX accessibility rules
- React Refresh rules
- JSX quotes (double quotes)
- JSX prop sorting
- JSX Pascal case
- Boolean prop values (`<Component prop />` not `<Component prop={true} />`)
- Self-closing components
- Fragment usage
- Button type attributes

---

### React Compiler Preset (`@rajzik/eslint-config/react-compiler`)

Enables React Compiler linting rules. Requires React preset.

**Installation:**
```sh
npm install --save-dev eslint-plugin-react-compiler
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import reactConfig from '@rajzik/eslint-config/react';
import reactCompilerConfig from '@rajzik/eslint-config/react-compiler';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...reactConfig,
  ...reactCompilerConfig,
  ...prettierConfig,
];
```

**Rules:**
- React Compiler recommended rules
- Validates React Compiler compatibility

---

### Next.js Preset (`@rajzik/eslint-config/nextjs`)

Enables Next.js-specific linting rules.

**Installation:**
```sh
npm install --save-dev @next/eslint-plugin-next
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import nextjsConfig from '@rajzik/eslint-config/nextjs';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...nextjsConfig,
  ...prettierConfig,
];
```

**Rules:**
- Next.js recommended rules
- Core Web Vitals rules
- Next.js best practices

---

### Node.js Preset (`@rajzik/eslint-config/node`)

Enables Node.js-specific linting rules.

**Installation:**
```sh
npm install --save-dev eslint-plugin-n
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...nodeConfig,
  ...prettierConfig,
];
```

**Rules:**
- Node.js recommended rules
- File extension resolution (`.ts`, `.tsx`, `.mts`, `.mtsx`, `.cts`, `.ctsx`, `.js`, `.jsx`, `.cjs`, `.cjsx`, `.json`)

---

### Tailwind CSS Preset (`@rajzik/eslint-config/tailwind`)

Enables Tailwind CSS linting rules.

**Installation:**
```sh
npm install --save-dev eslint-plugin-tailwindcss
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import tailwindConfig from '@rajzik/eslint-config/tailwind';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...tailwindConfig,
  ...prettierConfig,
];
```

**Rules:**
- Tailwind recommended rules
- Custom classname detection (supports `twMerge`, `classnames`, `clsx`, `ctl`, `cva`, `tv`, `cn`)
- No unnecessary arbitrary values
- No contradicting classnames
- Enforces shorthand classes

**Settings:**
- Configures Tailwind CSS plugin to recognize utility functions: `twMerge`, `classnames`, `clsx`, `ctl`, `cva`, `tv`, `cn`

---

### CSS Preset (`@rajzik/eslint-config/css`)

Enables CSS linting rules.

**Installation:**
```sh
npm install --save-dev @eslint/css
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import cssConfig from '@rajzik/eslint-config/css';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...cssConfig,
  ...prettierConfig,
];
```

**Rules:**
- CSS recommended rules
- CSS syntax validation

---

### CSS with Tailwind v3 (`@rajzik/eslint-config/css` - `cssTailwindConfig3`)

CSS linting with Tailwind CSS v3 support.

**Installation:**
```sh
npm install --save-dev @eslint/css tailwind-csstree
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import { cssTailwindConfig3 } from '@rajzik/eslint-config/css';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...cssTailwindConfig3,
  ...prettierConfig,
];
```

---

### CSS with Tailwind v4 (`@rajzik/eslint-config/css` - `cssTailwindConfig4`)

CSS linting with Tailwind CSS v4 support.

**Installation:**
```sh
npm install --save-dev @eslint/css tailwind-csstree
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import { cssTailwindConfig4 } from '@rajzik/eslint-config/css';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...cssTailwindConfig4,
  ...prettierConfig,
];
```

---

### Turbo Preset (`@rajzik/eslint-config/turbo`)

Enables Turbo monorepo linting rules.

**Installation:**
```sh
npm install --save-dev eslint-plugin-turbo
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import turboConfig from '@rajzik/eslint-config/turbo';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...turboConfig,
  ...prettierConfig,
];
```

**Rules:**
- Turbo recommended rules
- Turbo monorepo best practices

---

### Prettier Integration (`@rajzik/eslint-config/prettier`)

Disables ESLint rules that conflict with Prettier. **Must be included last.**

**Installation:**
```sh
npm install --save-dev eslint-config-prettier
```

**Usage:**
```javascript
import baseConfig from '@rajzik/eslint-config';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  // Always last
  ...prettierConfig,
];
```

**Rules:**
- Disables conflicting formatting rules
- Re-enables `curly` rule (requires braces for all control statements)

---

## Complete Example

**React + Next.js + Tailwind + Prettier:**

```javascript
import baseConfig from '@rajzik/eslint-config';
import reactConfig from '@rajzik/eslint-config/react';
import nextjsConfig from '@rajzik/eslint-config/nextjs';
import tailwindConfig from '@rajzik/eslint-config/tailwind';
import prettierConfig from '@rajzik/eslint-config/prettier';

/** @type {import('@rajzik/eslint-config').Config} */
const config = [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...tailwindConfig,
  // Always last
  ...prettierConfig,
];

export default config;
```

**Node.js + Turbo:**

```javascript
import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import turboConfig from '@rajzik/eslint-config/turbo';
import prettierConfig from '@rajzik/eslint-config/prettier';

/** @type {import('@rajzik/eslint-config').Config} */
const config = [
  ...baseConfig,
  ...nodeConfig,
  ...turboConfig,
  ...prettierConfig,
];

export default config;
```

## Type Exports

All TypeScript ESLint types are re-exported:

```typescript
import type { Config } from '@rajzik/eslint-config';
```

## Key Rules

### TypeScript

- **Strict type checking**: All unsafe operations are errors
- **Consistent type imports**: Enforces `import type` for type-only imports
- **Naming conventions**: PascalCase for types/interfaces, camelCase for variables
- **No explicit `any`**: Warns on `any` types (except rest args)
- **No deprecated APIs**: Errors on deprecated TypeScript features
- **Nullish coalescing**: Prefers `??` over `||` for null/undefined

### Code Quality

- **Arrow functions**: Prefers arrow functions
- **Template literals**: Prefers template literals over string concatenation
- **Object shorthand**: Requires object shorthand syntax
- **Console**: Only `console.error` allowed
- **Unicorn rules**: Modern JavaScript best practices

### Testing

- **Vitest**: Recommended Vitest rules for test files
- **Testing Library**: Recommended Testing Library rules for React tests

## Customization

You can override rules in your config:

```javascript
import baseConfig from '@rajzik/eslint-config';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Override rule
      'no-console': 'off', // Allow all console methods
    },
  },
  ...prettierConfig,
];
```

## Migration from ESLint v8

If migrating from ESLint v8, note that:

1. Config format changed from `.eslintrc.js` to `eslint.config.js`
2. Flat config format is required
3. Plugin imports are different
4. Some rule names may have changed

See [ESLint Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0) for details.
