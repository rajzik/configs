# `@rajzik/prettier-config`

Shareable Prettier configuration with import sorting and package.json
formatting.

## Installation

```sh
npm install --save-dev @rajzik/prettier-config prettier
pnpm install --save-dev @rajzik/prettier-config prettier
yarn add --dev @rajzik/prettier-config prettier
```

### Installation with Tailwind CSS

```sh
npm install --save-dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
pnpm install --save-dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
yarn add --dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
```

## Usage

### Basic Usage

**Option 1: `package.json`**

```json
{
  "prettier": "@rajzik/prettier-config"
}
```

**Option 2: `prettier.config.js`**

```javascript
export { default } from '@rajzik/prettier-config';
```

**Option 3: Extend and override**

```javascript
import config from '@rajzik/prettier-config';

export default {
  ...config,
  semi: false, // Override specific options
  printWidth: 100,
};
```

### Usage with Tailwind CSS

**Option 1: `package.json`**

```json
{
  "prettier": "@rajzik/prettier-config/tailwind"
}
```

**Option 2: `prettier.config.js`**

```javascript
export { default } from '@rajzik/prettier-config/tailwind';
```

**Option 3: Extend and override**

```javascript
import config from '@rajzik/prettier-config/tailwind';

export default {
  ...config,
  semi: false,
};
```

## API Reference

### Default Export (`@rajzik/prettier-config`)

Base Prettier configuration with import sorting and package.json formatting.

**Configuration:**

```typescript
{
  arrowParens: 'always';
  bracketSpacing: true;
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
  ];
  printWidth: 80;
  proseWrap: 'always';
  semi: true;
  singleAttributePerLine: true;
  singleQuote: true;
  trailingComma: 'all';
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '',
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '',
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '',
    '<TYPES>^@org',
    '^@org/(.*)$',
    '',
    '<TYPES>^[.|..|~]',
    '^~/',
    '^[../]',
    '^[./]',
  ];
}
```

**Example:**

```javascript
import config from '@rajzik/prettier-config';

export default config;
```

---

### Tailwind Export (`@rajzik/prettier-config/tailwind`)

Prettier configuration with Tailwind CSS class sorting.

**Configuration:**

```typescript
{
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    'prettier-plugin-tailwindcss',
  ],
}
```

**Example:**

```javascript
import tailwindConfig from '@rajzik/prettier-config/tailwind';

export default tailwindConfig;
```

**Note:** The Tailwind plugin must be the last plugin in the array for proper
class sorting.

---

## Configuration Options

### `arrowParens`

Always include parentheses around arrow function parameters.

**Value:** `'always'`

**Example:**

```javascript
// ✅ Formatted
const fn = (x) => x * 2;
const fn2 = (a, b) => a + b;

// ❌ Not formatted this way
const fn = (x) => x * 2;
```

---

### `bracketSpacing`

Include spaces inside object literals.

**Value:** `true`

**Example:**

```javascript
// ✅ Formatted
const obj = { a: 1, b: 2 };

// ❌ Not formatted this way
const obj = { a: 1, b: 2 };
```

---

### `printWidth`

Maximum line length before wrapping.

**Value:** `80`

**Example:**

```javascript
// Lines longer than 80 characters are wrapped
const longFunction = (veryLongParameterName, anotherVeryLongParameterName) => {
  // ...
};
```

---

### `proseWrap`

Wrap prose (markdown, comments) to print width.

**Value:** `'always'`

---

### `semi`

Add semicolons at the end of statements.

**Value:** `true`

**Example:**

```javascript
// ✅ Formatted
const x = 1;
const y = 2;

// ❌ Not formatted this way
const x = 1;
const y = 2;
```

---

### `singleAttributePerLine`

Put each HTML/JSX attribute on its own line.

**Value:** `true`

**Example:**

```jsx
// ✅ Formatted
<Component
  prop1="value1"
  prop2="value2"
  prop3="value3"
/>

// ❌ Not formatted this way
<Component prop1="value1" prop2="value2" prop3="value3" />
```

