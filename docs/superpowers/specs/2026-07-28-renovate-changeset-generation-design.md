# Renovate Changeset Generation Design

## Goal

Automatically create or update a committed Changesets markdown file for Renovate dependency update branches in GitHub Actions so that dependency PRs can flow through the existing release process without requiring a manual `.changeset/*.md` file.

## Scope

This design covers:

- detecting Renovate-authored branches or pull requests in GitHub Actions
- determining which publishable workspace packages should receive a patch changeset
- generating a stable automation-owned changeset file
- committing that file back to the Renovate branch only when content changes

This design does not change the existing release workflow semantics in `.github/workflows/release.yml`.

## Existing Context

- The repository already uses Changesets with a fixed package group in `.changeset/config.json`.
- The release workflow expects committed `.changeset/*.md` files on `main`.
- The pull request workflow already runs on `pull_request` and `push` for `renovate/**` branches.
- Renovate currently updates dependency manifests, lockfiles, and GitHub Actions files, but it does not always produce a changeset file.

## Recommended Approach

Add a small generator script plus a dedicated job in `.github/workflows/pull-request.yml`.

The job should:

1. run only for Renovate-authored pull requests or `renovate/**` pushes
2. diff the current branch against `main`
3. compute the affected publishable packages
4. generate or remove a single automation-owned changeset file
5. commit and push the file back to the same branch only when the working tree changed

This keeps the current release flow unchanged because the release workflow will continue consuming normal committed changeset files.

## Package Selection Rules

The generator should determine affected packages from changed files with conservative rules:

1. If `packages/<pkg>/package.json` changed, include that package.
2. If the root `package.json` changed, include all packages from the fixed group in `.changeset/config.json`.
3. If `pnpm-workspace.yaml` changed, include all packages from the fixed group in `.changeset/config.json`.
4. If only non-package files changed, generate no changeset.

These rules intentionally favor over-inclusion when shared dependency sources change because the repository publishes fixed-version configuration packages together.

## Generated File Contract

The automation should own exactly one file per Renovate branch:

- path: `.changeset/renovate-<identifier>.md`
- identifier: prefer pull request number when available, otherwise a sanitized branch name

The file content should be deterministic:

```md
---
"@rajzik/danger-configuration": patch
"@rajzik/oxfmt-config": patch
"@rajzik/oxlint-config": patch
"@rajzik/prettier-config": patch
"@rajzik/configs-shared": patch
"@rajzik/tsconfig": patch
---

chore: update Renovate-managed dependencies.
```

Packages should be sorted consistently so reruns produce the same output. If no packages qualify, the script should delete the automation-owned file if it exists.

## CI Behavior

Add a dedicated job to `pull-request.yml` with these characteristics:

- runs after checkout and install
- has `contents: write`
- skips for non-Renovate authors
- generates the file before the rest of the validation matrix or alongside it
- pushes only when git detects a diff

The commit should be bot-authored and use a stable message such as:

`chore: add renovate changeset`

The job should not fail when there is simply nothing to change.

## Implementation Shape

Add a Node script, for example `scripts/generate-renovate-changeset.js`, that:

- reads changed files from git diff against `origin/main`
- reads `.changeset/config.json` to discover the fixed package group
- optionally reads package manifests under `packages/*/package.json` to map folder names to package names
- writes or removes the automation-owned changeset file
- exits successfully with clear logging

The workflow job should then:

- fetch `main`
- run the generator
- configure git identity locally in the job
- commit and push when needed

## Error Handling

- If the diff target cannot be resolved, fail the job clearly because package selection would be unreliable.
- If the generator finds a package directory that does not map to a known package name, fail clearly rather than creating a malformed changeset.
- If no qualifying package changes are found, exit successfully without a commit.

## Testing

Validation should include:

- unit-like manual verification of the generator against representative changed file sets
- `pnpm format` if script or workflow formatting changes require it
- targeted workflow/script sanity checks locally where possible

At minimum, the implementation should be validated by running the generator script against the current branch state and confirming stable output behavior.

## Risks And Mitigations

- Over-including packages for root dependency changes: accepted, because the fixed package group is versioned together.
- Repeated CI commits: mitigated by deterministic content and commit-only-on-diff behavior.
- Interaction with human-authored changesets: mitigated by owning a single predictable `renovate-*` file and leaving all other files untouched.

## Success Criteria

- A Renovate dependency branch gains a committed `.changeset/renovate-*.md` file automatically in GitHub CI.
- Re-running CI does not create duplicate or noisy commits.
- Existing release automation continues to work without changes to how releases are published.
