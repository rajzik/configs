# `prettier-config-rajzik`

## Installation

```sh
npm install --save-dev prettier-config-rajzik prettier
yarn add --dev prettier-config-rajzik prettier
```

## Usage

`package.json`:

```json
{
  "prettier": "prettier-config-rajzik"
}
```

`.prettierrc`:

```javascript
module.exports = 'prettier-config-rajzik';
```

or you can override part of the config

```javascript
module.exports = {
  ...require('prettier-config-rajzik'),
  semi: false,
};
```
