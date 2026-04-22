# AGENTS.md

## Purpose

This repository is a `pnpm` + `turbo` monorepo of shareable JavaScript/TypeScript configuration packages. Use this file as the default working guide for coding agents operating in the repo.

Prefer small, targeted changes that match the existing style. Do not rewrite unrelated files, and do not revert user changes you did not make.

## Repo Overview

- Package manager: `pnpm`
- Task runner: `turbo`
- Primary language: TypeScript / ESM JavaScript
- Workspace layout: `packages/*`
- Main package areas:
  - linting/config: `packages/eslint-config`, `packages/oxfmt-config`, `packages/prettier-preset`, `packages/tsconfig`
  - changelog/commits: `packages/conventional-changelog`, `packages/conventional-changelog-types`, `packages/conventional-commit-lint`
  - automation/shared: `packages/config-danger`, `packages/shared`

## Working Rules

- Respect a dirty working tree. Ignore unrelated changes unless the user explicitly asks you to work with them.
- Prefer editing source and docs over generated output.
- Do not update `dist`, `.turbo`, `.cache`, or log files unless the task explicitly requires generated artifacts.
- Keep changes focused. Avoid opportunistic refactors unless they directly support the requested work.
- Follow existing package structure and naming conventions instead of inventing new patterns.
- If behavior, package usage, or public exports change, update the relevant package `README.md`.
- If a publishable package changes in a user-visible way, check whether a changeset is needed.
- Add jsdoc to objects and functions with detailed functionality and descriptions with return types. Annotate interface properties with defaults if necessary.

## Files To Treat Carefully

- `pnpm-lock.yaml`: update only when dependencies actually change.
- `.changeset/*`: add or edit only when release-impacting package changes warrant it.
- `dist/**`: generated output, avoid manual edits.
- `.turbo/**` and `.cache/**`: local build artifacts, do not treat as source.

## Common Commands

Run commands from the repository root unless there is a clear reason not to.

### Whole repo

- `pnpm build`
- `pnpm lint`
- `pnpm format`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:all`

### Target one package

Prefer package-scoped validation for focused changes:

- `pnpm --filter @rajzik/eslint-config lint`
- `pnpm --filter @rajzik/prettier-config build`
- `pnpm --filter @rajzik/oxfmt-config typecheck`

If the exact package name is unclear, confirm it in that package's `package.json` before running commands.

## Validation Expectations

- For a small, isolated package change, run the smallest meaningful package-scoped checks first.
- For shared config, build tooling, workspace config, or cross-package changes, run broader validation from the root.
- If you changed formatting-related behavior, run `pnpm format`.
- If you changed lint rules or lint config, run `pnpm lint`.
- If you changed TypeScript config, exports, or types, run `pnpm typecheck`.
- If you changed package build inputs or published outputs, run `pnpm build`.
- In the final handoff, say what you verified and what you did not run.

## CI Awareness

Pull request CI runs checks equivalent to:

- build
- test
- lint
- typecheck
- format
- Danger

Local validation should be proportional to the scope of the change, but keep these CI checks in mind before declaring work complete.

## Editing Conventions

- Prefer minimal diffs.
- Keep exports, package metadata, and docs aligned.
- Preserve ESM-style imports/exports and the repo's existing formatting.
- Reuse existing helpers and shared constants before adding new ones.
- When changing package APIs, verify dependent packages in the monorepo still make sense.

## Completion Checklist

Before finishing:

1. Confirm only intended source files were changed.
2. Check whether docs or changesets should be updated.
3. Run targeted validation appropriate to the scope.
4. Summarize the change and any unverified risk clearly.
