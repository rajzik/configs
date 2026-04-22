# `@rajzik/oxlint-config`

Shareable Oxlint configuration for personal projects.

It provides a base config plus focused presets for Node.js, React, JSDoc,
libraries, and Turborepo projects. You can either compose the exported configs
manually or use `buildOxlintConfig()` to generate a project-specific setup.

## Installation

```sh
npm install --save-dev @rajzik/oxlint-config oxlint
pnpm install --save-dev @rajzik/oxlint-config oxlint
yarn add --dev @rajzik/oxlint-config oxlint
```

If you use `oxlint-tsgolint` in your project, install it alongside `oxlint`.
The package declares it as an optional peer dependency.

```sh
npm install --save-dev @rajzik/oxlint-config oxlint oxlint-tsgolint
pnpm install --save-dev @rajzik/oxlint-config oxlint oxlint-tsgolint
yarn add --dev @rajzik/oxlint-config oxlint oxlint-tsgolint
```

## Usage

### Recommended: `buildOxlintConfig()`

Create an `oxlint.config.ts` file:

```ts
import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  turbo: true,
});
```

### React project

```ts
import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  react: true,
  turbo: true,
});
```

### Library project with overrides

`libraryConfig` should be applied last so its relaxed library-specific rules win
over earlier presets. `buildOxlintConfig()` already handles that ordering for
you.

```ts
import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  library: true,
  overrides: {
    rules: {
      'eslint/no-console': 'warn',
    },
  },
});
```

## Manual Composition

If you want full control over the `extends` order, compose the exported configs
manually:

```ts
import {
  baseConfig,
  libraryConfig,
  nodeConfig,
  reactConfig,
  turboConfig,
} from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [
    baseConfig,
    nodeConfig,
    reactConfig,
    turboConfig,
    libraryConfig,
  ],
});
```

## API

### `buildOxlintConfig(configuration?)`

Builds a ready-to-use Oxlint config from the shared presets.

```ts
import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  react: true,
  node: true,
  turbo: true,
  jsdoc: true,
  library: false,
  overrides: {
    rules: {
      'typescript/no-explicit-any': 'warn',
    },
  },
});
```

#### Options

##### `react`

Enables React and accessibility rules, browser environment settings, and
`eslint-plugin-react-hooks` integration.

Default: `false`

##### `node`

Enables Node.js environment settings and Node-specific lint rules.

Default: `false`

##### `turbo`

Enables Turborepo-specific rules via `eslint-plugin-turbo`.

Default: `false`

##### `jsdoc`

Enables the `jsdoc` plugin.

Default: `false`

##### `library`

Applies library-specific rule adjustments. This config is intended to run last.

Default: `false`

##### `overrides`

Additional Oxlint config merged into the generated result. Any
`overrides.extends` entries are appended before `libraryConfig`.

### `baseConfig`

The shared base config used by all other presets.

It enables the following plugins:

- `eslint`
- `oxc`
- `import`
- `promise`
- `typescript`
- `unicorn`

It also applies shared ignore patterns for generated output and dependency
directories.

```ts
import { baseConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
});
```

### `nodeConfig`

Adds Node.js environment support and Node-specific rules.

```ts
import { baseConfig, nodeConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, nodeConfig],
});
```

### `reactConfig`

Adds React, JSX accessibility, browser environment support, and React Hooks
rules.

This preset uses `eslint-plugin-react-hooks` through Oxlint JS plugins.

```ts
import { baseConfig, reactConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, reactConfig],
});
```

### `turboConfig`

Adds Turborepo-specific rules.

This preset uses `eslint-plugin-turbo` through Oxlint JS plugins.

```ts
import { baseConfig, turboConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, turboConfig],
});
```

### `jsdocConfig`

Adds the `jsdoc` plugin.

```ts
import { baseConfig, jsdocConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, jsdocConfig],
});
```

### `libraryConfig`

Applies library-specific rule relaxations.

This preset must be last in the `extends` array when used manually.

```ts
import { baseConfig, libraryConfig, nodeConfig } from '@rajzik/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, nodeConfig, libraryConfig],
});
```

## Notes

- `libraryConfig` should be the last item in `extends` when composing configs
  manually.
- `buildOxlintConfig()` already places `libraryConfig` last.
- `reactConfig` depends on `eslint-plugin-react-hooks`.
- `turboConfig` depends on `eslint-plugin-turbo`.
- `oxlint-tsgolint` is an optional peer dependency and only needs to be
  installed if your project uses it.
