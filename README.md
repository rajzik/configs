# Personal Sharable Configs

A `pnpm` + `turbo` monorepo of reusable configuration packages for JavaScript and
TypeScript projects.

## Packages

### [`@rajzik/oxlint-config`](./packages/oxlint-config)

Reusable Oxlint presets for personal projects.

[Documentation](./packages/oxlint-config/README.md)

### [`@rajzik/oxfmt-config`](./packages/oxfmt-config)

Reusable Oxfmt configuration for formatting source files and sorting imports.

[Documentation](./packages/oxfmt-config/README.md)

### [`@rajzik/prettier-config`](./packages/prettier-preset)

Reusable Prettier preset with import sorting and optional Tailwind support.

[Documentation](./packages/prettier-preset/README.md)

### [`@rajzik/tsconfig`](./packages/tsconfig)

Shared TypeScript base configs for applications and published packages.

[Documentation](./packages/tsconfig/README.md)

### [`@rajzik/danger-configuration`](./packages/config-danger)

Reusable Danger.js helpers for pull request checks such as ADR reminders, test
coverage prompts, lockfile validation, and JavaScript/snapshot restrictions.

[Documentation](./packages/config-danger/README.md)

### [`@rajzik/configs-shared`](./packages/shared)

Small shared package used by other workspace packages.

[Documentation](./packages/shared/README.md)

## Workspace Commands

Run from the repository root:

```sh
pnpm build
pnpm lint
pnpm format
pnpm typecheck
pnpm test
```

## Package Overview

| Package                        | Purpose               |
| ------------------------------ | --------------------- |
| `@rajzik/oxlint-config`        | Oxlint configuration  |
| `@rajzik/oxfmt-config`         | Oxfmt configuration   |
| `@rajzik/prettier-config`      | Prettier preset       |
| `@rajzik/tsconfig`             | TypeScript presets    |
| `@rajzik/danger-configuration` | Danger.js helpers     |
| `@rajzik/configs-shared`       | Shared workspace bits |

## Contributing

This is a personal configuration repository. If package behavior changes,
update the relevant package README alongside the code.

## License

MIT
