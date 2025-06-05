# `@rajzik/tsconfig`

Sharable typescript configuration.

## Installation

```sh
npm install --save-dev @rajzik/tsconfig typescript
pnpm install --save-dev @rajzik/tsconfig typescript
yarn add --dev @rajzik/tsconfig typescript
```

## Base configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Rajzik config",

  "compilerOptions": {
    /* Base options */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2024",
    "lib": ["ES2024"],
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "allowArbitraryExtensions": true,
    "jsx": "preserve",

    /* Keep TSC performant in monorepos */
    "incremental": true,
    "disableSourceOfProjectReferenceRedirect": true,
    "tsBuildInfoFile": "${configDir}/.cache/tsbuildinfo.json",

    /* Strictness */
    "strict": true,
    "checkJs": true,
    "noUncheckedIndexedAccess": true,

    /* Transpile using bundler */
    "module": "preserve",
    "moduleResolution": "bundler",
    "noEmit": true
  },
  "exclude": ["node_modules", "dist", "dts", ".next", "build"]
}
```

## Package configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    /** Emit types for internal packages to speed up editor performance. */
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "noEmit": false,
    "outDir": "${configDir}/dist"
  }
}
```

## Usage

`tsconfig.json`:

```json
{
  "extends": "@rajzik/tsconfig"
}
```


Or

```json
{
  "extends": "@rajzik/tsconfig/tsconfig.package.json"
}
```
