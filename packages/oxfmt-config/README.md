# `@rajzik/oxfmt-config`

Shareable Oxfmt configuration for personal projects.

## Installation

```sh
npm install --save-dev @rajzik/oxfmt-config oxfmt
pnpm install --save-dev @rajzik/oxfmt-config oxfmt
yarn add --dev @rajzik/oxfmt-config oxfmt
```

## Usage

Create an `oxfmt.config.ts` file:

```ts
import { defineConfig } from "oxfmt";
import config from "@rajzik/oxfmt-config";

export default defineConfig(config);
```

## Extend the config

```ts
import { defineConfig } from "oxfmt";
import { extendOxfmtConfig } from "@rajzik/oxfmt-config";

export default defineConfig(
  extendOxfmtConfig({
    printWidth: 100,
  }),
);
```

## API

### `fmt`

The shared base `OxfmtConfig`.

### `extendOxfmtConfig(config)`

Merges the shared defaults with project-specific overrides.

### `ignorePatterns`

Default ignore patterns for generated artifacts and dependency directories.
