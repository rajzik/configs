import { ALIAS_PATTERN } from '@rajzik/configs-shared';

export type PluginItem = string | [string, object];

export interface BabelPresetOptions {
  modules?: boolean;
  react?: boolean;
  removePropTypes?: boolean;
  graphql?: boolean;
  library?: boolean;
  srcFolder?: string;
  env?: Record<string, unknown>;
}

export default function babelPreset(
  _: unknown,
  {
    modules,
    react,
    removePropTypes,
    graphql,
    library,
    srcFolder = 'src',
    env = {},
  }: BabelPresetOptions = {},
) {
  const plugins: PluginItem[] = [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['babel-plugin-transform-dev', { evaluate: false }],
    'babel-plugin-optimize-clsx',
    '@emotion',
  ];

  const presets: PluginItem[] = [
    [
      '@babel/preset-env',
      {
        // Always use async/await
        exclude: [
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
        modules: modules ? false : 'commonjs',
        useBuiltIns: 'entry',
        bugfixes: true,
        shippedProposals: true,
        corejs: '3.21',
        // Only target node since this is for development
        // Revisit in Babel v8: https://babeljs.io/docs/en/options#no-targets
        targets: { node: 'current' },
        ...env,
      },
    ],
    ['@babel/preset-typescript', { allowDeclareFields: true, optimizeConstEnums: true }],
  ];

  if (graphql) {
    plugins.push('babel-plugin-graphql-tag');
  }

  if (react) {
    presets.push([
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
        runtime: 'automatic',
      },
    ]);

    if (process.env.NODE_ENV === 'development') {
      plugins.push('react-refresh/babel');
    }

    if (removePropTypes) {
      plugins.push([
        'babel-plugin-transform-react-remove-prop-types',
        {
          mode: 'remove',
          removeImport: true,
          additionalLibraries: [],
          ignoreFilenames: ['node_modules'],
        },
      ]);
    } else {
      plugins.push('babel-plugin-typescript-to-proptypes');
    }
  }

  if (!library) {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        extensions: ['ts', 'tsx', 'js', 'jsx'],
        alias: {
          [ALIAS_PATTERN]: `./${srcFolder}`,
        },
      },
    ]);
  }

  plugins.push('@babel/plugin-transform-runtime');

  return {
    plugins,
    presets,
  };
}
