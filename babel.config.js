module.exports = {
  babelrc: true,
  babelrcRoots: ['packages/*'],
  comments: false,
  presets: [
    [
      '@rajzik/babel-preset',
      {
        modules: false,
        react: false,
        library: true,
        graphql: false,
        removePropTypes: false,
        targets: {
          node: '14',
        },
        srcFolder: 'src',
      },
    ],
  ],
};