---

### `singleQuote`

Use single quotes instead of double quotes.

**Value:** `true`

**Example:**

```javascript
// ✅ Formatted
const str = 'Hello, world!';
const obj = { key: 'value' };

// ❌ Not formatted this way
const str = 'Hello, world!';
```

---

### `trailingComma`

Add trailing commas wherever possible.

**Value:** `'all'`

**Example:**

```javascript
// ✅ Formatted
const arr = [1, 2, 3];

const obj = {
  a: 1,
  b: 2,
};

// ❌ Not formatted this way
const arr = [1, 2, 3];
```

---

## Import Ordering

The configuration includes automatic import sorting with the following order:

1. **Node.js built-in modules** (`fs`, `path`, `http`, etc.)
2. **Type imports** (separated by blank line)
3. **React** (`react`, `react-dom`, `react-native`)
4. **Next.js** (`next/*`)
5. **Expo** (`expo/*`)
6. **Third-party modules** (separated by blank line)
7. **Type imports from `@org`** (separated by blank line)
8. **Internal `@org` imports**
9. **Type imports from relative paths** (separated by blank line)
10. **Alias imports** (`~/`)
11. **Relative imports** (`../`, `./`)

**Example:**

```typescript
// Built-in modules
import fs from 'node:fs';
import path from 'node:path';

// Type imports
import type { ComponentProps } from 'react';
// React
import { useState } from 'react';
// Next.js
import { NextRequest } from 'next/server';

// Third-party
import axios from 'axios';
import lodash from 'lodash';
import { render } from 'react-dom';

// Type imports from @org
import type { User } from '@org/types';
// Internal @org imports
import { api } from '@org/api';
import { utils } from '@org/utils';

// Type imports from relative
import type { Props } from '../types';
import { Header } from '../Header';
// Relative imports
import { Button } from './Button';
```

---

## Plugins

### `prettier-plugin-packagejson`

Automatically formats `package.json` files.

**Features:**

- Sorts dependencies alphabetically
- Formats JSON structure
- Consistent indentation

---

### `@ianvs/prettier-plugin-sort-imports`

Sorts and organizes import statements.

**Features:**

- Groups imports by type
- Separates groups with blank lines
- Handles type imports separately
- Supports custom import order patterns

---

### `prettier-plugin-tailwindcss` (Tailwind only)

Sorts Tailwind CSS classes according to the recommended order.

**Features:**

- Automatic class sorting
- Follows Tailwind CSS best practices
- Must be the last plugin in the array

**Example:**

```jsx
// Before
<div className="text-red-500 flex p-4 bg-blue-500">

// After (sorted)
<div className="flex bg-blue-500 p-4 text-red-500">
```

---

## Type Exports

### `ExtendedConfig`

Type for extended Prettier configuration.

```typescript
import type { ExtendedConfig } from '@rajzik/prettier-config';

const config: ExtendedConfig = {
  // ...
};
```

---

## Examples

### Override Print Width

```javascript
import config from '@rajzik/prettier-config';

export default {
  ...config,
  printWidth: 100, // Use 100 character line width
};
```

### Disable Semicolons

```javascript
import config from '@rajzik/prettier-config';

export default {
  ...config,
  semi: false,
};
```

### Custom Import Order

```javascript
import config from '@rajzik/prettier-config';

export default {
  ...config,
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@myorg/(.*)$',
    '',
    '^[./]',
  ],
};
```

### Tailwind with Custom Options

```javascript
import tailwindConfig from '@rajzik/prettier-config/tailwind';

export default {
  ...tailwindConfig,
  printWidth: 100,
  tabWidth: 2,
};
```

---

## Integration

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Pre-commit Hook

Using `lint-staged`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
  }
}
```

### CI/CD

```yaml
# GitHub Actions example
- name: Check formatting
  run: prettier --check "**/*.{js,jsx,ts,tsx,json,css,md}"
```
