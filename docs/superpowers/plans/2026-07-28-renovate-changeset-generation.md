# Renovate Changeset Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically generate and commit a deterministic Renovate-owned changeset file for dependency update branches in GitHub CI.

**Architecture:** Add a focused Node script that computes affected publishable packages from the git diff against `origin/main` and writes a single `.changeset/renovate-*.md` file. Wire that script into a dedicated Renovate-only job in `pull-request.yml` that commits the file back to the branch only when content changes.

**Tech Stack:** Node.js, GitHub Actions, Changesets, pnpm workspace metadata

## Global Constraints

- Preserve the existing release flow in `.github/workflows/release.yml`.
- Only automate Renovate-authored pull requests or `renovate/**` pushes.
- Own exactly one generated `.changeset/renovate-*.md` file per Renovate branch.
- Use deterministic package ordering and commit only when the generated content changes.
- Do not modify human-authored `.changeset/*.md` files.

---

### Task 1: Add Renovate changeset generator

**Files:**
- Create: `scripts/generate-renovate-changeset.js`
- Modify: `package.json`
- Test: manual script runs from repo root

**Interfaces:**
- Consumes: `.changeset/config.json`, `packages/*/package.json`, `process.env.GITHUB_HEAD_REF`, `process.env.GITHUB_REF_NAME`
- Produces: `scripts/generate-renovate-changeset.js` CLI with exit code `0` on success and deterministic write/remove behavior for `.changeset/renovate-<identifier>.md`

- [ ] **Step 1: Add a script entry point**

```js
// package.json
{
  "scripts": {
    "generate:renovate-changeset": "node ./scripts/generate-renovate-changeset.js"
  }
}
```

- [ ] **Step 2: Implement package detection and file generation**

```js
const changedFiles = gitDiffAgainstMain();
const affectedPackages = detectAffectedPackages(changedFiles);

if (affectedPackages.length === 0) {
  removeGeneratedChangesetIfPresent();
  process.exit(0);
}

writeGeneratedChangeset({
  identifier: resolveIdentifier(),
  packages: affectedPackages,
  summary: "chore: update Renovate-managed dependencies.",
});
```

- [ ] **Step 3: Verify deterministic behavior locally**

Run: `node ./scripts/generate-renovate-changeset.js`  
Expected: script logs either generated, unchanged, or removed status without touching unrelated changeset files.

### Task 2: Wire generator into GitHub CI

**Files:**
- Modify: `.github/workflows/pull-request.yml`
- Test: workflow logic review plus local YAML sanity

**Interfaces:**
- Consumes: script from Task 1, GitHub Actions `github` context, `GITHUB_TOKEN`
- Produces: Renovate-only job that fetches `main`, runs the generator, and commits/pushes only when needed

- [ ] **Step 1: Add a dedicated Renovate job**

```yml
renovate-changeset:
  if: github.actor == 'renovate[bot]' || startsWith(github.ref_name, 'renovate/')
  runs-on: ubuntu-latest
```

- [ ] **Step 2: Run the generator and commit only on diff**

```yml
- run: git fetch origin main:refs/remotes/origin/main
- run: pnpm generate:renovate-changeset
- run: |
    if git diff --quiet -- .changeset; then
      echo "No generated changeset changes"
      exit 0
    fi
    git config user.name rajzik-bot
    git config user.email silhanu+releasebot@gmail.com
    git add .changeset
    git commit -m "chore: add renovate changeset"
    git push
```

- [ ] **Step 3: Ensure permissions match branch writes**

Expected: workflow top-level permissions or job-level permissions include `contents: write`.

### Task 3: Validate and polish

**Files:**
- Modify: any touched files above if needed after verification
- Test: `scripts/generate-renovate-changeset.js`, `pnpm format`, targeted lints on edited files

**Interfaces:**
- Consumes: implemented script and workflow
- Produces: verified, formatted automation with no introduced lint issues in edited files

- [ ] **Step 1: Run the generator against current branch state**

Run: `pnpm generate:renovate-changeset`  
Expected: stable output and no crash when the current branch is not a Renovate branch.

- [ ] **Step 2: Run focused validation**

Run: `pnpm format`  
Expected: workflow and script formatting stay consistent.

- [ ] **Step 3: Check edited files for diagnostics**

Expected: no newly introduced lints or syntax issues in the modified files.
