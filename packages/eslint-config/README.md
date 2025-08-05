# `@rajzik/eslint-config`

Sharable configuration for eslint.

> Only for eslint v9 and newer

## Installation

```sh
npm install --save-dev @rajzik/eslint-config eslint
pnpm install --save-dev @rajzik/eslint-config eslint
yarn add --dev @rajzik/eslint-config eslint
```

## Usage

`eslint.config.js`:

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

## Presets

- rajzik
  - Base preset containing bare configuration for typescript, javascript and
    tests
- React
  - Enable rules for react
- Next js
  - Enable rulse for next js
- node
  - Enable rules for node
- tailwind
  - Enable rules for tailwind
- css
  - Enable rules for CSS
  - `import { cssTailwindConfig4, cssTailwindConfig3 } from '@rajzik/eslint-config/css'` instead if
    you use tailwind
- turbo
  - Enable rules for turbo
- prettier
  - Enable integration with prettier
  - Prettier has to be last
