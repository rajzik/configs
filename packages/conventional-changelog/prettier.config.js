import config from '@rajzik/prettier-config';

/** @type {import('@rajzik/prettier-config').ExtendedConfig} */
const finalConfig = {
  ...config,
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        parser: 'angular',
      },
    },
  ],
};

export default finalConfig;
