# `@rajzik/prettier-config`

## Installation

```sh
npm install --save-dev @rajzik/prettier-config prettier
yarn add --dev @rajzik/prettier-config prettier
```

## Usage

`package.json`:

```json
{
  "prettier": "@rajzik/prettier-config"
}
```

`.prettierrc`:

```javascript
module.exports = '@rajzik/prettier-config';
```

or you can override part of the config

```javascript
module.exports = {
  ...require('@rajzik/prettier-config'),
  semi: false,
};
```
