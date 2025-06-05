# `@rajzik/prettier-config`

## Installation

```sh
npm install --save-dev @rajzik/prettier-config prettier
pnpm install --save-dev @rajzik/prettier-config prettier
yarn add --dev @rajzik/prettier-config prettier
```

### Installation with tailwind

```sh
npm install --save-dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
pnpm install --save-dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
yarn add --dev @rajzik/prettier-config prettier prettier-plugin-tailwindcss
```

## Usage

`package.json`:

```json
{
  "prettier": "@rajzik/prettier-config"
}
```

`prettier.config.js`:

```javascript
export { default } from '@rajzik/prettier-config';
```

or you can override part of the config

```javascript
import config from '@rajzik/prettier-config';

export default {
  ...config,
  semi: false,
};
```

### Usage with tailwind

`package.json`:

```json
{
  "prettier": "@rajzik/prettier-config/tailwind"
}
```

`prettier.config.js`:

```javascript
export { default } from '@rajzik/prettier-config/tailwind';
```

or you can override part of the config

```javascript
import config from '@rajzik/prettier-config/tailwind';

export default {
  ...config,
  semi: false,
};
```

## Configuration

```js
const configuration = {
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  printWidth: 80,
  proseWrap: 'always',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
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
  ],
};
```

### Tailwind

```js
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
};
```
