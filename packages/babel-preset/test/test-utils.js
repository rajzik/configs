const NODE_VERSION = '16';

const NODE_TARGET = { node: NODE_VERSION };

const WEB_TARGET = { browsers: ['last 3 versions', 'not ie > 0'] };

export function getConfig({
  env = {},
  esm = false,
  graphql = false,
  library = false,
  node = false,
  react = false,
  empty = false,
  srcFolder,
  workspaces,
  assumptions,
}) {
  if (empty) {
    return {};
  }

  const config = {
    babelrc: true,
    // @ts-expect-error -- not typed
    assumptions,
    babelrcRoots: workspaces,
    parserOpts: {
      ...(library && { sourceType: 'unambiguous' }),
    },
    presets: [
      [
        '@rajzik/babel-preset',
        {
          modules: esm,
          react,
          library,
          graphql,
          removePropTypes: !library && react,
          srcFolder,
          env: {
            targets: node ? NODE_TARGET : WEB_TARGET,
            ...env,
          },
        },
      ],
    ],
  };

  return config;
}
