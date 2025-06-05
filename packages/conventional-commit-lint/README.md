# `@rajzik/conventional-commit-lint-config`

Config for [rajzik preset](../conventional-changelog).

## Getting started

```sh
npm install --save-dev @commitlint/cli @rajzik/conventional-commit-lint-config
pnpm install --save-dev @commitlint/cli @rajzik/conventional-commit-lint-config
yarn add --dev @commitlint/cli @rajzik/conventional-commit-lint-config
```


# Configure commitlint to use conventional config

`commitlint.config.cjs`

```js
module.exports = {
  extends: ['@rajzik/conventional-commit-lint-config']
};
```

`commitlint.config.mjs`

```js
export default {
  extends: ['@rajzik/conventional-commit-lint-config']
};
```

## Further instructions

[commitlint](https://github.com/conventional-changelog/commitlint)
