# Personal Sharable Configs

A collection of shareable configuration packages for modern JavaScript/TypeScript development, including ESLint, Oxfmt, Prettier, TypeScript, DangerJS, and conventional changelog configurations.

## Packages

### 🛡️ Code Quality & Linting

#### [`@rajzik/oxfmt-config`](./packages/oxfmt-config)

Shareable Oxfmt configuration with import sorting and package.json sorting.

[📖 Documentation](./packages/oxfmt-config/README.md)

**Features:**

- Oxfmt-compatible defaults
- Import sorting with grouped ordering
- Package.json script sorting
- Shared ignore patterns

---

#### [`@rajzik/prettier-config`](./packages/prettier-preset)

Shareable Prettier configuration with automatic import sorting and package.json formatting.

[📖 Documentation](./packages/prettier-preset/README.md)

**Features:**

- Import sorting with custom order
- Package.json formatting
- Tailwind CSS class sorting (optional)
- Modern JavaScript formatting

---

#### [`@rajzik/tsconfig`](./packages/tsconfig)

Shareable TypeScript configuration with strict type checking and modern JavaScript support.

[📖 Documentation](./packages/tsconfig/README.md)

**Features:**

- Strict type checking enabled
- Modern ES2024 target
- Bundler-optimized module resolution
- Monorepo performance optimizations
- Package configuration for declaration files

---

### 📝 Commit & Changelog

#### [`conventional-changelog-rajzik`](./packages/conventional-changelog)

Commit message guidelines and changelog generation with emoji support and Azure DevOps integration.

[📖 Documentation](./packages/conventional-changelog/README.md)

**Features:**

- Conventional commit format
- Emoji support for commit groups
- Azure DevOps PR format support
- Automatic semantic versioning
- Custom Handlebars templates

---

#### [`@rajzik/conventional-changelog-types`](./packages/conventional-changelog-types)

Type definitions and utilities for conventional commits and changelog generation.

[📖 Documentation](./packages/conventional-changelog-types/README.md)

**Features:**

- Type-safe commit type definitions
- Commit format validation
- Type group utilities
- Constants for commit types and groups

---

#### [`@rajzik/conventional-commit-lint-config`](./packages/conventional-commit-lint)

Commitlint configuration enforcing conventional commit message format.

[📖 Documentation](./packages/conventional-commit-lint/README.md)

**Features:**

- Enforces conventional commit format
- Sentence-case subject validation
- Trailing period requirement
- Type enum validation

---

### 🔍 Code Review

#### [`@rajzik/danger-configuration`](./packages/config-danger)

DangerJS configuration for automated code review checks in pull requests.

[📖 Documentation](./packages/config-danger/README.md)

**Features:**

- Conventional commit prefix validation
- Lock file validation
- Test file checking
- ADR documentation checks
- Component snapshot prevention
- JavaScript file prevention

---

### 🔧 Utilities

#### [`@rajzik/configs-shared`](./packages/shared)

Internal package providing shared constants and utilities.

[📖 Documentation](./packages/shared/README.md)

**Features:**

- File extension constants
- Path patterns and globs
- JSON parsing utilities
- TypeScript config helpers

---

## Quick Start

### Complete Setup (React + Next.js + Tailwind)

**1. Install dependencies:**

```sh
pnpm add -D \
  @rajzik/eslint-config \
  @rajzik/oxfmt-config \
  @rajzik/tsconfig \
  eslint \
  oxfmt \
  typescript
```

**2. Create `eslint.config.js`:**

```javascript
import baseConfig from '@rajzik/eslint-config';
import reactConfig from '@rajzik/eslint-config/react';
import nextjsConfig from '@rajzik/eslint-config/nextjs';
import tailwindConfig from '@rajzik/eslint-config/tailwind';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...tailwindConfig,
  ...prettierConfig,
];
```

**3. Create `oxfmt.config.ts`:**

```ts
import { defineConfig } from 'oxfmt';
import config from '@rajzik/oxfmt-config';

export default defineConfig(config);
```

**4. Create `tsconfig.json`:**

```json
{
  "extends": "@rajzik/tsconfig",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

**5. Add to `package.json`:**

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "oxfmt --write .",
    "typecheck": "tsc --noEmit"
  }
}
```

---

### Minimal Setup (Node.js)

**1. Install dependencies:**

```sh
pnpm add -D \
  @rajzik/eslint-config \
  @rajzik/oxfmt-config \
  @rajzik/tsconfig \
  eslint \
  oxfmt \
  typescript
```

**2. Create `eslint.config.js`:**

```javascript
import baseConfig from '@rajzik/eslint-config';
import nodeConfig from '@rajzik/eslint-config/node';
import prettierConfig from '@rajzik/eslint-config/prettier';

export default [...baseConfig, ...nodeConfig, ...prettierConfig];
```

**3. Create `oxfmt.config.ts`:**

```ts
import { defineConfig } from 'oxfmt';
import config from '@rajzik/oxfmt-config';

export default defineConfig(config);
```

**4. Create `tsconfig.json`:**

```json
{
  "extends": "@rajzik/tsconfig"
}
```

---

## Package Overview

| Package                                   | Purpose                  | Key Features                                  |
| ----------------------------------------- | ------------------------ | --------------------------------------------- |
| `@rajzik/eslint-config`                   | ESLint configuration     | TypeScript, React, Next.js, Node.js, Tailwind |
| `@rajzik/oxfmt-config`                    | Oxfmt configuration      | Import sorting, package.json script sorting   |
| `@rajzik/prettier-config`                 | Prettier configuration   | Import sorting, Tailwind class sorting        |
| `@rajzik/tsconfig`                        | TypeScript configuration | Strict types, modern JS, bundler-optimized    |
| `conventional-changelog-rajzik`           | Changelog generation     | Emoji support, Azure DevOps                   |
| `@rajzik/conventional-changelog-types`    | Type definitions         | Commit types, validation utilities            |
| `@rajzik/conventional-commit-lint-config` | Commit linting           | Conventional commit enforcement               |
| `@rajzik/danger-configuration`            | PR validation            | Automated code review checks                  |
| `@rajzik/configs-shared`                  | Shared utilities         | Constants, helpers                            |

---

## Contributing

This is a personal configuration repository. For issues or suggestions, please open an issue on GitHub.

## License

MIT

## Author

Jan Šilhan <silhanu@gmail.com>

---

## Related Resources

- [ESLint Documentation](https://eslint.org/)
- [Oxfmt Documentation](https://oxc.rs/docs/guide/usage/formatter)
- [Prettier Documentation](https://prettier.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [DangerJS Documentation](https://danger.systems/js/)
