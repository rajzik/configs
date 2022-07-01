# `eslint-config-rajzik`

Sharable configuration for eslint.

## Installation

```sh
npm install --save-dev eslint-config-rajzik eslint
yarn add --dev eslint-config-rajzik eslint
```

## Usage

`.eslintrc.js`:

```javascript
module.exports = {
  root: true,
  extends: [
    'rajzik',
    'rajzik/node',
    'rajzik/react',
    'rajzik/esnext',
    'rajzik/typescript',
    'rajzik/prettier',
  ],
};
```

## Presets

- rajzik
  - Base preset containing bare configuration
- React
  - Enable rules for react
- node
  - Enable rules for node
- esnext
  - Enable esnext support
- typescript
  - Enable support for typescript
  - Needs to before prettier or last
- prettier
  - Enable integration with prettier
  - Prettier has to be last
